import type { ExternalNewsErrorDetails, ExternalNewsItem, ExternalNewsSource } from '@/shared/news'

export type NewsOverviewResult =
  | { source: ExternalNewsSource; status: 'fulfilled'; news: ExternalNewsItem[] }
  | {
      source: ExternalNewsSource
      status: 'rejected'
      error: ExternalNewsErrorDetails
    }
