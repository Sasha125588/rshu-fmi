import { getIktmviNewsPage } from './loaders/iktmvi'
import { getKitmNewsPage } from './loaders/kitm'
import { getUniversityNewsPage } from './loaders/university'
import { addNewsTags } from './tags'

import type { GetNewsPageOptions } from './loaders/shared'
import type { ExternalNewsSource } from './types'

const loaders = {
  university: getUniversityNewsPage,
  kitm: getKitmNewsPage,
  iktmvi: getIktmviNewsPage,
}

export const getNewsPage = async <S extends ExternalNewsSource>(
  source: S,
  page: number,
  options: GetNewsPageOptions = {}
) => addNewsTags(await loaders[source](page, options))
