import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { NewsArchive } from '../../../_components/NewsArchive'
import { NewsUnavailable } from '../../../_components/NewsUnavailable'
import { parseNewsRoute } from '../../../_helpers'
import { NewsLoading } from '../../../loading'
import {
  EXTERNAL_NEWS_SOURCES,
  NEWS_SOURCE_CONFIG,
  PRERENDERED_PAGE_COUNT,
  getNewsPage,
} from '@/shared/news'

import type { Metadata } from 'next'

export const generateStaticParams = () =>
  EXTERNAL_NEWS_SOURCES.flatMap((source) =>
    Array.from({ length: PRERENDERED_PAGE_COUNT }, (_, index) => ({
      source,
      page: String(index + 2),
    }))
  )

type NewsSourcePagePageProps = PageProps<'/news/[source]/page/[page]'>
type PaginatedSourceNewsContentProps = Pick<NewsSourcePagePageProps, 'params'>

export const generateMetadata = async ({ params }: NewsSourcePagePageProps): Promise<Metadata> => {
  const { source, page } = await params
  const route = parseNewsRoute(source, +page)

  if (!route || route.page === 1) return {}

  const config = NEWS_SOURCE_CONFIG[route.source]

  return {
    title: `${config.fullLabel} — сторінка ${route.page}`,
    description: `Сторінка ${route.page} архіву новин: ${config.fullLabel}.`,
    alternates: { canonical: `/news/${route.source}/page/${route.page}` },
  }
}

const PaginatedSourceNewsContent = async ({ params }: PaginatedSourceNewsContentProps) => {
  const { source, page } = await params
  const route = parseNewsRoute(source, +page)

  if (!route || route.page === 1) notFound()

  const result = await getNewsPage(route.source, route.page, { includeImages: true })

  if (result.status === 'rejected') {
    return (
      <div data-testid="external-news-page-content">
        <NewsUnavailable
          source={route.source}
          error={result.error}
        />
      </div>
    )
  }

  return (
    <div data-testid="external-news-page-content">
      <NewsArchive
        source={route.source}
        page={route.page}
        news={result.news}
      />
    </div>
  )
}

const PaginatedSourceNewsPage = ({ params }: NewsSourcePagePageProps) => (
  <div data-testid="external-news-page-shell">
    <Suspense fallback={<NewsLoading />}>
      <PaginatedSourceNewsContent params={params} />
    </Suspense>
  </div>
)

export default PaginatedSourceNewsPage
