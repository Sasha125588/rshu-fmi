import { parseIktmviNews } from '../parsers/iktmvi'
import { getParsedNewsPage } from './shared'

import type { ExternalNewsLoader } from './shared'

export const getIktmviNewsPage: ExternalNewsLoader<'iktmvi'> = (page, options) =>
  getParsedNewsPage('iktmvi', page, parseIktmviNews, options)
