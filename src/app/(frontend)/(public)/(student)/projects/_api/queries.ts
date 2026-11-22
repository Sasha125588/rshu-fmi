import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

import { CARD_SELECT } from '../_constants'
import { CMS_CACHE_LIFE, CONTENT_CACHE_TAGS } from '@/shared/constants/cache'

export const getProjectContributors = async () => {
  'use cache'

  cacheLife(CMS_CACHE_LIFE)
  cacheTag(CONTENT_CACHE_TAGS.projectContributors)

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'project-contributors',
    overrideAccess: false,
    depth: 0,
    pagination: false,
    select: { name: true, source: true, githubId: true, githubAvatarUrl: true },
    sort: ['name', 'id'],
  })

  return docs
}

export const getProjects = async (limit?: number) => {
  'use cache'

  cacheLife(CMS_CACHE_LIFE)
  cacheTag(CONTENT_CACHE_TAGS.projects)

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    overrideAccess: false,
    depth: 0,
    pagination: false,
    limit,
    select: CARD_SELECT,
    sort: ['-publishedAt', '-createdAt', 'id'],
  })

  return docs
}

export const getProject = async (slug: string) => {
  'use cache'

  cacheLife(CMS_CACHE_LIFE)
  cacheTag(CONTENT_CACHE_TAGS.projects)

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    overrideAccess: false,
    depth: 0,
    limit: 1,
    select: {
      ...CARD_SELECT,
      description: true,
      tasks: true,
      roles: true,
      links: true,
      updatedAt: true,
    },
    where: { slug: { equals: slug } },
  })

  return docs[0] ?? null
}
