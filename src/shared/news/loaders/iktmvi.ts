import { cacheLife } from 'next/cache'

import { parseIktmviNews } from '../parsers/iktmvi'
import { getParsedNewsPage } from './shared'

import type { ExternalNewsLoader } from './shared'

export const getIktmviNewsPage: ExternalNewsLoader<'iktmvi'> = async (page, options) => {
  'use cache'

  cacheLife('hours')
  return getParsedNewsPage('iktmvi', page, parseIktmviNews, options)
}
