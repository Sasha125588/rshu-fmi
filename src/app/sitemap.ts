import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://fmi-rshu.dev'

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/history`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacts`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mizhnarodna-spivpratsya`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/vchena-rada`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/normatyvni-dokumenty`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vartist-navchannia`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/specializations/software-engineering`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    ...['university', 'kitm', 'iktmvi'].map((source) => ({
      url: `${baseUrl}/news/${source}`,
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    })),
  ]
}

export default sitemap
