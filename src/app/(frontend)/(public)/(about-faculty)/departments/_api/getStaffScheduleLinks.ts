import { getScheduleBySourceKey } from '../../../(student)/rozklad/_api/getScheduleBySourceKey'
import { serializeScheduleSearchParams } from '../../../(student)/rozklad/_constants'
import { SCHEDULE_SOURCES } from '@/shared/schedule/config'

import type { Department } from '@/payload-types'
import type { Route } from 'next'

const normalizeName = (name: string) =>
  name.toLocaleLowerCase('uk-UA').replace(/[\s.]/g, '').replace(/[’ʼ]/g, "'")

export const getStaffScheduleLinks = async (staff: NonNullable<Department['staff']>) => {
  const links = new Map<string, Route>()
  if (!staff.length) return links

  const schedules = await Promise.all(
    SCHEDULE_SOURCES.map(async ({ key }) => ({
      key,
      ...(await getScheduleBySourceKey(key)),
    }))
  )
  const teachersByCourse = schedules.map(({ key, schedule }) => ({
    key,
    teachers: new Set(
      schedule?.lessons.filter(({ cancelled }) => !cancelled).map(({ teacher }) => teacher)
    ),
  }))

  for (const person of staff) {
    if (person.role === 'assistant' || person.role === 'other') continue

    const [surname, ...givenNames] = person.name.trim().split(/\s+/)
    const keys = new Set(
      [
        person.scheduleName || person.name,
        person.scheduleName || surname + givenNames.map((name) => name[0]).join(''),
      ].map(normalizeName)
    )

    for (const { key, teachers } of teachersByCourse) {
      const matches = Array.from(teachers).filter((teacher) => keys.has(normalizeName(teacher)))
      if (matches.length !== 1) continue

      links.set(
        person.name,
        serializeScheduleSearchParams(`/rozklad/${key}`, {
          mode: 'teacher',
          selected: matches[0],
        }) as Route
      )
      break
    }
  }

  return links
}
