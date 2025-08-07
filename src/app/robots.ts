import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/private/', '/api/', '/admin/']
		},
		sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
	}
}

export default robots
