import { SITE_URL } from '@/shared/constants'

import type { MetadataRoute } from 'next'

const sitemap = (): MetadataRoute.Sitemap => {
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
      url: `${SITE_URL}/specializations/software-engineering`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/news`,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    ...['university', 'kitm', 'iktmvi'].map((source) => ({
      url: `${SITE_URL}/news/${source}`,
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    })),
  ]
}

export default sitemap
