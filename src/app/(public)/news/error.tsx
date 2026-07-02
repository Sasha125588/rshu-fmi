'use client'

import { RefreshCwIcon, TriangleAlertIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface NewsErrorProps {
  reset: () => void
}

const NewsError = ({ reset }: NewsErrorProps) => (
  <section className="flex min-h-[60vh] items-center justify-center px-4 py-20 md:px-12">
    <div className="w-full max-w-2xl">
      <p className="font-jetbrains text-muted-foreground text-xs">Помилка завантаження</p>
      <h1 className="font-jetbrains mt-4 text-3xl font-bold tracking-tight md:text-4xl">
        Джерело не відповідає
      </h1>
      <Alert className="mt-8">
        <TriangleAlertIcon />
        <AlertTitle>Новини тимчасово недоступні</AlertTitle>
        <AlertDescription>
          Зовнішній сайт не вдалося завантажити або його структура змінилася. Спробуйте ще раз.
        </AlertDescription>
      </Alert>
      <Button
        type="button"
        variant="outline"
        className="mt-6"
        onClick={reset}
      >
        <RefreshCwIcon data-icon="inline-start" />
        Спробувати знову
      </Button>
    </div>
  </section>
)

export default NewsError
