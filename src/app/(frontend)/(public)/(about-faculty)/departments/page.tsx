import config from '@payload-config'
import { OrbitIcon } from 'lucide-react'
import { getPayload } from 'payload'

import { DepartmentsExperience } from './_components/DepartmentsExperience'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Typography,
} from '@/components/ui'
import { SITE_URL } from '@/shared/constants'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Кафедри',
  description:
    'Кафедри факультету математики та інформатики РДГУ: напрями роботи, описи та офіційні сайти.',
  alternates: {
    canonical: '/departments',
  },
  openGraph: {
    title: 'Кафедри факультету математики та інформатики',
    description: 'Освітні й наукові осередки факультету математики та інформатики РДГУ.',
    images: [
      {
        url: new URL('/images/logo.avif', SITE_URL).href,
        width: 120,
        height: 120,
        type: 'image/avif',
        alt: 'ФМІ логотип',
      },
    ],
    url: new URL('/departments', SITE_URL).href,
    type: 'website',
    locale: 'uk_UA',
  },
}

const DepartmentsPage = async () => {
  const payload = await getPayload({ config })
  const departments = await payload.find({
    collection: 'departments',
    overrideAccess: false,
    pagination: false,
    sort: 'name',
    select: {
      name: true,
      shortName: true,
      slug: true,
      description: true,
      websiteUrl: true,
    },
  })

  return (
    <div className="overflow-x-clip">
      <header className="border-b px-4 md:px-12">
        <div className="flex items-end py-14 md:py-20">
          <div className="max-w-4xl">
            <Typography
              as="h1"
              variant="heading-xl"
              className="font-black"
            >
              Кафедри
            </Typography>
            <Typography
              as="p"
              variant="body-md"
              className="text-muted-foreground mt-5 max-w-2xl leading-7 md:text-lg"
            >
              Освітні й наукові осередки факультету — кожен зі своїм напрямом, але на спільній
              орбіті математики, інформатики та цифрових технологій.
            </Typography>
          </div>
        </div>
      </header>

      <div>
        {departments.docs.length ? (
          <div>
            <div className="flex flex-col gap-3 border-b px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-12">
              <div className="flex items-center gap-4">
                <Typography
                  as="p"
                  variant="overline"
                  className="text-accent-violet"
                >
                  Сузір’я ФМІ
                </Typography>
                <span
                  aria-hidden="true"
                  className="bg-border h-px w-8"
                />
                <Typography
                  as="p"
                  variant="caption"
                  className="font-jetbrains text-muted-foreground"
                >
                  {departments.docs.length} кафедри
                </Typography>
              </div>

              <Typography
                as="p"
                variant="caption"
                className="font-jetbrains text-muted-foreground"
              >
                <span className="hidden sm:inline">
                  Наведіть, щоб дослідити · натисніть, щоб перейти
                </span>
                <span className="sm:hidden">Перший дотик — опис · другий — перехід</span>
              </Typography>
            </div>
            <DepartmentsExperience departments={departments.docs} />
          </div>
        ) : (
          <div className="px-4 py-16 md:px-12 md:py-24">
            <Empty className="min-h-80 border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <OrbitIcon aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>Кафедри ще не опубліковані</EmptyTitle>
                <EmptyDescription>
                  Інформація зʼявиться тут після додавання записів у CMS.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </div>
    </div>
  )
}

export default DepartmentsPage
