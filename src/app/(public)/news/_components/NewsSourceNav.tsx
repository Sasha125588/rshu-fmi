import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NEWS_SOURCES, NEWS_SOURCE_CONFIG, getNewsArchiveHref } from '@/shared/news'

import type { NewsSource } from '@/shared/news'
import type { Route } from 'next'

interface NewsSourceNavProps {
  activeSource?: NewsSource
}

export const NewsSourceNav = ({ activeSource }: NewsSourceNavProps) => (
  <nav
    aria-label="Джерела новин"
    className="-mx-4 [scrollbar-width:none] overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden"
  >
    <div className="bg-muted/45 flex w-max items-center gap-1 rounded-full border p-1">
      <Link
        href={'/news' as Route}
        aria-current={activeSource === undefined ? 'page' : undefined}
        className={cn(
          buttonVariants({
            variant: activeSource === undefined ? 'secondary' : 'ghost',
            size: 'sm',
          }),
          'rounded-full px-4'
        )}
      >
        Огляд
      </Link>

      {NEWS_SOURCES.map((source) => (
        <Link
          key={source}
          href={getNewsArchiveHref(source)}
          aria-current={activeSource === source ? 'page' : undefined}
          className={cn(
            buttonVariants({
              variant: activeSource === source ? 'secondary' : 'ghost',
              size: 'sm',
            }),
            'rounded-full px-4'
          )}
        >
          {NEWS_SOURCE_CONFIG[source].label}
        </Link>
      ))}
    </div>
  </nav>
)
