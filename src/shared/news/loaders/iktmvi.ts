import { parseIktmviNews } from '../parsers/iktmvi'
import { getParsedNewsPage } from './shared'

import type { ExternalNewsLoader } from './shared'

export const getIktmviNewsPage: ExternalNewsLoader<'iktmvi'> = async (page, options) => {
  return getParsedNewsPage('iktmvi', page, parseIktmviNews, options)
}
