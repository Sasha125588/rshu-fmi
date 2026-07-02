import { getIktmviNewsPage } from './loaders/iktmvi'
import { getKitmNewsPage } from './loaders/kitm'
import { getUniversityNewsPage } from './loaders/university'
import { addNewsTags } from './tags'

import type { GetNewsPageOptions, NewsLoader } from './loaders/shared'
import type { NewsSource } from './types'

export type NewsLoaders = {
  [S in NewsSource]: NewsLoader<S>
}

const loaders: NewsLoaders = {
  university: getUniversityNewsPage,
  kitm: getKitmNewsPage,
  iktmvi: getIktmviNewsPage,
}

export const getNewsPage = async <S extends NewsSource>(
  source: S,
  page: number,
  options: GetNewsPageOptions = {}
) => addNewsTags(await loaders[source](page, options))
