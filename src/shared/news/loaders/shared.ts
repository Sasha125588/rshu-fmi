import { NEWS_REVALIDATE_SECONDS, NEWS_SOURCE_CONFIG } from '../config'
import { ExternalNewsError } from '../errors'

import type { ExternalNewsBySource, ExternalNewsSource } from '../types'

export interface GetNewsPageOptions {
  limit?: number
  includeImages?: boolean
}

export type ExternalNewsLoader<S extends ExternalNewsSource> = (
  page: number,
  options?: GetNewsPageOptions
) => Promise<ExternalNewsBySource[S][]>

export const getParsedNewsPage = async <S extends ExternalNewsSource>(
  source: S,
  page: number,
  parser: (html: string) => ExternalNewsBySource[S][],
  options: GetNewsPageOptions = {}
) => {
  const html = await fetchNewsDocument(
    source,
    NEWS_SOURCE_CONFIG[source].getPageUrl(page),
    `News fetch failed: ${source} page ${page}`
  )
  const news = parser(html)

  return options.limit ? news.slice(0, options.limit) : news
}

export const fetchNewsDocument = async (
  source: ExternalNewsSource,
  url: string,
  context: string
) => {
  try {
    const response = await fetch(url, {
      next: { revalidate: NEWS_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8_000),
    })

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
