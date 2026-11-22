import type { ProjectsSelect } from '@/payload-types'

export const CARD_SELECT = {
  title: true,
  slug: true,
  summary: true,
  category: true,
  deadline: true,
  recruiting: true,
  skills: true,
  initiatorName: true,
} as const satisfies ProjectsSelect
