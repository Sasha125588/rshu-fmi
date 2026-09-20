import { ArrowUpRightIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import { getScheduleBySourceKey } from '../../_api/getScheduleBySourceKey'
import { ScheduleFreshnessStatus } from '../ScheduleFreshness'
import { Skeleton } from '@/components/ui'
import { scheduleDateFormatter } from '@/lib/formatters'
import { getScheduleSource, scheduleSourceUrl } from '@/shared/schedule/config'

interface ScheduleSourceMetaProps {
  params: PageProps<'/rozklad/[source]'>['params']
}

export const ScheduleSourceMeta = async ({ params }: ScheduleSourceMetaProps) => {
  const { source: sourceKey } = await params
  const source = getScheduleSource(sourceKey)

  if (!source) notFound()

  const { syncedAt, unavailable } = await getScheduleBySourceKey(source.key)
  const sourceUrl = scheduleSourceUrl(source.spreadsheetId)
  const updated = syncedAt ? scheduleDateFormatter.format(new Date(syncedAt)) : null

  return (
    <>
      <ScheduleFreshnessStatus
        syncedAt={syncedAt}
        unavailable={unavailable}
        updated={updated}
      />
      <a
        href={sourceUrl}
        data-testid="schedule-source-link"
        data-source={source.key}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground inline-flex min-h-8 items-center gap-1 font-semibold underline-offset-4 hover:underline"
      >
        Відкрити розклад
        <ArrowUpRightIcon
          aria-hidden="true"
          className="size-3.5"
        />
      </a>
    </>
  )
}

export const ScheduleSourceMetaFallback = () => (
  <>
    <Skeleton className="h-4 w-44" />
    <Skeleton className="h-4 w-28" />
  </>
)
