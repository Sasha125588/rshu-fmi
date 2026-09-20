import { createSerializer, parseAsString, parseAsStringLiteral } from 'nuqs'

export const SCHEDULE_DAY_VALUES = ['1', '2', '3', '4', '5', '6', '7'] as const

export const scheduleSearchParams = {
  mode: parseAsStringLiteral(['group', 'teacher', 'room']).withDefault('group'),
  selected: parseAsString.withDefault(''),
  view: parseAsStringLiteral(['day', 'week']).withDefault('day'),
  day: parseAsStringLiteral(['today', ...SCHEDULE_DAY_VALUES]).withDefault('today'),
  subgroup: parseAsStringLiteral(['all', '1', '2']).withDefault('all'),
}

export const serializeScheduleSearchParams = createSerializer(scheduleSearchParams)
