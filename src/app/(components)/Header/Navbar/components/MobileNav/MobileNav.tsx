'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { NAVBAR_DOWN_DATA, NAVBAR_UP_DATA } from '../../constants/data'

import { cn } from '@/shared/helpers/common'

const menuAnimation = {
	initial: { opacity: 0, height: 0 },
	animate: { opacity: 1, height: 'auto' },
	exit: { opacity: 0, height: 0 }
}

export const MobileNav = () => {
	const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

	const toggleItem = (name: string) => {
		setOpenItems(prev => ({
			...prev,
			[name]: !prev[name]
		}))
	}

	const renderNavItems = (items: typeof NAVBAR_UP_DATA.items) => {
		return items.map(item => (
			<div
				key={item.name}
				className='py-1'
			>
				{item.hasDropdown ? (
					<div>
						<button
							className='hover:text-green-primary flex w-full items-center justify-between py-2 text-sm font-medium transition-colors'
							onClick={() => toggleItem(item.name)}
						>
							{item.name}
							<ChevronDown
								className={cn(
									'h-4 w-4 transition-transform duration-200',
									openItems[item.name] ? 'rotate-180' : ''
								)}
							/>
						</button>
						<AnimatePresence>
							{openItems[item.name] && (
								<motion.div
									initial='initial'
									animate='animate'
									exit='exit'
									variants={menuAnimation}
									transition={{ duration: 0.2, ease: 'easeInOut' }}
									className='overflow-hidden'
								>
									<div className='pt-2 pl-2'>{item.component}</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				) : (
					<Link
						href={item.href}
						className='hover:text-green-primary block py-2 text-sm font-medium transition-colors'
					>
						{item.name}
					</Link>
				)}
			</div>
		))
	}

	return (
		<div className='flex h-full flex-col gap-6 overflow-auto pt-6 pb-10'>
			<div className='flex-1'>
				<div className='space-y-2 px-6'>
					{renderNavItems(NAVBAR_UP_DATA.items)}
					<div className='bg-border my-4 h-px' />
					{renderNavItems(NAVBAR_DOWN_DATA.items)}
				</div>
			</div>
		</div>
	)
}
