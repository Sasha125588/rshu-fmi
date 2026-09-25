import { EXTERNAL_NEWS_SOURCES, getNewsPage } from '@/shared/news'

export const getNewsOverview = async () => {
  const results = await Promise.all(
    EXTERNAL_NEWS_SOURCES.map((source) => getNewsPage(source, 1, { limit: 4, includeImages: true }))
  )

  return results
}
