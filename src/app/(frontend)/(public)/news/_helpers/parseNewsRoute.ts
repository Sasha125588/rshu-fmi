import { EXTERNAL_NEWS_SOURCES, NEWS_SOURCE_CONFIG } from '@/shared/news'

import type { ExternalNewsSource, NewsSource } from '@/shared/news'
import type { Route } from 'next'

const isExternalNewsSource = (source: string): source is ExternalNewsSource =>
  EXTERNAL_NEWS_SOURCES.some((candidate) => candidate === source)

export const parseNewsRoute = (source: string, page: number) => {
  if (!isExternalNewsSource(source)) return null

  if (!Number.isInteger(page) || page < 1 || page > NEWS_SOURCE_CONFIG[source].pageCount)
    return null

  return { source, page }
}

export const buildNewsHref = (source: NewsSource, page = 1) =>
  (page === 1 ? `/news/${source}` : `/news/${source}/page/${page}`) as Route
