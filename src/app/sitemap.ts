import type { MetadataRoute } from 'next'

const sitemap = (): MetadataRoute.Sitemap => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          uk: baseUrl,
          en: baseUrl,
        },
      },
      images: ['/public/images/logo.webp'],
    },
    {
      url: `${baseUrl}/history`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          uk: `${baseUrl}/history`,
          en: `${baseUrl}/history`,
        },
      },
      images: ['/public/images/logo.webp'],
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          uk: `${baseUrl}/contacts`,
          en: `${baseUrl}/contacts`,
        },
      },
      images: ['/public/images/logo.webp'],
    },
    {
      url: `${baseUrl}/mizhnarodna-spivpratsya`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          uk: `${baseUrl}/mizhnarodna-spivpratsya`,
          en: `${baseUrl}/mizhnarodna-spivpratsya`,
        },
      },
      images: ['/public/images/logo.webp'],
    },
    {
      url: `${baseUrl}/vchena-rada`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          uk: `${baseUrl}/vchena-rada`,
          en: `${baseUrl}/vchena-rada`,
        },
      },
      images: ['/public/images/logo.webp'],
    },
    {
      url: `${baseUrl}/normatyvni-dokumenty`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          uk: `${baseUrl}/normatyvni-dokumenty`,
          en: `${baseUrl}/normatyvni-dokumenty`,
        },
      },
      images: ['/public/images/logo.webp'],
    },
    {
      url: `${baseUrl}/vartist-navchannia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          uk: `${baseUrl}/vartist-navchannia`,
          en: `${baseUrl}/vartist-navchannia`,
        },
      },
      images: ['/public/images/logo.webp'],
    },
  ]
}

export default sitemap
