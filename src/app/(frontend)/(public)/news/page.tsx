import { NewsHeader } from './_components/NewsHeader'
import { OverviewSourceSection } from './_components/OverviewSourceSection'
import { getNewsOverview } from './_helpers'

import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Новини ФМІ',
  description: 'Новини РДГУ та кафедр факультету математики та інформатики.',
  alternates: { canonical: '/news' },
}

const NewsOverviewPage = async () => {
  const results = await getNewsOverview()

  return (
    <div>
      <NewsHeader />
      <div className="divide-y px-4 py-8 md:px-12 md:py-12">
        {results.map((result, index) => (
          <OverviewSourceSection
            key={result.source}
            result={result}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default NewsOverviewPage
