import { useSearchParams } from 'next/navigation'
import { startTransition, useEffect, useRef, useState } from 'react'

import { TOTAL_NEWS_PAGES } from '../constants/data'

import type { NewsItem as NewsItemProps } from '../constants/types'

interface Props {
  initialNews: NewsItemProps[]
  initialPage: number
}

const clampPage = (page: number) => Math.max(1, Math.min(page, TOTAL_NEWS_PAGES))

export const useNews = ({ initialNews, initialPage }: Props) => {
  const searchParams = useSearchParams()
  const parsed = Number(searchParams.get('news-page'))
  const currentPage = Number.isInteger(parsed) ? clampPage(parsed) : initialPage

  const [news, setNews] = useState<NewsItemProps[]>(initialNews)
  const [isLoading, setIsLoading] = useState(false)

  const cacheRef = useRef(new Map<number, NewsItemProps[]>([[initialPage, initialNews]]))

  useEffect(() => {
    const cached = cacheRef.current.get(currentPage)

    if (cached) {
      setNews(cached)
      return
    }

    const controller = new AbortController()

    setIsLoading(true)

    ;(async () => {
      try {
        const res = await fetch(`/api/news?page=${currentPage}`, {
          signal: controller.signal,
        })

        if (!res.ok) return

        const data: { news: NewsItemProps[] } = await res.json()

        cacheRef.current.set(currentPage, data.news)
        startTransition(() => {
          setNews(data.news)
        })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    })()

    return () => {
      controller.abort()
    }
  }, [currentPage])

  // const goToPage = (page: number) => {
  //   const safePage = Math.max(1, Math.min(page, TOTAL_NEWS_PAGES))
  //   setCurrentPage(safePage)

  //   requestAnimationFrame(() => {
  //     document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' })

  //     const url = new URL(window.location.href)
  //     url.hash = 'news'
  //     window.history.replaceState(null, '', url.toString())
  //   })
  // }

  return {
    state: {
      news,
      isLoading,
      currentPage,
      totalPages: TOTAL_NEWS_PAGES,
    },
    functions: {
      // goToPage,
    },
  }
}
