import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

import { FACULTY_NEWS_CARD_SELECT } from '../_constants'
import { mapToFacultyNewsCardData } from '../_helpers'
import { CMS_CACHE_LIFE, CONTENT_CACHE_TAGS } from '@/shared/constants/cache'

export const getLatestFacultyNews = async (limit = 3) => {
  'use cache'

  cacheLife(CMS_CACHE_LIFE)
  cacheTag(CONTENT_CACHE_TAGS.facultyNews, CONTENT_CACHE_TAGS.media)

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'faculty-news',
    depth: 1,
    limit,
    overrideAccess: false,
    page: 1,
    select: FACULTY_NEWS_CARD_SELECT,
    sort: ['-isPinned', '-publishedAt'],
  })

  return result.docs.map(mapToFacultyNewsCardData)
}
