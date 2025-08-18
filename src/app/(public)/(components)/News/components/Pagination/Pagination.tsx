import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useEffect } from 'react'

import {
	Pagination as PaginationComponent,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink
} from '@/components/ui/pagination'

import { usePagination } from '@/shared/hooks/usePagination'

type PaginationProps = {
	currentPage: number
	totalPages: number
	paginationItemsToDisplay?: number
	onPageChange: (page: number) => void
}

export const Pagination = ({
	currentPage,
	totalPages,
	paginationItemsToDisplay = 5,
	onPageChange
}: PaginationProps) => {
	const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
		currentPage,
		totalPages,
		paginationItemsToDisplay
	})

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const activeElement = document.activeElement
			const isInputFocused =
				activeElement &&
				(activeElement.tagName === 'INPUT' ||
					activeElement.tagName === 'TEXTAREA' ||
					activeElement.getAttribute('contenteditable') === 'true')

			if (isInputFocused) return

			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault()
					if (currentPage > 1) {
						onPageChange(currentPage - 1)
					}
					break
				case 'ArrowRight':
					event.preventDefault()
					if (currentPage < totalPages) {
						onPageChange(currentPage + 1)
					}
					break
				case 'Home':
					event.preventDefault()
					if (currentPage !== 1) {
						onPageChange(1)
					}
					break
				case 'End':
					event.preventDefault()
					if (currentPage !== totalPages) {
						onPageChange(totalPages)
					}
					break
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [currentPage, totalPages, onPageChange])

	return (
		<div className='space-y-2'>
			<div className='text-muted-foreground hidden text-center text-xs md:block'>
				Навігація: стрілки ← → та Home/End для першої/останньої сторінки
			</div>

			<PaginationComponent>
				<PaginationContent>
					{/* First page button */}
					<PaginationItem>
						<PaginationLink
							className='focus:ring-green-primary cursor-pointer focus:ring-2 focus:outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50'
							onClick={currentPage === 1 ? undefined : () => onPageChange(1)}
							onKeyDown={e => {
								if ((e.key === 'Enter' || e.key === ' ') && currentPage !== 1) {
									e.preventDefault()
									onPageChange(1)
								}
							}}
							aria-label='Go to first page'
							aria-disabled={currentPage === 1}
							tabIndex={0}
						>
							<ChevronFirstIcon
								size={16}
								aria-hidden='true'
							/>
						</PaginationLink>
					</PaginationItem>

					{/* Previous page button */}
					<PaginationItem>
						<PaginationLink
							className='focus:ring-green-primary cursor-pointer focus:ring-2 focus:outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50'
							onClick={currentPage === 1 ? undefined : () => onPageChange(currentPage - 1)}
							onKeyDown={e => {
								if ((e.key === 'Enter' || e.key === ' ') && currentPage > 1) {
									e.preventDefault()
									onPageChange(currentPage - 1)
								}
							}}
							aria-label='Go to previous page'
							aria-disabled={currentPage === 1}
							tabIndex={0}
						>
							<ChevronLeftIcon
								size={16}
								aria-hidden='true'
							/>
						</PaginationLink>
					</PaginationItem>

					{/* Left ellipsis (...) */}
					{showLeftEllipsis && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{/* Page number links */}
					{pages.map(page => {
						const isCurrentPage = page === currentPage
						return (
							<PaginationItem key={page}>
								<PaginationLink
									className={`focus:ring-green-primary cursor-pointer focus:ring-2 focus:outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50`}
									onClick={isCurrentPage ? undefined : () => onPageChange(page)}
									onKeyDown={e => {
										if ((e.key === 'Enter' || e.key === ' ') && !isCurrentPage) {
											e.preventDefault()
											onPageChange(page)
										}
									}}
									isActive={isCurrentPage}
									aria-disabled={isCurrentPage}
									aria-current={isCurrentPage ? 'page' : undefined}
									tabIndex={0}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						)
					})}

					{/* Right ellipsis (...) */}
					{showRightEllipsis && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{/* Next page button */}
					<PaginationItem>
						<PaginationLink
							className='focus:ring-green-primary cursor-pointer focus:ring-2 focus:outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50'
							onClick={currentPage === totalPages ? undefined : () => onPageChange(currentPage + 1)}
							onKeyDown={e => {
								if ((e.key === 'Enter' || e.key === ' ') && currentPage < totalPages) {
									e.preventDefault()
									onPageChange(currentPage + 1)
								}
							}}
							aria-label='Go to next page'
							aria-disabled={currentPage === totalPages}
							tabIndex={0}
						>
							<ChevronRightIcon
								size={16}
								aria-hidden='true'
							/>
						</PaginationLink>
					</PaginationItem>

					{/* Last page button */}
					<PaginationItem>
						<PaginationLink
							className='focus:ring-green-primary cursor-pointer focus:ring-2 focus:outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50'
							onClick={currentPage === totalPages ? undefined : () => onPageChange(totalPages)}
							onKeyDown={e => {
								if ((e.key === 'Enter' || e.key === ' ') && currentPage !== totalPages) {
									e.preventDefault()
									onPageChange(totalPages)
								}
							}}
							aria-label='Go to last page'
							aria-disabled={currentPage === totalPages}
							tabIndex={0}
						>
							<ChevronLastIcon
								size={16}
								aria-hidden='true'
							/>
						</PaginationLink>
					</PaginationItem>
				</PaginationContent>
			</PaginationComponent>
		</div>
	)
}
