import type { MetadataRoute } from 'next'

const sitemap = (): MetadataRoute.Sitemap => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1
		},
		{
			url: `${baseUrl}/dashboard`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1
		}
	]
}

export default sitemap
