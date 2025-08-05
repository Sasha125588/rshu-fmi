import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import type { SpecializationItem as SpecializationItemProps } from '../constants/types'

interface Props {
	item: SpecializationItemProps
	isLast?: boolean
}

export const SpecializationItem = ({ item, isLast }: Props) => {
	const IconComponent = item.icon

	return (
		<div className='w-full'>
			<div className='flex items-center justify-between gap-6 py-5'>
				<div className='flex flex-1 gap-4'>
					<div className='mt-1 flex-shrink-0'>
						<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#017369]/10'>
							<IconComponent className='h-6 w-6 text-[#017369]' />
						</div>
					</div>
					<div className='flex items-center gap-10'>
						<div className='flex-1'>
							<h3 className='mb-2 text-xl font-semibold text-gray-900'>{item.title}</h3>
							<p className='mb-4 w-lg leading-relaxed text-gray-600'>{item.description}</p>
						</div>
						<div className='flex flex-1 flex-wrap gap-1'>
							{item.tags.map(tag => (
								<Badge
									key={tag}
									variant='outline'
									className='h-8 px-4 py-1 text-sm font-medium'
								>
									{tag}
								</Badge>
							))}
						</div>
					</div>
				</div>

				<div className='flex flex-shrink-0 items-center gap-4'>
					<span className='text-sm font-medium text-gray-500'>{item.date}</span>
					<Button className='cursor-pointer rounded-full bg-black px-6 py-2 text-white transition-colors hover:bg-zinc-800'>
						Детальніше
					</Button>
				</div>
			</div>

			{!isLast && <div className='border-b border-gray-200' />}
		</div>
	)
}
