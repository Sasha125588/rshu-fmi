import { ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'

import type { DocumentItem } from '../../constants/data'

import { cn } from '@/shared/helpers/common'

export const DocumentList = (list: DocumentItem[]) => {
	return (
		<div className='columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3'>
			{list.map((doc, index) => {
				const type = doc.url.endsWith('.pdf') ? 'PDF' : 'WEB'
				const isLongTitle = doc.title.length > 60
				const isMediumTitle = doc.title.length > 40

				return (
					<div
						key={doc.url}
						className={cn(
							'group border-border/50 bg-card hover:border-border hover:shadow-border/20 flex break-inside-avoid flex-col justify-between rounded-lg border p-4 transition-all duration-200 hover:shadow-md',
							isLongTitle ? 'h-auto' : isMediumTitle ? 'h-32' : 'h-30'
						)}
					>
						<div className='mb-2 flex items-center justify-between'>
							<span className='text-primary/80 text-sm font-medium'>
								{String(index + 1).padStart(2, '0')}
							</span>
							<span
								className={cn(
									'rounded-full px-2 py-1 text-xs font-medium',
									type === 'PDF'
										? 'border-green-primary/20 bg-green-primary/10 text-green-primary border'
										: 'bg-muted text-muted-foreground border-border border'
								)}
							>
								{type}
							</span>
						</div>

						<div className='min-w-0 transition-transform duration-200 group-hover:translate-x-1'>
							<Link
								href={doc.url}
								target='_blank'
								rel='noopener noreferrer'
								className='block'
							>
								<h3 className='group-hover:text-green-primary mb-3 line-clamp-3 text-base leading-tight font-semibold transition-colors duration-200'>
									{doc.title}
								</h3>
							</Link>
						</div>

						<div className='flex items-center justify-between'>
							<Link
								href={doc.url}
								target='_blank'
								rel='noopener noreferrer'
								className='text-green-primary text-sm font-medium hover:underline'
							>
								{doc.date ? (
									<p className='text-green-primary text-sm font-medium'>Від {doc.date}</p>
								) : (
									<p className='text-green-primary text-sm font-medium'>Відкрити документ</p>
								)}
							</Link>
							<ArrowUpRightIcon
								aria-label='Відкрити документ'
								aria-hidden='true'
								className='text-green-primary h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1'
							/>
						</div>
					</div>
				)
			})}
		</div>
	)
}
