'use client'

import { ArrowLeftIcon, RefreshCwIcon, TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'

import { Alert, AlertDescription, AlertTitle, Typography } from '@/components/ui'
import { Button, buttonVariants } from '@/components/ui/button'

interface NewsErrorProps {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

const NewsError = ({ error, unstable_retry }: NewsErrorProps) => (
  <section className="flex min-h-[60vh] items-center justify-center px-4 py-20 md:px-12">
    <div className="w-full max-w-2xl">
      <Typography
        as="p"
        variant="caption"
        className="font-jetbrains text-muted-foreground"
      >
        Помилка завантаження
      </Typography>
      <Typography
        as="h1"
        variant="heading-lg"
        className="font-jetbrains mt-4 font-bold"
      >
        Джерело {error.message.split(' ')[3]} не відповідає
      </Typography>
      <Alert className="mt-8">
        <TriangleAlertIcon />
        <AlertTitle>Новини тимчасово недоступні</AlertTitle>
        <AlertDescription>
          Зовнішній сайт не вдалося завантажити. Спробуйте ще раз.
        </AlertDescription>
      </Alert>
      {!!error.message && (
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
            {!!error.digest && (
              <Typography
                as="p"
                variant="caption"
                className="font-jetbrains mt-2 opacity-80"
              >
                Код: {error.digest}
              </Typography>
            )}
          </AlertDescription>
        </Alert>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={unstable_retry}
        >
          <RefreshCwIcon data-icon="inline-start" />
          Спробувати знову
        </Button>

        <Link
          href="/news"
          className={buttonVariants({ variant: 'ghost' })}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Назад
        </Link>
      </div>
    </div>
  </section>
)

export default NewsError
