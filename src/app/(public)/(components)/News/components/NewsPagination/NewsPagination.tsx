import { ChevronFirstIcon, ChevronLastIcon } from 'lucide-react'

import { TOTAL_NEWS_PAGES } from '../../constants/data'
import { usePagination } from './hooks/usePagination'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface Props {
  currentPage: number
  paginationItemsToDisplay?: number
  goToPage: (page: number) => void
}

export const NewsPagination = ({ currentPage, paginationItemsToDisplay = 5, goToPage }: Props) => {
  const { state, functions } = usePagination({
    currentPage,
    totalPages: TOTAL_NEWS_PAGES,
    itemsToDisplay: paginationItemsToDisplay,
    goToPage,
  })

  return (
    <div className="space-y-2">
      <div className="text-muted-foreground hidden text-center text-xs md:block">
        Навігація: стрілки ← → та Home/End для першої/останньої сторінки
      </div>

      <Pagination onKeyDown={functions.handleKeyDown}>
        <PaginationContent>
          {/* First page */}
          <PaginationItem>
            <PaginationLink
              href={functions.makeHref(1)}
              aria-label="Go to first page"
              aria-disabled={state.prevDisabled}
              size="icon"
              className="rounded-full"
              tabIndex={state.prevDisabled ? -1 : undefined}
            >
              <ChevronFirstIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>

          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href={functions.makeHref(Math.max(1, currentPage - 1))}
              aria-disabled={state.prevDisabled}
              tabIndex={state.prevDisabled ? -1 : undefined}
              text="Назад"
            />
          </PaginationItem>

          {/* Left ellipsis */}
          {state.showLeftEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Page numbers */}
          {state.pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={functions.makeHref(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Right ellipsis */}
          {state.showRightEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href={functions.makeHref(Math.min(TOTAL_NEWS_PAGES, currentPage + 1))}
              aria-disabled={state.nextDisabled}
              tabIndex={state.nextDisabled ? -1 : undefined}
              text="Далі"
            />
          </PaginationItem>

          {/* Last page */}
          <PaginationItem>
            <PaginationLink
              href={functions.makeHref(TOTAL_NEWS_PAGES)}
              aria-label="Go to last page"
              aria-disabled={state.nextDisabled}
              size="icon"
              className="rounded-full"
              tabIndex={state.nextDisabled ? -1 : undefined}
            >
              <ChevronLastIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
