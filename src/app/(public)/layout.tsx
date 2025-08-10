import type { Metadata } from 'next'

import { Footer } from '../(components)/Footer/Footer'
import { Header } from '../(components)/Header/Header'

import { getNews } from '@/shared/api/requests/getNews'

interface Props {
	children: React.ReactNode
}

export const generateMetadata = async (): Promise<Metadata> => {
	const news = await getNews(1)

	const baseDescription =
		'Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету.'

	const newsPreview = news.length
		? ` Останні новини: ${news
				.slice(0, 5)
				.map(item => item.title)
				.join(', ')}.`
		: ''

	return {
		description: baseDescription + newsPreview
	}
}

const DashboardLayout = ({ children }: Props) => {
	return (
		<>
			<div className='absolute -z-10 h-full border-l'></div>
			<main className='pl-[15px]'>
				<Header />
				{children}
				<Footer />
			</main>
		</>
	)
}

export default DashboardLayout
