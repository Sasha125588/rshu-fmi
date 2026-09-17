import { scheduleCollator } from '@/lib'

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

export const kyivNow = (instant: Temporal.Instant = Temporal.Now.instant()) => {
  const zdt = instant.toZonedDateTimeISO('Europe/Kyiv')

  return {
    date: zdt.toPlainDate().toString(), // "YYYY-MM-DD"
    day: zdt.dayOfWeek, // 1 (Mon) - 7 (Sun)
    time: zdt.toPlainTime().toString({ smallestUnit: 'minute' }), // "HH:MM"
  }
}

export type KyivNow = ReturnType<typeof kyivNow>

export const isCurrentLesson = (lesson: ScheduleLesson, now: KyivNow, effectiveFrom: string) =>
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
