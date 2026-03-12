import { Footer } from '../(components)/Footer/Footer'
import { Header } from '../(components)/Header/Header'

import type { Metadata } from 'next'

interface Props {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: 'РДГУ - Факультет математики та інформатики',
    template: 'ФМІ - %s',
  },
}

const PublicLayout = ({ children }: Props) => (
  <main className="mx-auto h-full w-full px-4 md:px-8">
    <Header />
    {children}
    <Footer />
  </main>
)

export default PublicLayout
