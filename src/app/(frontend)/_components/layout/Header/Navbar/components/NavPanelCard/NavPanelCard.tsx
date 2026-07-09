import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

import { NavigationMenuLink, Typography } from '@/components/ui'
import { cn } from '@/lib/utils'

import type { NavCardItem } from '../../types'
import type { Route } from 'next'

interface NavPanelCardProps {
  card: NavCardItem
  featured?: boolean
}

export const NavPanelCard = ({ card, featured = false }: NavPanelCardProps) => {
  const Icon = card.icon

  return (
    <NavigationMenuLink
      render={
        <Link
          href={card.href as Route}
          target={card.external ? '_blank' : undefined}
          rel={card.external ? 'noopener noreferrer' : undefined}
        />
      }
      className={cn(
        'group bg-card text-card-foreground hover:border-foreground/20 hover:bg-accent/55 focus:bg-accent/55 flex-col items-stretch gap-0 rounded-lg border transition-colors',
        featured
          ? 'relative row-span-2 flex min-h-[292px] overflow-hidden p-4'
          : 'flex min-h-[140px] flex-col p-4'
      )}
    >
      {featured && (
        <span className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_20%,transparent)_1px,transparent_1px)] bg-size-[10px_10px] opacity-60" />
      )}

      <span className={cn('flex flex-col', featured && 'relative mt-auto w-full')}>
        <span className="bg-foreground text-background mb-7 flex size-8 items-center justify-center rounded-md">
          <Icon />
        </span>

        <span className="flex items-start justify-between gap-4">
          <Typography
            as="span"
            variant={featured ? 'title-sm' : 'label'}
            className={cn(
              'text-foreground',
              featured ? 'leading-6 tracking-normal text-wrap' : 'text-[15px]'
            )}
          >
            {card.title}
          </Typography>
          <ArrowRightIcon className="text-muted-foreground group-hover:text-foreground mt-0.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </span>

        <Typography
          as="span"
          variant="body-sm"
          className={cn(
            'text-muted-foreground mt-2',
            featured ? 'max-w-sm leading-6' : 'leading-5'
          )}
        >
          {card.description}
        </Typography>
      </span>
    </NavigationMenuLink>
  )
}
