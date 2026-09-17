import { ScheduleContentFallback } from './_components/ScheduleContent/ScheduleContent'
import { ScheduleHero } from './_components/ScheduleHero'
import { ScheduleSourceMetaFallback } from './_components/ScheduleSourceMeta/ScheduleSourceMeta'

const ScheduleLoading = () => (
  <div className="overflow-x-clip">
    <ScheduleHero sourceMeta={<ScheduleSourceMetaFallback />} />
    <ScheduleContentFallback />
  </div>
)

export default ScheduleLoading
