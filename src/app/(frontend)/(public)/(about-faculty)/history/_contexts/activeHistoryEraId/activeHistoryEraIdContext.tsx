'use client'

import { createContext } from 'react'

import type { HistoryEraId } from '../../_constants'

export interface ActiveHistoryEraIdContextValue {
  value: HistoryEraId
  set: (id: HistoryEraId) => void
}

export const ActiveHistoryEraIdContext = createContext<ActiveHistoryEraIdContextValue>({
  value: 'origins',
  set: () => {},
})
