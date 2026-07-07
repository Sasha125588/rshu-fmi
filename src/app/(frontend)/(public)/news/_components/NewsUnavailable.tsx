import { ArrowLeftIcon, ArrowUpRightIcon, TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'

import { Alert, AlertDescription, AlertTitle, Typography } from '@/components/ui'
import { buttonVariants } from '@/components/ui/button'
import { NEWS_SOURCE_CONFIG } from '@/shared/news'

import type { NewsSource } from '@/shared/news'

interface NewsUnavailableProps {
  source: NewsSource
  error: Error
}

export const NewsUnavailable = ({ source, error }: NewsUnavailableProps) => {
  const config = NEWS_SOURCE_CONFIG[source]

  return (
    <section
      aria-labelledby="news-unavailable-heading"
      className="flex min-h-[55vh] items-center justify-center px-4 py-16 md:px-12"
    >
      <div className="w-full max-w-2xl">
        <Typography
          as="p"
          variant="caption"
          className="font-jetbrains text-muted-foreground"
        >
          Джерело недоступне
        </Typography>
        <Typography
          as="h2"
          id="news-unavailable-heading"
          variant="heading-lg"
          className="font-jetbrains mt-4 font-bold"
        >
          {config.fullLabel} не відповідає
        </Typography>

        <Alert className="mt-8">
          <TriangleAlertIcon />
          <AlertTitle>Не вдалося отримати новини</AlertTitle>
          <AlertDescription>
            Зовнішній сайт повернув помилку. Інші джерела новин продовжують працювати.
          </AlertDescription>
        </Alert>

        <Alert
          variant="destructive"
          className="mt-4"
        >
          <AlertTitle>Деталі помилки</AlertTitle>
          <AlertDescription>
            <Typography
              as="p"
              variant="body-sm"
              className="font-jetbrains wrap-break-word whitespace-pre-wrap"
            >
              {error.message}
            </Typography>
          </AlertDescription>
        </Alert>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/news"
            className={buttonVariants({ variant: 'outline' })}
          >
            <ArrowLeftIcon data-icon="inline-start" />
            До огляду новин
          </Link>

          <a
            href={config.archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'ghost' })}
          >
            Відкрити сайт джерела
            <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </div>
      </div>
    </section>
  )
}
