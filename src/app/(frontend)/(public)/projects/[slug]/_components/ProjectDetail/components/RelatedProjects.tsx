import { getProjects } from '../../../../_api/queries'
import { ProjectCard } from '../../../../_components/ProjectCard'
import { toProjectCard } from '../../../../_helpers'
import { isRecruitmentOpen } from '../../../../_helpers/recruitment'
import { getRenderTime } from '../../../_helpers'

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
