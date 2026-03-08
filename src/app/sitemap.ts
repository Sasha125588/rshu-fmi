import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'daily',
      priority: 1,
      images: [`${baseUrl}/images/logo.webp`],
    },
    {
      url: `${baseUrl}/history`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${baseUrl}/images/logo.webp`],
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${baseUrl}/images/logo.webp`],
    },
    {
      url: `${baseUrl}/mizhnarodna-spivpratsya`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${baseUrl}/images/logo.webp`],
    },
    {
      url: `${baseUrl}/vchena-rada`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${baseUrl}/images/logo.webp`],
    },
    {
      url: `${baseUrl}/normatyvni-dokumenty`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${baseUrl}/images/logo.webp`],
    },
    {
      url: `${baseUrl}/vartist-navchannia`,
      lastModified: new Date('2026-03-09'),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${baseUrl}/images/logo.webp`],
    },
  ]
}

export default sitemap
