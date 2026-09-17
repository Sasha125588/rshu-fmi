import { scheduleExportUrl } from './config'
import { parseSchedule } from './parser'
import { findSchedule } from './storage'

import type { ScheduleSource } from './config'
import type { ScheduleData } from './types'
import type { Payload } from 'payload'

export async function downloadSchedule(source: ScheduleSource, fetcher: typeof fetch = fetch) {
  const response = await fetcher(scheduleExportUrl(source.spreadsheetId), {
    cache: 'no-store',
    signal: AbortSignal.timeout(20_000),
  })
  if (!response.ok) throw new Error(`Google повернув HTTP ${response.status}.`)

  return Buffer.from(await response.arrayBuffer())
}

export async function syncSchedule(payload: Payload, source: ScheduleSource) {
  const doc =
    (await findSchedule(payload, source.key)) ??
    (await payload.create({
      collection: 'schedules',
      overrideAccess: true,
      data: { sourceKey: source.key },
    }))

  let snapshot: ScheduleData

  try {
    snapshot = await parseSchedule(await downloadSchedule(source), source)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Невідома помилка імпорту.'

    await payload.update({
      collection: 'schedules',
      id: doc.id,
      overrideAccess: true,
      data: { lastError: message },
    })

    payload.logger.error({ msg: 'Schedule import failed', source: source.key, error: message })
    return { status: 'error' as const }
  }

  await payload.update({
    collection: 'schedules',
    id: doc.id,
    overrideAccess: true,
    data: { snapshot: { ...snapshot }, syncedAt: new Date().toISOString(), lastError: null },
  })

  return { status: 'success' as const, lessons: snapshot.lessons.length }
}
