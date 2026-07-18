import { documentDateFormatter } from '@/lib'

import type { Document } from '@/payload-types'

export const toCatalogDocument = (document: Document) => {
  const category =
    document.category && typeof document.category === 'object' ? document.category : null
  const file = document.file && typeof document.file === 'object' ? document.file : null
  const url = file?.url ?? document.externalUrl

  if (!category || !document.source || !url) return null

  return {
    id: document.id,
    category: {
      slug: category.slug,
      sortOrder: category.sortOrder ?? 0,
      title: category.title,
    },
    date: document.documentDate
      ? documentDateFormatter.format(new Date(document.documentDate))
      : undefined,
    source: document.source,
    title: document.title,
    url,
    type: url.endsWith('.pdf') ? ('PDF' as const) : ('WEB' as const),
  }
}
