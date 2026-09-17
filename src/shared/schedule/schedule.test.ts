import { Temporal } from '@js-temporal/polyfill'
import { expect, test } from 'bun:test'
import ExcelJS from 'exceljs'
import { readFile } from 'node:fs/promises'

import { SCHEDULE_SOURCES, DEFAULT_SCHEDULE_SOURCE as source } from './config'
import { parseSchedule, safeMeetingUrl } from './parser'
import { downloadSchedule, syncSchedule } from './sync'
import {
  isCurrentLesson,
  kyivNow,
  roomLabel,
  scheduleOptions,
  selectLessons,
} from '@/app/(frontend)/(public)/(student)/rozklad/_helpers'
import { isCronAuthorized, scheduleEndpoints } from '@/payload/collections/Schedules/endpoints'

import type { Schedule } from '@/payload-types'
import type { Payload, PayloadRequest } from 'payload'

const fixture = (key = 'bachelor-1') =>
  readFile(new URL(`./__fixtures__/${key.replace('bachelor-', 'course-')}.xlsx`, import.meta.url))

const courseFixture = async (key: string) =>
  parseSchedule(
    await fixture(key),
    SCHEDULE_SOURCES.find((item) => item.key === key)!
  )

async function altered(change: (sheet: ExcelJS.Worksheet) => void) {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load((await fixture()) as unknown as ExcelJS.Buffer)
  change(workbook.worksheets[0])
  return parseSchedule(Buffer.from(await workbook.xlsx.writeBuffer()), source)
}

test('all six real workbooks retain lesson counts and groups discovered from headers', async () => {
  const expected = [
    [45, ['М-11', 'ІПЗ-11', 'КН-11', 'І-11', 'ЦТ-11']],
    [53, ['М-21', 'ІПЗ-21', 'КН-21', 'І-21', 'ЦТ-21']],
    [46, ['М-31', 'ІПЗ-31', 'КН-31', 'І-31', 'ЦТ-31']],
    [57, ['М-41', 'ІПЗ-41', 'КН-41', 'І-41', 'ЦТ-41']],
    [28, ['М-М-11', 'М-І-11', 'М-ЦТ-11', 'М-КН-11']],
    [22, ['М-М-21', 'М-І-21', 'М-ЦТ-21', 'М-КН-21']],
  ]
  for (const [index, item] of SCHEDULE_SOURCES.entries()) {
    const data = await courseFixture(item.key)
    expect(data.effectiveFrom).toBe('2026-09-01')
    expect(data.lessons.length).toBe(expected[index][0] as number)
    expect(data.groups).toEqual(expected[index][1] as string[])
    expect(new Set(data.lessons.map((lesson) => lesson.id)).size).toBe(data.lessons.length)
  }
})

test('first course merges shared lectures and preserves subgroup filtering', async () => {
  const data = await courseFixture('bachelor-1')
  const history = data.lessons.filter((lesson) => lesson.subject === 'Історія та культура України')
  expect(history.length).toBe(1)
  expect(history[0].audiences.length).toBe(5)
  expect(history[0].audiences[0].subgroups).toEqual([1, 2])
  expect(scheduleOptions(data, 'teacher').length).toBe(14)
  expect(scheduleOptions(data, 'room').length).toBe(9)
  expect(selectLessons(data, 'group', 'ІПЗ-11').length).toBe(16)

  const split = await altered((sheet) => {
    sheet.unMergeCells('F14:G14')
    sheet.getCell('F14').value = 'Дискретний аналіз доц. Шевцова Н.В. аудиторія 405'
    sheet.getCell('G14').value = null
  })

  expect(
    selectLessons(split, 'group', 'ІПЗ-11', '1').some(
      (lesson) => lesson.day === 3 && lesson.slot === 1
    )
  ).toBeTrue()

  expect(
    selectLessons(split, 'group', 'ІПЗ-11', '2').some(
      (lesson) => lesson.day === 3 && lesson.slot === 1
    )
  ).toBeFalse()
})

test('course-specific cell formats retain times, rooms, online links and cancellations', async () => {
  const second = await courseFixture('bachelor-2')
  expect(second.lessons.some((lesson) => lesson.room === 'гуртожиток 7 (2 поверх)')).toBeTrue()
  expect(roomLabel('гуртожиток 7 (2 поверх)')).toBe('гуртожиток 7 (2 поверх)')

  const psychology = selectLessons(second, 'group', 'І-21').filter(
    (lesson) => lesson.day === 2 && lesson.subject === 'Загальна психологія'
  )
  expect(psychology.map(({ start, end, slot }) => [start, end, slot])).toEqual([
    ['12:45', '14:05', 4],
    ['14:15', '15:35', 5],
  ])

  const third = await courseFixture('bachelor-3')
  const methodology = third.lessons.find(
    (lesson) => lesson.subject === 'Методика навчання математики'
  )!
  expect(methodology.meetingUrl).toBe('https://meet.google.com/och-znme-hgy')
  expect(methodology.teacher).toBe('Павелків О.М.')
  expect(third.lessons.find((lesson) => lesson.subject === 'Програмування мовою java')?.room).toBe(
    '107'
  )

  const fourth = await courseFixture('bachelor-4')
  expect(
    fourth.lessons.filter((lesson) => lesson.day === 6).map(({ start, end }) => [start, end])
  ).toEqual([
    ['08:00', '09:20'],
    ['09:35', '10:55'],
    ['11:10', '12:30'],
    ['12:45', '14:05'],
  ])

  const games = selectLessons(fourth, 'group', 'І-41', '2').find(
    (lesson) => lesson.day === 2 && lesson.subject === "Програмування комп'ютерних ігор"
  )!
  expect(games.start).toBe('14:15')
  expect(games.slot).toBe(5)

  const masters = await courseFixture('master-1')
  expect(
    masters.lessons.some((lesson) => lesson.start === '18:45' && lesson.end === '20:05')
  ).toBeTrue()

  const cancelled = masters.lessons.filter((lesson) => lesson.cancelled)
  expect(cancelled.length).toBe(4)

  for (const lesson of cancelled) {
    expect(lesson.meetingUrl).toBeNull()
    expect(lesson.subject.startsWith('нб')).toBeFalse()
    expect(
      isCurrentLesson(
        lesson,
        { date: '2026-09-16', day: 3, time: lesson.start },
        masters.effectiveFrom
      )
    ).toBeFalse()
  }
})

test('headers can change, groups may be empty, and notes outside the lesson grid are ignored', async () => {
  const data = await altered((sheet) => {
    sheet.getCell('D2').value = 'М-новий'
    for (let row = 4; row <= 37; row++) {
      for (let column = 4; column <= 13; column++) sheet.getCell(row, column).value = null
      if (row >= 29) sheet.getCell(row, 1).value = null
    }
    sheet.getCell('A40').value = 'Примітка деканату'
  })
  expect(data.groups[0]).toBe('М-новий')
  expect(data.lessons).toEqual([])
})

test('written meeting URLs take priority and other HTTPS platforms are accepted', async () => {
  const data = await altered((sheet) => {
    sheet.getCell('D9').value = {
      text: 'дистанційно Парне програмування доц. Шевцова Н.В. https://classroom.example.org/session',
      hyperlink: 'https://teams.microsoft.com/meet/old',
    }
  })
  const lesson = data.lessons.find((item) => item.subject === 'Парне програмування')!
  expect(lesson.meetingUrl).toBe('https://classroom.example.org/session')
  expect(safeMeetingUrl('javascript:alert(1)')).toBeNull()
  expect(safeMeetingUrl('https://user:password@example.org/')).toBeNull()
})

test('a lesson without a room or meeting URL is retained as recorded by the dean’s office', async () => {
  const data = await altered((sheet) => {
    sheet.getCell('D9').value = 'Методика навчання математики проф. Павелків О.М.'
  })
  const lesson = data.lessons.find((item) => item.subject === 'Методика навчання математики')!
  expect(lesson.teacher).toBe('Павелків О.М.')
  expect(lesson.room).toBeNull()
  expect(lesson.meetingUrl).toBeNull()
  expect(lesson.online).toBeFalse()
  expect(roomLabel(lesson.room)).toBe('Ауд. не зазначено')
})

test('invalid files, dates and lesson times still fail instead of overwriting the snapshot', async () => {
  expect(
    downloadSchedule(
      source,
      (async () => new Response('', { status: 503 })) as unknown as typeof fetch
    )
  ).rejects.toThrow(/503/)

  expect(parseSchedule(Buffer.from('<html>Sign in</html>'), source)).rejects.toThrow()

  expect(
    altered((sheet) => {
      sheet.getCell('A1').value = 'Розклад з 31.02.2026 р.'
    })
  ).rejects.toThrow(/дата/)

  expect(
    altered((sheet) => {
      sheet.getCell('C9').value = '25:00 - 26:00'
    })
  ).rejects.toThrow(/інтервал/)

  expect(
    altered((sheet) => {
      sheet.getCell('D9').value = '25.15 год Математика проф. Павелків О.М. аудиторія 107'
    })
  ).rejects.toThrow(/час/)
})

test('Kyiv time, lesson boundaries and start date are respected', async () => {
  expect(kyivNow(Temporal.Instant.from('2026-09-14T05:00:00Z')).time).toBe('08:00')
  expect(kyivNow(Temporal.Instant.from('2026-12-14T06:00:00Z')).time).toBe('08:00')
  expect(kyivNow(Temporal.Instant.from('2026-09-13T21:30:00Z')).day).toBe(1)

  const lesson = (await courseFixture('bachelor-1')).lessons[0]
  expect(
    isCurrentLesson(lesson, { date: '2026-09-14', day: 1, time: '08:00' }, '2026-09-01')
  ).toBeTrue()
  expect(
    isCurrentLesson(lesson, { date: '2026-09-14', day: 1, time: '09:20' }, '2026-09-01')
  ).toBeFalse()
  expect(
    isCurrentLesson(lesson, { date: '2026-08-31', day: 1, time: '08:00' }, '2026-09-01')
  ).toBeFalse()
})

test('sync preserves a good snapshot on failure and replaces it on success without a separate DB client', async () => {
  const snapshot = await courseFixture('bachelor-1')
  let doc = {
    id: 1,
    sourceKey: source.key,
    snapshot,
    syncedAt: '2020-01-01T00:00:00Z',
  } as unknown as Schedule

  const payload = {
    find: async () => ({ docs: [doc] }),
    update: async ({ data }: { data: Partial<Schedule> }) => {
      doc = { ...doc, ...data }
      return doc
    },
    logger: { error: () => {} },
  } as unknown as Payload

  const originalFetch = globalThis.fetch
  try {
    globalThis.fetch = (async () => new Response('', { status: 503 })) as unknown as typeof fetch
    expect((await syncSchedule(payload, source)).status).toBe('error')
    expect(doc.snapshot).toEqual({ ...snapshot })
    expect(doc.syncedAt).toBe('2020-01-01T00:00:00Z')
    expect(doc.lastError?.includes('503')).toBeTrue()

    const buffer = await fixture()
    globalThis.fetch = (async () => new Response(buffer)) as unknown as typeof fetch
    expect((await syncSchedule(payload, source)).status).toBe('success')
    expect(doc.lastError).toBeNull()
    expect(doc.syncedAt).not.toBe('2020-01-01T00:00:00Z')
    expect(doc.snapshot).toEqual({ ...snapshot })
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('first import creates only the requested course', async () => {
  const writes: unknown[] = []
  const payload = {
    find: async ({ where }: { where: { sourceKey: { equals: string } } }) => {
      expect(where.sourceKey.equals).toBe('master-2')
      return { docs: [] }
    },
    create: async ({ data }: { data: unknown }) => {
      writes.push(data)
      return { id: 7 }
    },
    update: async ({ id }: { id: number }) => {
      expect(id).toBe(7)
    },
    logger: { error: () => {} },
  } as unknown as Payload

  const originalFetch = globalThis.fetch
  const buffer = await fixture('master-2')
  try {
    globalThis.fetch = (async () => new Response(buffer)) as unknown as typeof fetch
    expect((await syncSchedule(payload, SCHEDULE_SOURCES[5])).status).toBe('success')
    expect(writes).toEqual([{ sourceKey: 'master-2' }])
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('cron requires a configured secret and manual sync rejects anonymous callers', async () => {
  const previous = process.env.CRON_SECRET
  try {
    delete process.env.CRON_SECRET
    expect(isCronAuthorized(new Headers({ authorization: 'Bearer undefined' }))).toBeFalse()

    process.env.CRON_SECRET = ''
    expect(isCronAuthorized(new Headers())).toBeFalse()

    process.env.CRON_SECRET = 'test-only'
    expect(isCronAuthorized(new Headers({ authorization: 'Bearer test-only' }))).toBeTrue()
    expect(isCronAuthorized(new Headers({ authorization: 'Bearer wrong' }))).toBeFalse()

    const req = {
      url: 'https://example.org/api/schedules/sync?source=bachelor-1',
      headers: new Headers(),
      user: null,
    } as PayloadRequest

    for (const endpoint of scheduleEndpoints) {
      expect((await endpoint.handler(req)).status).toBe(endpoint.method === 'post' ? 403 : 401)
    }
  } finally {
    if (previous === undefined) delete process.env.CRON_SECRET
    else process.env.CRON_SECRET = previous
  }
})
