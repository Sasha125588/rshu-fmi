import { ArrowLeftIcon, CalendarDaysIcon, PinIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'

import { FacultyNewsRichText } from '../../_components/FacultyNewsRichText'
import { getLatestFacultyNews } from '../_api'
import { resolveFacultyNewsRoute } from './_helpers'
import { Badge, Typography, buttonVariants } from '@/components/ui'
import { newsDateFormatter } from '@/lib'
import { getNewsTagLabel } from '@/payload/collections/FacultyNews/constants'
import { SITE_URL } from '@/shared/constants'

import type { Metadata, Route } from 'next'

export const revalidate = 3600
export const dynamicParams = true

const absoluteUrl = (value: string) => new URL(value, SITE_URL).href

const getFacultyNewsArticle = async (slug: string) => {
  const resolution = await resolveFacultyNewsRoute(slug)

  if (resolution.kind === 'redirect') {
    permanentRedirect(resolution.url as Route)
  }

  if (resolution.kind === 'not-found') notFound()

  return resolution.article
}

type FacultyNewsArticlePageProps = PageProps<'/news/faculty/[slug]'>

export const generateStaticParams = async () =>
  (await getLatestFacultyNews(5)).map(({ slug }) => ({ slug }))

export const generateMetadata = async ({
  params,
}: FacultyNewsArticlePageProps): Promise<Metadata> => {
  const { slug } = await params
  const article = await getFacultyNewsArticle(slug)

  const cover = article.coverImage

  const image = cover?.sizes.newsCard
    ? {
        url: absoluteUrl(cover.sizes.newsCard.url),
        width: String(cover.sizes.newsCard.width),
        height: String(cover.sizes.newsCard.height),
        alt: cover.alt,
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

const FacultyNewsArticlePage = async ({ params }: FacultyNewsArticlePageProps) => {
  const { slug } = await params
  const article = await getFacultyNewsArticle(slug)

  const cover = article.coverImage

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
    image: [absoluteUrl(cover?.sizes.newsCard?.url ?? '/images/logo.avif')],
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
    <div>
      <article>
        <header className="border-b px-4 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="font-jetbrains rounded-full tracking-wide uppercase"
              >
                ФМІ
              </Badge>
              {!!article.isPinned && (
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
            </div>

            <Typography
              as="h1"
              variant="heading-xl"
              className="mt-6 font-black"
            >
              {article.title}
            </Typography>
            <Typography
              as="p"
              variant="body-lg"
              className="text-muted-foreground mt-6 leading-8"
            >
              {article.excerpt}
            </Typography>

            <div className="text-muted-foreground mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
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
          <figure className="px-4 pt-10 md:px-12 md:pt-14">
            <div className="bg-muted relative mx-auto max-w-4xl overflow-hidden rounded-lg">
              <Image
                src={cover.url}
                alt={cover.alt}
                unoptimized
                width={cover.width}
                height={cover.height}
                priority
                placeholder={cover.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={cover.blurDataURL}
                style={{ objectPosition: `${cover.focalX}% ${cover.focalY}%` }}
              />
            </div>
            {!!cover.caption && (
              <figcaption className="text-muted-foreground mx-auto mt-3 max-w-4xl text-center text-sm">
                {cover.caption}
              </figcaption>
            )}
          </figure>
        )}

        <div className="px-4 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <FacultyNewsRichText data={article.content} />

            <div className="mt-14 border-t pt-8">
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

export default FacultyNewsArticlePage
