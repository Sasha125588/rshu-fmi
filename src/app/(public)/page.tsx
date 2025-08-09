import { AboutUs } from './components/AboutUs/AboutUs'
import { BecomeAStudent } from './components/BecomeAStudent/BecomeAStudent'
import { News } from './components/News/News'
import { Specializations } from './components/Specializations/Specializations'
import { getNews } from '@/shared/api/requests/getNews'

export const revalidate = 21600 // 6 годин

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
