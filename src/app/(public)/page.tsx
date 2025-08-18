import type { Metadata } from 'next'

import { AboutUs } from './(components)/AboutUs/AboutUs'
import { BecomeAStudent } from './(components)/BecomeAStudent/BecomeAStudent'
import { News } from './(components)/News/News'
import { Specializations } from './(components)/Specializations/Specializations'
import { getNews } from '@/shared/api/requests/getNews'

export const revalidate = 21600 // 6 годин

export const generateMetadata = async (): Promise<Metadata> => {
	const news = await getNews(1)

	const baseDescription =
		'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.'

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

	const newsPreview = news.length
		? ` Останні новини: ${news
				.slice(0, 3)
				.map(item => item.title)
				.join(', ')}.`
		: ''

	return {
		description: baseDescription + newsPreview,
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
					alt: 'ФМІ логотип'
				}
			],
			url: baseUrl,
			type: 'website',
			locale: 'uk_UA'
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
					alt: 'ФМІ логотип'
				}
			]
		}
	}
}

const HomePage = async () => {
	const news = await getNews(1)

	return (
		<div>
			<BecomeAStudent />
			<div className='hidden border-b md:mr-[-35px] md:ml-[-35px] md:block' />
			<AboutUs />
			<div className='hidden border-b pt-6 md:mr-[-35px] md:ml-[-35px] md:block' />
			<Specializations />
			<div className='hidden border-b pt-6 md:mr-[-35px] md:ml-[-35px] md:block' />
			<News
				initialNews={news}
				initialPage={1}
			/>
			<div className='hidden border-b pt-6 md:mr-[-35px] md:ml-[-35px] md:block' />
		</div>
	)
}

export default HomePage
