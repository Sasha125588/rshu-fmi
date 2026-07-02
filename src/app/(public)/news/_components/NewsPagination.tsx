import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { getNewsArchiveHref } from '@/shared/news'

import type { NewsSource } from '@/shared/news'

interface NewsPaginationProps {
  source: NewsSource
  currentPage: number
  totalPages: number
}

type PaginationEntry = number | `ellipsis-${number}`

const getPaginationEntries = (currentPage: number, totalPages: number): PaginationEntry[] => {
  const visiblePages = new Set([
    1,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    totalPages,
  ])
  const pages = [...visiblePages].filter((page) => page >= 1 && page <= totalPages)

  const entries: PaginationEntry[] = []

  pages.forEach((page, index) => {
    const previous = pages[index - 1]

    if (previous !== undefined && page - previous > 1) entries.push(`ellipsis-${previous}`)
    entries.push(page)
  })

  return entries
}

export const NewsPagination = ({ source, currentPage, totalPages }: NewsPaginationProps) => {
  const previousPage = Math.max(1, currentPage - 1)
  const nextPage = Math.min(totalPages, currentPage + 1)

  return (
    <Pagination className="justify-start md:justify-center">
      <PaginationContent className="max-w-full flex-wrap">
        <PaginationItem>
          <PaginationLink
            href={getNewsArchiveHref(source, previousPage)}
            aria-label="Попередня сторінка"
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
            className={cn('rounded-full', currentPage === 1 && 'pointer-events-none opacity-40')}
          >
            <ChevronLeftIcon />
          </PaginationLink>
        </PaginationItem>

        {getPaginationEntries(currentPage, totalPages).map((entry) =>
          typeof entry === 'number' ? (
            <PaginationItem key={entry}>
              <PaginationLink
                href={getNewsArchiveHref(source, entry)}
                isActive={entry === currentPage}
                className="rounded-full"
              >
                {entry}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={entry}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationLink
            href={getNewsArchiveHref(source, nextPage)}
            aria-label="Наступна сторінка"
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
            className={cn(
              'rounded-full',
              currentPage === totalPages && 'pointer-events-none opacity-40'
            )}
          >
            <ChevronRightIcon />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
