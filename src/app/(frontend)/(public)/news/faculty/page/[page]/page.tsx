import { notFound, permanentRedirect } from 'next/navigation'

import { FacultyNewsCard } from '../../../_components/FacultyNewsCard'
import { NewsPagination } from '../../../_components/NewsPagination'
import { getFacultyNewsPage } from '../../_api'
import { Typography } from '@/components/ui'
import { PRERENDERED_PAGE_COUNT } from '@/shared/news'

import type { Metadata } from 'next'

export const revalidate = 3600
export const dynamicParams = true

type PaginatedFacultyNewsPageProps = PageProps<'/news/faculty/page/[page]'>

export const generateStaticParams = async () =>
  Array.from({ length: PRERENDERED_PAGE_COUNT }, (_, index) => ({
    source: 'faculty',
    page: String(index + 2),
  }))

export const generateMetadata = async ({
  params,
}: PaginatedFacultyNewsPageProps): Promise<Metadata> => {
  const page = +(await params).page

  if (typeof page !== 'number') notFound()
  if (page === 1) permanentRedirect('/news/faculty')

  const result = await getFacultyNewsPage(page, 12)
  if (!result.docs.length || page > result.totalPages) notFound()

  return {
    title: `Новини факультету — сторінка ${page}`,
    description: `Сторінка ${page} архіву новин факультету математики та інформатики РДГУ.`,
    alternates: { canonical: `/news/faculty/page/${page}` },
    openGraph: {
      title: `Новини факультету — сторінка ${page}`,
      description: `Сторінка ${page} архіву новин факультету математики та інформатики РДГУ.`,
      type: 'website',
      locale: 'uk_UA',
      url: `/news/faculty/page/${page}`,
    },
  }
}

const PaginatedFacultyNewsPage = async ({ params }: PaginatedFacultyNewsPageProps) => {
  const page = +(await params).page

  if (typeof page !== 'number') notFound()
  if (page === 1) permanentRedirect('/news/faculty')

  const result = await getFacultyNewsPage(page, 12)
  if (!result.docs.length || page > result.totalPages) notFound()

  return (
    <section
      aria-labelledby="faculty-news-heading"
      className="px-4 py-12 md:px-12 md:py-16"
    >
      <div className="border-b pb-8">
        {!!result.totalPages && (
          <Typography
            as="p"
            variant="caption"
            className="font-jetbrains text-muted-foreground mt-4"
          >
            Сторінка {result.page} із {result.totalPages}
          </Typography>
        )}
        <Typography
          as="h2"
          id="faculty-news-heading"
          variant="heading-lg"
          className="mt-3"
        >
          Новини факультету
        </Typography>
        <Typography
          as="p"
          variant="body-md"
          className="text-muted-foreground mt-3 max-w-2xl"
        >
          Події, оголошення та досягнення факультету математики та інформатики.
        </Typography>
      </div>

      <div>
        <ul className="mt-2 divide-y">
          {result.docs.map((item) => (
            <FacultyNewsCard
              key={item.id}
              item={item}
            />
          ))}
        </ul>

        <div className="mt-10 border-t pt-8">
          <NewsPagination
            source="faculty"
            currentPage={result.page}
            totalPages={result.totalPages}
          />
        </div>
      </div>
    </section>
  )
}

export default PaginatedFacultyNewsPage
