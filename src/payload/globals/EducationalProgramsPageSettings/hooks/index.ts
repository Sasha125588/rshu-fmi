import { revalidatePath } from 'next/cache'

import { invalidateCacheTags } from '@/payload/helpers'
import { CONTENT_CACHE_TAGS } from '@/shared/constants/cache'

import type { GlobalAfterChangeHook } from 'payload'

const EDUCATIONAL_PROGRAMS_PAGE_PATH = '/educational-programs'

export const revalidateEducationalProgramsPageSettings: GlobalAfterChangeHook = ({
  doc,
  previousDoc,
  req,
}) => {
  if (req.context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    invalidateCacheTags(CONTENT_CACHE_TAGS.educationalProgramSettings)
    req.payload.logger.info(
      `Revalidating educational programs page at ${EDUCATIONAL_PROGRAMS_PAGE_PATH}`
    )
    revalidatePath(EDUCATIONAL_PROGRAMS_PAGE_PATH)
  }

  return doc
}
