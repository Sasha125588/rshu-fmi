import type { ProjectCategory } from '@/payload/collections/Projects/constants'

type CatalogFilters = { q: string; category: ProjectCategory | ''; open: boolean }

type FilterableProject = {
  title: string
  category: ProjectCategory
  skills: string[]
  open: boolean
}

export const normalizeProjectSearch = (value: string) =>
  value
    .normalize('NFC')
    .toLowerCase()
    .replace(/['’ʼ]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()

export const filterProjects = <T extends FilterableProject>(
  projects: T[],
  { q, category, open }: CatalogFilters
): T[] => {
  const terms = normalizeProjectSearch(q).split(' ').filter(Boolean)

  return projects
    .filter((project) => {
      if ((open && !project.open) || (category && category !== project.category)) return false
      if (!terms.length) return true

      const text = normalizeProjectSearch([project.title, ...project.skills].join(' '))
      return terms.every((term) => text.includes(term))
    })
    .sort((a, b) => Number(b.open) - Number(a.open))
}
