import { CalendarDaysIcon, EyeIcon } from 'lucide-react'

import { ExternalNewsCover } from './ExternalNewsCover'
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
          {variant !== 'compact' && (
            <NewsCardMedia className="from-muted to-muted/35 bg-linear-to-br">
              <span
                aria-hidden="true"
                className="font-jetbrains text-muted-foreground/45 absolute inset-0 flex items-end p-4 text-xs tracking-[0.2em] uppercase"
              >
                {source.badgeLabel}
              </span>
              {item.previewImage && (
                <ExternalNewsCover
                  key={item.previewImage}
                  src={item.previewImage}
                  featured={variant === 'featured'}
                />
              )}
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
                item.publishedAt && (
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
                )
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
