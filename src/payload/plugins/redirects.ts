import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { revalidatePath } from 'next/cache'

import { adminsOrEditors } from '@/payload/access'

import type { Redirect } from '@/payload-types'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const revalidateRedirectPath: CollectionAfterChangeHook<Redirect> = ({ doc, previousDoc, req }) => {
  if (req.context.disableRedirectRevalidate) return doc

  const paths = new Set([doc.from, previousDoc.from].filter(Boolean))

  for (const path of paths) {
    req.payload.logger.info(`Revalidating redirect at ${path}`)
    revalidatePath(path)
  }

  return doc
}

const revalidateRedirectPathAfterDelete: CollectionAfterDeleteHook<Redirect> = ({ doc, req }) => {
  if (req.context.disableRedirectRevalidate) return doc

  req.payload.logger.info(`Revalidating redirect at ${doc.from}`)
  revalidatePath(doc.from)

  return doc
}

export const siteRedirectsPlugin = redirectsPlugin({
  collections: ['faculty-news'],
  overrides: {
    labels: {
      singular: 'Перенаправлення',
      plural: 'Перенаправлення',
    },
    access: {
      admin: (args) => !!adminsOrEditors(args),
      create: adminsOrEditors,
      delete: adminsOrEditors,
      read: () => true,
      update: adminsOrEditors,
    },
    admin: {
      group: 'Контент',
      listSearchableFields: ['from'],
      useAsTitle: 'from',
    },
    hooks: {
      afterChange: [revalidateRedirectPath],
      afterDelete: [revalidateRedirectPathAfterDelete],
    },
  },
})
