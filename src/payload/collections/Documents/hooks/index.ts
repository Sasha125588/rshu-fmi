import { revalidatePath } from 'next/cache'
import { ValidationError } from 'payload'

import { buildDocumentTitle } from '../helpers'

import type { DocumentTitleProgram } from '../helpers'
import type { Document } from '@/payload-types'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
  ValidationFieldError,
} from 'payload'

export const setDocumentTitle: CollectionBeforeValidateHook<Document> = async ({
  data,
  originalDoc,
  req,
}) => {
  if (!data) return data

  const document = {
    ...originalDoc,
    ...data,
  }

  const educationalProgramIDs = document.educationalPrograms ?? []
  let educationalPrograms: DocumentTitleProgram[] = []

  if (educationalProgramIDs.length) {
    const result = await req.payload.find({
      collection: 'educational-programs',
      depth: 1,
      overrideAccess: true,
      pagination: false,
      populate: {
        specialties: {
          abbreviation: true,
        },
      },
      req,
      select: {
        educationLevel: true,
        specialty: true,
      },
      where: {
        id: {
          in: educationalProgramIDs,
        },
      },
    })
    const programsByID = new Map(result.docs.map((program) => [program.id, program]))

    educationalPrograms = educationalProgramIDs.flatMap((id) => {
      const program = programsByID.get(+id)
      const specialty =
        program && typeof program.specialty === 'object' ? program.specialty : undefined

      return program && specialty
        ? [
            {
              educationLevel: program.educationLevel,
              specialtyAbbreviation: specialty.abbreviation,
            },
          ]
        : []
    })
  }

  const nextGeneratedTitle = buildDocumentTitle({
    documentType: document.documentType,
    educationalPrograms,
    periodLabel: document.periodLabel,
    documentDate: document.documentDate,
  })
  const currentTitle = document.title?.trim() ?? ''
  const previousSnapshot = originalDoc?.generatedTitleSnapshot?.trim() ?? ''
  const submittedSnapshot = data.generatedTitleSnapshot?.trim() ?? ''
  const shouldUpdateTitle =
    !currentTitle ||
    currentTitle === previousSnapshot ||
    currentTitle === submittedSnapshot ||
    currentTitle === nextGeneratedTitle

  if (shouldUpdateTitle) data.title = nextGeneratedTitle
  data.generatedTitleSnapshot = nextGeneratedTitle

  return data
}

export const validatePublishedDocument: CollectionBeforeValidateHook<Document> = ({
  data,
  originalDoc,
  req,
}) => {
  if (!data) return data

  const document = {
    ...originalDoc,
    ...data,
  }

  if (document._status === 'draft') return data

  const errors: ValidationFieldError[] = []
  const hasFile = !!document.file
  const hasExternalUrl = !!document.externalUrl?.trim()
  // const hasEducationalPrograms = !!document.educationalPrograms?.length

  if (!hasFile && !hasExternalUrl) {
    errors.push({
      message: 'Додайте файл або зовнішнє посилання.',
      path: 'file',
    })
  }

  // if (!hasEducationalPrograms && !document.showInRegulatoryCatalog) {
  //   errors.push({
  //     message: 'Оберіть освітню програму або додайте документ до нормативного каталогу.',
  //     path: 'educationalPrograms',
  //   })
  // }

  // if (document.showInRegulatoryCatalog && !document.category) {
  //   errors.push({
  //     message: 'Оберіть категорію нормативного документа.',
  //     path: 'category',
  //   })
  // }

  // if (document.showInRegulatoryCatalog && !document.source) {
  //   errors.push({
  //     message: 'Оберіть джерело нормативного документа.',
  //     path: 'source',
  //   })
  // }

  if (errors.length) {
    throw new ValidationError({
      collection: 'documents',
      errors,
      req,
    })
  }

  return data
}

const DOCUMENT_CATALOG_PATH = '/normatyvni-dokumenty'

export const revalidateDocumentCatalog: CollectionAfterChangeHook<Document> = ({
  doc,
  previousDoc,
  req,
}) => {
  if (req.context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    req.payload.logger.info(`Revalidating document catalog at ${DOCUMENT_CATALOG_PATH}`)
    revalidatePath(DOCUMENT_CATALOG_PATH)
  }

  return doc
}

export const revalidateDocumentCatalogAfterDelete: CollectionAfterDeleteHook<Document> = ({
  doc,
  req,
}) => {
  if (req.context.disableRevalidate || doc?._status !== 'published') return doc

  req.payload.logger.info(`Revalidating document catalog at ${DOCUMENT_CATALOG_PATH}`)
  revalidatePath(DOCUMENT_CATALOG_PATH)

  return doc
}
