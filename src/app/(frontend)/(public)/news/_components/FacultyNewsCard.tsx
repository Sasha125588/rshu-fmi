import { CalendarDaysIcon, PinIcon } from 'lucide-react'
import Image from 'next/image'

import {
  NewsCard,
  NewsCardAction,
  NewsCardExcerpt,
  NewsCardLink,
  NewsCardMedia,
  NewsCardMeta,
  NewsCardSource,
  NewsCardTags,
  NewsCardTitle,
} from './NewsCard'
import { Badge, Typography } from '@/components/ui'
import { newsDateFormatter } from '@/lib'
import { getNewsTagLabel } from '@/payload/collections/FacultyNews/constants'

import type { FacultyNewsCardData } from '../faculty/_types'
import type { NewsCardVariant } from './NewsCard'

interface FacultyNewsCardProps {
  item: FacultyNewsCardData
  variant?: NewsCardVariant
  withSource?: boolean
}

export const FacultyNewsCard = ({
  item,
  variant = 'row',
  withSource = false,
}: FacultyNewsCardProps) => {
  const tagLabels = item.tags.map(getNewsTagLabel)

  return (
    <NewsCard variant={variant}>
      <article>
        <NewsCardLink href={`/news/faculty/${item.slug}`}>
          {variant !== 'compact' && (
            <NewsCardMedia className="from-muted via-muted/65 to-accent-violet/15 bg-linear-to-br">
              {item.coverImage && item.coverImage.sizes.newsCard?.url ? (
                <Image
                  src={item.coverImage.sizes.newsCard?.url}
                  alt={item.coverImage.alt}
                  // unoptimized
                  fill
                  loading="lazy"
                  placeholder={item.coverImage.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={item.coverImage.blurDataURL}
                  sizes={
                    variant === 'featured'
                      ? '(max-width: 767px) calc(100vw - 4rem), 38vw'
                      : '(max-width: 767px) calc(100vw - 4rem), 220px'
                  }
                  className="object-cover transition-transform duration-500 group-hover/news-card:scale-[1.03]"
                />
              ) : (
                <span className="absolute inset-0 flex flex-col justify-between p-4">
                  <span className="bg-accent-violet/60 block h-px w-12 transition-all duration-300 group-hover/news-card:w-20" />
                  <span className="font-jetbrains text-muted-foreground/55 text-xs tracking-[0.2em] uppercase">
                    Новини ФМІ
                  </span>
                </span>
              )}
            </NewsCardMedia>
          )}

          <span className="min-w-0">
            <NewsCardMeta>
              {withSource && <NewsCardSource>ФМІ</NewsCardSource>}

              {item.isPinned && (
                <Badge
                  variant="secondary"
                  className="rounded-full"
                >
                  <PinIcon
                    aria-hidden="true"
                    data-icon="inline-start"
                  />
                  Закріплено
                </Badge>
              )}

              <Typography
                as="time"
                variant="body-sm"
                dateTime={item.publishedAt}
                className="text-muted-foreground flex items-center gap-1.5"
              >
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="size-4"
                />
                {newsDateFormatter.format(new Date(item.publishedAt))}
              </Typography>

              {!!tagLabels.length && <NewsCardTags tags={tagLabels} />}
            </NewsCardMeta>

            <NewsCardTitle>{item.title}</NewsCardTitle>
            <NewsCardExcerpt>{item.excerpt}</NewsCardExcerpt>
          </span>

          <NewsCardAction label={`Читати новину «${item.title}»`} />
        </NewsCardLink>
      </article>
    </NewsCard>
  )
}
