'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/animate-ui/radix/tooltip'
import { Badge } from '@/components/ui/badge'

import type { NavbarDataItem } from '../constants/types'

import { cn } from '@/shared/helpers/common/cn'

export const NavbarItem = ({
	item,
	variant
}: {
	item: NavbarDataItem
	variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'link'
}) => {
	if (!item.hasDropdown) {
		return (
			<Link href={item.href}>
				<Badge
					className='text-sm font-medium'
					variant={variant}
				>
					{item.name}
				</Badge>
			</Link>
		)
	}

	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					<Link href={item.href}>
						<Badge
							variant={variant}
							className={cn(
								'flex cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors',
								variant === 'outline' &&
									'border-green-primary hover:bg-green-primary dark:border-green-primary/40 dark:hover:bg-green-primary/20'
							)}
						>
							{item.name}
							{item.hasDropdown && <ChevronDown size={16} />}
						</Badge>
					</Link>
				</TooltipTrigger>
				<TooltipContent
					arrow={false}
					side='bottom'
					className='border-t-green-primary dark:border-t-green-primary/60 bg-background border-t-2 text-black'
				>
					{item.component}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
