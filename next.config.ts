import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		reactCompiler: true
	},
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'www.rshu.edu.ua' }]
	}
}

export default nextConfig
