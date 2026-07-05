import type { NewsItem, NewsSource } from '@/shared/news/types'

export type NewsOverviewResult =
  | { source: NewsSource; status: 'fulfilled'; news: NewsItem[] }
  | { source: NewsSource; status: 'rejected'; error: Error }
