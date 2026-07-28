import { FacultyNewsCard } from '../_components/FacultyNewsCard'
import { NewsPagination } from '../_components/NewsPagination'
import { getFacultyNewsPage } from './_api'
import { Typography } from '@/components/ui'

import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Новини факультету',
  description: 'Події, оголошення та досягнення факультету математики та інформатики РДГУ.',
  alternates: { canonical: '/news/faculty' },
  openGraph: {
    title: 'Новини факультету математики та інформатики',
    description: 'Події, оголошення та досягнення факультету математики та інформатики РДГУ.',
    type: 'website',
    locale: 'uk_UA',
    url: '/news/faculty',
  },
}

const FacultyNewsPage = async () => {
  const result = await getFacultyNewsPage(1, 12)

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

export default FacultyNewsPage
