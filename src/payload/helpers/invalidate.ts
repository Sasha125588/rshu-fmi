import { revalidateTag } from 'next/cache'

export const invalidateCacheTags = (...tags: string[]) => {
  for (const tag of tags) revalidateTag(tag, { expire: 0 })
}
