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
			url: `${baseUrl}/dashboard`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
			alternates: {
				languages: {
					uk: `${baseUrl}/dashboard`,
					en: `${baseUrl}/dashboard`
				}
			},
			images: ['/images/logo.webp']
		}
	]
}

export default sitemap
