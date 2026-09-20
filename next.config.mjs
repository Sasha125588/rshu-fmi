import { withPayload } from '@payloadcms/next/withPayload'

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    exposeTestingApiInProductionBuild: process.env.NEXT_INSTANT_TESTS === '1',
    turbopackRustReactCompiler: true,
  },
  allowedDevOrigins: ['192.168.31.44'],
  images: {
    // Payment required
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED
    // unoptimized: true,

    remotePatterns: [
      new URL(`${process.env.R2_PUBLIC_URL}/**`),
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

export default withPayload(nextConfig)
