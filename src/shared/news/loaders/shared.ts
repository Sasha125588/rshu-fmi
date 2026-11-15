import { NEWS_SOURCE_CONFIG } from '../config'
import { ExternalNewsError } from '../errors'

import type {
  ExternalNewsBySource,
  ExternalNewsSource,
  UpstreamPaginatedNewsSource,
} from '../types'

export interface GetNewsPageOptions {
  limit?: number
  includeImages?: boolean
}

interface LoadedNewsPage<S extends ExternalNewsSource> {
  news: ExternalNewsBySource[S][]
  pageCount: number
}

export type ExternalNewsLoader<S extends ExternalNewsSource> = (
  page: number,
  options?: GetNewsPageOptions
) => Promise<LoadedNewsPage<S>>

export const getParsedNewsPage = async <S extends UpstreamPaginatedNewsSource>(
  source: S,
  page: number,
  parser: (html: string) => ExternalNewsBySource[S][],
  options: GetNewsPageOptions = {}
) => {
  const { getPageUrl, pageCount } = NEWS_SOURCE_CONFIG[source]
  const html = await fetchNewsDocument(
    source,
    getPageUrl(page),
    `News fetch failed: ${source} page ${page}`
  )
  const news = parser(html)

  return { news: options.limit ? news.slice(0, options.limit) : news, pageCount }
}

export const fetchNewsDocument = async (
  source: ExternalNewsSource,
  url: string,
  context: string,
  options: Pick<RequestInit, 'cache'> = {}
) => {
  try {
    const response = await fetch(url, { ...options, signal: AbortSignal.timeout(16_000) })

    if (!response.ok) {
      throw new ExternalNewsError({
        context,
        kind: 'fetch',
        source,
        status: response.status,
      })
    }

    return await response.text()
  } catch (error) {
    if (error instanceof ExternalNewsError) throw error

    if (
      error instanceof DOMException &&
      (error.name === 'AbortError' || error.name === 'TimeoutError')
    ) {
      throw new ExternalNewsError({
        cause: error,
        context,
        kind: 'timeout',
        source,
      })
    }

    throw new ExternalNewsError({
      cause: error,
      context,
      kind: 'fetch',
      source,
    })
  }
}
