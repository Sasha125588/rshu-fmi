import { revalidatePath } from 'next/cache'

import { invalidateCacheTags } from '@/payload/helpers'
import { CONTENT_CACHE_TAGS } from '@/shared/constants/cache'

import type { Department } from '@/payload-types'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const DEPARTMENTS_PATH = '/departments'

export const revalidateDepartmentConsumers: CollectionAfterChangeHook<Department> = ({
  doc,
  req,
}) => {
  if (req.context.disableRevalidate) return doc

  invalidateCacheTags(CONTENT_CACHE_TAGS.departments)
  req.payload.logger.info(`Revalidating department consumers from ${DEPARTMENTS_PATH}`)
  revalidatePath(DEPARTMENTS_PATH)

  return doc
}

export const revalidateDepartmentConsumersAfterDelete: CollectionAfterDeleteHook<Department> = ({
  doc,
  req,
}) => {
  if (req.context.disableRevalidate) return doc

  invalidateCacheTags(CONTENT_CACHE_TAGS.departments)
  req.payload.logger.info(`Revalidating department consumers from ${DEPARTMENTS_PATH}`)
  revalidatePath(DEPARTMENTS_PATH)

  return doc
}
