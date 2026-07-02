import { notFound } from 'next/navigation'

import { NewsArchive } from '../_components/NewsArchive'
import { NewsHeader } from '../_components/NewsHeader'
import {
  NEWS_SOURCES,
  NEWS_SOURCE_CONFIG,
  type NewsSource,
  getNewsPage,
  parseNewsRoute,
} from '@/shared/news'

import type { Metadata } from 'next'

interface NewsSourcePageProps {
  params: Promise<{ source: NewsSource }>
}

export const revalidate = 3600
export const dynamicParams = true

export const generateStaticParams = () => NEWS_SOURCES.map((source) => ({ source }))

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
}

export default SourceNewsPage
