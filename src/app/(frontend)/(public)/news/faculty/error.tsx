'use client'

import { ArrowLeftIcon, RefreshCwIcon, TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Typography,
  buttonVariants,
} from '@/components/ui'

interface FacultyNewsErrorProps {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

const FacultyNewsError = ({ error, unstable_retry }: FacultyNewsErrorProps) => (
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
        Не вдалося завантажити новини факультету
      </Typography>

      <Alert className="mt-8">
        <TriangleAlertIcon />
        <AlertTitle>Матеріали тимчасово недоступні</AlertTitle>
        <AlertDescription>
          Сервіс факультетських новин не відповідає. Спробуйте повторити запит.
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
            FACULTY_NEWS_LOAD_FAILED
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
          До огляду новин
        </Link>
      </div>
    </div>
  </section>
)

export default FacultyNewsError
