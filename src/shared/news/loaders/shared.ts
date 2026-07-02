import { NEWS_REVALIDATE_SECONDS, NEWS_SOURCE_CONFIG } from '../config'

import type { NewsSource, ParsedNews } from '../types'

export interface GetNewsPageOptions {
  limit?: number
  includeImages?: boolean
}

export type NewsLoader<S extends NewsSource> = (
  page: number,
  options?: GetNewsPageOptions
) => Promise<ParsedNews[S][]>

export const getParsedNewsPage = async <S extends NewsSource>(
  source: S,
  page: number,
  parser: (html: string) => ParsedNews[S][],
  options: GetNewsPageOptions = {}
) => {
  const html = await fetchNewsDocument(
    NEWS_SOURCE_CONFIG[source].getPageUrl(page),
    `News fetch failed: ${source} page ${page}`
  )
  const news = parser(html)

  return options.limit ? news.slice(0, options.limit) : news
}

export const fetchNewsDocument = async (url: string, errorMsg: string) => {
  const response = await fetch(url, {
    next: { revalidate: NEWS_REVALIDATE_SECONDS },
  })

  if (!response.ok) {
    throw new Error(`${errorMsg} (${response.status})`)
  }

  return response.text()
}
