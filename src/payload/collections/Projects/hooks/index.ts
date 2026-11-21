import { sql } from '@payloadcms/db-postgres'
import { revalidatePath } from 'next/cache'
import { ValidationError } from 'payload'

import { adminOnly } from '@/payload/access'
import { getRelationId, invalidateCacheTags, slugifyValue } from '@/payload/helpers'
import { CONTENT_CACHE_TAGS } from '@/shared/constants/cache'

import type { ProjectProposal } from '@/payload-types'
import type { PostgresAdapter } from '@payloadcms/db-postgres'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  CollectionBeforeDeleteHook,
  CollectionBeforeValidateHook,
  ValidationFieldError,
} from 'payload'

export const validateProjectFields: CollectionBeforeValidateHook = ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (!data) return data

  const errors: ValidationFieldError[] = []
  const autoSlug = operation === 'update' && data.generateSlug
  const slugValue = autoSlug
    ? data.title
    : data.slug || (operation === 'create' ? data.title : null)
  const slug = typeof slugValue === 'string' ? slugifyValue(slugValue) : null
  if (slug === 'propose') {
    errors.push({ path: 'slug', message: 'Адресу «propose» зарезервовано для форми пропозиції.' })
  } else if (slugValue && !slug) {
    errors.push({ path: 'slug', message: 'В адресі мають бути літери або цифри.' })
  }
  if (!autoSlug && typeof slugValue === 'string') {
    data.slug = slug || null
  }
  if (data.deadline === '') data.deadline = null
  if (data.deadline != null && typeof data.deadline !== 'string') {
    errors.push({ path: 'deadline', message: 'Вкажіть дійсну дату у форматі РРРР-ММ-ДД.' })
  }

  if (Array.isArray(data.links)) {
    data.links.forEach((link, index) => {
      if (link?.url == null || link.url === '') return // Required when publishing.
      if (
        typeof link.url !== 'string' ||
        !/^https?:\/\//i.test(link.url) ||
        !URL.canParse(link.url)
      ) {
        errors.push({ path: `links.${index}.url`, message: 'Вкажіть повну адресу HTTP або HTTPS.' })
      }
    })
  }

  if (errors.length) {
    throw new ValidationError({ collection: 'projects', errors, id: originalDoc?.id, req })
  }

  return data
}

type FirstPublication = {
  publishedAt: string | null
  publisher: number | null
  sourceProposal: number | null
}

export const keepFirstPublication: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  let previous: FirstPublication | undefined
  if (operation === 'update' && originalDoc?.id) {
    // Read the live row, not the latest draft. The row lock makes the first publisher
    // stable even if two admins publish the same draft at the same time.
    const transactionID = await req.transactionID
    const transaction = (
      transactionID == null ? undefined : req.payload.db.sessions?.[transactionID]?.db
    ) as PostgresAdapter['sessions'][string]['db'] | undefined
    if (!transaction) throw new Error('Project changes require a database transaction.')

    const result = await transaction.execute<FirstPublication>(sql`
      SELECT published_at::text AS "publishedAt", publisher_id AS "publisher",
        source_proposal_id AS "sourceProposal"
      FROM projects WHERE id = ${originalDoc.id} FOR UPDATE
    `)
    previous = result.rows[0]
    if (!previous) throw new Error('Project no longer exists.')
    data.sourceProposal = previous.sourceProposal
  } else if (operation === 'create' && originalDoc?.id) {
    data.sourceProposal = null
  }

  if (previous?.publishedAt) {
    data.publishedAt = new Date(previous.publishedAt).toISOString()
    data.publisher = previous.publisher
  } else if (data._status === 'published') {
    data.publishedAt = new Date().toISOString()
    data.publisher = req.user && adminOnly({ req }) ? req.user.id : null
  } else {
    data.publishedAt = null
    data.publisher = null
  }

  return data
}

export const validateProjectInitiator: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  const proposalID = getRelationId<ProjectProposal>(data.sourceProposal)
  if (proposalID == null) return data

  const name =
    data.initiatorName === undefined && operation === 'update'
      ? originalDoc?.initiatorName
      : data.initiatorName
  if (name == null || name === '') return data

  const proposal = await req.payload.findByID({
    collection: 'project-proposals',
    depth: 0,
    overrideAccess: true,
    req,
    id: proposalID,
    select: { name: true, showInitiatorName: true },
  })

  if (proposal?.showInitiatorName !== true || name !== proposal.name) {
    throw new ValidationError({
      collection: 'projects',
      errors: [
        {
          path: 'initiatorName',
          message: 'Можна вказати лише ім’я з пропозиції за згодою автора.',
        },
      ],
      id: operation === 'update' ? originalDoc?.id : undefined,
      req,
    })
  }

  return data
}

export const keepProjectApplications: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const { totalDocs } = await req.payload.count({
    collection: 'project-applications',
    overrideAccess: true,
    req,
    where: { project: { equals: id } },
  })
  if (totalDocs) {
    throw new ValidationError({
      collection: 'projects',
      errors: [
        {
          path: 'id',
          message: 'Проєкт має заявки. Припиніть публікацію або спочатку видаліть його заявки.',
        },
      ],
      id,
      req,
    })
  }
}

export const revalidateProjects: CollectionAfterChangeHook & CollectionAfterDeleteHook = ({
  doc,
  req,
}) => {
  if (!req.context.disableRevalidate) {
    invalidateCacheTags(CONTENT_CACHE_TAGS.projects)
    revalidatePath('/projects')
    revalidatePath('/projects/[slug]', 'page')
    revalidatePath('/sitemap.xml')
  }

  return doc
}
