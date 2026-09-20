import { invalidateCacheTags } from '@/payload/helpers'
import { CONTENT_CACHE_TAGS } from '@/shared/constants/cache'

import type { Media } from '@/payload-types'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidateMediaConsumers: CollectionAfterChangeHook<Media> = ({ doc, req }) => {
  if (req.context.disableRevalidate) return doc

  invalidateCacheTags(CONTENT_CACHE_TAGS.media)
  req.payload.logger.info(`Revalidating media consumers for media ${doc.id}`)

  return doc
}

export const revalidateMediaConsumersAfterDelete: CollectionAfterDeleteHook<Media> = ({
  doc,
  req,
}) => {
  if (req.context.disableRevalidate) return doc

  invalidateCacheTags(CONTENT_CACHE_TAGS.media)
  req.payload.logger.info(`Revalidating media consumers for media ${doc.id}`)

  return doc
}
