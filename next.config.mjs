import { withPayload } from '@payloadcms/next/withPayload'
import { withSerwist } from '@serwist/turbopack'

const r2PublicUrl = process.env.R2_PUBLIC_URL

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  typedRoutes: true,
  allowedDevOrigins: ['192.168.31.44'],
  images: {
    // Payment required
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED
    // unoptimized: true,

    remotePatterns: [
      new URL(`${r2PublicUrl}/**`),
      new URL('https://avatars.githubusercontent.com/**'),
      { protocol: 'https', hostname: 'media.fmi-rshu.dev' },
      { protocol: 'https', hostname: 'www.rshu.edu.ua' },
      { protocol: 'https', hostname: 'kitm.rshu.edu.ua' },
      { protocol: 'https', hostname: 'iktmvi.rshu.edu.ua' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'static.xx.fbcdn.net' },
    ],
  },
}

export default withSerwist(withPayload(nextConfig))
