import { revalidatePath } from 'next/cache'
import { ValidationError } from 'payload'

import { getRelationId, slugifyValue } from '@/payload/helpers'
import { getFacultyNewsPath } from '@/shared/news/faculty/paths'

import type { FacultyNews, Media, Redirect } from '@/payload-types'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  CollectionBeforeDeleteHook,
  CollectionBeforeValidateHook,
  PayloadRequest,
  ValidationFieldError,
} from 'payload'

// TODO: cleanup ai slop

const FACULTY_NEWS_PAGINATION_PATTERN = '/news/faculty/page/[page]'
const FACULTY_NEWS_CONSUMER_PATHS = ['/', '/news', '/news/faculty', '/sitemap.xml']
const PREVIOUS_PUBLISHED_SLUGS_CONTEXT_KEY = 'facultyNewsPreviousPublishedSlugs'

const getFacultyNewsPaths = (
  slugs: Array<null | string | undefined>,
  redirectPaths: string[] = []
) => {
  const paths = new Set(FACULTY_NEWS_CONSUMER_PATHS)

  for (const slug of slugs) if (slug) paths.add(getFacultyNewsPath(slug))
  for (const path of redirectPaths) paths.add(path)

  return paths
}

const revalidateFacultyNewsPaths = (
  slugs: Array<null | string | undefined>,
  req: PayloadRequest,
  redirectPaths: string[] = []
) => {
  for (const path of getFacultyNewsPaths(slugs, redirectPaths)) {
    req.payload.logger.info(`Revalidating faculty news consumer at ${path}`)
    revalidatePath(path)
  }

  req.payload.logger.info(
    `Revalidating faculty news pagination at ${FACULTY_NEWS_PAGINATION_PATTERN}`
  )
  revalidatePath(FACULTY_NEWS_PAGINATION_PATTERN, 'page')
}

export const prepareFacultyNews: CollectionBeforeValidateHook<FacultyNews> = ({
  data,
  operation,
  originalDoc,
}) => {
  if (!data) return data

  const isUpdate = operation === 'update'
  const document = {
    ...(isUpdate ? originalDoc : undefined),
    ...data,
  }
  const rawSlug = document.slug?.trim() || document.title?.trim() || ''
  const nextSlug = slugifyValue(rawSlug)

  if (nextSlug) {
    data.slug = nextSlug
  }

  if (isUpdate && originalDoc?.publishedAt && !document.publishedAt) {
    data.publishedAt = originalDoc.publishedAt
  } else if (document._status === 'published' && !document.publishedAt) {
    data.publishedAt = new Date().toISOString()
  }

  return data
}

const getRedirectTargetID = (redirect?: null | Redirect) => {
  const reference = redirect?.to?.reference

  if (
    redirect?.to?.type !== 'reference' ||
    reference?.relationTo !== 'faculty-news' ||
    !reference.value
  ) {
    return undefined
  }

  return getRelationId<FacultyNews>(reference.value)
}

const findRedirectByPath = async (path: string, req: PayloadRequest) => {
  const result = await req.payload.find({
    collection: 'redirects',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    req,
    select: {
      from: true,
      to: true,
    },
    where: {
      from: {
        equals: path,
      },
    },
  })

  return result.docs[0] as Redirect | undefined
}

const getFacultyNewsRedirects = async (id: FacultyNews['id'], req: PayloadRequest) => {
  const result = await req.payload.find({
    collection: 'redirects',
    depth: 0,
    overrideAccess: true,
    pagination: false,
    req,
    select: {
      from: true,
      to: true,
    },
    where: {
      'to.reference.value': {
        equals: id,
      },
    },
  })

  return (result.docs as Redirect[]).filter((redirect) => getRedirectTargetID(redirect) === id)
}

const getFacultyNewsRedirectPaths = async (id: FacultyNews['id'], req: PayloadRequest) => {
  const redirects = await getFacultyNewsRedirects(id, req)

  return redirects.flatMap((redirect) => (redirect.from ? [redirect.from] : []))
}

const throwSlugCollision = (originalDoc: FacultyNews | undefined, req: PayloadRequest): never => {
  throw new ValidationError({
    collection: 'faculty-news',
    errors: [
      {
        message:
          'Ця адреса вже використовувалась іншою факультетською новиною. Оберіть інший slug.',
        path: 'slug',
      },
    ],
    id: originalDoc?.id,
    req,
  })
}

const getPreviousPublishedSlugs = (req: PayloadRequest) => {
  const current = req.context[PREVIOUS_PUBLISHED_SLUGS_CONTEXT_KEY]

  if (current && typeof current === 'object' && !Array.isArray(current)) {
    return current as Record<string, null | string>
  }

  const slugsByDocument: Record<string, null | string> = {}
  req.context[PREVIOUS_PUBLISHED_SLUGS_CONTEXT_KEY] = slugsByDocument

  return slugsByDocument
}

const getPreviousPublishedSlug = (id: FacultyNews['id'], req: PayloadRequest) =>
  getPreviousPublishedSlugs(req)[String(id)]

export const rememberPreviousPublishedFacultyNewsSlug: CollectionBeforeChangeHook<
  FacultyNews
> = async ({ data, operation, originalDoc, req }) => {
  if (operation !== 'update' || data._status !== 'published' || !originalDoc) return data

  const result = await req.payload.findVersions({
    collection: 'faculty-news',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    req,
    sort: '-updatedAt',
    where: {
      and: [
        {
          parent: {
            equals: originalDoc.id,
          },
        },
        {
          'version._status': {
            equals: 'published',
          },
        },
      ],
    },
  })

  getPreviousPublishedSlugs(req)[String(originalDoc.id)] =
    result.docs[0]?.version.slug?.trim() || null

  return data
}

export const synchronizeFacultyNewsRedirects: CollectionAfterChangeHook<FacultyNews> = async ({
  doc,
  previousDoc,
  req,
}) => {
  if (doc._status !== 'published') return doc

  const previousPublishedSlug = getPreviousPublishedSlug(doc.id, req)
  const currentPath = getFacultyNewsPath(doc.slug)
  const redirectAtCurrentPath = await findRedirectByPath(currentPath, req)

  if (redirectAtCurrentPath) {
    if (getRedirectTargetID(redirectAtCurrentPath) !== doc.id) {
      throwSlugCollision(previousDoc, req)
    }

    await req.payload.delete({
      collection: 'redirects',
      id: redirectAtCurrentPath.id,
      overrideAccess: true,
      req,
    })
  }

  if (!previousPublishedSlug || previousPublishedSlug === doc.slug) return doc

  const previousPath = getFacultyNewsPath(previousPublishedSlug)
  const existingRedirect = await findRedirectByPath(previousPath, req)

  if (existingRedirect) {
    if (getRedirectTargetID(existingRedirect) !== doc.id) {
      throwSlugCollision(previousDoc, req)
    }

    return doc
  }

  await req.payload.create({
    collection: 'redirects',
    data: {
      from: previousPath,
      to: {
        type: 'reference',
        reference: {
          relationTo: 'faculty-news',
          value: doc.id,
        },
      },
    },
    overrideAccess: true,
    req,
  })

  return doc
}

export const cleanupFacultyNewsRedirects: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const redirects = await getFacultyNewsRedirects(id as FacultyNews['id'], req)

  for (const redirect of redirects) {
    await req.payload.delete({
      collection: 'redirects',
      id: redirect.id,
      overrideAccess: true,
      req,
    })
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const collectLexicalMediaIDs = (
  value: unknown,
  mediaIDs: Set<Media['id']>
): { hasInvalidUpload: boolean } => {
  let hasInvalidUpload = false

  const visit = (node: unknown) => {
    if (Array.isArray(node)) {
      for (const item of node) visit(item)
      return
    }

    if (!isRecord(node)) return

    if (node.type === 'upload') {
      if (node.relationTo !== 'media') {
        hasInvalidUpload = true
      } else {
        const mediaID = getRelationId<Media>(node.value as Media | Media['id'] | null | undefined)

        if (mediaID) {
          mediaIDs.add(mediaID)
        } else {
          hasInvalidUpload = true
        }
      }
    }

    for (const child of Object.values(node)) visit(child)
  }

  visit(value)

  return { hasInvalidUpload }
}

const getMediaByIDs = async (ids: Media['id'][], req: PayloadRequest) => {
  if (!ids.length) return new Map<string, Pick<Media, 'alt' | 'id' | 'mimeType'>>()

  const result = await req.payload.find({
    collection: 'media',
    depth: 0,
    overrideAccess: true,
    pagination: false,
    req,
    select: {
      alt: true,
      mimeType: true,
    },
    where: {
      id: {
        in: ids,
      },
    },
  })

  return new Map(result.docs.map((media) => [String(media.id), media]))
}

const isAccessibleNewsImage = (media: null | Pick<Media, 'alt' | 'mimeType'> | undefined) =>
  Boolean(media?.mimeType?.startsWith('image/') && media.alt?.trim())

export const validatePublishedFacultyNewsMedia: CollectionBeforeValidateHook<FacultyNews> = async ({
  data,
  originalDoc,
  req,
}) => {
  if (!data) return data

  const document = {
    ...originalDoc,
    ...data,
  }

  if (document._status !== 'published') return data

  const coverImageID = getRelationId<Media>(document.coverImage)
  const inlineMediaIDs = new Set<Media['id']>()
  const { hasInvalidUpload } = collectLexicalMediaIDs(document.content, inlineMediaIDs)
  const mediaIDs = [...(coverImageID ? [coverImageID] : []), ...inlineMediaIDs].filter(
    (id, index, ids) => ids.findIndex((candidate) => String(candidate) === String(id)) === index
  )
  const mediaByID = await getMediaByIDs(mediaIDs, req)
  const errors: ValidationFieldError[] = []

  if (coverImageID && !isAccessibleNewsImage(mediaByID.get(String(coverImageID)))) {
    errors.push({
      message: 'Обкладинка має бути зображенням із заповненим alt-текстом.',
      path: 'coverImage',
    })
  }

  const hasInvalidInlineMedia =
    hasInvalidUpload ||
    [...inlineMediaIDs].some((mediaID) => !isAccessibleNewsImage(mediaByID.get(String(mediaID))))

  if (hasInvalidInlineMedia) {
    errors.push({
      message: 'Кожне зображення в тексті має бути графічним файлом із alt-текстом.',
      path: 'content',
    })
  }

  if (errors.length) {
    throw new ValidationError({
      collection: 'faculty-news',
      errors,
      id: originalDoc?.id,
      req,
    })
  }

  return data
}

const hasPublishedStateChanged = (
  doc: FacultyNews,
  previousDoc: FacultyNews,
  previousPublishedSlug?: null | string
) => {
  if (doc._status !== previousDoc?._status) return true

  return (
    doc._status === 'published' &&
    Boolean(previousPublishedSlug && previousPublishedSlug !== doc.slug)
  )
}

const getPublishedDocumentSlugs = (
  doc: FacultyNews,
  previousDoc: FacultyNews,
  previousPublishedSlug?: null | string
) => {
  const slugs: Array<null | string | undefined> = [previousPublishedSlug]

  if (doc._status === 'published') slugs.push(doc.slug)
  if (previousDoc?._status === 'published') slugs.push(previousDoc.slug)

  return slugs
}

export const revalidateFacultyNewsConsumers: CollectionAfterChangeHook<FacultyNews> = async ({
  doc,
  previousDoc,
  req,
}) => {
  if (req.context.disableRevalidate) return doc
  if (doc._status !== 'published' && previousDoc._status !== 'published') return doc

  const previousPublishedSlug = getPreviousPublishedSlug(doc.id, req)
  const redirectPaths = hasPublishedStateChanged(doc, previousDoc, previousPublishedSlug)
    ? await getFacultyNewsRedirectPaths(doc.id, req)
    : []

  revalidateFacultyNewsPaths(
    getPublishedDocumentSlugs(doc, previousDoc, previousPublishedSlug),
    req,
    redirectPaths
  )

  return doc
}

export const revalidateFacultyNewsConsumersAfterDelete: CollectionAfterDeleteHook<
  FacultyNews
> = async ({ doc, req }) => {
  if (req.context.disableRevalidate || doc._status !== 'published') return doc

  revalidateFacultyNewsPaths([doc.slug], req)

  return doc
}
