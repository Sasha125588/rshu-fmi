import { notFound } from 'next/navigation'

import { NewsArchive } from '../_components/NewsArchive'
import { NewsUnavailable } from '../_components/NewsUnavailable'
import { parseNewsRoute } from '../_helpers'
import {
  EXTERNAL_NEWS_SOURCES,
  NEWS_SOURCE_CONFIG,
  getExternalNewsErrorDetails,
  getNewsPage,
} from '@/shared/news'

import type { Metadata } from 'next'

export const revalidate = 3600
export const dynamicParams = true

export const generateStaticParams = () => EXTERNAL_NEWS_SOURCES.map((source) => ({ source }))

type NewsSourcePageProps = PageProps<'/news/[source]'>

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

const SourceNewsPage = async ({ params }: NewsSourcePageProps) => {
  const { source } = await params
  const route = parseNewsRoute(source, 1)

  if (!route) notFound()

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

export default SourceNewsPage
