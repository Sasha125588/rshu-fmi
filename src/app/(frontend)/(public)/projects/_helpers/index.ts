import type { ProjectCardData } from '../_types'

export const toProjectCard = ({ skills, ...project }: ProjectCardData, open: boolean) => ({
  ...project,
  skills: skills?.map(({ label }) => label) ?? [],
  open,
})
