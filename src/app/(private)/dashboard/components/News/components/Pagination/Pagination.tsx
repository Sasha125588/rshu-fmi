import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import {
	Pagination,
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

export default function PaginationComponent({
	currentPage,
	totalPages,
	paginationItemsToDisplay = 5,
	onPageChange
}: PaginationProps) {
	const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
		currentPage,
		totalPages,
		paginationItemsToDisplay
	})

	return (
		<Pagination>
			<PaginationContent>
				{/* First page button */}
				<PaginationItem>
					<PaginationLink
						className='cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50'
						onClick={() => onPageChange(1)}
						aria-label='Go to first page'
						aria-disabled={currentPage === 1 ? true : undefined}
						role={currentPage === 1 ? 'link' : undefined}
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
						className='cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50'
						onClick={() => onPageChange(currentPage - 1)}
						aria-label='Go to previous page'
						aria-disabled={currentPage === 1 ? true : undefined}
						role={currentPage === 1 ? 'link' : undefined}
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
				{pages.map(page => (
					<PaginationItem key={page}>
						<PaginationLink
							className='cursor-pointer hover:bg-[#017369]/10'
							onClick={() => onPageChange(page)}
							isActive={page === currentPage}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* Right ellipsis (...) */}
				{showRightEllipsis && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{/* Next page button */}
				<PaginationItem>
					<PaginationLink
						className='cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50'
						onClick={() => onPageChange(currentPage + 1)}
						aria-label='Go to next page'
						aria-disabled={currentPage === totalPages ? true : undefined}
						role={currentPage === totalPages ? 'link' : undefined}
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
						className='cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50'
						onClick={() => onPageChange(totalPages)}
						aria-label='Go to last page'
						aria-disabled={currentPage === totalPages ? true : undefined}
						role={currentPage === totalPages ? 'link' : undefined}
					>
						<ChevronLastIcon
							size={16}
							aria-hidden='true'
						/>
					</PaginationLink>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
