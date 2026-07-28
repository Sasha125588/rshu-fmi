'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'

import type { Route } from 'next'

const NEWS_SOURCE_LABELS = {
  university: 'РДГУ',
  kitm: 'ІТ&М',
  iktmvi: 'ЦТ&МНІ',
} as const

const buildNewsHref = (source: string, page = 1) =>
  (page === 1 ? `/news/${source}` : `/news/${source}/page/${page}`) as Route

const EXTERNAL_NEWS_SOURCES = ['university', 'kitm', 'iktmvi'] as const

export const NewsSourceNav = () => {
  const pathname = usePathname()
  const activeSource = pathname.split('/')[2]

  return (
    <nav
      aria-label="Джерела новин"
      className="-mx-4 [scrollbar-width:none] overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden"
    >
      <div className="bg-muted/45 flex w-max items-center gap-1 rounded-full border p-1">
        <Link
          href="/news"
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

        <Link
          href="/news/faculty"
          aria-current={activeSource === 'faculty' ? 'page' : undefined}
          className={cn(
            buttonVariants({
              variant: activeSource === 'faculty' ? 'secondary' : 'ghost',
              size: 'sm',
            }),
            'rounded-full px-4'
          )}
        >
          Факультет
        </Link>

        {EXTERNAL_NEWS_SOURCES.map((source) => (
          <Link
            key={source}
            href={buildNewsHref(source)}
            aria-current={activeSource === source ? 'page' : undefined}
            className={cn(
              buttonVariants({
                variant: activeSource === source ? 'secondary' : 'ghost',
                size: 'sm',
              }),
              'rounded-full px-4'
            )}
          >
            {NEWS_SOURCE_LABELS[source]}
          </Link>
        ))}
      </div>
    </nav>
  )
}
