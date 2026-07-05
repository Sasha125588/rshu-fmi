import { ArrowLeftIcon, ArrowUpRightIcon, TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
        <p className="font-jetbrains text-muted-foreground text-xs">Джерело недоступне</p>
        <h2
          id="news-unavailable-heading"
          className="font-jetbrains mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl"
        >
          {config.fullLabel} не відповідає
        </h2>

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
            <p className="font-jetbrains text-sm wrap-break-word whitespace-pre-wrap">
              {error.message}
            </p>
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
