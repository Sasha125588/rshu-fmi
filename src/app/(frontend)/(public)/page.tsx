import {
  ArrowRightIcon,
  ArrowUpRight,
  BookOpenIcon,
  EyeIcon,
  GraduationCapIcon,
  Layers2Icon,
  LayoutGridIcon,
  MapPinIcon,
} from 'lucide-react'
import Link from 'next/link'

import { LandingBackdrop } from './(components)/LandingBackground/LandingBackground'
import { SPECIALIZATIONS_DATA } from './(components)/Specializations/constants/data'
import { faqItems, heroStats, programRoutes, quickTags, reasons, studentLinks } from './_constants'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  buttonVariants,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { truncateText } from '@/shared/helpers/text'
import { getNewsPage } from '@/shared/news'

import type { Metadata, Route } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

export const generateMetadata = async (): Promise<Metadata> => {
  const baseDescription =
    'Не Офіційна сторінка факультету математики та інформатики Рівненського державного гуманітарного університету. Новини, спеціальності, міжнародна співпраця, документи та контакти.'

  return {
    description: baseDescription,
    openGraph: {
      siteName: 'Факультет математики та інформатики - РДГУ',
      title:
        'Факультет математики та інформатики Рівненського державного гуманітарного університету',
      description: 'Не Офіційна сторінка ФМІ Рівненського державного гуманітарного університету.',
      images: [
        {
          url: new URL('/images/logo.avif', baseUrl).href,
          width: 120,
          height: 120,
          type: 'image/avif',
          alt: 'ФМІ логотип',
        },
      ],
      url: baseUrl,
      type: 'website',
      locale: 'uk_UA',
    },
    twitter: {
      title: 'РДГУ - Факультет математики та інформатики',
      description: baseDescription,
      images: [
        {
          url: new URL('/images/logo.avif', baseUrl).href,
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
  const news = await getNewsPage('university', 1)

  return (
    <div>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden py-14 md:min-h-[78vh]">
        <LandingBackdrop />
        <div className="from-background via-background/80 pointer-events-none absolute inset-0 bg-linear-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t to-transparent" />

        <div className="relative w-full px-12">
          <div className="flex max-w-4xl flex-col items-start">
            <h1 className="max-w-5xl text-5xl leading-[0.95] font-bold tracking-tight text-balance sm:text-6xl md:text-7xl xl:text-8xl">
              Факультет математики та інформатики
            </h1>
            <p className="mt-6 max-w-3xl text-sm font-medium tracking-[0.18em] uppercase md:text-sm">
              <span className="bg-background font-jetbrains text-accent-violet rounded-full box-decoration-clone px-3">
                IT, математика та цифрова освіта
              </span>
            </p>
            <p className=" mt-5 max-w-2xl text-lg leading-relaxed font-medium md:text-xl">
              <span className="bg-background text-muted-foreground rounded-full box-decoration-clone px-3">
                Освітні програми, документи, новини та студентські сервіси факультету в одному
                місці. Швидкий старт для абітурієнтів і зручна навігація для студентів.
              </span>
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Link
                href="#specializations"
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
              <p className="text-xs leading-[2.2] tracking-widest uppercase">
                <span className="bg-muted/80 text-muted-foreground font-jetbrains rounded-full box-decoration-clone px-3 py-1.5 ">
                  Швидкий доступ
                </span>
              </p>
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
                    <span className="text-sm font-medium">{tag.label}</span>
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
              <span className="font-jetbrains text-2xl font-bold md:text-3xl">{stat.value}</span>
              <span className="text-muted-foreground font-semibold uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        id="specializations"
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

            <TabsContent
              value="guided"
              className="m-0"
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
                      className="border-border data-active:border-accent-violet data-active:bg-card-new/50 data-active:text-foreground mr-2 h-10 flex-none rounded-lg border bg-transparent px-4 text-sm font-semibold"
                    >
                      {route.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {programRoutes.map((route) => (
                  <TabsContent
                    key={route.id}
                    value={route.id}
                    className="m-0"
                  >
                    <div className="grid gap-3 md:grid-cols-2">
                      {route.programIds.map((programId) => {
                        const item = SPECIALIZATIONS_DATA.find(
                          (specialization) => specialization.id === programId
                        )

                        return item ? (
                          <ProgramCard
                            key={item.id}
                            item={item}
                          />
                        ) : null
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent
              value="all"
              className="m-0"
            >
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {SPECIALIZATIONS_DATA.map((item) => (
                  <ProgramCard
                    key={item.id}
                    item={item}
                    compact
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
                  <h3 className="flex items-center justify-between gap-3 text-xl font-semibold">
                    {item.title}
                    <ArrowUpRight className="text-muted-foreground/60 group-hover:text-foreground size-4 transition-colors duration-200" />
                  </h3>
                  <p className="text-muted-foreground/80 mt-2 leading-6">{item.description}</p>
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
                <span className="font-jetbrains text-muted-foreground/40 text-5xl font-black">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground/85 max-w-3xl text-lg leading-8">
                  {reason.description}
                </p>
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
              href={'/news' as Route}
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

          <ul className="mt-10 ">
            {news.slice(0, 6).map((item, index, latestNews) => (
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
                  <span className="font-jetbrains text-muted-foreground/40 shrink-0 text-lg font-medium">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="min-w-0 flex-1 transition-transform duration-200 group-hover:translate-x-1">
                    {item.tags.length ? (
                      <span className="text-muted-foreground/70 group-hover:text-muted-foreground mb-2 block text-sm transition-colors duration-200">
                        {item.tags.slice(0, 3).join(' • ')}
                      </span>
                    ) : null}

                    <span className="mb-3 block text-lg leading-tight font-semibold transition-colors duration-200 md:text-xl">
                      {truncateText(item.title, 104)}
                      <span className="sr-only">, відкривається в новій вкладці</span>
                    </span>

                    <span className="text-muted-foreground/70 group-hover:text-muted-foreground mt-4 flex items-center gap-1.5 text-sm transition-colors duration-200">
                      <EyeIcon
                        aria-hidden="true"
                        className="size-4"
                      />
                      <span>{item.views.toLocaleString('uk-UA')} переглядів</span>
                    </span>
                  </span>

                  <span className="text-muted-foreground/80 shrink-0">
                    <ArrowUpRight className="group-hover:text-foreground transition-[colors, transform] size-5 duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Link>

                {index < latestNews.length - 1 ? <Separator className="bg-muted" /> : null}
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
                <AccordionTrigger className=" py-5 text-xl font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground max-w-3xl pb-5 text-base leading-7">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="px-4 pt-6 pb-20 md:px-6">
        <div className="border-border bg-card-new/50 mx-auto grid max-w-7xl gap-8 rounded-lg border p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-accent-violet font-jetbrains mb-3 text-xs tracking-[0.28em] uppercase">
              admission
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">Хочеш вступити на ФМІ?</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-7">
              Почни зі спеціальності. Якщо потрібна жива відповідь, звертайся до деканату або
              приймальної комісії РДГУ.
            </p>
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

type ProgramItem = (typeof SPECIALIZATIONS_DATA)[number]

const ProgramCard = ({ item, compact = false }: { item: ProgramItem; compact?: boolean }) => {
  const Icon = item.icon

  return (
    <article className="group border-border bg-card-new/30 hover:bg-foreground/4 rounded-lg border p-5 transition">
      <div className="flex h-full gap-4">
        <span className="border-border bg-background/40 flex size-11 shrink-0 items-center justify-center rounded-lg border">
          <Icon className="text-accent-violet size-4" />
        </span>

        <div className="flex min-w-0 flex-col justify-between">
          <div className="text-muted-foreground mb-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-jetbrains text-accent-violet">{item.shortTitle}</span>
            <span>{item.date}</span>
          </div>

          <h3 className="text-xl leading-tight font-semibold tracking-tight">{item.title}</h3>

          <p className="text-muted-foreground/80 mt-2 line-clamp-2 leading-6">{item.description}</p>

          <div className="mt-4 flex gap-2">
            {item.tags.slice(0, compact ? 2 : item.tags.length).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-jetbrains text-foreground/80 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Link
          href={(item.href ?? '/') as Route}
          className="text-muted-foreground hover:text-accent-violet shrink-0 transition"
          aria-label={`Детальніше про ${item.title}`}
        >
          <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  )
}

const SectionHeader = ({ title, description }: { title: string; description: string }) => (
  <div>
    <h2 className="font-jetbrains text-5xl leading-tight font-black tracking-tighter text-balance md:text-7xl">
      {title}
    </h2>
    <p className="text-muted-foreground mt-4 max-w-xl text-lg leading-6 font-medium">
      {description}
    </p>
  </div>
)
