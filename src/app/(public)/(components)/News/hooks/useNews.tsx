import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect, useState, useTransition } from 'react'

import { TOTAL_NEWS_PAGES } from '../constants/data'

import type { NewsItem as NewsItemProps } from '../constants/types'

interface Props {
  initialNews: NewsItemProps[]
  initialPage: number
}

export const useNews = ({ initialNews, initialPage }: Props) => {
  const [isPending, startTransition] = useTransition()
  const [currentPage, setCurrentPage] = useQueryState(
    'news-page',
    parseAsInteger.withDefault(initialPage).withOptions({ shallow: true, startTransition })
  )
  const [news, setNews] = useState<NewsItemProps[]>(initialNews)

  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= TOTAL_NEWS_PAGES

  useEffect(() => {
    if (currentPage === initialPage) {
      setNews(initialNews)
      return
    }
    ;(async () => {
      const res = await fetch(`/api/news?page=${currentPage}`)
      const data = await res.json()
      setNews(data.news)
    })()
  }, [currentPage])

  const goToPage = (page: number) => {
    const safePage = Math.max(1, Math.min(page, TOTAL_NEWS_PAGES))

    startTransition(() => {
      setCurrentPage(safePage)
    })
  }

  return {
    state: {
      news: news ?? initialNews,
      isLoading: isPending,
      currentPage,
      totalPages: TOTAL_NEWS_PAGES,
      prevDisabled,
      nextDisabled,
    },
    functions: {
      goToPage,
    },
  }
}
