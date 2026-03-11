import { TOTAL_NEWS_PAGES } from '../../../constants/data'

import type { Route } from 'next'

interface usePaginationProps {
  currentPage: number
  itemsToDisplay: number
}

export const usePagination = ({ currentPage, itemsToDisplay = 5 }: usePaginationProps) => {
  const half = Math.floor(itemsToDisplay / 2)

  let start = currentPage - half
  let end = currentPage + half

  if (start < 1) {
    start = 1
    end = itemsToDisplay
  }

  if (end > TOTAL_NEWS_PAGES) {
    end = TOTAL_NEWS_PAGES
    start = Math.max(1, TOTAL_NEWS_PAGES - itemsToDisplay + 1)
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= TOTAL_NEWS_PAGES

  function makeHref(page: number) {
    const safePage = Math.min(Math.max(page, 1), TOTAL_NEWS_PAGES)
    return (safePage === 1 ? '/#news' : `/?news-page=${safePage}#news`) as Route
  }

  return {
    state: {
      pages,
      showLeftEllipsis: start > 1,
      showRightEllipsis: end < TOTAL_NEWS_PAGES,
      prevDisabled,
      nextDisabled,
    },
    functions: {
      makeHref,
    },
  }
}
