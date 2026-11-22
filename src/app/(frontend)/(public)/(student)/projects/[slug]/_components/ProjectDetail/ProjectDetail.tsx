import { ArrowUpRightIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { getProject } from '../../../_api/queries'
import { formatProjectDeadline } from '../../../_helpers/recruitment'
import { PROJECT_DETAIL_LAYOUT, SPOT_FORMS } from '../../_constants'
import {
  RecruitmentAction,
  RecruitmentActionSkeleton,
  RecruitmentBadge,
  RelatedProjects,
  RelatedProjectsSkeleton,
} from './components'
import { PageBreadcrumbs } from '@/components/common'
import { Badge, Skeleton } from '@/components/ui'
import { cn, pluralRules } from '@/lib'
import { PROJECT_CATEGORY_LABELS } from '@/payload/collections/Projects/constants'

export const ProjectDetail = async ({ slug }: { slug: string }) => {
  const project = await getProject(slug)
  if (!project) notFound()

  const hasDetails = !!(project.initiatorName || project.deadline)
  const hasSidebarContent = hasDetails || !!project.skills?.length || !!project.links?.length

  return (
    <>
      <header className={PROJECT_DETAIL_LAYOUT.header}>
        <div className={PROJECT_DETAIL_LAYOUT.headerContent}>
          <PageBreadcrumbs
            current={project.title}
            parents={[{ href: '/projects', label: 'Долучитися' }]}
            className="mb-6"
          />
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-muted-foreground text-sm font-semibold">
              {PROJECT_CATEGORY_LABELS[project.category]}
            </span>
            <Suspense fallback={<Skeleton className="h-5 w-26" />}>
              <RecruitmentBadge project={project} />
            </Suspense>
          </div>
          <h1 className={PROJECT_DETAIL_LAYOUT.title}>{project.title}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
            {project.summary}
          </p>
        </div>
      </header>
      <div className={PROJECT_DETAIL_LAYOUT.content}>
        <div className={PROJECT_DETAIL_LAYOUT.grid}>
          <aside
            aria-label="Деталі набору"
            className={cn(PROJECT_DETAIL_LAYOUT.sidebar, !hasSidebarContent && 'max-lg:contents')}
          >
            {hasDetails && (
              <dl className="grid grid-cols-2 gap-3 text-sm lg:grid-cols-1">
                {project.initiatorName && (
                  <div className="grid min-w-0 gap-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-2">
                    <dt className="text-muted-foreground">Ініціатор</dt>
                    <dd className="font-bold wrap-break-word lg:text-right">
                      {project.initiatorName}
                    </dd>
                  </div>
                )}
                {project.deadline && (
                  <div className="grid min-w-0 gap-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-2">
                    <dt className="text-muted-foreground">Набір до</dt>
                    <dd className="font-bold lg:text-right">
                      <time dateTime={project.deadline}>
                        {formatProjectDeadline(project.deadline)}
                      </time>
                    </dd>
                  </div>
                )}
              </dl>
            )}
            {!!project.skills?.length && (
              <div>
                <h2 className="mb-2 text-sm font-bold">Навички й технології</h2>
                <ul className="flex flex-wrap gap-1.5">
                  {project.skills?.map((skill, index) => (
                    <li key={skill.id ?? index}>
                      <Badge className="bg-muted">{skill.label}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!!project.links?.length && (
              <div>
                <h2 className="mb-2 text-sm font-bold">Посилання</h2>
                <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
                  {project.links?.map((link, index) => (
                    <li key={link.id ?? index}>
                      <a
                        href={link.url}
                        className="hover:text-foreground inline-flex items-center gap-1.5 wrap-anywhere underline-offset-3 hover:underline"
                      >
                        {link.label}
                        <ArrowUpRightIcon
                          aria-hidden="true"
                          className="size-3.5 shrink-0"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Suspense fallback={project.recruiting ? <RecruitmentActionSkeleton /> : null}>
              <RecruitmentAction project={project} />
            </Suspense>
          </aside>
          <div className={PROJECT_DETAIL_LAYOUT.mainColumn}>
            <section aria-labelledby="project-about">
              <h2
                id="project-about"
                className="text-2xl font-extrabold tracking-tight"
              >
                Про проєкт
              </h2>
              <p className="text-muted-foreground mt-3 max-w-prose leading-relaxed wrap-break-word whitespace-pre-line">
                {project.description}
              </p>
            </section>
            {!!project.tasks?.length && (
              <section aria-labelledby="project-tasks">
                <h2
                  id="project-tasks"
                  className="text-2xl font-extrabold tracking-tight"
                >
                  Що потрібно зробити
                </h2>
                <ul className="text-muted-foreground mt-3 flex list-disc flex-col gap-2 pl-4 leading-relaxed">
                  {project.tasks?.map((task, index) => (
                    <li key={task.id ?? index}>{task.text}</li>
                  ))}
                </ul>
              </section>
            )}
            {project.recruiting && !!project.roles?.length && (
              <section aria-labelledby="project-roles">
                <h2
                  id="project-roles"
                  className="text-2xl font-extrabold tracking-tight"
                >
                  Відкриті ролі
                </h2>
                <ul className="bg-card mt-4 divide-y rounded-xl border">
                  {project.roles?.map((role, index) => (
                    <li
                      className="flex items-center justify-between gap-3 p-4"
                      key={role.id ?? index}
                    >
                      <div className="min-w-0 wrap-break-word">
                        <h3 className="font-bold">{role.title}</h3>
                        {role.description && (
                          <p className="text-muted-foreground mt-1 text-sm">{role.description}</p>
                        )}
                      </div>
                      {role.spots != null && (
                        <span className="text-muted-foreground shrink-0 text-sm whitespace-nowrap">
                          {role.spots} {SPOT_FORMS[pluralRules.select(role.spots)]}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
        <Suspense fallback={<RelatedProjectsSkeleton />}>
          <RelatedProjects
            slug={project.slug}
            category={project.category}
          />
        </Suspense>
      </div>
    </>
  )
}

export const ProjectDetailSkeleton = () => (
  <div
    aria-busy="true"
    aria-label="Завантаження проєкту"
  >
    <div
      aria-hidden="true"
      className={PROJECT_DETAIL_LAYOUT.header}
    >
      <div className={PROJECT_DETAIL_LAYOUT.headerContent}>
        <Skeleton className="mb-6 h-5 w-48 max-w-full rounded-md" />
        <div className="mb-4 flex items-center gap-3">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-5 w-26 rounded-full" />
        </div>
        <div className={PROJECT_DETAIL_LAYOUT.title}>
          <Skeleton className="h-[1lh] w-4/5 max-w-2xl rounded-lg" />
        </div>
        <div className="mt-4 flex max-w-2xl flex-col gap-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>
      </div>
    </div>
    <div
      aria-hidden="true"
      className={PROJECT_DETAIL_LAYOUT.content}
    >
      <div className={PROJECT_DETAIL_LAYOUT.grid}>
        <div className={PROJECT_DETAIL_LAYOUT.sidebar}>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {[0, 1].map((row) => (
              <div
                key={row}
                className="grid min-w-0 gap-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-2"
              >
                <Skeleton className="h-4 w-15 max-w-full rounded-md" />
                <Skeleton className="h-5 w-24 max-w-full rounded-md lg:justify-self-end" />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Skeleton className="h-5 w-15 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
          <Skeleton className="hidden h-10 w-full rounded-full lg:block" />
        </div>
        <div className={PROJECT_DETAIL_LAYOUT.mainColumn}>
          <div>
            <Skeleton className="h-8 w-36 rounded-md" />
            <div className="mt-3 flex max-w-prose flex-col gap-2.5">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-11/12 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
