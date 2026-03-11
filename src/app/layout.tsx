import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Nunito } from 'next/font/google'

import { Providers } from './providers'
import './globals.css'
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher'

import type { Metadata } from 'next'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
    : new URL('http://localhost:3000'),
  applicationName: 'Факультет математики та інформатики - РДГУ',
  title: 'РДГУ - Факультет математики та інформатики',
  description:
    'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету. Поєднуємо багаторічні традиції математичної школи з інноваційними підходами до викладання ІТ-дисциплін.',
  authors: [
    {
      name: 'Факультет математики та інформатики - РДГУ',
      url: process.env.NEXT_PUBLIC_BASE_URL,
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
    title: 'РДГУ - Факультет математики та інформатики',
    description:
      'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.',
    siteName: 'РДГУ - ФМІ',
    type: 'website',
    locale: 'uk_UA',
  },
  twitter: {
    title: 'РДГУ - Факультет математики та інформатики',
    description:
      'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html
    lang="uk"
    className="md:px-8"
    suppressHydrationWarning
  >
    <head>
      <meta
        name="google-site-verification"
        content="6mUir8KEMMAZUD-dJJzWtE3-0gY1K-OWxeRhjtJSSak"
      />
      <meta
        name="google-site-verification"
        content="3AnyzksS_fgBv2wkw4IChSjJGze7u50qQcVDld2FSp8"
      />
    </head>
    <body className={`${nunito.variable} relative overflow-x-hidden antialiased`}>
      <Analytics />
      <SpeedInsights />
      <Providers>
        {children}
        <ThemeSwitcher />
      </Providers>
    </body>
  </html>
)

export default RootLayout
