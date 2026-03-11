import { Suspense } from 'react'

import { AboutUs } from './(components)/AboutUs/AboutUs'
import { BecomeAStudent } from './(components)/BecomeAStudent/BecomeAStudent'
import { News, NewsSkeleton } from './(components)/News/News'
import { Specializations } from './(components)/Specializations/Specializations'
import { getNews } from '@/shared/api/requests/getNews'

import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const baseDescription =
    'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету. Новини, спеціальності, міжнародна співпраця, документи та контакти.'

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

  return {
    description: baseDescription,
    openGraph: {
      siteName: 'Факультет математики та інформатики - РДГУ',
      title:
        'Факультет математики та інформатики Рівненського державного гуманітарного університету',
      description: 'Офіційна сторінка ФМІ Рівненського державного гуманітарного університету.',
      images: [
        {
          url: new URL('/images/logo.webp', baseUrl).href,
          width: 120,
          height: 120,
          type: 'image/webp',
          alt: 'ФМІ логотип',
        },
      ],
      url: baseUrl,
      type: 'website',
      locale: 'uk_UA',
    },
    twitter: {
      title: 'РДГУ - Факультет математики та інформатики',
      description: baseDescription,
      images: [
        {
          url: new URL('/images/logo.webp', baseUrl).href,
          width: 120,
          height: 120,
          type: 'image/webp',
          alt: 'ФМІ логотип',
        },
      ],
    },
  }
}

const HomePage = async () => {
  return (
    <div>
      <BecomeAStudent />
      <div className="hidden border-b md:mr-[-35px] md:ml-[-35px] md:block" />
      <AboutUs />
      <div className="hidden border-b pt-6 md:mr-[-35px] md:ml-[-35px] md:block" />
      <Specializations />
      <div className="hidden border-b pt-6 md:mr-[-35px] md:ml-[-35px] md:block" />
      <Suspense fallback={<NewsSkeleton />}>
        <NewsSection />
      </Suspense>
      <div className="hidden border-b pt-6 md:mr-[-35px] md:ml-[-35px] md:block" />
    </div>
  )
}

export default HomePage

const NewsSection = async () => {
  const news = await getNews(1)
  return (
    <News
      initialNews={news}
      initialPage={1}
    />
  )
}
