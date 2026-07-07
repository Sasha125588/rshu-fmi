import { ArrowRightIcon, TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'

import { NewsRow } from './NewsRow'
import { Alert, AlertDescription, AlertTitle, Typography } from '@/components/ui'
import { buttonVariants } from '@/components/ui/button'
import { NEWS_SOURCE_CONFIG, getNewsArchiveHref } from '@/shared/news'

import type { NewsOverviewResult } from '../_types'

interface OverviewSourceSectionProps {
  result: NewsOverviewResult
  index: number
}

export const OverviewSourceSection = ({ result, index }: OverviewSourceSectionProps) => {
  const config = NEWS_SOURCE_CONFIG[result.source]
  const headingId = `overview-${result.source}`

  return (
    <section
      aria-labelledby={headingId}
      className="grid gap-8 py-10 lg:grid-cols-[minmax(240px,0.45fr)_minmax(0,1fr)] lg:gap-12"
    >
      <div>
        <Typography
          as="p"
          variant="body-sm"
          className="font-jetbrains text-muted-foreground/50"
        >
          {String(index + 1).padStart(2, '0')}
        </Typography>
        <Typography
          as="h2"
          id={headingId}
          variant="heading-lg"
          className="mt-4 md:text-3xl"
        >
          {config.fullLabel}
        </Typography>
        <Typography
          as="p"
          variant="body-md"
          className="text-muted-foreground mt-3 max-w-md"
        >
          {config.overviewDescription}
        </Typography>

        <Link
          href={getNewsArchiveHref(result.source)}
          className={`${buttonVariants({ variant: 'outline', size: 'sm' })} mt-6`}
        >
          Увесь архів
          <ArrowRightIcon data-icon="inline-end" />
        </Link>
      </div>

      {result.status === 'fulfilled' ? (
        <ul className="divide-y">
          {result.news.map((item) => (
            <NewsRow
              key={`${item.source}-${item.link}`}
              item={item}
              compact
            />
          ))}
        </ul>
      ) : (
        <Alert className="self-start">
          <TriangleAlertIcon />
          <AlertTitle>Джерело тимчасово недоступне</AlertTitle>
          <AlertDescription>
            Не вдалося оновити новини {config.label}. Інші джерела продовжують працювати.
          </AlertDescription>
        </Alert>
      )}
    </section>
  )
}
