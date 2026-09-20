import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

import { CMS_CACHE_LIFE, CONTENT_CACHE_TAGS } from '@/shared/constants/cache'

export const getEducationalProgramBySlug = async (slug: string) => {
  'use cache'

  cacheLife(CMS_CACHE_LIFE)
  // TODO: granular invalidate
  cacheTag(CONTENT_CACHE_TAGS.educationalPrograms, `educational-program:${slug}`)

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'educational-programs',
    depth: 0,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      title: true,
    },
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs[0]
}
