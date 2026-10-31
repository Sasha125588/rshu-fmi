'use client'

import { TriangleAlertIcon } from 'lucide-react'

import { isScheduleStale } from '../_helpers'
import { useKyivNow } from '../_hooks/useKyivNow'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import type { KyivNow } from '../_helpers'

interface ScheduleFreshnessProps {
  syncedAt: string | null
  unavailable: boolean
}

export const ScheduleFreshnessStatus = ({
  syncedAt,
  unavailable,
  updated,
}: ScheduleFreshnessProps & { updated: string | null }) => {
  const now = useKyivNow()
  const stale = now ? isScheduleStale(syncedAt, now.epochMs) : false

  return (
    <span className="flex items-center gap-2 text-[13px]">
      <span
        className={`size-1.5 rounded-full ${unavailable || stale ? 'bg-muted-foreground' : 'bg-accent-violet'}`}
      />
      {updated ? `Оновлено ${updated}` : 'Очікуємо дані розкладу'}
    </span>
  )
}

export const ScheduleFreshnessAlert = ({
  syncedAt,
  unavailable,
  now,
}: ScheduleFreshnessProps & { now: KyivNow | null }) => {
  const stale = now ? isScheduleStale(syncedAt, now.epochMs) : false

  if (!unavailable && !stale) return null

  return (
    <Alert
      variant="warning"
      className="mt-6 rounded-xl p-4 sm:px-5"
    >
      <TriangleAlertIcon aria-hidden="true" />
      <AlertTitle>Розклад може бути неактуальним</AlertTitle>
      <AlertDescription>
        <p>Оновлення затримується. Перед заняттями перевірте можливі зміни в оригіналі.</p>
      </AlertDescription>
    </Alert>
  )
}
