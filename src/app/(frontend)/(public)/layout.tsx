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
  <main className="h-full w-full">
    <Header />
    {children}
    <Footer />
    <Announcements />
  </main>
)

export default PublicLayout
