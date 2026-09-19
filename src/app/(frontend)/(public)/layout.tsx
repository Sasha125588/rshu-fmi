import { Suspense } from 'react'

import { Footer, Header } from '../_components/layout'
import { ScheduleAnnouncement } from './_components/ScheduleAnnouncement/ScheduleAnnouncement'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Факультет математики та інформатики РДГУ',
    template: 'ФМІ - %s',
  },
}

interface PublicLayoutProps {
  children: ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => (
  <main className="h-full w-full">
    <Header />
    {children}
    <Footer />
    <Suspense fallback={null}>
      <ScheduleAnnouncement />
    </Suspense>
  </main>
)

export default PublicLayout
