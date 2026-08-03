import { CalendarDaysIcon, EyeIcon } from 'lucide-react'
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
import { Typography } from '@/components/ui'
import { newsDateFormatter } from '@/lib'
import { getNewsTagLabel } from '@/payload/collections/FacultyNews/constants'
import { NEWS_SOURCE_CONFIG } from '@/shared/news'

import type { NewsCardVariant } from './NewsCard'
import type { ExternalNewsItem } from '@/shared/news'

interface ExternalNewsCardProps {
  item: ExternalNewsItem
  variant?: NewsCardVariant
  withSource?: boolean
}

export const ExternalNewsCard = ({
  item,
  variant = 'row',
  withSource = false,
}: ExternalNewsCardProps) => {
  const source = NEWS_SOURCE_CONFIG[item.source]
  const tagLabels = item.tags.map(getNewsTagLabel)

  return (
    <NewsCard variant={variant}>
      <article>
        <NewsCardLink
          href={item.link}
          external
        >
          {variant === 'compact' ? null : item.previewImage ? (
            <NewsCardMedia>
              <Image
                src={item.previewImage}
                alt=""
                // unoptimized
                fill
                loading="lazy"
                sizes={
                  variant === 'featured'
                    ? '(max-width: 767px) calc(100vw - 4rem), 38vw'
                    : '(max-width: 767px) calc(100vw - 4rem), 220px'
                }
                className="object-cover transition-transform duration-500 group-hover/news-card:scale-[1.03]"
              />
            </NewsCardMedia>
          ) : (
            <NewsCardMedia className="from-muted to-muted/35 bg-linear-to-br">
              <span className="font-jetbrains text-muted-foreground/45 absolute inset-0 flex items-end p-4 text-xs tracking-[0.2em] uppercase">
                {source.badgeLabel}
              </span>
            </NewsCardMedia>
          )}

          <span className="min-w-0">
            <NewsCardMeta>
              {withSource && <NewsCardSource>{source.badgeLabel}</NewsCardSource>}

              {item.source === 'university' ? (
                <Typography
                  as="span"
                  variant="body-sm"
                  className="text-muted-foreground flex items-center gap-1.5"
                >
                  <EyeIcon
                    aria-hidden="true"
                    className="size-4"
                  />
                  {item.views.toLocaleString('uk-UA')} переглядів
                </Typography>
              ) : (
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
              )}

              {!!tagLabels.length && <NewsCardTags tags={tagLabels} />}
            </NewsCardMeta>

            <NewsCardTitle>{item.title}</NewsCardTitle>

            {!!item.description && <NewsCardExcerpt>{item.description}</NewsCardExcerpt>}
          </span>

          <NewsCardAction
            external
            label="Відкрити новину на сайті-джерелі в новій вкладці"
          />
        </NewsCardLink>
      </article>
    </NewsCard>
  )
}
