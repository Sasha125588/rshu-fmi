import { parseIktmviNews } from '../parsers/iktmvi'
import { getParsedNewsPage } from './shared'

import type { NewsLoader } from './shared'

export const getIktmviNewsPage: NewsLoader<'iktmvi'> = (page, options) =>
  getParsedNewsPage('iktmvi', page, parseIktmviNews, options)
