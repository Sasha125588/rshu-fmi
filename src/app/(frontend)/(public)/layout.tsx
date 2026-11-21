import { Footer, Header } from '../_components/layout'
import { Announcements } from './_components/Announcements/Announcements'

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
  <main className="h-full w-full pb-[var(--project-application-offset,0px)] max-lg:has-[[data-project-application-bar]]:[--project-application-offset:calc(4.75rem+env(safe-area-inset-bottom))]">
    <Header />
    {children}
    <Footer />
    <Announcements />
  </main>
)

export default PublicLayout
