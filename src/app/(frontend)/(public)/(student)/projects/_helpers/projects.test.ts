import { describe, expect, test } from 'bun:test'

import { filterProjects, normalizeProjectSearch } from './catalog'
import { isRecruitmentOpen } from './recruitment'

describe('project recruitment', () => {
  test('includes the deadline until midnight in Kyiv', () => {
    const project = { recruiting: true, deadline: '2026-07-01' }

    expect(isRecruitmentOpen(project, new Date('2026-07-01T20:59:59Z'))).toBe(true)
    expect(isRecruitmentOpen(project, new Date('2026-07-01T21:00:00Z'))).toBe(false)
  })

  test('uses the winter offset and honors manual closure', () => {
    const project = { recruiting: true, deadline: '2026-12-01' }

    expect(isRecruitmentOpen(project, new Date('2026-12-01T21:59:59Z'))).toBe(true)
    expect(isRecruitmentOpen(project, new Date('2026-12-01T22:00:00Z'))).toBe(false)
    expect(isRecruitmentOpen({ recruiting: false }, new Date())).toBe(false)
    expect(isRecruitmentOpen({ recruiting: true }, new Date())).toBe(true)
    expect(isRecruitmentOpen({ recruiting: true, deadline: '2026-02-31' }, new Date())).toBe(false)
  })
})

describe('project catalog', () => {
  const projects = [
    { title: 'Довідник', category: 'development', skills: ['Next.js'], open: false },
    { title: 'Карта Рівного', category: 'development', skills: ['Next.js'], open: true },
    { title: 'Мікроуроки', category: 'education', skills: ['Scratch'], open: true },
  ] as const

  test('keeps open projects first, preserving the source order within a group', () => {
    expect(filterProjects(projects, { q: '', category: '', open: false })).toEqual([
      projects[1],
      projects[2],
      projects[0],
    ])
  })

  test('combines category, text and recruitment filters', () => {
    expect(
      filterProjects(projects, { q: '  NEXT JS ', category: 'development', open: true })
    ).toEqual([projects[1]])
    expect(filterProjects(projects, { q: 'карта', category: 'education', open: false })).toEqual([])
  })

  test('accepts common Ukrainian apostrophes', () => {
    expect(normalizeProjectSearch('Компʼютер')).toBe(normalizeProjectSearch("комп'ютер"))
  })
})
