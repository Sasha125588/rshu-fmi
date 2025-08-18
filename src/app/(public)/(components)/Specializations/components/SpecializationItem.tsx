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
		<div className='group border-border bg-accent/5 hover:border-green-primary/30 relative overflow-hidden rounded-xl border p-6 shadow-xs transition-all duration-300 hover:shadow-lg'>
			<div className='from-green-primary/4 to-green-primary/4 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

			<div className='space-y-4'>
				<div className='flex items-start justify-between'>
					<div className='from-green-primary to-green-secondary dark:to-green-secondary group-hover:bg-green-primary/20 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 dark:from-black/60'>
						<IconComponent className='size-6 text-white transition-all duration-300 group-hover:scale-110' />
					</div>
					<Badge
						variant='outline'
						className='bg-accent/10 border-green-primary/40 text-green-primary relative font-semibold backdrop-blur-sm transition-all duration-300'
					>
						{item.date}
					</Badge>
				</div>

				<Link
					href={`/dashboard/specializations/${item.title}`}
					className='group-hover:text-green-primary cursor-pointer text-lg leading-tight font-semibold transition-colors duration-300'
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
							className='group-hover:bg-green-primary/10! group-hover:text-green-primary! dark:group-hover:bg-green-primary/20! bg-accent text-muted-foreground border-none px-2 py-1 text-xs font-medium transition-colors duration-300 dark:group-hover:text-white!'
						>
							{tag}
						</Badge>
					))}
				</div>

				<div className='flex items-center justify-between pt-2'>
					<Button
						variant='link'
						size='sm'
						className='group/btn text-green-primary hover:text-green-secondary cursor-pointer px-0 transition-all duration-300 group-hover:translate-x-1.5'
					>
						Дізнатися більше
						<ArrowUpRight
							size={16}
							aria-label='Перейти на сторінку спеціальності'
							className='transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5'
						/>
					</Button>

					<div className='mx-4 h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

					<span className='text-muted-foreground text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
						Перейти
					</span>
				</div>
			</div>
		</div>
	)
}
