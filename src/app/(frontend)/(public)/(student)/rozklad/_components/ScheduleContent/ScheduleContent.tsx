import { InfoIcon } from 'lucide-react'

import { getSchedulePageData } from '../../_api/getSchedulePageData'
import { kyivNow } from '../../_helpers'
import { ScheduleResults } from '../ScheduleResults'
import { ScheduleSearchPanel } from '../ScheduleSearchPanel'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import { Skeleton } from '@/components/ui/skeleton'

interface ScheduleContentProps {
  searchParams: PageProps<'/rozklad'>['searchParams']
}

export const ScheduleContent = async ({ searchParams }: ScheduleContentProps) => {
  const { schedule, source, sourceUrl, stale, unavailable } =
    await getSchedulePageData(searchParams)

  const now = kyivNow()

  if (!schedule) {
    return (
      <Empty className="mx-auto my-12 min-h-72 max-w-2xl">
        <EmptyHeader>
          <EmptyTitle>Розклад поки недоступний</EmptyTitle>
          <EmptyDescription>
            Не вдалося отримати перевірені дані. Спробуйте пізніше або відкрийте оригінал таблиці.
          </EmptyDescription>
        </EmptyHeader>
        <a
          href={sourceUrl}
          className="text-accent-violet underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Перейти до розкладу в Google
        </a>
      </Empty>
    )
  }

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-4 pb-16 md:px-12">
        <ScheduleSearchPanel
          schedule={schedule}
          source={source}
        />
        <ScheduleResults
          now={now}
          schedule={schedule}
          source={source}
        />
      </div>
      {(unavailable || stale) && (
        <div className="mx-auto mb-10 max-w-[1600px] px-4 md:px-12">
          <Alert>
            <InfoIcon />
            <AlertTitle>Показуємо останню перевірену версію</AlertTitle>
            <AlertDescription>
              Оновлення затримується. Перевірте можливі зміни у вихідній Google-таблиці.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  )
}

export const ScheduleContentFallback = () => (
  <div
    className="mx-auto max-w-[1600px] px-4 pb-16 md:px-12"
    aria-hidden="true"
  >
    <div className="bg-card/95 border-border/80 relative -mt-5 flex h-11 w-full items-center rounded-2xl border p-1 shadow-sm sm:w-56">
      <div className="flex gap-1">
        <Skeleton className="bg-accent-violet/15 size-8.5 rounded-[12px]" />
        <Skeleton className="size-8.5 rounded-[12px]" />
        <Skeleton className="size-8.5 rounded-[12px]" />
      </div>
      <div className="bg-border mx-1.5 h-8 w-px" />
      <Skeleton className="h-4 min-w-0 flex-1 rounded-md" />
      <Skeleton className="mx-2 size-4 rounded-md" />
    </div>

    <section className="mt-10 md:mt-14">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="space-y-3">
          <Skeleton className="h-3 w-36 rounded-md" />
          <Skeleton className="h-9 w-44 rounded-lg md:h-10" />
          <Skeleton className="h-4 w-64 max-w-full rounded-md" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-32 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>

      <div className="min-h-7 pt-2" />

      <div className="my-5 flex flex-wrap items-center justify-between gap-4 border-y py-4">
        <Skeleton className="h-11 w-40 rounded-full" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-7 gap-1 sm:gap-2">
        {Array.from({ length: 7 }, (_, index) => (
          <Skeleton
            key={index}
            className="min-h-14 rounded-2xl"
          />
        ))}
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <Skeleton className="h-6 w-32 rounded-md" />
        <Skeleton className="h-3 w-20 rounded-md" />
      </div>

      <div className="grid gap-3">
        {Array.from({ length: 2 }, (_, index) => (
          <div
            key={index}
            className="grid gap-3 md:grid-cols-[100px_1fr] md:gap-5"
          >
            <div className="hidden space-y-2 pt-5 md:block">
              <Skeleton className="h-7 w-16 rounded-md" />
              <Skeleton className="h-3 w-14 rounded-md" />
              <Skeleton className="mt-4 h-3 w-12 rounded-md" />
            </div>
            <div className="bg-card space-y-4 rounded-2xl border p-4 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-3 w-28 rounded-md" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <Skeleton className="h-6 w-3/5 rounded-md" />
              <Skeleton className="h-4 w-2/5 rounded-md" />
              <Skeleton className="h-3 w-1/2 rounded-md" />
              <div className="border-t pt-3">
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
)
