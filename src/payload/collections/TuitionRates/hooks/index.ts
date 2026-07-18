import { revalidatePath } from 'next/cache'

import { studyFormLabels } from '../../EducationalPrograms/constants'
import { getRelationId } from '@/payload/helpers'

import type { TuitionRate } from '@/payload-types'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
} from 'payload'

const TUITION_RATE_CONSUMER_PATHS = ['/vartist-navchannia', '/specializations'] as const

export const prepareTuitionRate: CollectionBeforeValidateHook<TuitionRate> = async ({
  data,
  originalDoc,
  req,
}) => {
  if (!data) return data

  const document = { ...originalDoc, ...data }
  const academicYear = document.academicYear?.trim()
  const studyForm = data.studyForm ?? originalDoc?.studyForm
  const programId = getRelationId(data.educationalProgram ?? originalDoc?.educationalProgram)

  if (!programId || !academicYear || !studyForm) {
    data.adminTitle = null

    return data
  }

  data.academicYear = academicYear

  const program = await req.payload.findByID({
    collection: 'educational-programs',
    depth: 0,
    id: programId,
    overrideAccess: true,
    req,
    select: {
      shortTitle: true,
      studyForms: true,
    },
  })

  data.adminTitle = `${academicYear} · ${program.shortTitle} · ${studyFormLabels[studyForm]}`

  return data
}

export const revalidateTuitionRateConsumers: CollectionAfterChangeHook<TuitionRate> = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    for (const path of TUITION_RATE_CONSUMER_PATHS) {
      payload.logger.info(`Revalidating tuition rate consumer at ${path}`)
      revalidatePath(path)
    }
  }

  return doc
}

export const revalidateTuitionRateConsumersAfterDelete: CollectionAfterDeleteHook<TuitionRate> = ({
  doc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate || doc?._status !== 'published') return doc

  for (const path of TUITION_RATE_CONSUMER_PATHS) {
    payload.logger.info(`Revalidating tuition rate consumer at ${path}`)
    revalidatePath(path)
  }

  return doc
}
