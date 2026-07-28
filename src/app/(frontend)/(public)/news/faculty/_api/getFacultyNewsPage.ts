import config from '@payload-config'
import { getPayload } from 'payload'

import { FACULTY_NEWS_CARD_SELECT } from '../_constants'
import { mapToFacultyNewsCardData } from '../_helpers'

export const getFacultyNewsPage = async (page = 1, limit = 12) => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'faculty-news',
    depth: 1,
    limit,
    overrideAccess: false,
    page: page,
    select: FACULTY_NEWS_CARD_SELECT,
    sort: ['-isPinned', '-publishedAt'],
  })

  return {
    docs: result.docs.map(mapToFacultyNewsCardData),
    totalPages: result.totalPages,
    page: result.page ?? page,
  }
}
