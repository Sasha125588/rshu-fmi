import { ExternalLinkIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { NewsItem as NewsItemProps } from '../constants/types'

interface Props {
	item: NewsItemProps
}

export const NewsItem = ({ item }: Props) => {
	return (
		<div className='relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-[#017369]/30 hover:shadow-lg'>
			<div className='flex items-start justify-between gap-6'>
				<div className='flex-1'>
					<Link
						href={item.link}
						target='_blank'
						rel='noopener noreferrer'
					>
						<h3 className='mb-4 text-xl leading-tight font-semibold text-gray-900 transition-colors duration-200 group-hover:text-[#017369]'>
							{item.title}
						</h3>
					</Link>
				</div>

				<Link
					href={item.link}
					target='_blank'
					rel='noopener noreferrer'
				>
					<Button
						size='sm'
						className='flex cursor-pointer items-center gap-2 rounded-full bg-[#017369] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#01635b] hover:shadow-md'
					>
						<p>Читати</p>
						<ExternalLinkIcon className='h-4 w-4' />
					</Button>
				</Link>
			</div>
			<div className='mt-auto flex items-center gap-4 text-sm text-gray-500'>
				<div className='flex items-center gap-1'>
					<EyeIcon className='h-4 w-4' />
					<span>{item.views.toLocaleString('uk-UA')} переглядів</span>
				</div>
				{item.tags && (
					<Badge
						variant='outline'
						className='h-6 border-[#017369]/20 px-2 text-xs font-medium text-[#017369]'
					>
						{item.tags.join(' • ')}
					</Badge>
				)}
			</div>
		</div>
	)
}
