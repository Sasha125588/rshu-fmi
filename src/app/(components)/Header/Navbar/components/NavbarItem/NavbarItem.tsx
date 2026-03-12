'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/animate-ui/radix/hover-card'
import { cn } from '@/shared/helpers/common/cn'

import type { NavbarDataItem } from '../../constants/types'
import type { Route } from 'next'

export const NavbarItem = ({
  item,
  variant,
}: {
  item: NavbarDataItem
  variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'link'
}) => {
  const baseStyles = cn(
    'flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150',
    variant === 'link' && 'text-muted-foreground hover:text-foreground hover:bg-white/5',
    variant === 'outline' &&
      'text-green-primary border-green-primary/20 hover:bg-green-primary/10 border'
  )

  if (!item.hasDropdown) {
    return (
      <Link
        href={item.href as Route}
        className={baseStyles}
      >
        {item.name}
      </Link>
    )
  }

  return (
    <HoverCard
      openDelay={0}
      closeDelay={0}
    >
      <HoverCardTrigger asChild>
        <Link
          href={item.href as Route}
          className={cn(baseStyles, 'cursor-pointer')}
        >
          {item.name}
          <ChevronDown size={14} />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        side="bottom"
        align="center"
        className="border-t-green-primary dark:border-t-green-primary/60 bg-background w-auto min-w-[200px] border-t-2"
      >
        {item.component}
      </HoverCardContent>
    </HoverCard>
  )
}
