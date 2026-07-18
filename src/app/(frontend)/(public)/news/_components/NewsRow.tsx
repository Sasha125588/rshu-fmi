import { ArrowUpRightIcon, CalendarDaysIcon, EyeIcon } from 'lucide-react'
import Image from 'next/image'

import { Typography } from '@/components/ui'
import { cn, newsDateFormatter } from '@/lib'
// import { NEWS_SOURCE_CONFIG } from '@/shared/news'

import type { NewsItem } from '@/shared/news'
import type { ReactNode } from 'react'

interface NewsRowProps {
  item: NewsItem
  compact?: boolean
}

interface NewsRowContentProps {
  item: NewsItem
  compact: boolean
  children: ReactNode
}

const NewsRowContent = ({ item, compact, children }: NewsRowContentProps) => {
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
                unoptimized
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

              {children}

              {!!item.tags.length && (
                <Typography
                  as="span"
                  variant="caption"
                  className="text-muted-foreground/65 flex items-center gap-2 leading-5"
                >
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground/35"
                  >
                    ·
                  </span>
                  <span className="font-jetbrains">{item.tags.join(' · ')}</span>
                </Typography>
              )}
            </span>

            <Typography
              as="span"
              variant={compact ? 'title-sm' : 'title-lg'}
              className="line-clamp-3 block transition-colors duration-200"
            >
              {item.title}
            </Typography>

            {item.description && (
              <Typography
                as="span"
                variant={compact ? 'body-sm' : 'body-md'}
                className="text-muted-foreground/85 mt-3 line-clamp-2"
              >
                {item.description}
              </Typography>
            )}
          </span>

          <span className="text-muted-foreground group-hover:text-foreground hidden self-start transition-colors md:block">
            <ArrowUpRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">Відкрити новину на сайті-джерелі в новій вкладці</span>
          </span>
        </a>
      </article>
    </li>
  )
}

export const NewsRow = ({ item, compact = false }: NewsRowProps) =>
  item.source === 'university' ? (
    <NewsRowContent
      item={item}
      compact={compact}
    >
      <Typography
        as="span"
        variant="body-sm"
        className="text-muted-foreground flex items-center gap-1.5"
      >
        <EyeIcon className="size-4" />
        {item.views.toLocaleString('uk-UA')} переглядів
      </Typography>
    </NewsRowContent>
  ) : (
    <NewsRowContent
      item={item}
      compact={compact}
    >
      <Typography
        as="time"
        variant="body-sm"
        dateTime={item.publishedAt}
        className="text-muted-foreground flex items-center gap-1.5"
      >
        <CalendarDaysIcon className="size-4" />
        {newsDateFormatter.format(new Date(item.publishedAt))}
      </Typography>
    </NewsRowContent>
  )
