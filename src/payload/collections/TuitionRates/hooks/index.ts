import { revalidatePath } from 'next/cache'

import { studyFormLabels } from '../../EducationalPrograms/constants'
import { getRelationId } from '@/payload/helpers'

import type { TuitionRate } from '@/payload-types'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
  PayloadRequest,
} from 'payload'

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
      adminTitle: true,
      studyForms: true,
      title: true,
    },
  })

  data.adminTitle = `${academicYear} · ${program.adminTitle || program.title} · ${studyFormLabels[studyForm]}`

  return data
}

const TUITION_RATE_CONSUMER_PATHS = ['/vartist-navchannia', '/educational-programs']

const getEducationalProgramConsumerPaths = async (req: PayloadRequest, ...rates: TuitionRate[]) => {
  const paths = new Set(TUITION_RATE_CONSUMER_PATHS)
  const programIds = rates
    .map((rate) => getRelationId(rate?.educationalProgram))
    .filter((id) => id !== undefined)

  if (!programIds.length) return paths

  const programs = await req.payload.find({
    collection: 'educational-programs',
    depth: 0,
    overrideAccess: true,
    pagination: false,
    req,
    select: {
      slug: true,
    },
    where: {
      id: {
        in: programIds,
      },
      _status: {
        equals: 'published',
      },
    },
  })

  for (const program of programs.docs) {
    paths.add(`/educational-programs/${program.slug}`)
  }

  return paths
}

export const revalidateTuitionRateConsumers: CollectionAfterChangeHook<TuitionRate> = async ({
  doc,
  previousDoc,
  req,
}) => {
  if (req.context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    for (const path of await getEducationalProgramConsumerPaths(req, doc, previousDoc)) {
      req.payload.logger.info(`Revalidating tuition rate consumer at ${path}`)
      revalidatePath(path)
    }
  }

  return doc
}

export const revalidateTuitionRateConsumersAfterDelete: CollectionAfterDeleteHook<
  TuitionRate
> = async ({ doc, req }) => {
  if (req.context.disableRevalidate || doc?._status !== 'published') return doc

  for (const path of await getEducationalProgramConsumerPaths(req, doc)) {
    req.payload.logger.info(`Revalidating tuition rate consumer at ${path}`)
    revalidatePath(path)
  }

  return doc
}
