import { CalendarXIcon } from 'lucide-react'
import Link from 'next/link'

import { getRecruitmentOpen } from '../../../../_helpers'
import { ApplicationDialog } from './components'
import { Alert, AlertDescription, AlertTitle, Skeleton } from '@/components/ui'

import type { ProjectDetail } from '../../../../_types'

const applicationBarClassName =
  'max-lg:bg-background flex flex-col gap-2 max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-40 max-lg:border-t max-lg:px-4 max-lg:pt-3 max-lg:pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:max-lg:px-6'

export const RecruitmentAction = async ({ project }: { project: ProjectDetail }) => {
  const open = await getRecruitmentOpen(project)

  if (!open) {
    return (
      <Alert
        role="status"
        variant="warning"
        className="rounded-xl"
      >
        <CalendarXIcon aria-hidden="true" />
        <AlertTitle className="text-base">Набір закрито</AlertTitle>
        <AlertDescription>Цей проєкт зараз не приймає заявки.</AlertDescription>
        <Link
          href="/projects?open=true"
          className="focus-visible:ring-warning-foreground col-start-2 mt-1.5 w-fit max-w-full rounded-sm font-semibold underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Переглянути відкриті проєкти
        </Link>
      </Alert>
    )
  }

  return (
    <div
      data-project-application-bar=""
      className={applicationBarClassName}
    >
      <ApplicationDialog
        projectId={project.id}
        title={project.title}
        roles={(project.roles ?? []).flatMap(({ id, title }) => (id ? [{ id, title }] : []))}
      />
      <p className="text-muted-foreground hidden text-xs leading-relaxed lg:block">
        Керівник побачить заявку й зв’яжеться з тобою за контактом, який ти вкажеш.
      </p>
    </div>
  )
}

export const RecruitmentActionSkeleton = () => (
  <div
    data-project-application-bar=""
    aria-hidden="true"
    className={applicationBarClassName}
  >
    <Skeleton className="h-10 w-full rounded-full max-lg:h-12" />
  </div>
)
