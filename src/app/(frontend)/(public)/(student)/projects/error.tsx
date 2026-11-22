'use client'

import { RefreshCwIcon, TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'

import { Alert, AlertDescription, AlertTitle, Button, buttonVariants } from '@/components/ui'

const ProjectError = ({ unstable_retry }: { unstable_retry: () => void }) => (
  <div className="mx-auto flex min-h-72 max-w-xl flex-col justify-center gap-5 px-4 py-12">
    <Alert variant="destructive">
      <TriangleAlertIcon aria-hidden="true" />
      <AlertTitle>Не вдалося завантажити сторінку</AlertTitle>
      <AlertDescription>
        Спробуй ще раз. Якщо проблема повториться, повернися до каталогу.
      </AlertDescription>
    </Alert>
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={unstable_retry}
      >
        <RefreshCwIcon
          aria-hidden="true"
          data-icon="inline-start"
        />
        Спробувати ще раз
      </Button>
      <Link
        href="/projects"
        className={buttonVariants({ variant: 'ghost' })}
      >
        До каталогу
      </Link>
    </div>
  </div>
)

export default ProjectError
