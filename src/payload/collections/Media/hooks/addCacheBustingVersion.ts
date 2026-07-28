import type { Media } from '@/payload-types'
import type { CollectionAfterReadHook } from 'payload'

const appendVersion = (url: string, version: number) =>
  url.includes('?') ? `${url}&v=${version}` : `${url}?v=${version}`

export const addCacheBustingVersion: CollectionAfterReadHook<Media> = ({ doc }) => {
  const version = new Date(doc.updatedAt).getTime()

  if (doc.url) doc.url = appendVersion(doc.url, version)

  if (doc.sizes) {
    for (const sizeName in doc.sizes) {
      const size = doc.sizes[sizeName as keyof typeof doc.sizes]

      if (size?.url) size.url = appendVersion(size.url, version)
    }
  }

  return doc
}
