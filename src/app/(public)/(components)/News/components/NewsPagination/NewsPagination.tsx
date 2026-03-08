import { ChevronFirstIcon, ChevronLastIcon } from 'lucide-react'

import { TOTAL_NEWS_PAGES } from '../../constants/data'
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
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="/#news"
            aria-label="Go to first page"
            size="icon"
            className="rounded-full"
          >
            <ChevronFirstIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {/* Page number links */}
        {/* {state.news.map(new)} */}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`/?news-page=${TOTAL_NEWS_PAGES}#news`}
            aria-label="Go to last page"
            size="icon"
            className="rounded-full"
          >
            <ChevronLastIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
