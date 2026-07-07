import { ArrowUpRightIcon } from 'lucide-react'

import { NewsPagination } from './NewsPagination'
import { NewsRow } from './NewsRow'
import { Typography } from '@/components/ui'
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
          <Typography
            as="p"
            variant="caption"
            className="font-jetbrains text-muted-foreground"
          >
            Сторінка {page} із {config.pageCount}
          </Typography>
          <Typography
            as="h2"
            id="archive-heading"
            variant="heading-lg"
            className="mt-3"
          >
            {config.fullLabel}
          </Typography>
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
        <ul className="divide-y">
          {news.map((item) => (
            <NewsRow
              key={`${item.source}-${item.link}`}
              item={item}
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
