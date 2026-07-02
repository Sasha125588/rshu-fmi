import { ArrowUpRightIcon } from 'lucide-react'

import { NewsPagination } from './NewsPagination'
import { NewsRow } from './NewsRow'
import { buttonVariants } from '@/components/ui/button'
import { NEWS_SOURCE_CONFIG } from '@/shared/news'

import type { NewsItem, NewsSource } from '@/shared/news'

interface NewsArchiveProps<S extends NewsSource> {
  source: S
  page: number
  news: NewsItem<S>[]
}

export const NewsArchive = <S extends NewsSource>({ source, page, news }: NewsArchiveProps<S>) => {
  const config = NEWS_SOURCE_CONFIG[source]

  return (
    <section
      aria-labelledby="archive-heading"
      className="px-4 py-12 md:px-12 md:py-16"
    >
      <div className="flex flex-col gap-6 border-b pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-jetbrains text-muted-foreground text-xs">
            Сторінка {page} із {config.pageCount}
          </p>
          <h2
            id="archive-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl"
          >
            {config.fullLabel}
          </h2>
        </div>

        <a
          href={config.archiveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          Відкрити джерело
          <ArrowUpRightIcon data-icon="inline-end" />
        </a>
      </div>

      <div className="mt-2">
        <ul>
          {news.map((item, index) => (
            <NewsRow
              key={`${item.source}-${item.link}`}
              item={item}
              isLast={index === news.length - 1}
            />
          ))}
        </ul>
      </div>

      <div className="mt-10 border-t pt-8">
        <NewsPagination
          source={source}
          currentPage={page}
          totalPages={config.pageCount}
        />
      </div>
    </section>
  )
}
