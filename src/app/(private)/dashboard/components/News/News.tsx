import { ArrowRightIcon, NewspaperIcon } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { NewsItem } from './components/NewsItem'
import { NewsItem as NewsItemProps } from './constants/types'
import { generateTags } from './utils/generateTags'

interface Props {
	news: NewsItemProps[]
}

export const News = ({ news }: Props) => {
	const newsWithTags = news.map(item => ({
		...item,
		tags: generateTags(item.title)
	}))

	const displayNews = newsWithTags.slice(0, 4)

	return (
		<div
			id='news'
			className='pt-28'
		>
			<div className='mb-12'>
				<div className='flex items-center gap-3'>
					<NewspaperIcon className='h-5 w-5 text-[#017369]' />
					<Badge
						className='border-[#017369]/20 text-sm font-normal text-[#017369]'
						variant='outline'
					>
						Останні новини
					</Badge>
				</div>
				<h2 className='mt-6 text-3xl font-semibold text-gray-900'>
					Що відбувається в університеті
				</h2>
				<p className='mt-2 text-lg text-gray-600'>
					Слідкуйте за останніми подіями та досягненнями нашого факультету
				</p>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				{displayNews.map((newsItem, index) => (
					<NewsItem
						key={index}
						item={newsItem}
					/>
				))}
			</div>

			{news.length > 4 && (
				<div className='mt-12 flex justify-center'>
					<Link
						href='https://www.rshu.edu.ua/novyny-rdhu'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Button
							variant='outline'
							className='group flex items-center gap-3 rounded-full border-[#017369]/30 px-6 py-3 text-[#017369] transition-all duration-200 hover:border-[#017369] hover:bg-[#017369]/5'
						>
							<span className='font-medium'>Всі новини факультету</span>
							<ArrowRightIcon className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-1' />
						</Button>
					</Link>
				</div>
			)}
		</div>
	)
}
