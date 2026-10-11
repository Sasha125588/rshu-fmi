const HOUR_MS = 60 * 60 * 1000
const SYNC_GRACE_MS = 10 * 60 * 1000

const SYNC_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21]
const kyivHourFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Kyiv',
  hour: 'numeric',
  hourCycle: 'h23',
})

export const shouldSyncSchedule = (scheduledTime: number) =>
  SYNC_HOURS.includes(Number(kyivHourFormatter.format(scheduledTime)))

export const isScheduleStale = (syncedAt: string | null, nowMs: number) => {
  const syncedMs = syncedAt ? Date.parse(syncedAt) : Number.NaN
  if (!Number.isFinite(syncedMs) || !Number.isFinite(nowMs)) return true

  // Allow the latest scheduled import to finish before reporting a delay.
  // Walking UTC hours also handles Kyiv's seasonal clock changes.
  let scheduledTime = Math.floor((nowMs - SYNC_GRACE_MS) / HOUR_MS) * HOUR_MS
  while (!shouldSyncSchedule(scheduledTime)) scheduledTime -= HOUR_MS

  return syncedMs < scheduledTime
}
