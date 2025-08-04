import { useContext } from 'react'

import { PaginationContext } from './PaginationContext'

export const usePagination = () => useContext(PaginationContext)
