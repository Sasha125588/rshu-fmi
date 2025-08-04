'use client'

import { createContext } from 'react'

export interface PaginationContextParams {
	currentPage: number
	setCurrentPage: (page: number) => void
}

export const PaginationContext = createContext<PaginationContextParams>({
	currentPage: 0,
	setCurrentPage: () => {}
})
