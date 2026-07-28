import { EXTERNAL_NEWS_SOURCES, getExternalNewsErrorDetails, getNewsPage } from '@/shared/news'

import type { NewsOverviewResult } from '../_types'

export const getNewsOverview = async (): Promise<NewsOverviewResult[]> => {
  const results = await Promise.allSettled(
    EXTERNAL_NEWS_SOURCES.map((source) => getNewsPage(source, 1, { limit: 4, includeImages: true }))
  )

  return results.map((result, index) => {
    const source = EXTERNAL_NEWS_SOURCES[index]

    return result.status === 'fulfilled'
      ? { source, status: 'fulfilled', news: result.value }
      : {
          source,
          status: 'rejected',
          error: getExternalNewsErrorDetails(result.reason, source),
        }
  })
}
