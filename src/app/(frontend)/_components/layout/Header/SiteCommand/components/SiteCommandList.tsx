'use client'

import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

import { getDestinationGroups } from '../helpers/destinations'
import {
  Badge,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui'

import type { Route } from 'next'

interface SiteCommandListProps {
  query: string
  onSelect: (href: Route) => void
}

export const SiteCommandList = ({ query, onSelect }: SiteCommandListProps) => {
  const pathname = usePathname()
  const groups = getDestinationGroups(query)

  return (
    <CommandList
      label="Розділи сайту"
      className="scroll-fade-b max-h-[min(22rem,45dvh)] overscroll-contain px-3 py-2 [--scroll-fade-b-size:1rem]"
    >
      <CommandEmpty className="text-muted-foreground">
        Розділів не знайдено. Спробуйте коротший запит.
      </CommandEmpty>
      {groups.map(({ heading, items }, index) => (
        <Fragment key={heading}>
          {index > 0 && <CommandSeparator alwaysRender />}
          <CommandGroup heading={heading}>
            {items.map(({ href, title, icon: Icon }) => {
              const isCurrentPage = pathname === href

              return (
                <CommandItem
                  key={href}
                  value={href}
                  aria-current={isCurrentPage ? 'page' : undefined}
                  className="min-h-11 cursor-pointer gap-3"
                  onSelect={() => onSelect(href)}
                >
                  <Icon
                    aria-hidden
                    className="text-muted-foreground"
                  />
                  <span>{title}</span>
                  {isCurrentPage && (
                    <CommandShortcut>
                      <Badge
                        variant="outline"
                        className="border-accent-violet/20 bg-accent-violet/10 text-accent-violet tracking-normal"
                      >
                        Ви тут
                      </Badge>
                    </CommandShortcut>
                  )}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Fragment>
      ))}
    </CommandList>
  )
}
