import type { Metadata } from 'next'
import { type SearchParams, createLoader, parseAsInteger } from 'nuqs/server'

import { AboutUs } from './components/AboutUs/AboutUs'
import { BecomeAStudent } from './components/BecomeAStudent/BecomeAStudent'
import { News } from './components/News/News'
import { Specializations } from './components/Specializations/Specializations'
import { getNews } from '@/shared/api/requests/getNews'

export const revalidate = 43200 // 12 годин

interface HomePageProps {
	searchParams: Promise<SearchParams>
}

export const generateMetadata = async ({ searchParams }: HomePageProps): Promise<Metadata> => {
	const page = (await searchParams).page ?? 1

	const news = await getNews(+page)

	const baseTitle = 'Головна'
	const baseDescription =
		'Офіційний сайт ФМІ. Новини, спеціальності, освітні програми та можливості для студентів.'

	const newsPreview = news.length
		? ` Останні новини: ${news.map(item => item.title).join(', ')}.`
		: ''

	return {
		title: baseTitle,
		description: baseDescription + newsPreview
	}
}

const HomePage = async ({ searchParams }: HomePageProps) => {
	const resolvedSearchParams = await searchParams
	const loadersResult = createLoader({
		'news-page': parseAsInteger
	})
	const { 'news-page': page } = loadersResult(resolvedSearchParams)

	const pageNumber = page ?? 1

	const news = await getNews(pageNumber)

	return (
		<>
			<BecomeAStudent />
			<div className='ml-[-55px] border-b' />
			<AboutUs />
			<div className='mr-[-35px] ml-[-55px] border-b' />
			<Specializations />
			<div className='mr-[-35px] ml-[-55px] border-b' />
			<News
				initialNews={news}
				initialPage={pageNumber}
			/>
			<div className='mr-[-35px] ml-[-55px] border-b' />
		</>
	)
}

export default HomePage
