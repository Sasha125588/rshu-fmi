import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { connection } from 'next/server'
import { Suspense } from 'react'

import { getProjects } from './_api/queries'
import { ProjectCatalog } from './_components/ProjectCatalog'
import { toProjectCard } from './_helpers'
import { isRecruitmentOpen } from './_helpers/recruitment'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getSocialMetadata } from '@/shared/og'

import type { Metadata } from 'next'

const title = 'До чого можна долучитися'
const description =
  'Проєкти, дослідження та ініціативи факультету. Обери проєкт і подай заявку або запропонуй власну ідею.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/projects' },
  ...getSocialMetadata('/projects', title, description),
}

const CatalogResults = async () => {
  await connection()
  const projects = await getProjects()
  const now = new Date()

  return (
    <ProjectCatalog
      projects={projects.map((project) => toProjectCard(project, isRecruitmentOpen(project, now)))}
    />
  )
}

const ProjectsPage = () => (
  <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-10 pb-16 sm:px-6 md:gap-10 md:px-12 md:pt-15">
    <header className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
      <div className="flex max-w-4xl flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-[56px]">{title}</h1>
        <p className="text-muted-foreground max-w-xl text-base leading-relaxed">{description}</p>
      </div>
      <Link
        href="/projects/propose"
        className={buttonVariants({ size: 'lg', variant: 'lavender' })}
      >
        <PlusIcon
          aria-hidden="true"
          data-icon="inline-start"
        />
        Запропонувати проєкт
      </Link>
    </header>
    <Suspense fallback={<CatalogLoading />}>
      <CatalogResults />
    </Suspense>
    {/*<aside className="bg-card-new flex flex-wrap items-center justify-between gap-4 rounded-xl border p-5 sm:p-6">
      <div>
        <h2 className="text-lg font-extrabold">Є своя ідея?</h2>
        <p className="text-muted-foreground mt-1 max-w-md text-sm">
          Опиши її, а адміністратори розглянуть пропозицію та допоможуть зібрати команду.
        </p>
      </div>
      <Link
        href="/projects/propose"
        className={buttonVariants({ variant: 'lavender' })}
      >
        Запропонувати проєкт
      </Link>
    </aside>*/}
  </div>
)

const CatalogLoading = () => (
  <div
    className="flex flex-col gap-5"
    aria-busy="true"
    aria-label="Завантаження проєктів"
  >
    <div className="border-y py-4">
      <Skeleton className="h-10 w-full max-w-sm" />
    </div>
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-hidden="true"
    >
      <Skeleton className="h-48" />
      <Skeleton className="hidden h-48 sm:block" />
      <Skeleton className="hidden h-48 lg:block" />
    </div>
  </div>
)

export default ProjectsPage
