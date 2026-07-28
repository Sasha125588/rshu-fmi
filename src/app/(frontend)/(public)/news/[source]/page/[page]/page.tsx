import { notFound } from 'next/navigation'

import { NewsArchive } from '../../../_components/NewsArchive'
import { NewsUnavailable } from '../../../_components/NewsUnavailable'
import { parseNewsRoute } from '../../../_helpers'
import {
  EXTERNAL_NEWS_SOURCES,
  NEWS_SOURCE_CONFIG,
  PRERENDERED_PAGE_COUNT,
  getExternalNewsErrorDetails,
  getNewsPage,
} from '@/shared/news'

import type { Metadata } from 'next'

export const revalidate = 3600
export const dynamicParams = true

export const generateStaticParams = () =>
  EXTERNAL_NEWS_SOURCES.flatMap((source) =>
    Array.from({ length: PRERENDERED_PAGE_COUNT }, (_, index) => ({
      source,
      page: String(index + 2),
    }))
  )

type NewsSourcePagePageProps = PageProps<'/news/[source]/page/[page]'>

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
        <NewsUnavailable
          source={route.source}
          error={getExternalNewsErrorDetails(error, route.source)}
        />
      </div>
    )
  }
}

export default PaginatedSourceNewsPage
