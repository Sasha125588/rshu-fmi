import { revalidatePath } from 'next/cache'

import { educationLevelLabels } from '../constants'
import { getRelationId } from '@/payload/helpers'

import type { EducationalProgram } from '@/payload-types'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
  FieldHook,
  PayloadRequest,
} from 'payload'

const HOME_PAGE_PATH = '/'
const SITEMAP_PATH = '/sitemap.xml'
const EDUCATIONAL_PROGRAMS_PAGE_PATH = '/educational-programs'
const TUITION_PAGE_PATH = '/vartist-navchannia'

const getProgramConsumerPaths = (...programs: Array<EducationalProgram | null | undefined>) => {
  const paths = new Set([
    HOME_PAGE_PATH,
    SITEMAP_PATH,
    EDUCATIONAL_PROGRAMS_PAGE_PATH,
    TUITION_PAGE_PATH,
  ])

  for (const program of programs) {
    if (program?._status === 'published' && program.slug) {
      paths.add(`${EDUCATIONAL_PROGRAMS_PAGE_PATH}/${program.slug}`)
    }
  }

  return paths
}

type ProgramIdentityData = Partial<
  Pick<EducationalProgram, 'educationLevel' | 'title' | 'specialty'>
>

const buildProgramAdminTitle = async (data: ProgramIdentityData, req: PayloadRequest) => {
  const specialtyId = getRelationId(data.specialty)
  const educationLevel = data.educationLevel ? educationLevelLabels[data.educationLevel] : undefined

  if (!specialtyId) {
    return [data.title, educationLevel ? `— ${educationLevel}` : undefined]
      .filter(Boolean)
      .join(' ')
  }

  const specialty = await req.payload.findByID({
    collection: 'specialties',
    depth: 0,
    id: specialtyId,
    overrideAccess: true,
    req,
    select: {
      code: true,
      legacyCode: true,
    },
  })
  const codes = [specialty.code, specialty.legacyCode].filter(Boolean).join(' / ')

  return [
    data.title,
    educationLevel ? `— ${educationLevel}` : undefined,
    codes ? `(${codes})` : undefined,
  ]
    .filter(Boolean)
    .join(' ')
}

export const setProgramAdminTitle: CollectionBeforeValidateHook<EducationalProgram> = async ({
  data,
  originalDoc,
  req,
}) => {
  if (!data) return data

  data.adminTitle = await buildProgramAdminTitle({ ...originalDoc, ...data }, req)
}

export const getProgramAdminTitle: FieldHook<
  EducationalProgram,
  EducationalProgram['adminTitle'],
  EducationalProgram
> = async ({ siblingData, value, req }) => {
  if (value && value.trim()) return value

  return await buildProgramAdminTitle(siblingData, req)
}

export const revalidateProgramConsumers: CollectionAfterChangeHook<EducationalProgram> = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    for (const path of getProgramConsumerPaths(doc, previousDoc)) {
      payload.logger.info(`Revalidating educational program consumer at ${path}`)
      revalidatePath(path)
    }
  }

  return doc
}

export const revalidateProgramConsumersAfterDelete: CollectionAfterDeleteHook<
  EducationalProgram
> = ({ doc, req: { context, payload } }) => {
  if (context.disableRevalidate || doc?._status !== 'published') return doc

  for (const path of getProgramConsumerPaths(doc)) {
    payload.logger.info(`Revalidating educational program consumer at ${path}`)
    revalidatePath(path)
  }

  return doc
}
