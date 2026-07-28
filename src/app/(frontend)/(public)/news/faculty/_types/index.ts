import type { FacultyNews, Media } from '@/payload-types'
import type { NewsTagCode } from '@/payload/collections/FacultyNews/constants'

type OptionalNonNullable<T, KEYS extends keyof T> = {
  [K in KEYS]: NonNullable<T[K]>
}

export type FacultyNewsMediaData = Pick<
  Media,
  'id' | 'caption' | 'focalX' | 'focalY' | 'mimeType' | 'updatedAt'
> &
  OptionalNonNullable<Media, 'blurDataURL' | 'height' | 'width'> & {
    url: string
    alt: string
    blurDataURL: string | undefined
    sizes: Partial<Record<'card' | 'hero' | 'newsCard', FacultyNewsImageVariant>>
  }

export type MediaSize = NonNullable<NonNullable<Media['sizes']>['newsCard']>

export type FacultyNewsImageVariant = {
  url: NonNullable<MediaSize['url' | 'filename']>
} & Pick<MediaSize, 'mimeType'> &
  OptionalNonNullable<MediaSize, 'height' | 'width'>

export type FacultyNewsCardData = Pick<FacultyNews, 'excerpt' | 'id' | 'slug' | 'title'> & {
  coverImage?: FacultyNewsMediaData
  isPinned: boolean
  publishedAt: NonNullable<FacultyNews['publishedAt']>
  tags: NewsTagCode[]
}
