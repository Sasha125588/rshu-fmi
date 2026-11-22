import { io } from 'next/cache'
import Link from 'next/link'
import { Suspense } from 'react'

import { getProjects } from '../_api/queries'
import { ProjectRecruitmentBadge } from '../_components/ProjectCard'
import { isRecruitmentOpen } from '../_helpers/recruitment'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  Skeleton,
  buttonVariants,
} from '@/components/ui'
import { PROJECT_CATEGORY_LABELS } from '@/payload/collections/Projects/constants'

const ProjectNotFound = () => (
  <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-12 md:py-24">
    <Empty className="max-w-2xl items-start gap-7 p-0 text-left text-wrap">
      <EmptyHeader className="max-w-none items-start gap-3">
        <p className="text-muted-foreground text-sm font-semibold">Помилка 404</p>
        <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
          Проєкт не знайдено
        </h1>
        <EmptyDescription className="text-base leading-relaxed sm:text-lg">
          Посилання могло застаріти або проєкт прибрали з каталогу. Переглянь, до чого можна
          долучитися зараз, або запропонуй свою ідею.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="max-w-none flex-row flex-wrap justify-start gap-3">
        <Link
          href="/projects"
          className={buttonVariants({
            size: 'lg',
            className: '[--primary:var(--foreground)] [--primary-foreground:var(--background)]',
          })}
        >
          Усі проєкти
        </Link>
        <Link
          href="/projects/propose"
          className={buttonVariants({ size: 'lg', variant: 'outline' })}
        >
          Запропонувати проєкт
        </Link>
      </EmptyContent>
    </Empty>
    <Suspense fallback={<OpenProjectsSkeleton />}>
      <OpenProjects />
    </Suspense>
  </div>
)

const OpenProjects = async () => {
  await io()
  const now = new Date()
  const projects = (await getProjects())
    .filter((project) => isRecruitmentOpen(project, now))
    .slice(0, 3)

  if (!projects.length) return null

  return (
    <section
      aria-labelledby="open-projects"
      className="mt-12 max-w-2xl md:mt-16"
    >
      <h2
        id="open-projects"
        className="mb-3 text-lg font-bold"
      >
        Відкриті зараз
      </h2>
      <ul className="bg-card divide-y overflow-hidden rounded-xl border">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="hover:bg-muted focus-visible:ring-ring flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset sm:px-5"
            >
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-semibold wrap-anywhere">{project.title}</span>
                <span className="text-muted-foreground text-sm">
                  {PROJECT_CATEGORY_LABELS[project.category]}
                </span>
              </span>
              <ProjectRecruitmentBadge open />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

const OpenProjectsSkeleton = () => (
  <section
    aria-busy="true"
    aria-label="Завантаження відкритих проєктів"
    className="mt-12 max-w-2xl md:mt-16"
  >
    <Skeleton
      aria-hidden="true"
      className="mb-3 h-7 w-36"
    />
    <ul
      aria-hidden="true"
      className="bg-card divide-y rounded-xl border"
    >
      {[0, 1, 2].map((row) => (
        <li
          key={row}
          className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5"
        >
          <div className="flex min-w-0 flex-col gap-1.5">
            <Skeleton className="h-5 w-32 max-w-full sm:w-48" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-5 w-24 shrink-0 rounded-full" />
        </li>
      ))}
    </ul>
  </section>
)

export default ProjectNotFound
