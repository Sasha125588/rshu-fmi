import { getNewsPage } from '@/shared/news'
import { NEWS_SOURCES } from '@/shared/news/types'

import type { NewsOverviewResult } from '../_types'

export const getNewsOverview = async () =>
  Promise.all(
    NEWS_SOURCES.map(async (source): Promise<NewsOverviewResult> => {
      try {
        return {
          source,
          status: 'fulfilled',
          news: await getNewsPage(source, 1, { limit: 4, includeImages: true }),
        }
      } catch (error) {
        return {
          source,
          status: 'rejected',
          error: error instanceof Error ? error : new Error('Unknown news source error'),
        }
      }
    })
  )
