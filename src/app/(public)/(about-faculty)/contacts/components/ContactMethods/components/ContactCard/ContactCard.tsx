import * as React from 'react'

import { cn } from '@/shared/helpers/common/cn'

const ContactCard = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		data-slot='card'
		className={cn(
			'text-card-foreground bg-background border-border flex h-full flex-col gap-6 rounded-2xl border p-8 shadow-sm',
			className
		)}
		{...props}
	/>
)

const ContactCardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		data-slot='card-header'
		className={cn(
			'@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
			className
		)}
		{...props}
	/>
)

const ContactCardTitle = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		data-slot='card-title'
		className={cn(
			'text-foreground flex items-center gap-3 text-2xl leading-none font-semibold',
			className
		)}
		{...props}
	/>
)

const ContactCardContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		data-slot='card-content'
		className={cn('flex h-full flex-col space-y-4', className)}
		{...props}
	/>
)

const ContactCardContentHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		data-slot='card-content-header'
		className={cn('flex-1 rounded-lg bg-green-50 p-4 dark:bg-emerald-950', className)}
		{...props}
	/>
)

const ContactCardContentFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		data-slot='card-content-footer'
		className={cn('dark:bg-card flex-1 rounded-lg bg-blue-50 p-4', className)}
		{...props}
	/>
)

export {
	ContactCard,
	ContactCardHeader,
	ContactCardTitle,
	ContactCardContent,
	ContactCardContentHeader,
	ContactCardContentFooter
}
