import { revalidatePath } from 'next/cache'
import { APIError } from 'payload'

import type { DocumentCategory } from '@/payload-types'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeDeleteHook,
} from 'payload'

const DOCUMENT_CATALOG_PATH = '/normatyvni-dokumenty'

export const preventDeletingUsedCategory: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const { totalDocs } = await req.payload.count({
    collection: 'documents',
    overrideAccess: true,
    req,
    where: {
      category: {
        equals: id,
      },
    },
  })

  if (totalDocs > 0) {
    throw new APIError(
      'Категорію не можна видалити, доки вона використовується документами.',
      400,
      undefined,
      true
    )
  }
}

export const revalidateDocumentCatalogCategory: CollectionAfterChangeHook<DocumentCategory> = ({
  doc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) return doc

  payload.logger.info(`Revalidating document catalog at ${DOCUMENT_CATALOG_PATH}`)
  revalidatePath(DOCUMENT_CATALOG_PATH)

  return doc
}

export const revalidateDocumentCatalogCategoryAfterDelete: CollectionAfterDeleteHook<
  DocumentCategory
> = ({ doc, req: { context, payload } }) => {
  if (context.disableRevalidate) return doc

  payload.logger.info(`Revalidating document catalog at ${DOCUMENT_CATALOG_PATH}`)
  revalidatePath(DOCUMENT_CATALOG_PATH)

  return doc
}
