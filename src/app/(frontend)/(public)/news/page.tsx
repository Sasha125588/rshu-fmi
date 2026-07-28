import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

import { FacultyNewsCard } from './_components/FacultyNewsCard'
import { OverviewSourceSection } from './_components/OverviewSourceSection'
import { getNewsOverview } from './_helpers'
import { getLatestFacultyNews } from './faculty/_api'
import { Typography, buttonVariants } from '@/components/ui'

import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Новини ФМІ',
  description: 'Новини факультету математики та інформатики, РДГУ та профільних кафедр.',
  alternates: { canonical: '/news' },
}

const NewsOverviewPage = async () => {
  const [facultyResult, externalResult] = await Promise.allSettled([
    getLatestFacultyNews(4),
    getNewsOverview(),
  ])

  const facultyNews = facultyResult.status === 'fulfilled' ? facultyResult.value : []
  const externalNews = externalResult.status === 'fulfilled' ? externalResult.value : []

  return (
    <div>
      <section
        aria-labelledby="overview-faculty"
        className="bg-muted/20 grid gap-8 border-b px-4 py-12 md:px-12 md:py-16 lg:grid-cols-[minmax(240px,0.45fr)_minmax(0,1fr)] lg:gap-12"
      >
        <div>
          <Typography
            as="p"
            variant="body-sm"
            className="font-jetbrains text-muted-foreground/50"
          >
            01
          </Typography>
          <Typography
            as="h2"
            id="overview-faculty"
            variant="heading-lg"
            className="mt-4 md:text-3xl"
          >
            Факультет
          </Typography>
          <Typography
            as="p"
            variant="body-md"
            className="text-muted-foreground mt-3 max-w-md"
          >
            Власні матеріали факультету: важливі оголошення, події, здобутки та історії нашої
            спільноти.
          </Typography>

          <Link
            href="/news/faculty"
            className={`${buttonVariants({ variant: 'outline', size: 'sm' })} mt-6`}
          >
            Усі новини
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </div>

        {
          <ul className="divide-y">
            {facultyNews.map((item, index) => (
              <FacultyNewsCard
                key={item.id}
                item={item}
                variant={index === 0 ? 'featured' : 'compact'}
              />
            ))}
          </ul>
        }
      </section>
      <div className="divide-y px-4 py-8 md:px-12 md:py-12">
        {externalNews.map((result, index) => (
          <OverviewSourceSection
            key={result.source}
            result={result}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  )
}

export default NewsOverviewPage
