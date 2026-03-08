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

  useEffect(() => {
    if (currentPage === initialPage) {
      setNews(initialNews)
      return
    }

    let cancelled = false

    ;(async () => {
      try {
        const res = await fetch(`/api/news?page=${currentPage}`)
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled) {
          setNews(data.news)
        }
      } catch {
        // On error, keep previous news displayed
      }
    })()

    return () => {
      cancelled = true
    }
  }, [currentPage, initialPage, initialNews])

  const goToPage = (page: number) => {
    const safePage = Math.max(1, Math.min(page, TOTAL_NEWS_PAGES))
    setCurrentPage(safePage)

    requestAnimationFrame(() => {
      document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' })

      const url = new URL(window.location.href)
      url.hash = 'news'
      window.history.replaceState(null, '', url.toString())
    })
  }

  return {
    state: {
      news: news ?? initialNews,
      isLoading: isPending,
      currentPage,
      totalPages: TOTAL_NEWS_PAGES,
    },
    functions: {
      goToPage,
    },
  }
}
