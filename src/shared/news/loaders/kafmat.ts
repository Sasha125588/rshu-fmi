import { cacheLife } from 'next/cache'

import { NEWS_SOURCE_CONFIG } from '../config'
import { ExternalNewsError, getExternalNewsErrorDetails } from '../errors'
import { parseKafmatNews } from '../parsers/kafmat'
import { fetchNewsDocument } from './shared'

import type { ExternalNewsLoader } from './shared'

const { archiveUrl, pageSize } = NEWS_SOURCE_CONFIG.kafmat

const fetchKafmatArchive = async () => {
  const news = parseKafmatNews(
    await fetchNewsDocument('kafmat', archiveUrl, 'Kafmat archive fetch failed', {
      cache: 'no-store',
    })
  )
  if (!news.length) throw new ExternalNewsError({ kind: 'parse', source: 'kafmat' })

  return news
}

const getKafmatArchive = async () => {
  'use cache'

  try {
    const archive = await fetchKafmatArchive()
    cacheLife('hours')
    return { archive }
  } catch (error) {
    cacheLife('minutes')
    return { error: getExternalNewsErrorDetails(error, 'kafmat') }
  }
}

const getRecentKafmatArchive = async () => {
  'use cache'

  // The archive text can be cached for longer than Google's photo URLs.
  cacheLife({ revalidate: 30, expire: 60 })
  return fetchKafmatArchive()
}

export const getKafmatCoverUrl = async (id: string, refresh = false) => {
  const news = await (refresh ? fetchKafmatArchive() : getRecentKafmatArchive())
  return news.find((item) => item.link === `${archiveUrl}#${id}`)?.previewImage
}

export const getKafmatNewsPage: ExternalNewsLoader<'kafmat'> = async (page, options) => {
  const result = await getKafmatArchive()
  if (result.error) throw new ExternalNewsError(result.error)

  const offset = (page - 1) * pageSize
  const limit = Math.min(options?.limit ?? pageSize, pageSize)

  return {
    news: result.archive.slice(offset, offset + limit).map((item) => {
      if (!item.previewImage) return item

      const id = new URL(item.link).hash.slice(1)
      return { ...item, previewImage: `/news/kafmat/cover/${id}` }
    }),
    pageCount: Math.ceil(result.archive.length / pageSize),
  }
}
