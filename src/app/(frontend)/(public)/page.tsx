import config from '@payload-config'
import {
  ArrowRightIcon,
  ArrowUpRight,
  BookOpenIcon,
  EyeIcon,
  GraduationCapIcon,
  Layers2Icon,
  LayoutGridIcon,
  ListXIcon,
  MapPinIcon,
} from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'

import { LandingBackdrop } from './_components/LandingBackground/LandingBackground'
import { ProgramCard } from './_components/ProgramCard/ProgramCard'
import { faqItems, heroStats, programRoutes, quickTags, reasons, studentLinks } from './_constants'
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
import { cn } from '@/lib'
import { SITE_URL } from '@/shared/constants'
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
  const payload = await getPayload({ config })
  const [specialties, news] = await Promise.all([
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
    getNewsPage('university', 1),
  ])
  const featuredPrograms = specialties.docs.flatMap((specialty) =>
    (specialty.educationalPrograms?.docs ?? []).flatMap((program) =>
      typeof program === 'object' ? [{ program, specialty }] : []
    )
  )

  return (
    <div>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden py-14 md:min-h-[78vh]">
        <LandingBackdrop />
        <div className="from-background via-background/80 pointer-events-none absolute inset-0 bg-linear-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t to-transparent" />

        <div className="relative w-full px-12">
          <div className="flex max-w-4xl flex-col items-start">
            <Typography
              as="h1"
              variant="display"
            >
              Факультет математики та інформатики
            </Typography>

            <Typography
              as="p"
              variant="overline"
              className="mt-6 max-w-3xl text-sm"
            >
              <span className="bg-background text-accent-violet rounded-full box-decoration-clone px-3">
                IT, математика та цифрова освіта
              </span>
            </Typography>

            <Typography
              as="p"
              variant="body-lg"
              className="mt-5 max-w-2xl leading-relaxed"
            >
              <span className="bg-background text-muted-foreground rounded-full box-decoration-clone px-3">
                Освітні програми, документи, новини та студентські сервіси факультету в одному
                місці. Швидкий старт для абітурієнтів і зручна навігація для студентів.
              </span>
            </Typography>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
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

              <Link
                href="https://www.rshu.edu.ua/pryimalna-komisiia"
                prefetch={false}
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
              </Link>
            </div>
            <div className="mt-13">
              <Typography
                as="p"
                variant="overline"
                className="leading-[2.2] font-normal tracking-widest"
              >
                <span className="bg-muted/80 text-muted-foreground rounded-full box-decoration-clone px-3 py-1.5 ">
                  Швидкий доступ
                </span>
              </Typography>
              <div className="mt-3 flex w-fit max-w-full flex-wrap items-center gap-x-6 gap-y-3 rounded-full px-3 py-2.5">
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
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-4 py-4 md:justify-between md:py-5">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-[145px] items-baseline gap-2.5"
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
        <div>
          <Tabs
            defaultValue="guided"
            className="gap-6"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                title="Освітні програми"
                description="Можна підібрати програму за наміром або одразу переглянути всі варіанти."
              />

              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                <Link
                  href={'/educational-programs'}
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
                className="gap-5"
              >
                <TabsList
                  variant="default"
                  className="h-auto! w-full justify-start rounded-none border-0 bg-transparent p-0"
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
        </div>
      </section>

      <section
        id="student"
        className="px-4 py-15 md:px-12 md:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            title="Швидкий доступ студенту"
            description="Найчастіші переходи без довгих меню. Цей блок має працювати як панель керування, а не як рекламна секція."
          />
          <div className="grid gap-3 sm:grid-cols-2">
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
          </div>
        </div>
      </section>

      <section className="px-4 py-15 md:px-12 md:py-20">
        <div>
          <SectionHeader
            title="Чому ФМІ?"
            description="Замість сухої статистики показуємо, що саме робить факультет зрозумілим вибором для абітурієнта і корисним середовищем для студента."
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
                  {reason.description}
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
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              title="Новини університету"
              description="Останні оновлення з університетського сайту."
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
          </div>

          <ul className="mt-10 divide-y">
            {news.slice(0, 6).map((item, index) => (
              <li
                key={`${item.link}-${index}`}
                className="group relative"
              >
                <span
                  aria-hidden="true"
                  className="bg-accent-violet/60 absolute top-5 bottom-5 left-0 z-10 w-0.5 origin-center scale-y-0 rounded-full transition-transform duration-300 group-focus-within:scale-y-100 group-hover:scale-y-100"
                />

                <Link
                  href={item.link as Route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-foreground/[0.035] flex min-h-32 items-start gap-6 px-4 py-5 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
                >
                  <Typography
                    as="span"
                    variant="body-md"
                    className="font-jetbrains text-muted-foreground/40 shrink-0 text-lg font-medium"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>

                  <span className="min-w-0 flex-1 transition-transform duration-200 group-hover:translate-x-1">
                    {!!item.tags.length && (
                      <Typography
                        as="span"
                        variant="body-sm"
                        className="text-muted-foreground/70 group-hover:text-muted-foreground mb-2 block transition-colors duration-200"
                      >
                        {item.tags.slice(0, 3).join(' • ')}
                      </Typography>
                    )}

                    <Typography
                      as="span"
                      variant="title-sm"
                      className="mb-3 line-clamp-1 leading-tight transition-colors duration-200 md:text-xl"
                    >
                      {item.title}
                      <span className="sr-only">, відкривається в новій вкладці</span>
                    </Typography>

                    <Typography
                      as="span"
                      variant="body-sm"
                      className="text-muted-foreground/70 group-hover:text-muted-foreground mt-4 flex items-center gap-1.5 transition-colors duration-200"
                    >
                      <EyeIcon
                        aria-hidden="true"
                        className="size-4"
                      />
                      <span>{item.views.toLocaleString('uk-UA')} переглядів</span>
                    </Typography>
                  </span>

                  <span className="text-muted-foreground/80 shrink-0">
                    <ArrowUpRight className="group-hover:text-foreground transition-[colors, transform] size-5 duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className=" px-4 py-15 md:px-12 md:py-20">
        <div className="mx-auto grid min-h-80 gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeader
            title="FAQ"
            description="Короткі відповіді на питання, які найчастіше виникають перед вступом або під час пошуку інформації."
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
                <AccordionTrigger className="py-5 hover:no-underline">
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
        </div>
      </section>

      <section className="px-4 pt-6 pb-20 md:px-6">
        <div className="border-border bg-card-new/50 mx-auto grid max-w-7xl gap-8 rounded-lg border p-6 md:grid-cols-[1fr_auto] md:items-center">
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
        </div>
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
