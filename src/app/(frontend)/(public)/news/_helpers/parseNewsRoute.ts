import { EXTERNAL_NEWS_SOURCES, NEWS_SOURCE_CONFIG } from '@/shared/news'

import type { ExternalNewsSource, NewsSource } from '@/shared/news'
import type { Route } from 'next'

const isExternalNewsSource = (source: string): source is ExternalNewsSource =>
  EXTERNAL_NEWS_SOURCES.some((candidate) => candidate === source)

export const parseNewsRoute = (source: string, page: number) => {
  if (!isExternalNewsSource(source) || !Number.isSafeInteger(page) || page < 1) return null

  const config = NEWS_SOURCE_CONFIG[source]
  if ('pageCount' in config && page > config.pageCount) return null

  return { source, page }
}

export const buildNewsHref = (source: NewsSource, page = 1) =>
  (page === 1 ? `/news/${source}` : `/news/${source}/page/${page}`) as Route
