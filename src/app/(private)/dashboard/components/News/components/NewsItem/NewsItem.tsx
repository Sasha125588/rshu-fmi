import { ArrowUpRightIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'

import { NewsItem as NewsItemProps } from '../../constants/types'

interface Props {
	item: NewsItemProps
	index: number
	isLast: boolean
}

export const NewsItem = ({ item, index, isLast }: Props) => {
	return (
		<div className='group relative flex min-h-36 items-start gap-6 px-4 py-6 transition-colors duration-200 hover:bg-gray-100/50'>
			<div className='flex-shrink-0 text-lg font-medium text-gray-900'>
				{String(index + 1).padStart(2, '0')}
			</div>

			<div className='min-w-0 flex-1 transition-transform duration-200 group-hover:translate-x-1'>
				<div className='mb-2 text-sm font-normal text-gray-500'>{item.tags?.join(' • ')}</div>

				<Link
					href={item.link}
					target='_blank'
					rel='noopener noreferrer'
					className='block'
				>
					<h3 className='text-lg leading-tight font-semibold text-gray-900 transition-colors duration-200 group-hover:text-[#017369]'>
						{item.title}
					</h3>
				</Link>
				<div className='mt-5 flex items-center gap-1 text-sm text-gray-500'>
					<EyeIcon className='h-4 w-4' />
					<span>{item.views.toLocaleString('uk-UA')} переглядів</span>
				</div>
			</div>

			<Link
				href={item.link}
				target='_blank'
				rel='noopener noreferrer'
				className='flex-shrink-0'
			>
				<ArrowUpRightIcon className='h-5 w-5 text-gray-900 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1' />
			</Link>

			{!isLast && <div className='absolute right-0 bottom-0 left-0 h-px bg-gray-200' />}
		</div>
	)
}
