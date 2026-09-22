import config from '@payload-config'
import {
  ArrowRightIcon,
  ArrowUpRight,
  BookOpenIcon,
  GraduationCapIcon,
  Layers2Icon,
  LayoutGridIcon,
  ListXIcon,
  MapPinIcon,
} from 'lucide-react'
import { cacheLife, cacheTag } from 'next/cache'
import Link from 'next/link'
import { getPayload } from 'payload'

import { HomeReveal } from './_components/HomeReveal/HomeReveal'
import { LandingBackdrop } from './_components/LandingBackground/LandingBackground'
import { ProgramCard } from './_components/ProgramCard/ProgramCard'
import { ReasonDescription } from './_components/ReasonDescription/ReasonDescription'
import { faqItems, heroStats, programRoutes, quickTags, reasons, studentLinks } from './_constants'
import { ExternalNewsCard } from './news/_components/ExternalNewsCard'
import { FacultyNewsCard } from './news/_components/FacultyNewsCard'
import { getLatestFacultyNews } from './news/faculty/_api'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
  buttonVariants,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { SITE_URL } from '@/shared/constants'
import { CMS_CACHE_LIFE, CONTENT_CACHE_TAGS } from '@/shared/constants/cache'
import { getNewsPage } from '@/shared/news'

import type { Metadata, Route } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const baseDescription =
    'Неофіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету. Новини, спеціальності, міжнародна співпраця, документи та контакти.'

  return {
    description: baseDescription,
    openGraph: {
      siteName: 'Факультет математики та інформатики РДГУ',
      title:
        'Факультет математики та інформатики Рівненського державного гуманітарного університету',
      description: 'Неофіційна сторінка ФМІ Рівненського державного гуманітарного університету.',
      images: [
        {
          url: new URL('/images/logo.avif', SITE_URL).href,
          width: 120,
          height: 120,
          type: 'image/avif',
          alt: 'ФМІ логотип',
        },
      ],
      url: SITE_URL,
      type: 'website',
      locale: 'uk_UA',
    },
    twitter: {
      title: 'Факультет математики та інформатики РДГУ',
      description: baseDescription,
      images: [
        {
          url: new URL('/images/logo.avif', SITE_URL).href,
          width: 120,
          height: 120,
          type: 'image/avif',
          alt: 'ФМІ логотип',
        },
      ],
    },
  }
}

const HomePage = async () => {
  'use cache'

  cacheLife(CMS_CACHE_LIFE)
  cacheTag(
    CONTENT_CACHE_TAGS.specialties,
    CONTENT_CACHE_TAGS.educationalPrograms,
    CONTENT_CACHE_TAGS.facultyNews,
    CONTENT_CACHE_TAGS.media
  )

  const payload = await getPayload({ config })
  const [specialties, facultyNews, departmentNews, universityNews] = await Promise.all([
    payload.find({
      collection: 'specialties',
      depth: 1,
      joins: {
        educationalPrograms: {
          limit: 1,
          sort: 'sortOrder',
          where: {
            educationLevel: {
              equals: 'bachelor',
            },
          },
        },
      },
      overrideAccess: false,
      pagination: false,
      populate: {
        'educational-programs': {
          educationLevel: true,
          slug: true,
          sortOrder: true,
          title: true,
        },
      },
      sort: ['sortOrder', 'code'],
    }),
    getLatestFacultyNews(1),
    Promise.all(
      (['kitm', 'iktmvi'] as const).map((source) => getNewsPage(source, 1, { limit: 1 }))
    ),
    getNewsPage('university', 1, { limit: 4 }),
  ])

  const featuredPrograms = specialties.docs.flatMap((specialty) =>
    (specialty.educationalPrograms?.docs ?? []).flatMap((program) =>
      typeof program === 'object' ? [{ program, specialty }] : []
    )
  )

  const externalNews = [...departmentNews.flatMap((item) => item), ...universityNews]

  return (
    <div>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden py-12 sm:py-14 md:min-h-[78vh]">
        <LandingBackdrop />
        <div className="from-background via-background/80 pointer-events-none absolute inset-0 bg-linear-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t to-transparent" />

        <div className="relative w-full px-4 sm:px-6 md:px-12">
          <div className="flex max-w-4xl flex-col items-start">
            <Typography
              as="h1"
              variant="display"
              className="home-hero-enter home-hero-enter-0 text-4xl leading-[1.02] sm:text-6xl md:text-7xl xl:text-8xl"
            >
              Факультет математики та інформатики
            </Typography>

            <Typography
              as="p"
              variant="overline"
              className="home-hero-enter home-hero-enter-1 mt-5 max-w-3xl text-xs sm:mt-6 sm:text-sm"
            >
              <span className="bg-background text-accent-violet rounded-full box-decoration-clone px-3">
                IT, математика та цифрова освіта
              </span>
            </Typography>

            <Typography
              as="p"
              variant="body-lg"
              className="home-hero-enter home-hero-enter-2 mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
            >
              <span className="bg-background text-muted-foreground rounded-full box-decoration-clone px-3">
                Освітні програми, документи, новини та студентські сервіси факультету в одному
                місці. Швидкий старт для абітурієнтів і зручна навігація для студентів.
              </span>
            </Typography>
            <div className="home-hero-enter home-hero-enter-3 mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href={'/educational-programs'}
                className={cn(
                  buttonVariants(),
                  'group bg-foreground! text-background! hover:bg-foreground/80! h-11 justify-center gap-1 px-5 text-sm font-bold! tracking-tight'
                )}
              >
                Обрати спеціальність
                <ArrowRightIcon
                  className="transition-transform group-hover:translate-x-0.5"
                  size={16}
                />
              </Link>

              <a
                href="https://www.rshu.edu.ua/pryimalna-komisiia"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                  }),
                  'h-11 justify-center gap-2 px-5 text-sm font-semibold tracking-tight'
                )}
              >
                <GraduationCapIcon
                  aria-hidden
                  size={16}
                />
                Вступнику
              </a>
            </div>
            <div className="home-hero-enter home-hero-enter-4 mt-10 sm:mt-13">
              <Typography
                as="p"
                variant="overline"
                className="leading-[2.2] font-normal tracking-widest"
              >
                <span className="bg-muted/80 text-muted-foreground rounded-full box-decoration-clone px-3 py-1.5 ">
                  Швидкий доступ
                </span>
              </Typography>
              <div className="mt-3 flex max-w-full flex-wrap items-center gap-x-5 gap-y-3 py-2.5 sm:w-fit sm:gap-x-6 sm:px-3">
                {quickTags.map((tag) => (
                  <Link
                    key={tag.label}
                    href={tag.href as Route}
                    target={tag.external ? '_blank' : undefined}
                    rel={tag.external ? 'noopener noreferrer' : undefined}
                    className="group text-muted-foreground/80 hover:text-muted-foreground flex items-center gap-2 transition"
                  >
                    <span className="bg-accent-violet size-1.5 rounded-full" />
                    <Typography
                      as="span"
                      variant="link"
                    >
                      {tag.label}
                    </Typography>
                    {tag.external ? (
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                      />
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card-new/25 border-border border-y px-4 md:px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 py-5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 md:justify-between">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2.5"
            >
              <Typography
                as="span"
                variant="heading-md"
                className="font-jetbrains font-bold tracking-normal"
              >
                {stat.value}
              </Typography>
              <Typography
                as="span"
                variant="body-md"
                className="text-muted-foreground font-semibold uppercase"
              >
                {stat.label}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      <section
        id="educational-programs"
        className="px-4 py-15 md:px-12 md:py-20"
      >
        <HomeReveal>
          <Tabs
            defaultValue="guided"
            className="gap-6"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                title="Освітні програми"
                description="Можна підібрати програму за наміром або одразу переглянути всі варіанти."
              />

              <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center md:justify-end">
                <Link
                  href="/educational-programs"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-10 gap-2 rounded-full px-4 text-sm font-semibold'
                  )}
                >
                  Усі спеціальності
                  <ArrowUpRight
                    aria-hidden
                    data-icon="inline-end"
                  />
                </Link>

                <TabsList
                  variant="default"
                  className="bg-card-new/45 border-border h-auto! shrink-0 rounded-full border p-1"
                  aria-label="Перемкнути вигляд освітніх програм"
                >
                  <TabsTrigger
                    value="guided"
                    className="data-active:bg-background data-active:text-foreground size-10 flex-none rounded-full px-0"
                  >
                    <Layers2Icon aria-hidden="true" />
                    <span className="sr-only">Підібрати програму за наміром</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="all"
                    className="data-active:bg-background data-active:text-foreground size-10 flex-none rounded-full px-0"
                  >
                    <LayoutGridIcon aria-hidden="true" />
                    <span className="sr-only">Показати всі програми сіткою</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent
              value="guided"
              className="m-0 min-h-[243px]"
            >
              <Tabs
                defaultValue={programRoutes[0].id}
                className="gap-4"
              >
                <TabsList
                  variant="default"
                  className="h-fit! w-full min-w-0 justify-start overflow-x-auto rounded-none border-0 bg-transparent p-0 py-1"
                >
                  {programRoutes.map((route) => (
                    <TabsTrigger
                      key={route.id}
                      value={route.id}
                      className="border-border data-active:border-accent-violet data-active:bg-card-new/50 data-active:text-foreground mr-2 h-10 flex-none rounded-lg border bg-transparent px-4"
                    >
                      <Typography
                        as="span"
                        variant="label"
                      >
                        {route.label}
                      </Typography>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {programRoutes.map((route) => {
                  const routePrograms = route.specialtyCodes.flatMap((specialtyCode) =>
                    featuredPrograms.filter(({ specialty }) => specialty.code === specialtyCode)
                  )

                  return (
                    <TabsContent
                      key={route.id}
                      value={route.id}
                      className="m-0"
                    >
                      {routePrograms.length ? (
                        <div className="grid gap-3 md:grid-cols-2">
                          {routePrograms.map(({ program, specialty }) => (
                            <ProgramCard
                              key={program.id}
                              program={program}
                              specialty={specialty}
                            />
                          ))}
                        </div>
                      ) : (
                        <Empty className="border-border bg-card-new/20 min-h-[183px] border px-6 py-2 md:py-5">
                          <EmptyHeader>
                            <EmptyMedia variant="icon">
                              <ListXIcon className="ml-1" />
                            </EmptyMedia>
                            <EmptyTitle>Список освітніх програм порожній</EmptyTitle>
                            <EmptyDescription>
                              Для напряму «{route.label}» ще не додано жодної програми.
                            </EmptyDescription>
                          </EmptyHeader>
                        </Empty>
                      )}
                    </TabsContent>
                  )
                })}
              </Tabs>
            </TabsContent>

            <TabsContent
              value="all"
              className="m-0"
            >
              <div className="grid gap-3 md:grid-cols-2">
                {featuredPrograms.map(({ program, specialty }) => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    specialty={specialty}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </HomeReveal>
      </section>

      <section
        id="student"
        className="px-4 py-15 md:px-12 md:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <HomeReveal variant="left">
            <SectionHeader
              title="Швидкий доступ студенту"
              description="Найчастіші переходи без довгих меню. Цей блок має працювати як панель керування, а не як рекламна секція."
            />
          </HomeReveal>
          <HomeReveal
            variant="right"
            delayed
            className="grid gap-3 sm:grid-cols-2"
          >
            {studentLinks.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.title}
                  href={item.href as Route}
                  className="group border-border bg-card-new/30 hover:bg-foreground/4 rounded-lg border p-5 transition"
                >
                  <Icon className="text-accent-violet mb-8 size-5" />
                  <Typography
                    as="h3"
                    variant="title-md"
                    className="flex items-center justify-between gap-3"
                  >
                    {item.title}
                    <ArrowUpRight className="text-muted-foreground/60 group-hover:text-foreground size-4 transition-colors duration-200" />
                  </Typography>
                  <Typography
                    as="p"
                    variant="body-md"
                    className="text-muted-foreground/80 mt-2"
                  >
                    {item.description}
                  </Typography>
                </Link>
              )
            })}
          </HomeReveal>
        </div>
      </section>

      <section className="px-4 py-15 md:px-12 md:py-20">
        <div>
          <SectionHeader
            title="Чому ФМІ?"
            description="Тут математика, технології та освіта працюють разом. Це дає різні способи застосувати знання – від розробки до викладання."
          />

          <div className="mt-12">
            {reasons.map((reason, index) => (
              <article
                key={reason.title}
                className="border-border grid gap-5 border-t py-8 md:grid-cols-[120px_0.8fr_1.2fr] md:items-start"
              >
                <Typography
                  as="span"
                  variant="heading-md"
                  className="font-jetbrains text-muted-foreground/40 text-5xl font-black tracking-normal md:text-5xl"
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  as="h3"
                  variant="heading-md"
                  className="text-pretty"
                >
                  {reason.title}
                </Typography>
                <Typography
                  as="p"
                  variant="body-md"
                  className="text-muted-foreground/85 max-w-3xl text-lg leading-8"
                >
                  <ReasonDescription reason={reason} />
                </Typography>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="news"
        className="px-4 py-15 md:px-12 md:py-20"
      >
        <div>
          <HomeReveal
            variant="rise"
            className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeader
              title="Останні новини"
              description="Новини факультету, університету та кафедр в одному потоці."
            />
            <Link
              href={'/news'}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                }),
                'border-border hover:bg-foreground/7.5 text-foreground shrink-0 self-start bg-white/[0.035] md:self-auto'
              )}
            >
              Усі новини
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </HomeReveal>

          <HomeReveal
            variant="fade"
            delayed
          >
            <ul className="mt-10 divide-y">
              {facultyNews.map((item) => (
                <FacultyNewsCard
                  key={item.id}
                  item={item}
                  variant="compact"
                  withSource
                />
              ))}
              {externalNews.map((item) => (
                <ExternalNewsCard
                  key={`external-${item.source}-${item.link}`}
                  item={item}
                  variant="compact"
                  withSource
                />
              ))}
            </ul>
          </HomeReveal>
        </div>
      </section>

      <section className=" px-4 py-15 md:px-12 md:py-20">
        <HomeReveal
          variant="fade"
          className="mx-auto grid min-h-80 gap-10 lg:grid-cols-[0.7fr_1.3fr]"
        >
          <SectionHeader
            title="Часті запитання"
            description="Про вибір напряму, підготовку до навчання, практику та вибір дисциплін."
          />
          <Accordion
            defaultValue={[faqItems[0].question]}
            className="border-none"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="bg-transparent data-open:bg-transparent"
              >
                <AccordionTrigger
                  animatedIcon
                  className="py-5 hover:no-underline"
                >
                  <Typography
                    as="span"
                    variant="title-md"
                  >
                    {item.question}
                  </Typography>
                </AccordionTrigger>
                <AccordionContent className="max-w-3xl pb-5">
                  <Typography
                    as="p"
                    variant="body-md"
                    className="text-muted-foreground leading-7"
                  >
                    {item.answer}
                  </Typography>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </HomeReveal>
      </section>

      <section className="px-4 pt-6 pb-20 md:px-6">
        <HomeReveal
          variant="settle"
          className="border-border bg-card-new/50 mx-auto grid max-w-7xl gap-8 rounded-lg border p-5 sm:p-6 md:grid-cols-[1fr_auto] md:items-center"
        >
          <div>
            <Typography
              as="p"
              variant="overline"
              className="text-accent-violet mb-3 tracking-[0.28em]"
            >
              admission
            </Typography>
            <Typography
              as="h2"
              variant="heading-lg"
              className="md:text-3xl"
            >
              Хочеш вступити на ФМІ?
            </Typography>
            <Typography
              as="p"
              variant="body-md"
              className="text-muted-foreground mt-3 max-w-2xl leading-7"
            >
              Почни зі спеціальності. Якщо потрібна жива відповідь, звертайся до деканату або
              приймальної комісії РДГУ.
            </Typography>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="https://www.rshu.edu.ua/pryimalna-komisiia"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground text-background hover:bg-foreground/80 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition"
            >
              <BookOpenIcon className="size-4" />
              Приймальна комісія
            </Link>
            <Link
              href="/contacts"
              className="border-border hover:bg-background/5.5 hover:text-foreground text-muted-foreground inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-semibold transition"
            >
              <MapPinIcon className="size-4" />
              Контакти
            </Link>
          </div>
        </HomeReveal>
      </section>
    </div>
  )
}

export default HomePage

const SectionHeader = ({ title, description }: { title: string; description: string }) => (
  <div>
    <Typography
      as="h2"
      variant="heading-2xl"
      className="leading-tight font-black"
    >
      {title}
    </Typography>
    <Typography
      as="p"
      variant="body-lg"
      className="text-muted-foreground mt-4 max-w-xl leading-6 md:text-lg"
    >
      {description}
    </Typography>
  </div>
)
