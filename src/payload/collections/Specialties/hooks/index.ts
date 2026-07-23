import { revalidatePath } from 'next/cache'
import { ValidationError } from 'payload'

import type { Specialty } from '@/payload-types'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeDeleteHook,
  PayloadRequest,
} from 'payload'

export const preventDeletingUsedSpecialty: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const { totalDocs } = await req.payload.count({
    collection: 'educational-programs',
    overrideAccess: true,
    req,
    where: {
      specialty: {
        equals: id,
      },
    },
  })

  if (totalDocs > 0) {
    throw new ValidationError({
      collection: 'specialties',
      errors: [
        {
          message: 'Спеціальність не можна видалити, доки з нею повʼязані освітні програми.',
          path: 'educationalPrograms',
        },
      ],
      id,
      req,
    })
  }
}

// TODO: Додати синхронізацію adminTitle (?)
// export const syncRelatedProgramAdminTitles: CollectionAfterChangeHook<Specialty> = async ({
//   doc,
//   operation,
//   previousDoc,
//   req,
// }) => {
//   const codesChanged =
//     operation === 'update' &&
//     (doc.code !== previousDoc.code ||
//       (doc.legacyCode ?? null) !== (previousDoc.legacyCode ?? null))

//   if (!codesChanged) return doc

//   const programs = await req.payload.find({
//     collection: 'educational-programs',
//     depth: 0,
//     draft: true,
//     overrideAccess: true,
//     pagination: false,
//     req,
//     select: {
//       adminTitle: true,
//       _status: true,
//     },
//     where: {
//       specialty: {
//         equals: doc.id,
//       },
//     },
//   })

//   for (const program of programs.docs) {
//     await req.payload.update({
//       collection: 'educational-programs',
//       context: {
//         ...req.context,
//         disableRevalidate: true,
//       },
//       data: {
//         adminTitle: program.adminTitle,
//       },
//       draft: program._status === 'draft',
//       id: program.id,
//       overrideAccess: true,
//       req,
//     })
//   }

//   return doc
// }

const SPECIALTY_CONSUMER_PATHS = ['/', '/educational-programs', '/vartist-navchannia']

const getSpecialtyConsumerPaths = async (id: Specialty['id'], req: PayloadRequest) => {
  const paths = new Set(SPECIALTY_CONSUMER_PATHS)
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
      specialty: {
        equals: id,
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

export const revalidateSpecialtyConsumers: CollectionAfterChangeHook<Specialty> = async ({
  doc,
  previousDoc,
  req,
}) => {
  if (req.context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    for (const path of await getSpecialtyConsumerPaths(doc.id, req)) {
      req.payload.logger.info(`Revalidating specialty consumer at ${path}`)
      revalidatePath(path)
    }
  }

  return doc
}

export const revalidateSpecialtyConsumersAfterDelete: CollectionAfterDeleteHook<Specialty> = ({
  doc,
  req,
}) => {
  if (req.context.disableRevalidate || doc?._status !== 'published') return doc

  for (const path of SPECIALTY_CONSUMER_PATHS) {
    req.payload.logger.info(`Revalidating specialty consumer at ${path}`)
    revalidatePath(path)
  }

  return doc
}
