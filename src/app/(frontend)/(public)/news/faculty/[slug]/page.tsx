import { ArrowLeftIcon, CalendarDaysIcon, PinIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { ViewTransition } from 'react'

import { FacultyNewsRichText } from '../../_components/FacultyNewsRichText'
import { getLatestFacultyNews } from '../_api'
import { resolveFacultyNewsRoute } from './_helpers'
import { AnimatedSuspense } from '@/components/common/AnimatedSuspense/AnimatedSuspense'
import { Badge, Skeleton, Typography, buttonVariants } from '@/components/ui'
import { newsDateFormatter } from '@/lib'
import { getNewsTagLabel } from '@/payload/collections/FacultyNews/constants'
import { SITE_URL } from '@/shared/constants'

import type { Metadata, Route } from 'next'

const absoluteUrl = (value: string) => new URL(value, SITE_URL).href

const getFacultyNewsArticle = async (slug: string) => {
  const resolution = await resolveFacultyNewsRoute(slug)

  if (resolution.kind === 'redirect') {
    permanentRedirect(resolution.url as Route)
  }

  if (resolution.kind === 'not-found') notFound()

  return resolution.article
}

export const generateStaticParams = async () =>
  (await getLatestFacultyNews(5)).map(({ slug }) => ({ slug }))

type FacultyNewsArticlePageProps = PageProps<'/news/faculty/[slug]'>
type FacultyNewsArticleContentProps = Pick<FacultyNewsArticlePageProps, 'params'>

export const generateMetadata = async ({
  params,
}: FacultyNewsArticlePageProps): Promise<Metadata> => {
  const { slug } = await params
  const article = await getFacultyNewsArticle(slug)

  const cover = article.coverImage
  const coverImage = cover?.sizes.newsCard ?? cover

  const image = coverImage
    ? {
        url: absoluteUrl(coverImage.url),
        width: String(coverImage.width),
        height: String(coverImage.height),
        alt: cover?.alt ?? '',
      }
    : {
        url: absoluteUrl('/images/logo.avif'),
        width: 120,
        height: 120,
        alt: 'Логотип факультету математики та інформатики РДГУ',
      }

  const canonical = `/news/faculty/${article.slug}`

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      locale: 'uk_UA',
      url: absoluteUrl(canonical),
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      tags: article.tags.map(getNewsTagLabel),
      images: [image],
    },
    twitter: {
      card: cover ? 'summary_large_image' : 'summary',
      title: article.title,
      description: article.excerpt,
      images: [image.url],
    },
  }
}

const FacultyNewsArticleContent = async ({ params }: FacultyNewsArticleContentProps) => {
  const { slug } = await params
  const article = await getFacultyNewsArticle(slug)

  const cover = article.coverImage
  const coverImage = cover?.sizes.newsCard ?? cover

  const canonicalUrl = absoluteUrl(`/news/faculty/${article.slug}`)
  const tagLabels = article.tags.map(getNewsTagLabel)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${canonicalUrl}#article`,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: 'uk-UA',
    isAccessibleForFree: true,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    image: [absoluteUrl(coverImage?.url ?? '/images/logo.avif')],
    articleSection: tagLabels,
    publisher: {
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Факультет математики та інформатики РДГУ',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/logo.avif'),
      },
    },
  }

  return (
    <div data-testid="faculty-news-article-content">
      <article>
        <header className="border-b px-4 py-8 md:px-12 md:py-12">
          <div className="mx-auto max-w-6xl">
            <ViewTransition
              name={`faculty-news-title-${article.id}`}
              share="news-title"
              default="none"
            >
              <Typography
                as="h1"
                variant="heading-xl"
                className="text-4xl leading-tight font-black text-pretty md:text-6xl"
              >
                {article.title}
              </Typography>
            </ViewTransition>
            <ViewTransition
              name={`faculty-news-excerpt-${article.id}`}
              share="news-excerpt"
              default="none"
            >
              <Typography
                as="p"
                variant="body-lg"
                className="text-muted-foreground mt-6 leading-8"
              >
                {article.excerpt}
              </Typography>
            </ViewTransition>

            <div className="text-muted-foreground mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              {!!article.isPinned && (
                <ViewTransition
                  name={`faculty-news-pinned-${article.id}`}
                  share="news-meta"
                  default="none"
                >
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
                </ViewTransition>
              )}
              <ViewTransition
                name={`faculty-news-date-${article.id}`}
                share="news-meta"
                default="none"
              >
                <Typography
                  as="time"
                  variant="body-sm"
                  dateTime={article.publishedAt}
                  className="flex items-center gap-2"
                >
                  <CalendarDaysIcon
                    aria-hidden="true"
                    className="size-4"
                  />
                  {newsDateFormatter.format(new Date(article.publishedAt))}
                </Typography>
              </ViewTransition>

              {!!tagLabels.length && (
                <ViewTransition
                  name={`faculty-news-tags-${article.id}`}
                  share="news-meta"
                  default="none"
                >
                  <div className="flex flex-wrap gap-2">
                    {tagLabels.map((tag) => (
                      <Badge
                        key={tag}
                        variant="ghost"
                        className="rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </ViewTransition>
              )}
            </div>

            {!!article.relatedDepartments.length && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Typography
                  as="span"
                  variant="caption"
                  className="font-jetbrains text-muted-foreground"
                >
                  Кафедри:
                </Typography>
                {article.relatedDepartments.map((department) => (
                  <Badge
                    key={department.id}
                    variant="outline"
                    className="rounded-full"
                  >
                    {department.shortName}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </header>

        {!!cover && (
          <figure className="px-4 pt-6 md:px-12 md:pt-10">
            <div className="mx-auto w-fit max-w-4xl">
              <ViewTransition
                name={`faculty-news-cover-${article.id}`}
                share="news-cover"
                default="none"
              >
                <div className="bg-muted overflow-hidden rounded-lg">
                  <Image
                    src={cover.url}
                    alt={cover.alt}
                    unoptimized
                    width={cover.width}
                    height={cover.height}
                    priority
                    placeholder={cover.blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={cover.blurDataURL}
                    className="block h-auto max-w-full"
                    style={{ objectPosition: `${cover.focalX}% ${cover.focalY}%` }}
                  />
                </div>
              </ViewTransition>
              {!!cover.caption && (
                <figcaption className="text-muted-foreground mt-3 text-center text-sm">
                  {cover.caption}
                </figcaption>
              )}
            </div>
          </figure>
        )}

        <div className="px-4 py-4 md:px-12 md:py-8">
          <div className="mx-auto max-w-3xl">
            <FacultyNewsRichText data={article.content} />

            <div className="mt-10 border-t pt-6">
              <Link
                href="/news/faculty"
                className={buttonVariants({ variant: 'outline' })}
              >
                <ArrowLeftIcon data-icon="inline-start" />
                До новин факультету
              </Link>
            </div>
          </div>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}

const FacultyNewsArticleFallback = () => (
  <article aria-label="Завантаження новини факультету">
    <header className="border-b px-4 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-14 w-full max-w-4xl" />
        <Skeleton className="h-7 w-full max-w-3xl" />
        <Skeleton className="h-5 w-52" />
      </div>
    </header>
    <div className="px-4 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>
    </div>
  </article>
)

const FacultyNewsArticlePage = ({ params }: FacultyNewsArticlePageProps) => (
  <div data-testid="faculty-news-article-shell">
    <AnimatedSuspense fallback={<FacultyNewsArticleFallback />}>
      <FacultyNewsArticleContent params={params} />
    </AnimatedSuspense>
  </div>
)

export default FacultyNewsArticlePage
