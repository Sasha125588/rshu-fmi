import { SOCIAL_IMAGE_SIZE } from './config'
import { SITE_URL } from '@/shared/constants/env'

import type { Metadata } from 'next'

export const getSocialImageUrl = (path: string, revision?: string) => {
  const url = new URL(`/og${path === '/' ? '/home' : path}`, SITE_URL)
  url.searchParams.set('v', revision ? `3-${revision}` : '3')
  return url.href
}

export const getSocialMetadata = (
  path: string,
  title: string,
  description: string,
  revision?: string
): Pick<Metadata, 'openGraph' | 'twitter'> => {
  const image = {
    url: getSocialImageUrl(path, revision),
    ...SOCIAL_IMAGE_SIZE,
    type: 'image/png',
    alt: title,
  }

  return {
    openGraph: {
      title,
      description,
      siteName: 'Факультет математики та інформатики РДГУ',
      type: 'website',
      locale: 'uk_UA',
      url: new URL(path, SITE_URL).href,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
