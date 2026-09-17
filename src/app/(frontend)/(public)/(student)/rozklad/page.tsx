import { Suspense } from 'react'

import {
  ScheduleContent,
  ScheduleContentFallback,
} from './_components/ScheduleContent/ScheduleContent'
import { ScheduleHero } from './_components/ScheduleHero'
import {
  ScheduleSourceMeta,
  ScheduleSourceMetaFallback,
} from './_components/ScheduleSourceMeta/ScheduleSourceMeta'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Розклад занять',
  description:
    'Розклад бакалаврату та магістратури ФМІ РДГУ. Пошук за групою, викладачем або аудиторією, пари та посилання на онлайн-заняття.',
  alternates: { canonical: '/rozklad' },
}

const SchedulePage = ({ searchParams }: PageProps<'/rozklad'>) => (
  <div className="overflow-x-clip">
    <ScheduleHero
      sourceMeta={
        <Suspense fallback={<ScheduleSourceMetaFallback />}>
          <ScheduleSourceMeta searchParams={searchParams} />
        </Suspense>
      }
    />
    <Suspense fallback={<ScheduleContentFallback />}>
      <ScheduleContent searchParams={searchParams} />
    </Suspense>
  </div>
)

export default SchedulePage
