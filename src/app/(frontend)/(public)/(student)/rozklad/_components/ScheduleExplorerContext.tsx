'use client'

import { createContext, use } from 'react'

import { scheduleSearchParams } from '../_constants'

import type { SetValues, inferParserType } from 'nuqs'
import type { PropsWithChildren } from 'react'

type ScheduleQueryState = inferParserType<typeof scheduleSearchParams>
type SetScheduleQueryState = SetValues<typeof scheduleSearchParams>

interface ScheduleExplorerContextValue {
  state: ScheduleQueryState
  setState: SetScheduleQueryState
}

const ScheduleExplorerContext = createContext<ScheduleExplorerContextValue | null>(null)

export const ScheduleExplorerProvider = ({
  children,
  state,
  setState,
}: PropsWithChildren<ScheduleExplorerContextValue>) => (
  <ScheduleExplorerContext value={{ state, setState }}>{children}</ScheduleExplorerContext>
)

export const useScheduleExplorer = () => {
  const context = use(ScheduleExplorerContext)

  if (!context) throw new Error('useScheduleExplorer must be used within ScheduleExplorerProvider.')

  return context
}
