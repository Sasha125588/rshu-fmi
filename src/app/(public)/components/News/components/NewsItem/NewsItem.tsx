import { ArrowUpRightIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'

import type { NewsItem as NewsItemProps } from '../../constants/types'

import { truncateText } from '@/shared/helpers/text/truncateText'

interface Props {
	item: NewsItemProps
	index: number
	isLast: boolean
}

export const NewsItem = ({ item, index, isLast }: Props) => {
	return (
		<div className='group relative flex min-h-32 items-start gap-6 px-4 py-4 transition-colors duration-200 hover:bg-gray-100/50'>
			<div className='flex-shrink-0 text-lg font-medium text-gray-900'>
				{String(index + 1).padStart(2, '0')}
			</div>

			<div className='min-w-0 flex-1 transition-transform duration-200 group-hover:translate-x-1'>
				<div>
					<div className='mb-2 text-sm font-normal text-gray-500'>{item.tags?.join(' • ')}</div>

					<Link
						href={item.link}
						target='_blank'
						rel='noopener noreferrer'
						className='block'
					>
						<h3 className='mb-3 text-lg leading-tight font-semibold text-gray-900 transition-colors duration-200 group-hover:text-[#017369]'>
							{truncateText(item.title, 100)}
						</h3>
					</Link>
				</div>

				<div className='mt-4 flex items-center gap-1 text-sm text-gray-500'>
					<EyeIcon size={16} />
					<span>{item.views.toLocaleString('uk-UA')} переглядів</span>
				</div>
			</div>

			<Link
				href={item.link}
				target='_blank'
				rel='noopener noreferrer'
				className='flex-shrink-0'
			>
				<ArrowUpRightIcon
					aria-label='Перейти на сторінку новини'
					aria-hidden='true'
					className='h-5 w-5 text-gray-900 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1'
				/>
			</Link>

			{!isLast && <div className='absolute right-0 bottom-0 left-0 h-px bg-gray-200' />}
		</div>
	)
}

export const NewsItemSkeleton = ({ isLast }: { isLast: boolean }) => (
	<div className='group relative flex min-h-32 items-start gap-6 px-4 py-4 transition-colors duration-200'>
		<div className='flex-shrink-0 text-lg font-medium text-gray-900'>
			<div className='size-6 animate-pulse rounded bg-gray-200'></div>
		</div>

		<div className='min-w-0 flex-1'>
			<div className='mb-2 animate-pulse'>
				<div className='h-4 w-48 rounded bg-gray-200'></div>
			</div>

			<div className='mb-3 animate-pulse space-y-2'>
				<div className='h-5 w-full rounded bg-gray-200'></div>
				<div className='h-5 w-3/4 rounded bg-gray-200'></div>
			</div>

			<div className='mt-3 animate-pulse'>
				<div className='h-4 w-32 rounded bg-gray-200'></div>
			</div>
		</div>

		<div className='flex-shrink-0 animate-pulse'>
			<div className='h-5 w-5 rounded bg-gray-200'></div>
		</div>

		{!isLast && <div className='absolute right-0 bottom-0 left-0 h-px bg-gray-200' />}
	</div>
)
