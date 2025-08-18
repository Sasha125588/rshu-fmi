'use client'

import { ArrowRightIcon, NewspaperIcon } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { NewsItem, NewsItemSkeleton } from './components/NewsItem/NewsItem'
import { Pagination } from './components/Pagination/Pagination'
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
			className='pt-28'
		>
			<div className=''>
				<div className='flex items-center gap-3'>
					<NewspaperIcon className='text-green-primary h-5 w-5' />
					<Badge
						className='border-green-primary/20 text-green-primary text-sm font-normal'
						variant='outline'
					>
						Останні новини
					</Badge>
				</div>
				<h2 className='mt-6 text-3xl font-semibold'>Що відбувається в університеті</h2>
				<p className='text-muted-foreground mt-2 text-lg'>
					Слідкуйте за останніми подіями та досягненнями нашого університету
				</p>
			</div>

			<div className='mb-4 pt-10'>
				<Pagination
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
							variant='green-ghost'
							className='group text-green-primary border-green-primary/15 hover:bg-green-primary/15 hover:text-green-primary flex cursor-pointer items-center gap-3 rounded-full border px-6 py-3 transition-all duration-200'
						>
							<span className='text-[15px] font-medium'>Всі новини університету</span>
							<ArrowRightIcon
								size={16}
								className='transition-transform duration-200 group-hover:translate-x-1'
							/>
						</Button>
					</Link>
				</div>
			)}
		</div>
	)
}
