import { parseAsString, parseAsStringLiteral } from 'nuqs'

import type { DocumentCategory } from '../types'

export const DEFAULT_CATEGORY: DocumentCategory = {
  slug: 'all',
  sortOrder: 0,
  title: 'Усі категорії',
}

export const documentSearchParams = {
  q: parseAsString.withDefault(''),
  tab: parseAsStringLiteral(['faculty', 'university', 'all']).withDefault('all'),
  category: parseAsString.withDefault('all'),
}
