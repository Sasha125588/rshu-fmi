import { expect, test } from 'bun:test'

import { isScheduleStale, shouldSyncSchedule } from './refresh'

test('sync follows Kyiv working hours in summer, winter and on clock-change days', () => {
  for (const [day, offset] of [
    ['2026-07-14', '+03:00'],
    ['2026-12-14', '+02:00'],
    ['2026-03-29', '+03:00'],
    ['2026-10-25', '+02:00'],
  ]) {
    const activeHours: number[] = []
    for (let hour = 0; hour < 24; hour++) {
      const timestamp = Date.parse(`${day}T${String(hour).padStart(2, '0')}:00:00${offset}`)
      if (shouldSyncSchedule(timestamp)) activeHours.push(hour)
    }
    expect(activeHours).toEqual([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21])
  }
})

test('freshness respects evening and overnight pauses and allows imports to finish', () => {
  const cases = [
    ['2026-07-14T17:02:00+03:00', '2026-07-14T18:59:00+03:00', false],
    ['2026-07-14T17:02:00+03:00', '2026-07-14T19:09:59+03:00', false],
    ['2026-07-14T17:02:00+03:00', '2026-07-14T19:10:00+03:00', true],
    ['2026-07-14T19:02:00+03:00', '2026-07-14T20:59:00+03:00', false],
    ['2026-07-14T21:02:00+03:00', '2026-07-15T06:59:00+03:00', false],
    ['2026-07-14T21:02:00+03:00', '2026-07-15T07:09:59+03:00', false],
    ['2026-07-14T21:02:00+03:00', '2026-07-15T07:10:00+03:00', true],
    ['2026-07-15T07:02:00+03:00', '2026-07-15T08:09:59+03:00', false],
    ['2026-07-15T07:02:00+03:00', '2026-07-15T08:10:00+03:00', true],
    ['2026-07-14T19:02:00+03:00', '2026-07-15T02:00:00+03:00', true],
    ['2026-03-28T21:02:00+02:00', '2026-03-29T07:09:59+03:00', false],
    ['2026-03-28T21:02:00+02:00', '2026-03-29T07:10:00+03:00', true],
    ['2026-10-24T21:02:00+03:00', '2026-10-25T07:09:59+02:00', false],
    ['2026-10-24T21:02:00+03:00', '2026-10-25T07:10:00+02:00', true],
  ] as const

  for (const [syncedAt, now, stale] of cases) {
    expect(isScheduleStale(syncedAt, Date.parse(now))).toBe(stale)
  }
  expect(isScheduleStale(null, Date.now())).toBeTrue()
  expect(isScheduleStale('invalid', Date.now())).toBeTrue()
})
