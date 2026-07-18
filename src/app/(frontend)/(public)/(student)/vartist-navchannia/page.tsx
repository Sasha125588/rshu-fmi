import config from '@payload-config'
import { ArrowUpRightIcon, FileTextIcon } from 'lucide-react'
import { getPayload } from 'payload'

import { PaymentDetails } from './_components/PaymentDetails/PaymentDetails'
import { RefractiveFormCanvas } from './_components/RefractiveFormCanvas'
import { TuitionTable } from './_components/TuitionTable/TuitionTable'
import { buildTuitionCatalog } from './_helpers'
import { Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@/components/ui'
import { documentDateFormatter } from '@/lib'
import { SITE_URL } from '@/shared/constants'

import type { EducationLevel } from '@/payload/collections/EducationalPrograms/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Вартість навчання',
  description:
    'Вартість контрактного навчання на освітніх програмах факультету математики та інформатики РДГУ та реквізити для оплати.',
  alternates: {
    canonical: '/vartist-navchannia',
  },
  openGraph: {
    title: 'Вартість навчання на факультеті математики та інформатики',
    description:
      'Порівняйте вартість контрактного навчання за освітніми програмами та формами навчання.',
    images: [
      {
        url: new URL('/images/logo.avif', SITE_URL).href,
        width: 120,
        height: 120,
        type: 'image/avif',
        alt: 'ФМІ логотип',
      },
    ],
    url: new URL('/vartist-navchannia', SITE_URL).href,
    type: 'website',
    locale: 'uk_UA',
  },
}

const LEVELS = [
  { label: 'Бакалаврат', value: 'bachelor' },
  { label: 'Магістратура', value: 'master' },
] as const satisfies { label: string; value: EducationLevel }[]

const TuitionCostsPage = async () => {
  const payload = await getPayload({ config })

  const [educationalPrograms, settings] = await Promise.all([
    payload.find({
      collection: 'educational-programs',
      depth: 0,
      overrideAccess: false,
      pagination: false,
      sort: ['sortOrder', 'specialtyCode', 'title'],
    }),
    payload.findGlobal({
      slug: 'tuition-page-settings',
      overrideAccess: false,
    }),
  ])

  const tuitionRates = await payload.find({
    collection: 'tuition-rates',
    depth: 0,
    overrideAccess: false,
    pagination: false,
    sort: ['sortOrder', 'educationalProgram', 'studyForm'],
    where: {
      academicYear: {
        equals: settings.activeAcademicYear,
      },
    },
  })

  const catalog = buildTuitionCatalog({
    educationalPrograms: educationalPrograms.docs,
    tuitionRates: tuitionRates.docs,
  })

  const paymentDetails = {
    iban: settings.iban,
    note: settings.paymentNote ?? null,
    purpose: settings.paymentPurposeTemplate,
    recipientBank: settings.recipientBank,
    recipientCode: settings.recipientCode,
    recipientName: settings.recipientName,
  }

  const file =
    settings.officialDocumentFile && typeof settings.officialDocumentFile === 'object'
      ? settings.officialDocumentFile
      : null
  const url = settings.officialDocumentUrl || file?.url || ''
  const documentDate = settings.officialDocumentDate || file?.createdAt

  return (
    <div className="overflow-x-clip">
      <header className="relative isolate overflow-hidden border-b px-4 py-16 md:px-12 md:py-22">
        <RefractiveFormCanvas />

        <div className="relative z-10 max-w-3xl">
          <Typography
            as="h1"
            variant="heading-xl"
            className="font-black"
          >
            Вартість навчання
          </Typography>
          <Typography
            as="p"
            variant="body-md"
            className="text-muted-foreground mt-5 max-w-2xl leading-7 md:text-lg"
          >
            Порівняйте вартість освітніх програм за денною та заочною формами й знайдіть реквізити
            для оплати.
          </Typography>
        </div>
      </header>
      <main>
        <section className="border-b px-4 py-14 md:px-12 md:py-20">
          <div className="flex items-end justify-between gap-10">
            <div>
              <Typography
                as="p"
                variant="overline"
                className="text-accent-violet"
              >
                Тарифи · {settings.activeAcademicYear}
              </Typography>
              <Typography
                as="h2"
                variant="heading-md"
                className="mt-3"
              >
                Порівняйте вартість
              </Typography>
              <Typography
                as="p"
                variant="body-md"
                className="text-muted-foreground mt-3 max-w-2xl"
              >
                Річна та повна вартість контрактного навчання за програмами факультету.
              </Typography>
            </div>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="group border-accent-violet/25 hover:border-accent-violet flex shrink-0 items-center gap-3 border-l pl-4 transition-colors"
            >
              <FileTextIcon
                aria-hidden="true"
                className="text-accent-violet size-5 stroke-[1.5px]"
              />
              <span>
                <span className="group-hover:text-accent-violet flex items-center gap-1 text-sm font-semibold transition-colors">
                  {settings.officialDocumentTitle}
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    className="size-3.5 stroke-[1.5px]"
                  />
                </span>
                <span className="font-jetbrains text-muted-foreground mt-0.5 block text-xs">
                  {documentDate
                    ? documentDateFormatter.format(new Date(documentDate))
                    : 'Дата не вказана'}{' '}
                  · PDF
                </span>
              </span>
            </a>
          </div>

          <Tabs
            defaultValue="bachelor"
            className="mt-9 gap-7"
          >
            <TabsList variant="line">
              {LEVELS.map((level) => (
                <TabsTrigger
                  key={level.value}
                  value={level.value}
                  className="px-3"
                >
                  {level.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {LEVELS.map((level) => (
              <TabsContent
                key={level.value}
                value={level.value}
              >
                <TuitionTable rows={catalog[level.value]} />
              </TabsContent>
            ))}
          </Tabs>
        </section>
        <PaymentDetails details={paymentDetails} />
      </main>
    </div>
  )
}

export default TuitionCostsPage
