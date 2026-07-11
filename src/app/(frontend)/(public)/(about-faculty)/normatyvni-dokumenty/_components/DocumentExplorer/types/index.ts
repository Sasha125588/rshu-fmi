export type DocumentSource = 'faculty' | 'university'

export interface DocumentCategory {
  slug: string
  sortOrder: number
  title: string
}

export interface CatalogDocument {
  category: DocumentCategory
  date?: string
  id: number
  source: DocumentSource
  title: string
  url: string
  type: 'PDF' | 'WEB'
}
