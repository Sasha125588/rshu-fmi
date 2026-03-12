import type { MetadataRoute } from 'next'

const manifest = (): MetadataRoute.Manifest => ({
  id: '/',
  name: 'Факультет математики та інформатики - РДГУ',
  short_name: 'ФМІ РДГУ',
  description:
    'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait',
  lang: 'uk-UA',
  background_color: '#0a0a0f',
  theme_color: '#10b981',
  categories: ['education', 'university'],
  icons: [
    {
      src: '/icons/icon-192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/icons/icon-512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/icons/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    {
      src: '/favicon.ico',
      sizes: '64x64',
      type: 'image/x-icon',
    },
  ],
})

export default manifest
