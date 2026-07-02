import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://fmi-rshu.dev'

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-06-30'),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/history`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mizhnarodna-spivpratsya`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/vchena-rada`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/normatyvni-dokumenty`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vartist-navchannia`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/specializations/software-engineering`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date('2026-07-03'),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    ...['university', 'kitm', 'iktmvi'].map((source) => ({
      url: `${baseUrl}/news/${source}`,
      lastModified: new Date('2026-07-03'),
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    })),
  ]
}

export default sitemap
