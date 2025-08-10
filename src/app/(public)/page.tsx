import type { Metadata } from 'next'

import { AboutUs } from './components/AboutUs/AboutUs'
import { BecomeAStudent } from './components/BecomeAStudent/BecomeAStudent'
import { News } from './components/News/News'
import { Specializations } from './components/Specializations/Specializations'
import { getNews } from '@/shared/api/requests/getNews'

export const revalidate = 21600 // 6 годин

export const metadata: Metadata = {
	title: 'Факультет математики та інформатики - РДГУ',
	description:
		'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.',
	openGraph: {
		siteName: 'Факультет математики та інформатики - РДГУ',
		title: 'Факультет математики та інформатики Рівненського державного гуманітарного університету',
		description: 'Офіційна сторінка ФМІ Рівненського державного гуманітарного університету.',
		images: [
			{
				url: '/images/logo.webp',
				width: 120,
				height: 120,
				type: 'image/webp',
				alt: 'ФМІ логотип'
			}
		],
		url: process.env.NEXT_PUBLIC_BASE_URL,
		type: 'website',
		locale: 'uk_UA'
	}
}

const HomePage = async () => {
	const news = await getNews(1)

	return (
		<>
			<BecomeAStudent />
			<div className='ml-[-55px] border-b' />
			<AboutUs />
			<div className='mr-[-35px] ml-[-55px] border-b pt-6' />
			<Specializations />
			<div className='mr-[-35px] ml-[-55px] border-b pt-6' />
			<News
				initialNews={news}
				initialPage={1}
			/>
			<div className='mr-[-35px] ml-[-55px] border-b pt-6' />
		</>
	)
}

export default HomePage
