import { TOTAL_NEWS_PAGES } from '../../../constants/data'

import type { Route } from 'next'

interface usePaginationProps {
  currentPage: number
  totalPages: number
  itemsToDisplay: number
  goToPage: (page: number) => void
}

export const usePagination = ({
  currentPage,
  totalPages,
  itemsToDisplay = 5,
  goToPage,
}: usePaginationProps) => {
  const half = Math.floor(itemsToDisplay / 2)

  let start = currentPage - half
  let end = currentPage + half

  if (start < 1) {
    start = 1
    end = itemsToDisplay
  }

  if (end > totalPages) {
    end = totalPages
    start = totalPages - itemsToDisplay + 1
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= TOTAL_NEWS_PAGES

  function makeHref(page: number) {
    return (page === 1 ? '/#news' : `/?news-page=${page}#news`) as Route
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        if (!prevDisabled) goToPage(currentPage - 1)
        break
      case 'ArrowRight':
        e.preventDefault()
        if (!nextDisabled) goToPage(currentPage + 1)
        break
      case 'Home':
        e.preventDefault()
        goToPage(1)
        break
      case 'End':
        e.preventDefault()
        goToPage(TOTAL_NEWS_PAGES)
        break
    }
  }

  return {
    state: {
      pages,
      showLeftEllipsis: start > 1,
      showRightEllipsis: end < totalPages,
      prevDisabled,
      nextDisabled,
    },
    functions: {
      makeHref,
      handleKeyDown,
    },
  }
}
