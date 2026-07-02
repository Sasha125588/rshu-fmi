import { withSerwist } from '@serwist/turbopack'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  typedRoutes: true,
  allowedDevOrigins: ['192.168.31.44'],
  images: {
    remotePatterns: [
      new URL('https://avatars.githubusercontent.com/**'),
      { protocol: 'https', hostname: 'www.rshu.edu.ua' },
      { protocol: 'https', hostname: 'kitm.rshu.edu.ua' },
      { protocol: 'https', hostname: 'iktmvi.rshu.edu.ua' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'static.xx.fbcdn.net' },
    ],
  },
}

export default withSerwist(nextConfig)
