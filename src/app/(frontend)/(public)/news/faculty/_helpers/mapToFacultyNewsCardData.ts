import type { FACULTY_NEWS_CARD_SELECT } from '../_constants'
import type {
  FacultyNewsCardData,
  FacultyNewsImageVariant,
  FacultyNewsMediaData,
  MediaSize,
} from '../_types'
import type { FacultyNews, Media } from '@/payload-types'
import type { TransformCollectionWithSelect } from 'payload'

type FacultyNewsCardDocument = TransformCollectionWithSelect<
  'faculty-news',
  typeof FACULTY_NEWS_CARD_SELECT
>

const toImageVariant = (media: Media, variant?: MediaSize): FacultyNewsImageVariant | undefined => {
  if (!variant?.url) return undefined

  return {
    ...variant,
    width: variant.width ?? undefined,
    height: variant.height ?? undefined,
    url: variant?.url ?? media?.url,
  }
}

const mapToFacultyNewsMedia = (
  media: FacultyNews['coverImage']
): FacultyNewsMediaData | undefined => {
  if (!media || typeof media !== 'object') return undefined

  const url = media?.url

  if (!url) return undefined

  return {
    ...media,
    url,
    alt: media.alt ?? '',
    width: media.width ?? undefined,
    height: media.height ?? undefined,
    blurDataURL: media.blurDataURL ?? undefined,
    sizes: {
      newsCard: toImageVariant(media, media.sizes?.newsCard),
      hero: toImageVariant(media, media.sizes?.newsCard),
    },
  }
}

export const mapToFacultyNewsCardData = (news: FacultyNewsCardDocument): FacultyNewsCardData => ({
  id: news.id,
  title: news.title,
  slug: news.slug,
  excerpt: news.excerpt,
  tags: news.tags,
  publishedAt: news.publishedAt ?? news.createdAt,
  isPinned: news.isPinned ?? false,
  coverImage: mapToFacultyNewsMedia(news.coverImage),
})
