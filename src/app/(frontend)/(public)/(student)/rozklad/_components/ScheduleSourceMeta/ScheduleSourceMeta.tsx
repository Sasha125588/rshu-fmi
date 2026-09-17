import { ArrowUpRightIcon } from 'lucide-react'

import { getSchedulePageData } from '../../_api/getSchedulePageData'
import { Skeleton } from '@/components/ui'

interface ScheduleSourceMetaProps {
  searchParams: PageProps<'/rozklad'>['searchParams']
}

export const ScheduleSourceMeta = async ({ searchParams }: ScheduleSourceMetaProps) => {
  const { sourceUrl, stale, unavailable, updated } = await getSchedulePageData(searchParams)

  return (
    <>
      <span className="flex items-center gap-2 text-[13px]">
        <span
          className={`size-1.5 rounded-full ${unavailable || stale ? 'bg-muted-foreground' : 'bg-primary'}`}
        />
        {updated ? `Оновлено ${updated}` : 'Очікуємо дані розкладу'}
      </span>
      <a
        href={sourceUrl}
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
