import type { CatalogSpecialty } from '../_types'
import type { SpecializationsPageSetting } from '@/payload-types'

export const buildCatalogGroups = (
  specialties: CatalogSpecialty[],
  groups: SpecializationsPageSetting['groups'][number][]
) => {
  const specialtyByCode = new Map(specialties.map((specialty) => [specialty.code, specialty]))

  return groups.flatMap((group) => {
    const groupSpecialties = group.specialtyCodes.flatMap(({ code }) => {
      const specialty = specialtyByCode.get(code)

      return specialty ? [specialty] : []
    })

    return [
      {
        anchor: group.anchor,
        description: group.description,
        interestLabel: group.interestLabel,
        specialties: groupSpecialties,
        title: group.title,
      },
    ]
  })
}
