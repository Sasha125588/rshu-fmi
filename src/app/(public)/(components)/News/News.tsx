'use client'

import { ArrowRightIcon, NewspaperIcon } from 'lucide-react'
import Link from 'next/link'

import { NewsItem, NewsItemSkeleton } from './components/NewsItem/NewsItem'
import { NewsPagination } from './components/NewsPagination/NewsPagination'
import { useNews } from './hooks/useNews'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/shared/helpers'

import type { NewsItem as NewsItemProps } from './constants/types'

interface Props {
  initialNews: NewsItemProps[]
  initialPage: number
}

export const News = ({ initialNews, initialPage }: Props) => {
  const { state } = useNews({ initialNews, initialPage })

  return (
    <section
      id="news"
      aria-labelledby="news-heading"
    >
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <NewspaperIcon
            aria-hidden="true"
            className="text-green-primary h-5 w-5"
          />
          <Badge
            className="border-green-primary/20 text-green-primary text-sm font-normal"
            variant="outline"
          >
            Останні новини
          </Badge>
        </div>
        <h2
          id="news-heading"
          className="mt-6 text-3xl font-semibold"
        >
          Що відбувається в університеті
        </h2>
        <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-lg">
          Слідкуйте за останніми подіями та досягненнями нашого університету
        </p>
      </div>

      <div className="mb-4 pt-10">
        <NewsPagination currentPage={state.currentPage} />
      </div>

      <ul
        aria-busy={state.isLoading}
        className={cn(
          'transition-opacity duration-150',
          state.isLoading ? 'opacity-60' : 'opacity-100'
        )}
      >
        {state.news.map((newsItem, index) => (
          <NewsItem
            key={`${state.currentPage}-${newsItem.link}`}
            item={newsItem}
            currentPage={state.currentPage}
            index={index}
            isLast={index === state.news.length - 1}
          />
        ))}
      </ul>

      <div className="mt-4 flex justify-center">
        <Button
          asChild
          variant="green-ghost"
          className="group text-green-primary border-green-primary/15 hover:bg-green-primary/15 hover:text-green-primary flex cursor-pointer items-center gap-3 rounded-full border px-6 py-3 transition-all duration-200"
        >
          <Link
            href="https://www.rshu.edu.ua/novyny-rdhu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-[15px] font-medium">Усі новини університету</span>
            <ArrowRightIcon
              aria-hidden="true"
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </Button>
      </div>
    </section>
  )
}

export const NewsSkeleton = () => (
  <ul className="space-y-0">
    {Array.from({ length: 10 }).map((_, index) => (
      <NewsItemSkeleton
        key={`skeleton-${index}`}
        isLast={index === 9}
      />
    ))}
  </ul>
)
