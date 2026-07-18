import { GraduationCapIcon } from 'lucide-react'

import { ApplicantResources } from './_components/ApplicantResources/ApplicantResources'
import { InterestNavigation } from './_components/InterestNavigation/InterestNavigation'
import { SpecializationCard } from './_components/SpecializationCard/SpecializationCard'
import { TrajectoryMachine } from './_components/TrajectoryMachine/TrajectoryMachine'
import {
  buildApplicantResources,
  buildCatalogGroups,
  buildSpecializationCatalog,
  loadSpecializationsPageData,
} from './_helpers'
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
  title: 'Спеціальності',
  description:
    'Бакалаврські та магістерські спеціальності факультету математики та інформатики РДГУ: форми, терміни, вартість і статистика вступу.',
  alternates: {
    canonical: '/specializations',
  },
  openGraph: {
    title: 'Спеціальності факультету математики та інформатики',
    description:
      'Оберіть освітній напрям і порівняйте практичні умови вступу на бакалаврські та магістерські програми ФМІ РДГУ.',
    images: [
      {
        url: new URL('/images/logo.avif', SITE_URL).href,
        width: 120,
        height: 120,
        type: 'image/avif',
        alt: 'ФМІ логотип',
      },
    ],
    url: new URL('/specializations', SITE_URL).href,
    type: 'website',
    locale: 'uk_UA',
  },
}

const SpecializationsPage = async () => {
  const {
    activeAdmissionCampaignYear,
    admissionCampaigns,
    applicantResources: applicantResourceSources,
    educationalPrograms,
    groups: configuredGroups,
    tuitionRates,
  } = await loadSpecializationsPageData()

  const specialties = buildSpecializationCatalog({
    admissionCampaigns,
    educationalPrograms,
    tuitionRates,
  })
  const groups = buildCatalogGroups(specialties, configuredGroups)
  const navigationGroups = groups.map(({ anchor, interestLabel }) => ({ anchor, interestLabel }))

  const applicantResources = buildApplicantResources(
    applicantResourceSources,
    activeAdmissionCampaignYear
  )

  return (
    <div className="overflow-x-clip">
      <header className="relative isolate flex min-h-[26rem] items-center overflow-hidden px-4 py-16 md:min-h-[28rem] md:px-12 md:py-20 lg:min-h-[30rem]">
        <TrajectoryMachine />

        <div className="relative z-20 max-w-4xl lg:w-[58%]">
          <Typography
            as="h1"
            variant="heading-xl"
            className="mt-4 font-black"
          >
            Спеціальності
          </Typography>
          <Typography
            as="p"
            variant="body-md"
            className="text-muted-foreground mt-5 max-w-2xl leading-7 md:text-lg"
          >
            Оберіть напрям, рівень і форму навчання. Порівняйте термін, вартість та умови вступу в
            одному каталозі.
          </Typography>
        </div>
      </header>

      {!!navigationGroups.length && <InterestNavigation groups={navigationGroups} />}

      {groups.length ? (
        <div>
          {groups.map((group, index) => (
            <section
              key={group.anchor}
              id={group.anchor}
              className="scroll-mt-[8.5rem] border-b px-4 py-12 md:px-12 md:py-16"
            >
              <div>
                <div>
                  <Typography
                    as="p"
                    variant="overline"
                    className="text-accent-violet text-[10px]"
                  >
                    {String(index + 1).padStart(2, '0')} · напрям
                  </Typography>
                  <Typography
                    as="h2"
                    variant="heading-md"
                    className="mt-3"
                  >
                    {group.title}
                  </Typography>
                </div>
                <Typography
                  as="p"
                  variant="body-md"
                  className="text-muted-foreground mt-3 leading-6"
                >
                  {group.description}
                </Typography>
              </div>

              <div className="mt-8 grid items-start gap-3 xl:grid-cols-2">
                {group.specialties.map((specialty) => (
                  <SpecializationCard
                    key={specialty.code}
                    specialty={specialty}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <section className="px-4 py-16 md:px-12 md:py-24">
          <Empty className="min-h-80 border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <GraduationCapIcon aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>Спеціальності ще не опубліковані</EmptyTitle>
              <EmptyDescription>
                Каталог зʼявиться після публікації освітніх програм у CMS.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </section>
      )}

      {!!applicantResources.length && <ApplicantResources resources={applicantResources} />}
    </div>
  )
}

export default SpecializationsPage
