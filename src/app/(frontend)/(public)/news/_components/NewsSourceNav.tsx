'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'
import { NEWS_SOURCE_CONFIG } from '@/shared/news/config'
import { EXTERNAL_NEWS_SOURCES } from '@/shared/news/types'

interface NewsSourceNavViewProps {
  activeSource: string | null
}

export const NewsSourceNav = () => {
  const selectedSegment = useSelectedLayoutSegment()

  return <NewsSourceNavView activeSource={selectedSegment ?? 'overview'} />
}

const NewsSourceNavView = ({ activeSource }: NewsSourceNavViewProps) => (
  <nav
    aria-label="Джерела новин"
    className="-mx-4 [scrollbar-width:none] overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden"
  >
    <div className="bg-muted/45 flex w-max items-center gap-1 rounded-full border p-1">
      <Link
        href="/news"
        aria-current={activeSource === 'overview' ? 'page' : undefined}
        className={cn(
          buttonVariants({
            variant: activeSource === 'overview' ? 'secondary' : 'ghost',
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
          href={`/news/${source}`}
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

export const NewsSourceNavFallback = () => <NewsSourceNavView activeSource={null} />
