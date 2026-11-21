import { ProjectRecruitmentBadge } from '../../../../_components/ProjectCard'
import { getRecruitmentOpen } from '../../../_helpers'

import type { ProjectDetail } from '../../../_types'

export const RecruitmentBadge = async ({ project }: { project: ProjectDetail }) => {
  const open = await getRecruitmentOpen(project)

  return <ProjectRecruitmentBadge open={open} />
}
