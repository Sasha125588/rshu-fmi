export const NEWS_SOURCES = ['university', 'kitm', 'iktmvi'] as const

export type NewsSource = (typeof NEWS_SOURCES)[number]

export type NewsTag =
  | 'Акредитація'
  | 'Міжнародне'
  | 'Стипендії'
  | 'Грант'
  | 'Наука'
  | 'Освіта'
  | 'Події'
  | 'Досягнення'
  | 'Партнерство'
  | 'Профорієнтація'
  | 'Свята'
  | 'Культура'
  | 'Спорт'
  | 'Оголошення'
  | 'IT'
  | 'Математика'
  | "Кар'єра"

type DepartmentSource = 'kitm' | 'iktmvi'

export interface BaseNews {
  title: string
  link: string
  source: NewsSource
  description?: string
  previewImage?: string
}

export interface UniversityNews extends BaseNews {
  source: 'university'
  views: number
}

export interface DepartmentNews<S extends DepartmentSource = DepartmentSource> extends BaseNews {
  source: S
  publishedAt: string
}

export interface ParsedNews {
  university: UniversityNews
  kitm: DepartmentNews<'kitm'>
  iktmvi: DepartmentNews<'iktmvi'>
}

export type ParsedNewsItem = ParsedNews[NewsSource]

export type NewsItem<S extends NewsSource = NewsSource> = ParsedNews[S] & {
  tags: NewsTag[]
}

export interface NewsSourceConfig {
  label: string
  badgeLabel: string
  fullLabel: string
  overviewDescription: string
  archiveUrl: string
  pageCount: number
  getPageUrl: (page: number) => string
}
