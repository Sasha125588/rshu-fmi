import { NewsHeader } from './_components/NewsHeader'

import type { ReactNode } from 'react'

interface NewsLayoutProps {
  children: ReactNode
}

const NewsLayout = ({ children }: NewsLayoutProps) => (
  <main>
    <NewsHeader />
    {children}
  </main>
)

export default NewsLayout
