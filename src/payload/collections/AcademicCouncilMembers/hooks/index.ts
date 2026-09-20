import { revalidatePath } from 'next/cache'

import { invalidateCacheTags } from '@/payload/helpers'
import { CONTENT_CACHE_TAGS } from '@/shared/constants/cache'

import type { AcademicCouncilMember } from '@/payload-types'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const ACADEMIC_COUNCIL_PATH = '/vchena-rada'

export const revalidateAcademicCouncil: CollectionAfterChangeHook<AcademicCouncilMember> = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    invalidateCacheTags(CONTENT_CACHE_TAGS.academicCouncil)
    payload.logger.info(`Revalidating academic council at ${ACADEMIC_COUNCIL_PATH}`)
    revalidatePath(ACADEMIC_COUNCIL_PATH)
  }

  return doc
}

export const revalidateAcademicCouncilAfterDelete: CollectionAfterDeleteHook<
  AcademicCouncilMember
> = ({ doc, req: { context, payload } }) => {
  if (context.disableRevalidate || doc?._status !== 'published') return doc

  invalidateCacheTags(CONTENT_CACHE_TAGS.academicCouncil)
  payload.logger.info(`Revalidating academic council at ${ACADEMIC_COUNCIL_PATH}`)
  revalidatePath(ACADEMIC_COUNCIL_PATH)

  return doc
}
