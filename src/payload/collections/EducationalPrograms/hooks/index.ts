import { revalidatePath } from 'next/cache'

import { educationLevelLabels } from '../constants'

import type { EducationalProgram } from '@/payload-types'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
  FieldHook,
} from 'payload'

const HOME_PAGE_PATH = '/'
const SITEMAP_PATH = '/sitemap.xml'
const SPECIALIZATIONS_PAGE_PATH = '/specializations'
const TUITION_PAGE_PATH = '/vartist-navchannia'

const getProgramConsumerPaths = (...programs: Array<EducationalProgram | null | undefined>) => {
  const paths = new Set([
    HOME_PAGE_PATH,
    SITEMAP_PATH,
    SPECIALIZATIONS_PAGE_PATH,
    TUITION_PAGE_PATH,
  ])

  for (const program of programs) {
    if (program?._status === 'published' && program.slug) {
      paths.add(`${SPECIALIZATIONS_PAGE_PATH}/${program.slug}`)
    }
  }

  return paths
}

type ProgramIdentityData = Partial<
  Pick<
    EducationalProgram,
    | 'adminTitle'
    | 'educationLevel'
    | 'legacySpecialtyCode'
    | 'shortTitle'
    | 'specialtyCode'
    | 'title'
  >
>

const buildProgramAdminTitle = (data: ProgramIdentityData) => {
  const title = data.title || data.shortTitle
  const educationLevel = educationLevelLabels[data.educationLevel!]
  const codes = [data.specialtyCode, data.legacySpecialtyCode].filter(Boolean).join(' / ')

  return [title, `— ${educationLevel}`, `(${codes})`].filter(Boolean).join(' ')
}

export const setProgramAdminTitle: CollectionBeforeValidateHook<EducationalProgram> = ({
  data,
}) => {
  if (!data) return data

  data.adminTitle = buildProgramAdminTitle(data)
}

export const getProgramAdminTitle: FieldHook<
  EducationalProgram,
  EducationalProgram['adminTitle'],
  EducationalProgram
> = ({ siblingData, value }) => {
  if (value && value.trim()) return value

  return buildProgramAdminTitle(siblingData)
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
