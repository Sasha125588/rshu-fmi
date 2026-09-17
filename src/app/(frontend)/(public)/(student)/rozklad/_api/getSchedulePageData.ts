import { cache } from 'react'

import { getScheduleBySourceKey } from './getScheduleBySourceKey'
import { scheduleDateFormatter } from '@/lib/formatters'
import {
  DEFAULT_SCHEDULE_SOURCE,
  SCHEDULE_REFRESH_MS,
  getScheduleSource,
  scheduleSourceUrl,
} from '@/shared/schedule/config'

export const getSchedulePageData = cache(
  async (searchParams: PageProps<'/rozklad'>['searchParams']) => {
    const requestedSource = (await searchParams).source as string
    const source = getScheduleSource(requestedSource) ?? DEFAULT_SCHEDULE_SOURCE

    const { schedule, syncedAt, unavailable } = await getScheduleBySourceKey(source.key)

    return {
      schedule,
      source,
      sourceUrl: scheduleSourceUrl(source.spreadsheetId),
      stale: !syncedAt || Date.now() - Date.parse(syncedAt) > SCHEDULE_REFRESH_MS * 2,
      unavailable,
      updated: syncedAt ? scheduleDateFormatter.format(new Date(syncedAt)) : null,
    }
  }
)
