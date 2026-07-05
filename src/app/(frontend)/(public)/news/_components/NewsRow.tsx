import { ArrowUpRightIcon, CalendarDaysIcon, EyeIcon } from 'lucide-react'
import Image from 'next/image'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
// import { NEWS_SOURCE_CONFIG } from '@/shared/news'

import type { NewsItem } from '@/shared/news'

interface NewsRowProps {
  item: NewsItem
  compact?: boolean
  isLast?: boolean
}

const dateFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Kyiv',
})

const formatPublishedAt = (value: string) => dateFormatter.format(new Date(`${value}T12:00:00Z`))

export const NewsRow = ({ item, compact = false, isLast = false }: NewsRowProps) => {
  // const source = NEWS_SOURCE_CONFIG[item.source]

  return (
    <li className="group relative">
      <span
        aria-hidden="true"
        className="bg-accent-violet/60 absolute top-5 bottom-5 left-0 z-10 w-0.5 origin-center scale-y-0 rounded-full transition-transform duration-300 group-focus-within:scale-y-100 group-hover:scale-y-100"
      />

      <article>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'hover:bg-foreground/[0.035] focus-visible:ring-ring grid gap-5 rounded-lg px-4 py-6 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:items-center',
            item.previewImage && !compact
              ? 'md:grid-cols-[220px_minmax(0,1fr)_auto]'
              : 'md:grid-cols-[minmax(0,1fr)_auto]'
          )}
        >
          {item.previewImage && !compact ? (
            <span className="bg-muted relative block aspect-[16/9] overflow-hidden rounded-md md:aspect-auto md:h-[140px]">
              <Image
                src={item.previewImage}
                alt=""
                fill
                loading="lazy"
                sizes="(max-width: 767px) calc(100vw - 4rem), 220px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </span>
          ) : null}

          <span className="min-w-0">
            <span className="mb-3 flex flex-wrap items-center gap-2">
              {/* <Badge
                variant="outline"
                className="font-jetbrains text-muted-foreground rounded-full text-[11px] tracking-wide uppercase"
              >
                {source.badgeLabel}
              </Badge> */}

              {item.source === 'university' ? (
                <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
                  <EyeIcon className="size-4" />
                  {item.views.toLocaleString('uk-UA')} переглядів
                </span>
              ) : (
                <time
                  dateTime={item.publishedAt}
                  className="text-muted-foreground flex items-center gap-1.5 text-sm"
                >
                  <CalendarDaysIcon className="size-4" />
                  {formatPublishedAt(item.publishedAt)}
                </time>
              )}

              {!!item.tags.length && (
                <span className="text-muted-foreground/65 flex items-center gap-2 text-xs leading-5">
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground/35"
                  >
                    ·
                  </span>
                  <span className="font-jetbrains">{item.tags.join(' · ')}</span>
                </span>
              )}
            </span>

            <span
              className={cn(
                'block font-semibold tracking-tight text-balance',
                compact
                  ? 'line-clamp-3 text-lg leading-snug'
                  : 'line-clamp-3 text-xl leading-snug md:text-2xl'
              )}
            >
              {item.title}
            </span>

            {item.description && (
              <span
                className={cn(
                  'text-muted-foreground/85 mt-3 leading-6',
                  compact ? 'line-clamp-2 text-sm' : 'line-clamp-3'
                )}
              >
                {item.description}
              </span>
            )}
          </span>

          <span className="text-muted-foreground group-hover:text-foreground hidden self-start transition-colors md:block">
            <ArrowUpRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">Відкрити новину на сайті-джерелі в новій вкладці</span>
          </span>
        </a>
      </article>
      {!isLast ? <Separator /> : null}
    </li>
  )
}
