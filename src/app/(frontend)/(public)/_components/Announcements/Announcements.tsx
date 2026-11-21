import { Suspense } from 'react'

import { DepartmentsAnnouncement } from './DepartmentsAnnouncement'
import { ScheduleAnnouncement } from './ScheduleAnnouncement'

export const Announcements = () => (
  <div className="pointer-events-none fixed right-4 bottom-[max(calc(1rem+var(--project-application-offset,0px)),env(safe-area-inset-bottom))] left-4 z-40 flex flex-col gap-2 sm:right-6 sm:bottom-[calc(1.5rem+var(--project-application-offset,0px))] sm:left-auto sm:w-80">
    <Suspense fallback={null}>
      <ScheduleAnnouncement />
      <DepartmentsAnnouncement />
    </Suspense>
  </div>
)
