import { notFound } from 'next/navigation'

import { NewsArchive } from '../../../_components/NewsArchive'
import { NewsHeader } from '../../../_components/NewsHeader'
import { NewsUnavailable } from '../../../_components/NewsUnavailable'
import {
  NEWS_SOURCES,
  NEWS_SOURCE_CONFIG,
  type NewsSource,
  PRERENDERED_PAGE_COUNT,
  getNewsPage,
  parseNewsRoute,
} from '@/shared/news'

import type { Metadata } from 'next'

interface NewsSourcePagePageProps {
  params: Promise<{ source: NewsSource; page: string }>
}

export const revalidate = 3600
export const dynamicParams = true

export const generateStaticParams = () =>
  NEWS_SOURCES.flatMap((source) =>
    Array.from({ length: PRERENDERED_PAGE_COUNT }, (_, index) => ({
      source,
      page: String(index + 1),
    })).filter(({ page }) => +page > 1)
  )

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

const PaginatedSourceNewsPage = async ({ params }: NewsSourcePagePageProps) => {
  const { source, page } = await params
  const route = parseNewsRoute(source, +page)

  if (!route || route.page === 1) notFound()

  try {
    const news = await getNewsPage(route.source, route.page, { includeImages: true })

    return (
      <div>
        <NewsHeader activeSource={route.source} />
        <NewsArchive
          source={route.source}
          page={route.page}
          news={news}
        />
      </div>
    )
  } catch (error) {
    return (
      <div>
        <NewsHeader activeSource={route.source} />
        <NewsUnavailable
          source={route.source}
          error={error as Error}
        />
      </div>
    )
  }
}

export default PaginatedSourceNewsPage
