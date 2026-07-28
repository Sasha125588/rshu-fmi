import config from '@payload-config'
import { getPayload } from 'payload'

import { FACULTY_NEWS_CARD_SELECT } from '../../_constants'
import { mapToFacultyNewsCardData } from '../../_helpers'

import type { FacultyNewsArticleData, FacultyNewsDepartmentData } from '../_types'

export const getFacultyNewsBySlug = async (
  slug: string
): Promise<FacultyNewsArticleData | null> => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'faculty-news',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    page: 1,
    populate: {
      departments: {
        name: true,
        shortName: true,
        slug: true,
      },
    },
    select: {
      ...FACULTY_NEWS_CARD_SELECT,
      content: true,
      relatedDepartments: true,
      updatedAt: true,
    },
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  const news = result.docs[0]

  if (!news) return null

  return {
    ...mapToFacultyNewsCardData(news),
    content: news.content,
    relatedDepartments: (news.relatedDepartments ?? []) as FacultyNewsDepartmentData[],
    updatedAt: news.updatedAt,
  }
}
