import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { AboutUs } from './components/AboutUs/AboutUs'
import { News } from './components/News/News'
import { NewsItem } from './components/News/constants/types'
import { Specializations } from './components/Specializations/Specializations'
import { getNews } from '@/shared/api/requests/getNews'

export const revalidate = 43200 // 12 hours

const HomePage = async () => {
	const news = await getNews()

	const addTags = (news: NewsItem[]) => {
		const tags = news.reduce((acc, news) => {
			if (news.title.includes('ПЕРСПЕКТИВИ')) {
				acc.push('Перспективи')
			}
			return acc
		}, [] as string[])

		return news.map(news => ({
			...news,
			tags: tags
		}))
	}

	const newsWithTags = addTags(news)

	return (
		<>
			<div className='w-full'>
				<div className='flex w-full justify-between'>
					<div className='w-full'>
						<div>
							<h1 className='scroll-m-20 text-start text-[68px]/[90px] font-medium tracking-tight text-balance'>
								Факультет математики
								<br />
								<span className='flex gap-2'>
									та інформатики
									<Image
										className='-mt-2 pl-2'
										src='/images/coding.svg'
										alt='coding'
										width={128}
										height={128}
									/>
								</span>
							</h1>
						</div>
						<div className='flex w-full items-end justify-between pt-40 pr-2'>
							<div className='flex gap-4'>
								<Button className='flex h-12 w-50 cursor-pointer items-center rounded-full bg-[#017369] hover:bg-[#01635b]'>
									<p className='pl-2 text-base'>Стати студентом</p>
									<div className='rounded-full bg-white p-2'>
										<ArrowRightIcon className='size-5 text-black/80' />
									</div>
								</Button>
								<Link href='#specializations'>
									<Button
										variant='outline'
										className='flex h-12 cursor-pointer items-center rounded-full border-1 border-[#7B7B7E] transition-all duration-200 hover:bg-zinc-100'
									>
										<p className='text-base font-normal'>Спеціальності</p>
									</Button>
								</Link>
							</div>
							<p className='w-1/3 text-start text-lg/5 text-balance'>
								Більше 90 років досвіду в підготовці математиків, програмістів та вчителів. Ваш шлях
								до успіху в цифровому світі починається тут.
							</p>
						</div>
					</div>
					<div className='mt-[-8.8125rem] mr-[-35px]'>
						<Image
							className='h-[600px] w-[600px]'
							src='/images/main-screen.png'
							alt='main-screen'
							width={600}
							height={600}
						/>
					</div>
				</div>
			</div>
			<div className='ml-[-55px] border-b' />
			<AboutUs />
			<div className='mr-[-35px] ml-[-55px] border-b' />
			<Specializations />
			<div className='mr-[-35px] ml-[-55px] border-b' />
			<News news={newsWithTags} />
			<div className='mr-[-35px] ml-[-55px] border-b' />
		</>
	)
}

export default HomePage
