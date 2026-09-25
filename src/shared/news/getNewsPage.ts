import { cacheLife } from 'next/cache'

import { getExternalNewsErrorDetails } from './errors'
import { getIktmviNewsPage } from './loaders/iktmvi'
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
}

export const getNewsPage = async <S extends ExternalNewsSource>(
  source: S,
  page: number,
  options: GetNewsPageOptions = {}
): Promise<ExternalNewsPageResult<S>> => {
  'use cache'

  try {
    const news = addNewsTags(await loaders[source](page, options))
    cacheLife('hours')

    return {
      source,
      status: 'fulfilled',
      news,
    }
  } catch (error) {
    cacheLife('minutes')

    return {
      source,
      status: 'rejected',
      error: getExternalNewsErrorDetails(error, source),
    }
  }
}

export type ExternalNewsPageResult<S extends ExternalNewsSource = ExternalNewsSource> =
  | {
      source: S
      status: 'fulfilled'
      news: ExternalNewsItem<S>[]
    }
  | {
      source: S
      status: 'rejected'
      error: ExternalNewsErrorDetails
    }
