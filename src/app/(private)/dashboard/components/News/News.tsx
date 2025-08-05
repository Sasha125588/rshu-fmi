'use client'

import { ArrowRightIcon, NewspaperIcon } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { NewsItem, NewsItemSkeleton } from './components/NewsItem/NewsItem'
import PaginationComponent from './components/Pagination/Pagination'
import type { NewsItem as NewsItemProps } from './constants/types'
import { useNews } from './hooks/useNews'

interface Props {
	initialNews: NewsItemProps[]
	initialPage: number
}

export const News = ({ initialNews, initialPage }: Props) => {
	const { state, functions } = useNews({ initialNews, initialPage })

	return (
		<div
			id='news'
			className='pt-28 pb-10'
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
					Слідкуйте за останніми подіями та досягненнями нашого університету
				</p>
			</div>

			<div className='mb-4'>
				<PaginationComponent
					currentPage={state.currentPage ?? initialPage}
					onPageChange={functions.setCurrentPage}
					totalPages={state.totalPages}
				/>
			</div>

			<div className='space-y-0'>
				{state.isLoading
					? Array.from({ length: 10 }).map((_, index) => (
							<NewsItemSkeleton
								key={`skeleton-${index}`}
								isLast={index === 9}
							/>
						))
					: state.newsWithTags.map((newsItem, index) => (
							<NewsItem
								key={`${state.currentPage}-${newsItem.link}`}
								item={newsItem}
								index={index}
								isLast={index === state.newsWithTags.length - 1}
							/>
						))}
			</div>

			{!state.isLoading && state.news.length > 4 && (
				<div className='mt-12 flex justify-center'>
					<Link
						href='https://www.rshu.edu.ua/novyny-rdhu'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Button
							variant='outline'
							className='group flex cursor-pointer items-center gap-3 rounded-full border-[#017369]/30 px-6 py-3 text-[#017369] transition-all duration-200 hover:bg-[#017369]/5 hover:text-[#017369]'
						>
							<span className='font-medium'>Всі новини університету</span>
							<ArrowRightIcon className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-1' />
						</Button>
					</Link>
				</div>
			)}
		</div>
	)
}
