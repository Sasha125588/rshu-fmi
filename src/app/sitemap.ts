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
					en: baseUrl
				}
			},
			images: ['/images/logo.webp']
		},
		{
			url: `${baseUrl}/history`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
			alternates: {
				languages: {
					uk: `${baseUrl}/history`,
					en: `${baseUrl}/history`
				}
			},
			images: ['/images/logo.webp']
		},
		{
			url: `${baseUrl}/contacts`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
			alternates: {
				languages: {
					uk: `${baseUrl}/contacts`,
					en: `${baseUrl}/contacts`
				}
			},
			images: ['/images/logo.webp']
		},
		{
			url: `${baseUrl}/mizhnarodna-spivpratsya`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
			alternates: {
				languages: {
					uk: `${baseUrl}/mizhnarodna-spivpratsya`,
					en: `${baseUrl}/mizhnarodna-spivpratsya`
				}
			},
			images: ['/images/logo.webp']
		},
		{
			url: `${baseUrl}/vchena-rada`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
			alternates: {
				languages: {
					uk: `${baseUrl}/vchena-rada`,
					en: `${baseUrl}/vchena-rada`
				}
			},
			images: ['/images/logo.webp']
		}
	]
}

export default sitemap
