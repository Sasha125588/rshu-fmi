'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/animate-ui/radix/hover-card'
import { Badge } from '@/components/ui/badge'
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
  if (!item.hasDropdown) {
    return (
      <Link href={item.href as Route}>
        <Badge
          className="text-sm font-medium"
          variant={variant}
        >
          {item.name}
        </Badge>
      </Link>
    )
  }

  return (
    <HoverCard
      openDelay={0}
      closeDelay={0}
    >
      <HoverCardTrigger asChild>
        <Link href={item.href as Route}>
          <Badge
            variant={variant}
            className={cn(
              'flex cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors',
              variant === 'outline' &&
                'border-green-primary hover:bg-green-primary dark:border-green-primary/40 dark:hover:bg-green-primary/20'
            )}
          >
            {item.name}
            <ChevronDown size={16} />
          </Badge>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        side="bottom"
        align="center"
        className={cn(
          'border-t-green-primary dark:border-t-green-primary/60 bg-background w-auto min-w-[200px] border-t-2'
        )}
      >
        {item.component}
      </HoverCardContent>
    </HoverCard>
  )
}
