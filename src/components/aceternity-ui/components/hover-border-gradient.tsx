'use client'

import { motion } from 'motion/react'
import React from 'react'

import { cn } from '@/lib/utils'

export const HoverBorderGradient = ({
	children,
	containerClassName,
	className,
	as: Tag = 'button',
	onClick,
	...props
}: React.PropsWithChildren<
	{
		as?: React.ElementType
		containerClassName?: string
		className?: string
		onClick?: React.MouseEventHandler<HTMLElement>
	} & Omit<React.HTMLAttributes<HTMLElement>, 'onClick'>
>) => {
	const highlight =
		'radial-gradient(75% 181.15942028985506% at 50% 50%, #017369 0%, rgba(255, 255, 255, 0) 100%)'

	return (
		<motion.div
			className={cn(
				'relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-full border bg-black/20 decoration-clone p-px transition duration-500 hover:bg-black/10 dark:bg-white/20',
				containerClassName
			)}
			whileHover='hover'
			initial='initial'
			onClick={onClick}
		>
			<Tag
				className={cn(
					'relative z-10 w-auto rounded-[inherit] bg-black px-4 py-2 text-white',
					className
				)}
				{...props}
			>
				{children}
			</Tag>
			<motion.div
				className='absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]'
				style={{
					filter: 'blur(2px)',
					position: 'absolute',
					width: '100%',
					height: '100%',
					background: highlight
				}}
				variants={{
					initial: {
						opacity: 0,
						transition: { duration: 0.6, ease: 'linear' }
					},
					hover: {
						opacity: 1,
						transition: { duration: 0.6, ease: 'linear' }
					}
				}}
			/>
			<div className='absolute inset-[2px] z-1 flex-none rounded-[100px] bg-black' />
		</motion.div>
	)
}
