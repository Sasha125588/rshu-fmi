import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

import { SITE_URL } from '@/shared/constants'
import { CMS_CACHE_LIFE, CONTENT_CACHE_TAGS } from '@/shared/constants/cache'
import { SCHEDULE_SOURCES } from '@/shared/schedule/config'

import type { MetadataRoute } from 'next'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  'use cache'

  cacheLife(CMS_CACHE_LIFE)
  cacheTag(CONTENT_CACHE_TAGS.educationalPrograms, CONTENT_CACHE_TAGS.facultyNews)

  const payload = await getPayload({ config })

  const [educationalPrograms, facultyNews] = await Promise.all([
    payload.find({
      collection: 'educational-programs',
      depth: 0,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
      sort: 'slug',
    }),
    payload.find({
      collection: 'faculty-news',
      depth: 0,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
      sort: ['-isPinned', '-updatedAt', '-publishedAt'],
    }),
  ])

  return [
    {
      url: SITE_URL,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/history`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...SCHEDULE_SOURCES.map(
      ({ key }) =>
        ({
          url: `${SITE_URL}/rozklad/${key}`,
          changeFrequency: 'daily',
          priority: 0.9,
        }) as const
    ),
    {
      url: `${SITE_URL}/departments`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contacts`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/mizhnarodna-spivpratsya`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/vchena-rada`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/normatyvni-dokumenty`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/vartist-navchannia`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/educational-programs`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/news`,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    ...['university', 'kitm', 'iktmvi', 'faculty'].map((source) => ({
      url: `${SITE_URL}/news/${source}`,
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    })),
    ...facultyNews.docs.map(({ slug, updatedAt }) => ({
      url: `${SITE_URL}/news/faculty/${slug}`,
      lastModified: updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...educationalPrograms.docs.map(({ slug, updatedAt }) => ({
      url: `${SITE_URL}/educational-programs/${slug}`,
      lastModified: updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}

export default sitemap
