import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { NewsArchive } from '../_components/NewsArchive'
import { NewsUnavailable } from '../_components/NewsUnavailable'
import { parseNewsRoute } from '../_helpers'
import SourceNewsLoading from './loading'
import { EXTERNAL_NEWS_SOURCES, NEWS_SOURCE_CONFIG, getNewsPage } from '@/shared/news'

import type { Metadata } from 'next'

export const generateStaticParams = () => EXTERNAL_NEWS_SOURCES.map((source) => ({ source }))

type NewsSourcePageProps = PageProps<'/news/[source]'>
type SourceNewsContentProps = Pick<NewsSourcePageProps, 'params'>

export const generateMetadata = async ({ params }: NewsSourcePageProps): Promise<Metadata> => {
  const { source } = await params
  const route = parseNewsRoute(source, 1)

  if (!route) return {}

  const config = NEWS_SOURCE_CONFIG[route.source]

  return {
    title: config.fullLabel,
    description: `Архів новин: ${config.fullLabel}.`,
    alternates: { canonical: `/news/${route.source}` },
  }
}

const SourceNewsContent = async ({ params }: SourceNewsContentProps) => {
  const { source } = await params
  const route = parseNewsRoute(source, 1)

  if (!route) notFound()

  const result = await getNewsPage(route.source, route.page, { includeImages: true })

  if (result.status === 'rejected') {
    return (
      <div data-testid="external-news-source-content">
        <NewsUnavailable
          source={route.source}
          error={result.error}
        />
      </div>
    )
  }

  return (
    <div data-testid="external-news-source-content">
      <NewsArchive
        source={route.source}
        page={route.page}
        news={result.news}
      />
    </div>
  )
}

const SourceNewsPage = ({ params }: NewsSourcePageProps) => (
  <div data-testid="external-news-source-shell">
    <Suspense fallback={<SourceNewsLoading />}>
      <SourceNewsContent params={params} />
    </Suspense>
  </div>
)

export default SourceNewsPage
