import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

import { CMS_CACHE_LIFE, CONTENT_CACHE_TAGS } from '@/shared/constants/cache'

export const getDepartments = async () => {
  'use cache'

  cacheLife(CMS_CACHE_LIFE)
  cacheTag(CONTENT_CACHE_TAGS.departments)

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'departments',
    depth: 0,
    overrideAccess: false,
    pagination: false,
    sort: 'name',
    select: {
      name: true,
      shortName: true,
      slug: true,
      description: true,
      websiteUrl: true,
      updatedAt: true,
    },
  })

  return docs
}

export const getDepartment = async (slug: string) => {
  'use cache'

  cacheLife(CMS_CACHE_LIFE)
  cacheTag(CONTENT_CACHE_TAGS.departments, CONTENT_CACHE_TAGS.media)

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'departments',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })

  return docs[0]
}

export const getDepartmentPrograms = async (departmentId: number) => {
  'use cache'

  cacheLife(CMS_CACHE_LIFE)
  cacheTag(CONTENT_CACHE_TAGS.educationalPrograms, CONTENT_CACHE_TAGS.specialties)

  const payload = await getPayload({ config })
  const { docs: specialties } = await payload.find({
    collection: 'specialties',
    depth: 0,
    overrideAccess: false,
    pagination: false,
    sort: ['sortOrder', 'code'],
    where: { responsibleDepartment: { equals: departmentId } },
    select: { code: true, abbreviation: true, description: true },
  })

  if (!specialties.length) return []

  const { docs: programs } = await payload.find({
    collection: 'educational-programs',
    depth: 0,
    overrideAccess: false,
    pagination: false,
    sort: ['sortOrder', 'educationLevel', 'title'],
    where: { specialty: { in: specialties.map(({ id }) => id) } },
    select: { title: true, specialty: true, slug: true, educationLevel: true, heroText: true },
  })

  return specialties.flatMap(({ id, code, abbreviation, description }) =>
    programs
      .filter(({ specialty }) => specialty === id)
      .map(({ heroText, ...program }) => {
        const intro = heroText?.trim()
        return {
          ...program,
          code,
          description:
            intro && intro !== abbreviation && intro !== program.title ? intro : description,
        }
      })
  )
}
