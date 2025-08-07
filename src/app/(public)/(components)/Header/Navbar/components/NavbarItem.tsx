import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'

import type { NavbarDataItem } from '../constants/types'

import { cn } from '@/lib/utils'

export const NavbarItem = ({
	item,
	variant
}: {
	item: NavbarDataItem
	variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'link'
}) => {
	return (
		<Link href={item.href}>
			<Badge
				variant={variant}
				className={cn(
					'flex cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors',
					variant === 'outline' && 'border-[#017369] hover:bg-[#017369] hover:text-white'
				)}
			>
				{item.name}
				<ChevronDown className='size-4' />
			</Badge>{' '}
		</Link>
	)
}
