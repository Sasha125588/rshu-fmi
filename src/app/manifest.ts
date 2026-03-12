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
  lang: 'uk-UA',
  background_color: '#0a0a0f',
  theme_color: '#10b981',
  categories: ['education', 'university'],
  icons: [
    {
      src: '/images/logo.webp',
      sizes: '501x501',
      type: 'image/webp',
      purpose: 'any',
    },
    {
      src: '/favicon.ico',
      sizes: '64x64',
      type: 'image/x-icon',
      purpose: 'any',
    },
  ],
})

export default manifest
