import type { Metadata } from 'next'

import { AboutUs } from './components/AboutUs/AboutUs'
import { BecomeAStudent } from './components/BecomeAStudent/BecomeAStudent'
import { News } from './components/News/News'
import { Specializations } from './components/Specializations/Specializations'
import { getNews } from '@/shared/api/requests/getNews'

export const revalidate = 21600 // 6 годин

export const generateMetadata = async (): Promise<Metadata> => {
	const news = await getNews(1)

	const baseTitle = 'Факультет математики та інформатики'
	const baseDescription =
		'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.'

	const newsPreview = news.length
		? ` Останні новини: ${news
				.slice(0, 5)
				.map(item => item.title)
				.join(', ')}.`
		: ''

	return {
		title: baseTitle,
		description: baseDescription + newsPreview
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
