'use client'

import { useQueryStates } from 'nuqs'

import { scheduleSearchParams } from '../_constants'
import { useKyivNow } from '../_hooks/useKyivNow'
import { ScheduleExplorerProvider } from './ScheduleExplorerContext'
import { ScheduleFreshnessAlert } from './ScheduleFreshness'
import { ScheduleResults } from './ScheduleResults'
import { ScheduleSearchPanel } from './ScheduleSearchPanel'

import type { ScheduleSource } from '@/shared/schedule/config'
import type { ScheduleData } from '@/shared/schedule/types'
import type { PropsWithChildren } from 'react'

interface ScheduleExplorerProps {
  schedule: ScheduleData
  source: ScheduleSource
  syncedAt: string | null
  unavailable: boolean
}

export const ScheduleExplorer = ({
  schedule,
  source,
  syncedAt,
  unavailable,
}: ScheduleExplorerProps) => {
  const [state, setState] = useQueryStates(scheduleSearchParams, {
    history: 'push',
    scroll: false,
    shallow: true,
  })

  return (
    <ScheduleExplorerProvider
      state={state}
      setState={setState}
    >
      <ScheduleTimeAwareContent
        schedule={schedule}
        source={source}
        syncedAt={syncedAt}
        unavailable={unavailable}
      >
        <ScheduleSearchPanel
          schedule={schedule}
          source={source}
        />
      </ScheduleTimeAwareContent>
    </ScheduleExplorerProvider>
  )
}

const ScheduleTimeAwareContent = ({
  children,
  schedule,
  source,
  syncedAt,
  unavailable,
}: PropsWithChildren<ScheduleExplorerProps>) => {
  const now = useKyivNow()

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-4 pb-16 md:px-12">
        {children}
        <ScheduleResults
          now={now}
          schedule={schedule}
          source={source}
        />
      </div>
      <ScheduleFreshnessAlert
        syncedAt={syncedAt}
        unavailable={unavailable}
        now={now}
      />
    </>
  )
}
