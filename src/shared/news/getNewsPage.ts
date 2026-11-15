import { cacheLife } from 'next/cache'

import { getExternalNewsErrorDetails } from './errors'
import { getIktmviNewsPage } from './loaders/iktmvi'
import { getKafmatNewsPage } from './loaders/kafmat'
import { getKitmNewsPage } from './loaders/kitm'
import { getUniversityNewsPage } from './loaders/university'
import { addNewsTags } from './tags'

import type { ExternalNewsErrorDetails } from './errors'
import type { ExternalNewsLoader, GetNewsPageOptions } from './loaders/shared'
import type { ExternalNewsItem, ExternalNewsSource } from './types'

const loaders: { [S in ExternalNewsSource]: ExternalNewsLoader<S> } = {
  university: getUniversityNewsPage,
  kitm: getKitmNewsPage,
  iktmvi: getIktmviNewsPage,
  kafmat: getKafmatNewsPage,
}

const loadNewsPage = async <S extends ExternalNewsSource>(
  source: S,
  page: number,
  options: GetNewsPageOptions
): Promise<ExternalNewsPageResult<S>> => {
  try {
    const { news, pageCount } = await loaders[source](page, options)

    return {
      source,
      status: 'fulfilled',
      news: addNewsTags(news),
      pageCount,
    }
  } catch (error) {
    return {
      source,
      status: 'rejected',
      error: getExternalNewsErrorDetails(error, source),
    }
  }
}

const getCachedNewsPage = async <S extends ExternalNewsSource>(
  source: S,
  page: number,
  options: GetNewsPageOptions
) => {
  'use cache'

  const result = await loadNewsPage(source, page, options)
  if (result.status === 'fulfilled') cacheLife('hours')
  else cacheLife('minutes')
  return result
}

export const getNewsPage = <S extends ExternalNewsSource>(
  source: S,
  page: number,
  options: GetNewsPageOptions = {}
) =>
  // Kafmat already caches the full list before slicing it into pages.
  source === 'kafmat'
    ? loadNewsPage(source, page, options)
    : getCachedNewsPage(source, page, options)

export type ExternalNewsPageResult<S extends ExternalNewsSource = ExternalNewsSource> =
  | {
      source: S
      status: 'fulfilled'
      news: ExternalNewsItem<S>[]
      pageCount: number
    }
  | {
      source: S
      status: 'rejected'
      error: ExternalNewsErrorDetails
    }
