import { Footer } from '../(components)/Footer/Footer'
import { Header } from '../(components)/Header/Header'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'РДГУ - Факультет математики та інформатики',
    template: 'ФМІ - %s',
  },
}

interface PublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => (
  <main className="h-full w-full">
    <Header />
    {children}
    <Footer />
  </main>
)

export default PublicLayout
