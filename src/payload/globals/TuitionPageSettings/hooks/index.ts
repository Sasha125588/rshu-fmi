import { revalidatePath } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

const TUITION_PAGE_PATH = '/vartist-navchannia'
const EDUCATIONAL_PROGRAMS_PAGE_PATH = '/educational-programs'

const TUITION_SETTINGS_CONSUMER_PATHS = [TUITION_PAGE_PATH, EDUCATIONAL_PROGRAMS_PAGE_PATH]

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
