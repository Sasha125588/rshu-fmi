import { revalidatePath } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

const TUITION_PAGE_PATH = '/vartist-navchannia'
const SPECIALIZATIONS_PAGE_PATH = '/specializations'

const TUITION_SETTINGS_CONSUMER_PATHS = [TUITION_PAGE_PATH, SPECIALIZATIONS_PAGE_PATH]

export const revalidateTuitionPageSettings: GlobalAfterChangeHook = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    for (const path of TUITION_SETTINGS_CONSUMER_PATHS) {
      payload.logger.info(`Revalidating tuition page settings consumer at ${path}`)
      revalidatePath(path)
    }
  }

  return doc
}
