import { sql } from '@payloadcms/db-postgres'
import { ValidationError } from 'payload'

import { getRelationId } from '@/payload/helpers'
import { CONTACT_LIMITS } from '@/shared/projects/constants'

import type { ProjectApplication, ProjectContributor } from '@/payload-types'
import type { PostgresAdapter } from '@payloadcms/db-postgres'
import type { CollectionBeforeChangeHook } from 'payload'

type ApplicationRow = {
  contributorId: number | null
  projectId: number
  name: string
}

export const linkApplicationContributor: CollectionBeforeChangeHook<ProjectApplication> = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  const createDraft = data.createContributorDraft === true
  const contributorId = getRelationId<ProjectContributor>(data.linkContributor)
  if (operation !== 'update' || !originalDoc || (!createDraft && contributorId == null)) return data

  const transactionID = await req.transactionID
  const transaction = (
    transactionID == null ? undefined : req.payload.db.sessions?.[transactionID]?.db
  ) as PostgresAdapter['sessions'][string]['db'] | undefined
  if (!transaction) throw new Error('Linking a contributor requires a database transaction.')

  // Another save may have linked this application after Payload read originalDoc.
  const { rows } = await transaction.execute<ApplicationRow>(sql`
    SELECT contributor_id AS "contributorId", project_id AS "projectId", name
    FROM project_applications WHERE id = ${originalDoc.id} FOR UPDATE
  `)
  const application = rows[0]
  if (!application) throw new Error('Project application no longer exists.')
  if (application.contributorId != null) return { ...data, contributor: application.contributorId }

  if (createDraft && contributorId != null) {
    throw new ValidationError({
      collection: 'project-applications',
      errors: [{ path: 'linkContributor', message: 'Вибери одну дію для контриб’ютора.' }],
      id: originalDoc.id,
      req,
    })
  }

  const contributorOptions = {
    collection: 'project-contributors',
    depth: 0,
    draft: true,
    overrideAccess: false,
    req,
  } as const

  if (contributorId != null) {
    const contributor = await req.payload.findByID({ ...contributorOptions, id: contributorId })
    if (contributor.source === 'github') {
      await req.payload.update({
        ...contributorOptions,
        id: contributor.id,
        data: { source: 'both' },
      })
    }
    return { ...data, contributor: contributor.id }
  }

  const savedName = data.name ?? application.name
  const name = typeof savedName === 'string' ? savedName.trim() : ''
  if (!name || name.length > CONTACT_LIMITS.name) {
    throw new ValidationError({
      collection: 'project-applications',
      errors: [
        {
          path: 'name',
          message: `Вкажи публічне ім’я до ${CONTACT_LIMITS.name} символів.`,
        },
      ],
      id: originalDoc.id,
      req,
    })
  }
  const contributor = await req.payload.create({
    ...contributorOptions,
    data: { name, project: application.projectId, source: 'project' },
  })

  return { ...data, contributor: contributor.id }
}
