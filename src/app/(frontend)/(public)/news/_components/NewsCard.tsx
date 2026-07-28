import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'

import { Badge, Typography } from '@/components/ui'
import { cn } from '@/lib/utils'

import type { Route } from 'next'
import type { ComponentProps, ReactNode } from 'react'

export type NewsCardVariant = 'row' | 'compact' | 'featured'

interface NewsCardRootProps extends ComponentProps<'li'> {
  variant?: NewsCardVariant
}

const NewsCard = ({ className, variant = 'row', ...props }: NewsCardRootProps) => (
  <li
    data-slot="news-card"
    data-variant={variant}
    className={cn('group/news-card relative', className)}
    {...props}
  />
)

interface NewsCardLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  href: string
  external?: boolean
}

const linkClassName =
  'focus-visible:ring-ring relative grid min-w-0 gap-5 rounded-lg px-4 py-6 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 group-data-[variant=compact]/news-card:py-5 md:items-center md:grid-cols-[220px_minmax(0,1fr)_auto] group-data-[variant=compact]/news-card:md:grid-cols-[minmax(0,1fr)_auto] group-data-[variant=featured]/news-card:md:grid-cols-[minmax(260px,0.65fr)_minmax(0,1fr)_auto] hover:bg-foreground/[0.035]'

const NewsCardLink = ({
  children,
  className,
  external = false,
  href,
  ...props
}: NewsCardLinkProps) => {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="bg-accent-violet/60 absolute top-5 bottom-5 left-0 w-0.5 origin-center scale-y-0 rounded-full transition-transform duration-300 group-focus-within/news-card:scale-y-100 group-hover/news-card:scale-y-100"
      />
      {children}
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        {...props}
        data-slot="news-card-link"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(linkClassName, className)}
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      href={href as Route}
      data-slot="news-card-link"
      className={cn(linkClassName, className)}
      {...props}
    >
      {content}
    </Link>
  )
}

const NewsCardMedia = ({ className, ...props }: ComponentProps<'span'>) => (
  <span
    data-slot="news-card-media"
    className={cn(
      'bg-muted relative block aspect-video min-w-0 overflow-hidden rounded-md group-data-[variant=compact]/news-card:hidden md:aspect-auto md:h-[140px] group-data-[variant=featured]/news-card:md:h-[180px]',
      className
    )}
    {...props}
  />
)

const NewsCardMeta = ({ className, ...props }: ComponentProps<'span'>) => (
  <span
    data-slot="news-card-meta"
    className={cn('mb-3 flex flex-wrap items-center gap-2', className)}
    {...props}
  />
)

const NewsCardSource = ({ children, className, ...props }: ComponentProps<typeof Badge>) => (
  <Badge
    data-slot="news-card-source"
    variant="outline"
    className={cn('font-jetbrains rounded-full tracking-wide uppercase', className)}
    {...props}
  >
    {children}
  </Badge>
)

interface NewsCardTagsProps extends ComponentProps<'span'> {
  tags: string[]
}

const NewsCardTags = ({ className, tags, ...props }: NewsCardTagsProps) => (
  <span
    data-slot="news-card-tags"
    className={cn(
      'font-jetbrains text-muted-foreground/65 flex min-w-0 items-center gap-2 text-xs leading-5',
      className
    )}
    {...props}
  >
    <span
      aria-hidden="true"
      className="text-muted-foreground/35"
    >
      ·
    </span>
    <span className="line-clamp-1">{tags.join(' · ')}</span>
  </span>
)

const NewsCardTitle = ({ className, ...props }: ComponentProps<'h3'>) => (
  <Typography
    as="h3"
    data-slot="news-card-title"
    variant="title-lg"
    className={cn(
      'line-clamp-3 block transition-colors duration-200 group-data-[variant=compact]/news-card:text-lg group-data-[variant=compact]/news-card:leading-snug',
      className
    )}
    {...props}
  />
)

const NewsCardExcerpt = ({ className, ...props }: ComponentProps<'span'>) => (
  <Typography
    as="span"
    data-slot="news-card-excerpt"
    variant="body-md"
    className={cn(
      'text-muted-foreground/85 mt-3 line-clamp-2 group-data-[variant=compact]/news-card:text-sm group-data-[variant=compact]/news-card:leading-5',
      className
    )}
    {...props}
  />
)

interface NewsCardActionProps extends ComponentProps<'span'> {
  external?: boolean
  label: string
  children?: ReactNode
}

const NewsCardAction = ({
  children,
  className,
  external = false,
  label,
  ...props
}: NewsCardActionProps) => (
  <span
    data-slot="news-card-action"
    className={cn(
      'text-muted-foreground group-hover/news-card:text-foreground hidden self-start transition-colors md:block',
      className
    )}
    {...props}
  >
    {children ??
      (external ? (
        <ArrowUpRightIcon className="size-5 transition-transform duration-300 group-hover/news-card:translate-x-0.5 group-hover/news-card:-translate-y-0.5" />
      ) : (
        <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover/news-card:translate-x-0.5" />
      ))}
    <span className="sr-only">{label}</span>
  </span>
)

export {
  NewsCard,
  NewsCardLink,
  NewsCardMedia,
  NewsCardMeta,
  NewsCardSource,
  NewsCardTags,
  NewsCardTitle,
  NewsCardExcerpt,
  NewsCardAction,
}
