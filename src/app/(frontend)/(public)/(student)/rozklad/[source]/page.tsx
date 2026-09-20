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
import { SCHEDULE_SOURCES } from '@/shared/schedule/config'

export const generateStaticParams = () => SCHEDULE_SOURCES.map(({ key }) => ({ source: key }))

const ScheduleSourcePage = ({ params }: PageProps<'/rozklad/[source]'>) => (
  <div className="overflow-x-clip">
    <ScheduleHero
      sourceMeta={
        <Suspense fallback={<ScheduleSourceMetaFallback />}>
          <ScheduleSourceMeta params={params} />
        </Suspense>
      }
    />
    <Suspense fallback={<ScheduleContentFallback />}>
      <ScheduleContent params={params} />
    </Suspense>
  </div>
)

export default ScheduleSourcePage
