import type { NewsTagCode } from '@/payload/collections/FacultyNews/constants'

export const EXTERNAL_NEWS_SOURCES = ['university', 'kitm', 'iktmvi'] as const

export type ExternalNewsSource = (typeof EXTERNAL_NEWS_SOURCES)[number]
export type NewsSource = ExternalNewsSource | 'faculty'

type ExternalDepartmentSource = Exclude<ExternalNewsSource, 'university'>

export interface ExternalNewsBase {
  title: string
  link: string
  source: ExternalNewsSource
  description?: string
  previewImage?: string
}

export interface ExternalUniversityNews extends ExternalNewsBase {
  source: 'university'
  views: number
}

export interface ExternalDepartmentNews<
  S extends ExternalDepartmentSource = ExternalDepartmentSource,
> extends ExternalNewsBase {
  source: S
  publishedAt: string
}

export interface ExternalNewsBySource {
  university: ExternalUniversityNews
  kitm: ExternalDepartmentNews<'kitm'>
  iktmvi: ExternalDepartmentNews<'iktmvi'>
}

export type ExternalNewsItem<S extends ExternalNewsSource = ExternalNewsSource> =
  ExternalNewsBySource[S] & {
    tags: NewsTagCode[]
  }

export interface ExternalNewsSourceConfig {
  label: string
  badgeLabel: string
  fullLabel: string
  overviewDescription: string
  archiveUrl: string
  pageCount: number
  getPageUrl: (page: number) => string
}
