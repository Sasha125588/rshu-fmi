import { PAGE_COUNTS } from './config'
import { NEWS_SOURCES } from './types'

import type { NewsSource } from './types'
import type { Route } from 'next'

export const parseNewsRoute = (source: NewsSource, page: number) => {
  if (!NEWS_SOURCES.includes(source)) return null

  if (!Number.isInteger(page) || page < 1 || page > PAGE_COUNTS[source]) return null

  return { source, page }
}

export const getNewsArchiveHref = (source: NewsSource, page = 1) =>
  (page === 1 ? `/news/${source}` : `/news/${source}/page/${page}`) as Route
