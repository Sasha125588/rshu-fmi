import config from '@payload-config'
import { getPayload } from 'payload'

import { findSchedule } from '@/shared/schedule/storage'

import type { ScheduleData } from '@/shared/schedule/types'

export const getScheduleBySourceKey = async (sourceKey: string) => {
  const payload = await getPayload({ config })
  const doc = await findSchedule(payload, sourceKey)

  return {
    schedule: doc?.snapshot as ScheduleData | null,
    syncedAt: doc?.syncedAt ?? null,
    unavailable: !!doc?.lastError,
  }
}
