import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		reactCompiler: true
	},
	images: {
		remotePatterns: [
			new URL('https://avatars.githubusercontent.com/**'),
			{ protocol: 'https', hostname: 'www.rshu.edu.ua' },
			{ protocol: 'https', hostname: 'avatars.githubusercontent.com' }
		]
	}
}

export default nextConfig
