import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

import { scheduleCacheTag } from '@/shared/schedule/cache'
import { findSchedule } from '@/shared/schedule/storage'

import type { ScheduleData } from '@/shared/schedule/types'

export const getScheduleBySourceKey = async (sourceKey: string) => {
  'use cache'

  cacheLife({ stale: 300, revalidate: 1800, expire: 3600 })
  cacheTag(scheduleCacheTag(sourceKey))

  const payload = await getPayload({ config })
  const doc = await findSchedule(payload, sourceKey)

  return {
    schedule: doc?.snapshot as ScheduleData | null,
    syncedAt: doc?.syncedAt ?? null,
    unavailable: !!doc?.lastError,
  }
}
