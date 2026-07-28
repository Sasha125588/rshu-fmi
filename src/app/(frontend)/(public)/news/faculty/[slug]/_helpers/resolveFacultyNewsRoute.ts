import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import { getFacultyNewsBySlug } from '../_api'
import { getRelationId } from '@/payload/helpers'
import { getFacultyNewsPath } from '@/shared/news/faculty/paths'

import type { FacultyNewsArticleData } from '../_types'

type FacultyNewsRouteResolution =
  | {
      article: FacultyNewsArticleData
      kind: 'article'
    }
  | {
      kind: 'not-found'
    }
  | {
      kind: 'redirect'
      url: string
    }

export const resolveFacultyNewsRoute = cache(
  async (slug: string): Promise<FacultyNewsRouteResolution> => {
    const normalizedSlug = slug.trim()

    if (!normalizedSlug) return { kind: 'not-found' }

    const article = await getFacultyNewsBySlug(normalizedSlug)

    if (article) return { article, kind: 'article' }

    const payload = await getPayload({ config })

    const from = getFacultyNewsPath(normalizedSlug)
    const redirectResult = await payload.find({
      collection: 'redirects',
      depth: 0,
      limit: 1,
      overrideAccess: false,
      page: 1,
      select: {
        from: true,
        to: true,
      },
      where: {
        from: {
          equals: from,
        },
      },
    })
    const redirect = redirectResult.docs[0]

    if (!redirect) return { kind: 'not-found' }

    const targetID = getRelationId(redirect.to?.reference?.value)

    if (!targetID) return { kind: 'not-found' }

    const target = await payload.findByID({
      collection: 'faculty-news',
      depth: 0,
      id: targetID,
      overrideAccess: false,
      select: {
        slug: true,
      },
    })

    if (!target.slug || target.slug === normalizedSlug) return { kind: 'not-found' }

    return {
      kind: 'redirect',
      url: getFacultyNewsPath(target.slug),
    }
  }
)
