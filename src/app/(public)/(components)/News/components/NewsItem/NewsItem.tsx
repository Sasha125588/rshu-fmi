import { ArrowUpRightIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'

import type { NewsItem as NewsItemProps } from '../../constants/types'

import { truncateText } from '@/shared/helpers/text/truncateText'

interface Props {
	item: NewsItemProps
	index: number
	isLast: boolean
}

export const NewsItem = ({ item, index, isLast }: Props) => (
	<div className='group hover:bg-accent-foreground/5 relative flex min-h-32 items-start gap-6 px-4 py-4 transition-colors duration-200'>
		<div className='flex-shrink-0 text-lg font-medium'>{String(index + 1).padStart(2, '0')}</div>

		<div className='min-w-0 flex-1 transition-transform duration-200 group-hover:translate-x-1'>
			<div>
				<div className='text-muted-foreground mb-2 text-sm font-normal'>
					{item.tags?.join(' • ')}
				</div>

				<Link
					href={item.link}
					target='_blank'
					rel='noopener noreferrer'
					className='block'
				>
					<h3 className='group-hover:text-green-primary mb-3 text-lg leading-tight font-semibold transition-colors duration-200'>
						{truncateText(item.title, 100)}
					</h3>
				</Link>
			</div>

			<div className='text-muted-foreground mt-4 flex items-center gap-1 text-sm'>
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
				className='h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1'
			/>
		</Link>

		{!isLast && <div className='bg-border absolute right-0 bottom-0 left-0 h-px' />}
	</div>
)

export const NewsItemSkeleton = ({ isLast }: { isLast: boolean }) => (
	<div className='group relative flex min-h-32 items-start gap-6 px-4 py-4 transition-colors duration-200'>
		<div className='flex-shrink-0 text-lg font-medium'>
			<div className='bg-border size-6 animate-pulse rounded'></div>
		</div>

		<div className='min-w-0 flex-1'>
			<div className='mb-2 animate-pulse'>
				<div className='bg-border h-4 w-48 rounded'></div>
			</div>

			<div className='mb-3 animate-pulse space-y-2'>
				<div className='bg-border h-5 w-full rounded'></div>
				<div className='bg-border h-5 w-3/4 rounded'></div>
			</div>

			<div className='mt-3 animate-pulse'>
				<div className='bg-border h-4 w-32 rounded'></div>
			</div>
		</div>

		<div className='flex-shrink-0 animate-pulse'>
			<div className='bg-border h-5 w-5 rounded'></div>
		</div>

		{!isLast && <div className='bg-border absolute right-0 bottom-0 left-0 h-px' />}
	</div>
)
