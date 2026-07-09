import { Footer, Header } from '../_components/layout'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'РДГУ - Факультет математики та інформатики',
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
  </main>
)

export default PublicLayout
