import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import type { SpecializationItem as SpecializationItemProps } from '../constants/types'

interface Props {
	item: SpecializationItemProps
}

export const SpecializationItem = ({ item }: Props) => {
	const IconComponent = item.icon

	return (
		<div className='group border-border bg-accent/5 relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:border-[#017369]/30 hover:shadow-lg'>
			<div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-[#017369]/4 via-transparent to-[#017369]/4 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

			<div className='space-y-4'>
				<div className='flex items-start justify-between'>
					<div className='flex items-center gap-3'>
						<div className='flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#017369] to-[#015951] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#017369]/20'>
							<IconComponent className='size-6 text-white transition-all duration-300 group-hover:scale-110' />
						</div>
					</div>
					<Badge
						variant='outline'
						className='bg-accent/10 relative border-[#017369]/40 font-semibold text-[#017369] backdrop-blur-sm transition-all duration-300'
					>
						{item.date}
					</Badge>
				</div>

				<Link
					href={`/dashboard/specializations/${item.title}`}
					className='cursor-pointer text-lg leading-tight font-semibold transition-colors duration-300 hover:text-[#017369]'
				>
					{item.title}
				</Link>

				<p className='text-muted-foreground line-clamp-3 text-sm leading-relaxed'>
					{item.description}
				</p>

				<div className='flex flex-wrap gap-1.5'>
					{item.tags.map(tag => (
						<Badge
							variant='outline'
							key={tag}
							className='inline-block border-none bg-gray-100! px-2 py-1 text-xs font-medium text-gray-600 transition-colors duration-300 group-hover:bg-[#017369]/10! group-hover:text-[#017369]! dark:group-hover:bg-[#017369]/20! dark:group-hover:text-white!'
						>
							{tag}
						</Badge>
					))}
				</div>

				<div className='flex items-center justify-between pt-2'>
					<Button
						variant='link'
						size='sm'
						className='group/btn cursor-pointer px-0 text-[#017369] transition-all duration-300 group-hover:translate-x-1.5 hover:text-[#015951]'
					>
						Дізнатися більше
						<ArrowUpRight
							size={16}
							aria-label='Перейти на сторінку спеціальності'
							className='transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5'
						/>
					</Button>

					<div className='mx-4 h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

					<span className='text-xs text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
						Перейти
					</span>
				</div>
			</div>
		</div>
	)
}
