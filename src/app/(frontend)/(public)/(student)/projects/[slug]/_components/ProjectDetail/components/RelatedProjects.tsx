import { getProjects } from '../../../../_api/queries'
import { ProjectCard } from '../../../../_components/ProjectCard'
import { toProjectCard } from '../../../../_helpers'
import { isRecruitmentOpen } from '../../../../_helpers/recruitment'
import { getRenderTime } from '../../../_helpers'
import { Skeleton } from '@/components/ui'

import type { ProjectDetail } from '../../../_types'

export const RelatedProjects = async ({
  slug,
  category,
}: {
  slug: string
  category: ProjectDetail['category']
}) => {
  const now = await getRenderTime()
  const projects = (await getProjects()).filter(
    (project) => project.slug !== slug && project.category === category
  )
  if (!projects.length) return null

  return (
    <section
      aria-labelledby="related-projects"
      className="border-t pt-6"
    >
      <h2
        id="related-projects"
        className="mb-4 text-2xl font-extrabold tracking-tight"
      >
        Схожі проєкти
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard
            key={project.slug}
            {...toProjectCard(project, isRecruitmentOpen(project, now))}
          />
        ))}
      </div>
    </section>
  )
}

export const RelatedProjectsSkeleton = () => (
  <section
    aria-busy="true"
    aria-label="Завантаження схожих проєктів"
    className="border-t pt-6"
  >
    <Skeleton
      aria-hidden="true"
      className="mb-4 h-8 w-44"
    />
    <div
      aria-hidden="true"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {[0, 1, 2].map((card) => (
        <div
          key={card}
          className="bg-card flex flex-col gap-4 rounded-xl border p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  </section>
)
