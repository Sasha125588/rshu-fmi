import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import {
  ScheduleContent,
  ScheduleContentFallback,
} from '../_components/ScheduleContent/ScheduleContent'
import { ScheduleHero } from '../_components/ScheduleHero'
import {
  ScheduleSourceMeta,
  ScheduleSourceMetaFallback,
} from '../_components/ScheduleSourceMeta/ScheduleSourceMeta'
import { AnimatedSuspense } from '@/components/common/AnimatedSuspense/AnimatedSuspense'
import { SITE_URL } from '@/shared/constants'
import { SCHEDULE_SOURCES, getScheduleSource } from '@/shared/schedule/config'

import type { Metadata } from 'next'

export const generateStaticParams = () => SCHEDULE_SOURCES.map(({ key }) => ({ source: key }))

export const generateMetadata = async ({
  params,
}: PageProps<'/rozklad/[source]'>): Promise<Metadata> => {
  const { source: sourceKey } = await params
  const source = getScheduleSource(sourceKey)

  if (!source) notFound()

  const title = `Розклад занять ${source.label}`
  const description = `Актуальний розклад занять ФМІ РДГУ для ${source.course} курсу ${source.level === 'bachelor' ? 'бакалаврату' : 'магістратури'}. Пошук за групою, викладачем або аудиторією.`
  const canonical = `/rozklad/${source.key}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      siteName: 'Факультет математики та інформатики РДГУ',
      type: 'website',
      locale: 'uk_UA',
      url: new URL(canonical, SITE_URL).href,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

const ScheduleSourcePage = ({ params }: PageProps<'/rozklad/[source]'>) => (
  <div className="overflow-x-clip">
    <ScheduleHero
      sourceMeta={
        <Suspense fallback={<ScheduleSourceMetaFallback />}>
          <ScheduleSourceMeta params={params} />
        </Suspense>
      }
    />
    <AnimatedSuspense fallback={<ScheduleContentFallback />}>
      <ScheduleContent params={params} />
    </AnimatedSuspense>
  </div>
)

export default ScheduleSourcePage
