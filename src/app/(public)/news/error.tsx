'use client'

import { ArrowLeftIcon, RefreshCwIcon, TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button, buttonVariants } from '@/components/ui/button'

interface NewsErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const NewsError = ({ error, reset }: NewsErrorProps) => (
  <section className="flex min-h-[60vh] items-center justify-center px-4 py-20 md:px-12">
    <div className="w-full max-w-2xl">
      <p className="font-jetbrains text-muted-foreground text-xs">Помилка завантаження</p>
      <h1 className="font-jetbrains mt-4 text-3xl font-bold tracking-tight md:text-4xl">
        Джерело {error.message.split(' ')[3]} не відповідає
      </h1>
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
            <p className="font-jetbrains text-sm wrap-break-word whitespace-pre-wrap">
              {error.message}
            </p>
            {!!error.digest && (
              <p className="font-jetbrains mt-2 text-xs opacity-80">Код: {error.digest}</p>
            )}
          </AlertDescription>
        </Alert>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={reset}
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
