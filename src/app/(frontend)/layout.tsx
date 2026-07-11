import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { JetBrains_Mono, Nunito } from 'next/font/google'

import { ThemeScript } from './_scripts/ThemeScript'
import './globals.css'
import { Provider } from './provider'
import { ThemeSwitcher } from '@/app/(frontend)/_components/ThemeSwitcher/ThemeSwitcher'
import { cn } from '@/lib/utils'
import { SITE_URL } from '@/shared/constants'

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Факультет математики та інформатики РДГУ',
  title: 'Факультет математики та інформатики РДГУ',
  description:
    'Неофіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету. Поєднуємо багаторічні традиції математичної школи з інноваційними підходами до викладання ІТ-дисциплін.',
  manifest: '/manifest.webmanifest',
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Факультет математики та інформатики РДГУ',
  },
  icons: {
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: '64x64', type: 'image/x-icon' },
    ],
  },
  authors: [
    {
      name: 'Факультет математики та інформатики РДГУ',
      url: SITE_URL,
    },
  ],
  alternates: {
    canonical: '/',
  },
  keywords: [
    'РДГУ',
    'Факультет',
    'Факультет математики та інформатики',
    'Рівненський державний гуманітарний університет',
    'ФМІ',
    'РДГУ ФМІ',
  ],
  openGraph: {
    title: 'Факультет математики та інформатики РДГУ',
    description:
      'Неофіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.',
    siteName: 'Факультет математики та інформатики РДГУ',
    type: 'website',
    locale: 'uk_UA',
  },
  twitter: {
    title: 'Факультет математики та інформатики РДГУ',
    description:
      'Неофіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#a99dff',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Факультет математики та інформатики РДГУ',
      description:
        'Неофіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.',
      inLanguage: 'uk-UA',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Факультет математики та інформатики РДГУ',
      alternateName: 'ФМІ РДГУ',
      url: SITE_URL,
      logo: new URL('/images/logo.avif', SITE_URL).href,
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: 'Рівненський державний гуманітарний університет',
        url: 'https://www.rshu.edu.ua',
      },
    },
  ],
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html
    lang="uk"
    data-scroll-behavior="smooth"
    className={cn('font-nunito', nunito.variable, jetbrainsMono.variable)}
    suppressHydrationWarning
  >
    <head>
      <ThemeScript />
      <meta
        name="google-site-verification"
        content="6mUir8KEMMAZUD-dJJzWtE3-0gY1K-OWxeRhjtJSSak"
      />
      <meta
        name="google-site-verification"
        content="3AnyzksS_fgBv2wkw4IChSjJGze7u50qQcVDld2FSp8"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </head>
    <body className={'relative overflow-x-hidden antialiased'}>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}

      <Provider>
        {children}
        <ThemeSwitcher />
      </Provider>
    </body>
  </html>
)

export default RootLayout
