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
}

export const NewsPagination = ({ currentPage, paginationItemsToDisplay = 5 }: Props) => {
  const { state, functions } = usePagination({
    currentPage,
    itemsToDisplay: paginationItemsToDisplay,
  })

  return (
    <div className="space-y-2">
      <Pagination>
        <PaginationContent>
          {/* First page */}
          <PaginationItem>
            <PaginationLink
              href={functions.makeHref(1)}
              aria-label="Перейти на першу сторінку"
              aria-disabled={state.prevDisabled}
              onClick={state.prevDisabled ? (e) => e.preventDefault() : undefined}
              size="icon"
              className="rounded-full"
              tabIndex={state.prevDisabled ? -1 : undefined}
            >
              <span className="sr-only">Перша сторінка</span>
              <ChevronFirstIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>

          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href={functions.makeHref(currentPage - 1)}
              aria-disabled={state.prevDisabled}
              tabIndex={state.prevDisabled ? -1 : undefined}
              onClick={state.prevDisabled ? (e) => e.preventDefault() : undefined}
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
                onClick={page === currentPage ? (e) => e.preventDefault() : undefined}
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
              href={functions.makeHref(currentPage + 1)}
              aria-disabled={state.nextDisabled}
              tabIndex={state.nextDisabled ? -1 : undefined}
              onClick={state.nextDisabled ? (e) => e.preventDefault() : undefined}
              text="Далі"
            />
          </PaginationItem>

          {/* Last page */}
          <PaginationItem>
            <PaginationLink
              href={functions.makeHref(TOTAL_NEWS_PAGES)}
              aria-label="Перейти на останню сторінку"
              aria-disabled={state.nextDisabled}
              onClick={state.nextDisabled ? (e) => e.preventDefault() : undefined}
              size="icon"
              className="rounded-full"
              tabIndex={state.nextDisabled ? -1 : undefined}
            >
              <ChevronLastIcon className="size-4" />
              <span className="sr-only">Остання сторінка</span>
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
