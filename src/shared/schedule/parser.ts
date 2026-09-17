import ExcelJS from 'exceljs'

import { SCHEDULE_DAYS } from './config'
import { normalizeText } from '@/shared/utils/helpers/normalizeText'

import type { ScheduleSource } from './config'
import type { ScheduleData, ScheduleLesson } from './types'

// Google exports may wrap rich text inside a hyperlink's `text` property.
// Reading cell.text also fails for ExcelJS merges whose master is empty.
function valueText(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  if (typeof value === 'object') {
    if ('richText' in value && Array.isArray(value.richText))
      return value.richText.map(valueText).join('')
    if ('text' in value) return valueText(value.text)
  }
  throw new Error('Непідтримуваний тип клітинки розкладу.')
}

const cellText = (cell: ExcelJS.Cell) => valueText(cell.master.value)

const normalizeDay = (text: string) =>
  normalizeText(text)
    .replace(/[’ʼ`]/g, "'")
    .toLowerCase()

export function safeMeetingUrl(value: string): string | null {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password) return null
    return url.href
  } catch {
    return null
  }
}

// Bare meeting URLs also occur in the exported rich text.
const URL_TOKEN_RE = /https?:\/\/\S+|\b(?:[a-z\d-]+\.)+[a-z]{2,}\/\S+/gi

const STANDARD_STARTS = ['08:00', '09:35', '11:10', '12:45', '14:15', '15:45', '17:15', '18:45']
const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3))
const clockTime = (value: number) =>
  `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`

function lessonPrefix(text: string, address: string) {
  let subject = text
  let cancelled = false
  let online = false
  let starts: string[] = []
  for (;;) {
    const marker = subject.match(/^(нб|дистанційно)\s+/i)
    if (marker) {
      if (marker[1].toLowerCase() === 'нб') cancelled = true
      else online = true
      subject = subject.slice(marker[0].length)
      continue
    }
    const time = subject.match(/^(\d{1,2}[.:]\d{2}(?:\s+та\s+\d{1,2}[.:]\d{2})*)(?:\s+год\.?)?\s+/i)
    if (!time) break
    if (starts.length) throw new Error(`Клітинка ${address}: неоднозначний час заняття.`)
    starts = time[1].split(/\s+та\s+/).map((value) => {
      const [hour, minute] = value.split(/[.:]/).map(Number)
      if (hour > 23 || minute > 59) throw new Error(`Клітинка ${address}: некоректний час заняття.`)
      return clockTime(hour * 60 + minute)
    })
    subject = subject.slice(time[0].length)
  }
  if (new Set(starts).size !== starts.length)
    throw new Error(`Клітинка ${address}: повторюваний час заняття.`)
  return { subject, cancelled, online, starts }
}

function normalizedMeetingUrl(value: string) {
  const candidate = /^https?:\/\/\S+$/i.test(value)
    ? value.replace(/^http:/i, 'https:')
    : `https://${value}`
  return safeMeetingUrl(candidate)
}

function parseLesson(text: string, hyperlink: string | undefined, address: string) {
  const raw = normalizeText(text)
  const urlTokens = [...raw.matchAll(URL_TOKEN_RE)].map((match) => match[0])
  const withoutUrls = normalizeText(raw.replace(URL_TOKEN_RE, ''))
  const teachers = [
    ...withoutUrls.matchAll(
      /[А-ЯІЇЄҐ][а-яіїєґ’'ʼ-]+(?:\s*[-–]\s*[А-ЯІЇЄҐ][а-яіїєґ’'ʼ-]+)?\s+[А-ЯІЇЄҐ]\.\s*[А-ЯІЇЄҐ]\./g
    ),
  ]
  if (teachers.length !== 1) throw new Error(`Клітинка ${address}: не вдалося визначити викладача.`)
  const teacherMatch = teachers[0]
  const teacher = normalizeText(teacherMatch[0]).replace(/\.\s+/g, '.')
  const prefix = lessonPrefix(
    normalizeText(
      withoutUrls
        .slice(0, teacherMatch.index)
        .replace(/(?:доц\.|проф\.|ст\.?\s*в\.|асист\.|в\.)\s*$/i, '')
    ),
    address
  )
  const { subject, starts, cancelled } = prefix
  // Use the written URL, falling back to the hyperlink target for labelled links.
  const link = urlTokens[0] ?? hyperlink
  const meetingUrl = cancelled || !link ? null : normalizedMeetingUrl(link)
  if (link && !cancelled && !meetingUrl)
    throw new Error(`Клітинка ${address}: некоректне посилання на заняття.`)
  const suffix = normalizeText(
    withoutUrls.slice((teacherMatch.index ?? 0) + teacherMatch[0].length)
  )
  // Some course sheets prefix rooms with “аудиторія”, others contain only
  // the room code (for example, `... Шроль Т.С. 107`).
  const room = suffix.replace(/^аудиторія\s+/i, '') || null
  const online = prefix.online || Boolean(link)
  if (!subject) throw new Error(`Клітинка ${address}: не визначено дисципліну.`)
  return {
    subject,
    teacher,
    room,
    online,
    meetingUrl,
    starts,
    ...(cancelled ? { cancelled: true } : {}),
  }
}

export async function parseSchedule(buffer: Buffer, source: ScheduleSource): Promise<ScheduleData> {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(buffer as unknown as ExcelJS.Buffer)
  const sheet = workbook.worksheets[0]
  if (!sheet) throw new Error('Не знайдено аркуш розкладу.')
  const title = normalizeText(cellText(sheet.getCell('A1')))
  const date = title.match(/з\s+(\d{2})\.(\d{2})\.(\d{4})/)
  if (!date) throw new Error('Не розпізнано дату початку розкладу.')
  const effectiveFrom = `${date[3]}-${date[2]}-${date[1]}`
  if (
    Number.isNaN(Date.parse(effectiveFrom)) ||
    new Date(effectiveFrom).toISOString().slice(0, 10) !== effectiveFrom
  )
    throw new Error('Некоректна дата початку розкладу.')
  // Template: A = day, B = lesson number, C = time; headers are rows 2 and 3.
  const columns: { column: number; group: string; subgroup: number }[] = []
  for (let column = 4; column <= sheet.columnCount; column++) {
    const group = normalizeText(cellText(sheet.getCell(2, column)))
    if (!group) continue
    const subgroup = Number(cellText(sheet.getCell(3, column)).match(/^[12]/)?.[0])
    if (!subgroup) throw new Error(`Колонка ${column}: не визначено підгрупу.`)
    columns.push({ column, group, subgroup })
  }
  if (!columns.length) throw new Error('Не знайдено групи розкладу.')
  const groups = [...new Set(columns.map(({ group }) => group))]
  const lessons = new Map<string, ScheduleLesson>()
  for (let row = 4; row <= sheet.rowCount; row++) {
    const rowCells = columns.map(({ column }) => sheet.getCell(row, column))
    const populated = rowCells.some((cell) => normalizeText(cellText(cell)))
    const day =
      SCHEDULE_DAYS.findIndex(
        (name) => normalizeDay(name) === normalizeDay(cellText(sheet.getCell(row, 1)))
      ) + 1
    if (!day || !populated) continue
    const slot = Number(sheet.getCell(row, 2).value)
    const rowTime = normalizeText(cellText(sheet.getCell(row, 3)))
    const standardStart =
      source.key === 'bachelor-4' && day === 6 && slot >= 1 && slot <= 4
        ? STANDARD_STARTS[slot - 1]
        : null
    const time = (
      rowTime ||
      (standardStart ? `${standardStart} - ${clockTime(minutes(standardStart) + 80)}` : '')
    ).match(/^(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})$/)
    if (!Number.isInteger(slot) || slot < 1 || !time)
      throw new Error(`Рядок ${row}: некоректний час або номер пари.`)
    const start = `${time[1].padStart(2, '0')}:${time[2]}`
    const end = `${time[3].padStart(2, '0')}:${time[4]}`
    if (
      [time[1], time[3]].some((hour) => Number(hour) > 23) ||
      [time[2], time[4]].some((minute) => Number(minute) > 59) ||
      start >= end
    )
      throw new Error(`Рядок ${row}: некоректний інтервал часу.`)
    for (const { column, group, subgroup } of columns) {
      const cell = sheet.getCell(row, column)
      if (!normalizeText(cellText(cell))) continue
      if (Number(cell.master.row) !== row)
        throw new Error(`Клітинка ${cell.address}: непідтримуване об'єднання між парами.`)
      const { starts, ...details } = parseLesson(
        cellText(cell),
        cell.hyperlink,
        cell.master.address
      )
      // The row supplies duration; a time written in the cell overrides its start.
      for (const lessonStart of starts.length ? starts : [start]) {
        const lessonEnd = clockTime(minutes(lessonStart) + minutes(end) - minutes(start))
        if (minutes(lessonEnd) >= 24 * 60)
          throw new Error(`Клітинка ${cell.address}: заняття виходить за межі дня.`)
        const lessonSlot = starts.length ? STANDARD_STARTS.indexOf(lessonStart) + 1 : slot
        const key = JSON.stringify([day, lessonSlot, lessonStart, lessonEnd, details])
        let lesson = lessons.get(key)
        if (!lesson) {
          lesson = {
            id: `${cell.master.address}-${lessonStart}`,
            day,
            slot: lessonSlot,
            start: lessonStart,
            end: lessonEnd,
            ...details,
            audiences: [],
          }
          lessons.set(key, lesson)
        }
        let audience = lesson.audiences.find((item) => item.group === group)
        if (!audience) {
          audience = { group, subgroups: [] }
          lesson.audiences.push(audience)
        }
        if (!audience.subgroups.includes(subgroup)) audience.subgroups.push(subgroup)
      }
    }
  }
  return { effectiveFrom, groups, lessons: [...lessons.values()] }
}
