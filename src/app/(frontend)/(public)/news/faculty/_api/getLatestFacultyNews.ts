import config from '@payload-config'
import { getPayload } from 'payload'

import { FACULTY_NEWS_CARD_SELECT } from '../_constants'
import { mapToFacultyNewsCardData } from '../_helpers'

export const getLatestFacultyNews = async (limit = 3) => {
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
