import { kyivTimeFormatter, scheduleCollator } from '@/lib'

import type { ScheduleData, ScheduleLesson, ScheduleMode } from '@/shared/schedule/types'

export const scheduleOptions = (schedule: ScheduleData, mode: ScheduleMode) => {
  if (mode === 'group') return schedule.groups

  const rawOptions = schedule.lessons.flatMap((lesson) => {
    if (mode === 'teacher') return lesson.teacher ? [lesson.teacher] : []
    if (mode === 'room') return lesson.room ? [lesson.room] : []
    return []
  })

  return [...new Set(rawOptions)].sort(scheduleCollator.compare)
}

export const selectLessons = (
  schedule: ScheduleData,
  mode: ScheduleMode,
  selected: string,
  subgroup = 'all'
) =>
  schedule.lessons
    .filter((lesson) => {
      if (mode === 'teacher') return lesson.teacher === selected
      if (mode === 'room') return lesson.room === selected
      return lesson.audiences.some(
        (audience) =>
          audience.group === selected &&
          (subgroup === 'all' || audience.subgroups.includes(+subgroup))
      )
    })
    .sort((a, b) => a.start.localeCompare(b.start))

const WEEKDAY_NUMBER = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
} as const

export interface KyivNow {
  date: string
  day: number
  time: string
  epochMs: number
}

export interface KyivDateTime {
  date: string
  day: number
  time: string
}

export const getKyivNow = (epochMs: number): KyivNow => {
  const parts = Object.fromEntries(
    kyivTimeFormatter.formatToParts(new Date(epochMs)).map(({ type, value }) => [type, value])
  )
  const day = WEEKDAY_NUMBER[parts.weekday as keyof typeof WEEKDAY_NUMBER]

  if (!day) throw new RangeError('Не вдалося визначити день тижня для Europe/Kyiv.')

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    day,
    time: `${parts.hour}:${parts.minute}`,
    epochMs,
  }
}

export const isScheduleStale = (syncedAt: string | null, nowMs: number) =>
  !syncedAt || nowMs - Date.parse(syncedAt) > 60 * 60 * 1000

export const isCurrentLesson = (lesson: ScheduleLesson, now: KyivDateTime, effectiveFrom: string) =>
  !lesson.cancelled &&
  now.date >= effectiveFrom &&
  now.day === lesson.day &&
  now.time >= lesson.start &&
  now.time < lesson.end

export const roomLabel = (room: string | null) =>
  room?.startsWith('гуртожиток') ? room : `Ауд. ${room ?? 'не зазначено'}`

export const audienceLabel = (lesson: ScheduleLesson) =>
  lesson.audiences
    .map(
      ({ group, subgroups }) =>
        `${group}${subgroups.length === 1 ? ` · підгр. ${subgroups[0]}` : ''}`
    )
    .join(', ')
