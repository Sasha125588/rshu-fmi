import Link from 'next/link'

import { getRecruitmentOpen } from '../../../../_helpers'
import { ApplicationDialog } from './components'
import { buttonVariants } from '@/components/ui'
import { cn } from '@/lib'

import type { ProjectDetail } from '../../../../_types'

export const RecruitmentAction = async ({
  project,
  standalone,
}: {
  project: ProjectDetail
  standalone: boolean
}) => {
  const open = await getRecruitmentOpen(project)

  if (!open) {
    return (
      <div
        className={cn(
          'flex flex-col gap-2',
          standalone && 'max-lg:bg-card-new max-lg:rounded-xl max-lg:border max-lg:p-5'
        )}
      >
        <p className="font-bold">Набір закрито</p>
        <Link
          href="/projects?open=true"
          className={buttonVariants({ variant: 'outline' })}
        >
          Переглянути відкриті проєкти
        </Link>
      </div>
    )
  }

  return (
    <div
      data-project-application-bar=""
      className="max-lg:bg-background flex flex-col gap-2 max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-40 max-lg:border-t max-lg:px-4 max-lg:pt-3 max-lg:pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:max-lg:px-6"
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
