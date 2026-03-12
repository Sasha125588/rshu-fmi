import { withSerwist } from '@serwist/turbopack'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  typedRoutes: true,
  cacheComponents: true,
  reactCompiler: true,
  allowedDevOrigins: ['192.168.31.44'],
  images: {
    remotePatterns: [
      new URL('https://avatars.githubusercontent.com/**'),
      { protocol: 'https', hostname: 'www.rshu.edu.ua' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
}

export default withSerwist(nextConfig)
