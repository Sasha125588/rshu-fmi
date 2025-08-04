'use client'

import { useMemo, useState } from 'react'

import { PaginationContext } from './PaginationContext'

export interface UserProviderProps {
	children: React.ReactNode
	defaultCurrentPage: number
}

export const PaginationProvider = ({ children, defaultCurrentPage }: UserProviderProps) => {
	const [currentPage, setCurrentPage] = useState(defaultCurrentPage)

	const value = useMemo(() => ({ currentPage, setCurrentPage }), [currentPage, setCurrentPage])

	return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>
}
