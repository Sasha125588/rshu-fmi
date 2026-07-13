import config from '@payload-config'
import { getPayload } from 'payload'

import { CollectiveMotionCanvas } from './_components/CollectiveMotionCanvas/CollectiveMotionCanvas'
import { CouncilMemberImage } from './_components/CouncilMemberImage/CouncilMemberImage'
import { ACADEMIC_COUNCIL_ROLE_LABELS, councilActivity } from './_constants'
import { Typography } from '@/components/ui'
import { SITE_URL } from '@/shared/constants'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Вчена рада факультету математики та інформатики',
  description:
    'Склад, керівництво та напрями діяльності Вченої ради факультету математики та інформатики РДГУ.',
  alternates: {
    canonical: '/vchena-rada',
  },
  openGraph: {
    title: 'Вчена рада факультету математики та інформатики',
    description:
      'Склад, керівництво та напрями діяльності Вченої ради факультету математики та інформатики РДГУ.',
    images: [
      {
        url: new URL('/images/logo.avif', SITE_URL).href,
        width: 120,
        height: 120,
        type: 'image/avif',
        alt: 'ФМІ логотип',
      },
    ],
    url: new URL('/vchena-rada', SITE_URL).href,
    type: 'website',
    locale: 'uk_UA',
  },
}

const VchenaRadaPage = async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'academic-council-members',
    depth: 1,
    overrideAccess: false,
    pagination: false,
    sort: ['sortOrder', 'name'],
    select: {
      councilRole: true,
      description: true,
      name: true,
      photo: true,
      photoUrl: true,
      sortOrder: true,
    },
  })
  const leadership = result.docs.filter((member) => member.councilRole !== 'member')
  const members = result.docs.filter((member) => member.councilRole === 'member')

  return (
    <div className="overflow-x-clip">
      <header className="relative isolate overflow-hidden border-b">
        <CollectiveMotionCanvas />
        <div className="from-background via-background/95 pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-linear-to-r to-transparent md:w-[76%] lg:w-[62%]" />
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-t to-transparent" />

        <div className="relative z-20 flex items-end px-4 py-14 md:px-12 md:py-20">
          <div className="max-w-4xl">
            <Typography
              as="h1"
              variant="heading-xl"
              className="mt-5 font-black"
            >
              Вчена рада
            </Typography>
            <Typography
              as="p"
              variant="body-md"
              className="text-muted-foreground mt-4 max-w-2xl leading-7 md:text-lg"
            >
              Простір спільного обговорення й рішень щодо освіти, науки, кадрової політики та
              розвитку факультету.
            </Typography>
          </div>
        </div>
      </header>

      <main>
        <section
          aria-labelledby="council-leadership-heading"
          className="border-b px-4 py-14 md:px-12 md:py-20"
        >
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
            <div>
              <Typography
                as="p"
                variant="overline"
                className="text-accent-violet"
              >
                01 · Керівництво
              </Typography>
              <Typography
                as="h2"
                id="council-leadership-heading"
                variant="heading-lg"
                className="mt-4"
              >
                Координація роботи ради
              </Typography>
            </div>
            <Typography
              as="p"
              variant="body-md"
              className="text-muted-foreground max-w-xl self-end leading-7"
            >
              Голова, заступниця та секретар забезпечують підготовку питань, проведення засідань і
              виконання ухвалених рішень.
            </Typography>
          </div>

          <div className="mt-10 grid border-y sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {leadership.map((member, index) => (
              <article
                key={member.id}
                className="border-b py-7 last:border-b-0 sm:px-7 sm:odd:border-r lg:border-r lg:border-b-0 lg:px-9 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <Typography
                  as="p"
                  variant="caption"
                  className="font-jetbrains text-muted-foreground/50"
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <CouncilMemberImage
                  name={member.name}
                  photo={member.photo}
                  photoUrl={member.photoUrl}
                  loading="eager"
                  className="min-h-105"
                />
                <div>
                  <Typography
                    as="p"
                    variant="overline"
                    className="text-accent-violet/90 mt-6 text-[10px]"
                  >
                    {ACADEMIC_COUNCIL_ROLE_LABELS[member.councilRole]}
                  </Typography>
                  <Typography
                    as="h3"
                    variant="title-lg"
                    className="mt-3"
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    as="p"
                    variant="body-sm"
                    className="text-muted-foreground mt-4 leading-6"
                  >
                    {member.description}
                  </Typography>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="council-members-heading"
          className="border-b px-4 py-14 md:px-12 md:py-20"
        >
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
            <div>
              <Typography
                as="p"
                variant="overline"
                className="text-accent-violet"
              >
                02 · Склад
              </Typography>
              <Typography
                as="h2"
                id="council-members-heading"
                variant="heading-lg"
                className="mt-4"
              >
                Члени Вченої ради
              </Typography>
            </div>
            <Typography
              as="p"
              variant="body-md"
              className="text-muted-foreground self-end leading-7"
            >
              Представники кафедр, адміністрації, працівників і студентської спільноти факультету.
            </Typography>
          </div>

          <ol className="mt-10 grid border-y sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {members.map((member, index) => (
              <li
                key={member.id}
                className="group border-b py-7 transition-colors hover:bg-[color-mix(in_oklch,var(--accent-violet)_3%,transparent)] sm:px-7 sm:odd:border-r sm:nth-last-[-n+2]:border-b-0 lg:min-h-64 lg:border-r lg:px-9 lg:py-9 lg:nth-[3n]:border-r-0 lg:nth-last-[-n+3]:border-b-0"
              >
                <Typography
                  as="p"
                  variant="caption"
                  className="font-jetbrains text-muted-foreground/50 group-hover:text-accent-violet transition-colors"
                >
                  {String(index + leadership.length + 1).padStart(2, '0')}
                </Typography>
                <CouncilMemberImage
                  name={member.name}
                  photo={member.photo}
                  photoUrl={member.photoUrl}
                  className="h-fit"
                />
                <div>
                  <Typography
                    as="h3"
                    variant="title-md"
                    className="mt-7"
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    as="p"
                    variant="body-sm"
                    className="text-muted-foreground mt-4 leading-6"
                  >
                    {member.description}
                  </Typography>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="council-activity-heading"
          className="px-4 py-14 md:px-12 md:py-20"
        >
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
            <div>
              <Typography
                as="p"
                variant="overline"
                className="text-accent-violet"
              >
                03 · Повноваження
              </Typography>
              <Typography
                as="h2"
                id="council-activity-heading"
                variant="heading-lg"
                className="mt-4"
              >
                Діяльність ради
              </Typography>
            </div>
            <Typography
              as="p"
              variant="body-md"
              className="text-muted-foreground max-w-xl self-end leading-7"
            >
              Рада регулярно розглядає питання, що впливають на якість освіти, академічне середовище
              та довгостроковий розвиток факультету.
            </Typography>
          </div>

          <ol className="mt-10 grid border-y md:mt-14 md:grid-cols-2">
            {councilActivity.map((item, index) => (
              <li
                key={item.title}
                className="border-b py-7 last:border-b-0 md:px-8 md:py-9 md:odd:border-r  md:nth-last-[-n+2]:border-b-0"
              >
                <Typography
                  as="p"
                  variant="caption"
                  className="font-jetbrains text-muted-foreground/55"
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  as="h3"
                  variant="title-md"
                  className="mt-4"
                >
                  {item.title}
                </Typography>
                <Typography
                  as="p"
                  variant="body-sm"
                  className="text-muted-foreground mt-2 max-w-lg leading-6"
                >
                  {item.description}
                </Typography>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  )
}

export default VchenaRadaPage
