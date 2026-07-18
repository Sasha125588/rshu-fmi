import { revalidatePath } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

const SPECIALIZATIONS_PAGE_PATH = '/specializations'

export const revalidateSpecializationsPageSettings: GlobalAfterChangeHook = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    payload.logger.info(`Revalidating specializations page at ${SPECIALIZATIONS_PAGE_PATH}`)
    revalidatePath(SPECIALIZATIONS_PAGE_PATH)
  }

  return doc
}
