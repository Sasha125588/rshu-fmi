import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  UsersIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { getStaffScheduleLinks } from '../_api/getStaffScheduleLinks'
import { getDepartment, getDepartmentPrograms, getDepartments } from '../_api/queries'
import { DepartmentStaff } from './_components/DepartmentStaff'
import { RESEARCH_ICONS, STAFF_FORMS } from './_constants'
import styles from './department.module.css'
import { CopyButton, PageBreadcrumbs } from '@/components/common'
import { Skeleton, Typography } from '@/components/ui'
import { pluralRules } from '@/lib/plurals'
import { cn } from '@/lib/utils'
import { educationLevelLabels } from '@/payload/collections/EducationalPrograms/constants'
import { getSocialMetadata } from '@/shared/og'
import { DEFAULT_SCHEDULE_PATH } from '@/shared/schedule/config'

import type { Metadata } from 'next'

type ProfilePageProps = PageProps<'/departments/[slug]'>

export const generateStaticParams = async () =>
  (await getDepartments()).map(({ slug }) => ({ slug }))

export const generateMetadata = async ({ params }: ProfilePageProps): Promise<Metadata> => {
  const { slug } = await params
  const department = await getDepartment(slug)
  if (!department) notFound()

  const canonical = `/departments/${department.slug}`
  return {
    title: department.name,
    description: department.description,
    alternates: { canonical },
    ...getSocialMetadata(canonical, department.name, department.description, department.updatedAt),
  }
}

const DepartmentProfile = async ({ slug }: { slug: string }) => {
  const department = await getDepartment(slug)
  if (!department) notFound()

  const [programs, departments, scheduleLinks] = await Promise.all([
    getDepartmentPrograms(department.id),
    getDepartments(),
    getStaffScheduleLinks(department.staff ?? []),
  ])

  const { address, room, email } = department.contacts ?? {}
  const contactAddress = [address, room && `каб. ${room}`].filter(Boolean).join(', ')

  const staff = (department.staff ?? []).map((person) => ({
    ...person,
    scheduleHref: scheduleLinks.get(person.name),
  }))

  const facts = [
    {
      Icon: CalendarDaysIcon,
      text: department.foundedYear == null ? '' : `Заснована ${department.foundedYear}`,
    },
    {
      Icon: UsersIcon,
      text: staff.length ? `${staff.length} ${STAFF_FORMS[pluralRules.select(staff.length)]}` : '',
    },
    { Icon: MapPinIcon, text: contactAddress },
  ].filter(({ text }) => text)

  const logoSrc = typeof department.logo === 'object' ? department.logo?.url : undefined

  const specialtyCount = new Set(programs.map(({ specialty }) => specialty)).size

  const otherDepartments = departments.filter(({ id }) => id !== department.id)

  return (
    <article>
      <header className={cn(styles.hero, 'relative isolate overflow-hidden')}>
        <div className="mx-auto w-full max-w-7xl px-4 pt-7 pb-6 md:px-12 md:pt-12 md:pb-8">
          <PageBreadcrumbs
            current={department.shortName.trim()}
            parents={[{ href: '/departments', label: 'Кафедри' }]}
            className="mb-7 md:mb-9"
          />
          <div className="grid items-center gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8 lg:gap-12">
            <div>
              <p
                aria-hidden="true"
                className="font-jetbrains text-[clamp(3.5rem,8.5vw,7rem)] leading-none font-extrabold tracking-tighter"
              >
                {department.shortName.trim()}
              </p>
              <Typography
                as="h1"
                variant="heading-lg"
                className="mt-4 max-w-3xl"
              >
                {department.name}
              </Typography>
              <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed md:text-lg">
                {department.description}
              </p>
              {!!facts.length && (
                <ul
                  aria-label="Про кафедру"
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {facts.map(({ Icon, text }) => (
                    <li
                      key={text}
                      className="bg-card-new inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.75 py-1 text-[0.8125rem] font-semibold"
                    >
                      <Icon
                        aria-hidden="true"
                        className="text-accent-violet size-3.5 shrink-0"
                      />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {logoSrc && (
              <div className="size-34 overflow-hidden rounded-full md:size-56 lg:mr-8 lg:size-68">
                <Image
                  src={logoSrc}
                  alt=""
                  width={272}
                  height={272}
                  sizes="(min-width: 1024px) 272px, (min-width: 768px) 224px, 136px"
                  unoptimized
                  className="size-full scale-[1.026] object-contain dark:brightness-90"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9 px-4 pt-8 pb-14 md:gap-10 md:px-12 md:pt-10 md:pb-18">
        {!!department.research?.length && (
          <section aria-labelledby="research">
            <div className="mb-3 flex items-center gap-3">
              <h2
                id="research"
                className="text-[1.0625rem] font-extrabold tracking-[-0.01em]"
              >
                Наукові напрями
              </h2>
              <span className="font-jetbrains text-muted-foreground text-xs font-medium">
                {department.research.length}
              </span>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {department.research.map((item, index) => {
                const Icon = RESEARCH_ICONS[index % RESEARCH_ICONS.length]

                return (
                  <li
                    key={item.id ?? item.title}
                    className={cn(
                      styles.researchCard,
                      'bg-card-new overflow-hidden rounded-[14px] border [--research-hover-border:color-mix(in_oklch,var(--accent-violet)_45%,var(--border))] focus-within:border-(--research-hover-border) hover:border-(--research-hover-border) motion-safe:transition-[border-color] sm:min-h-65 dark:[--research-hover-border:#7c597c]'
                    )}
                  >
                    <div className={cn(styles.cover, 'relative h-27 border-b')}>
                      <Icon
                        aria-hidden="true"
                        className="text-accent-violet absolute bottom-3 left-3.5 size-6.5"
                      />
                      {item.topic && (
                        <span className="bg-background/70 absolute top-2.5 right-2.5 rounded-full border px-[9px] py-0.5 text-[0.71875rem] font-bold backdrop-blur-[6px]">
                          {item.topic}
                        </span>
                      )}
                    </div>
                    <div className="p-3.5 pb-4">
                      <h3 className="text-[0.90625rem] leading-[1.3] font-extrabold text-balance">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.title}
                            <ArrowUpRightIcon
                              aria-hidden="true"
                              className="ml-1.5 inline size-3 align-[-0.1em]"
                            />
                          </a>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <p className="text-muted-foreground mt-[5px] text-[0.8125rem] leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {!!staff.length && (
          <Suspense fallback={<DepartmentStaffSkeleton rows={Math.min(staff.length, 4)} />}>
            <DepartmentStaff
              key={department.id}
              staff={staff}
              leadership={department.leadership}
            />
          </Suspense>
        )}

        {!!programs.length && (
          <section aria-labelledby="programs">
            <div className="mb-4 flex items-center gap-3">
              <h2
                id="programs"
                className="text-lg font-bold"
              >
                Освітні програми
              </h2>
              <span className="font-jetbrains text-muted-foreground text-xs font-medium">
                <span className="sr-only">Кількість спеціальностей </span>
                {specialtyCount}
              </span>
            </div>
            <ul className="bg-card-new divide-y overflow-hidden rounded-xl border">
              {programs.map((program) => (
                <li key={program.id}>
                  <Link
                    href={`/educational-programs/${program.slug}`}
                    className="hover:bg-muted/50 grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5 gap-y-2 p-3.5 focus-visible:outline-offset-[-2px] sm:grid-cols-[auto_minmax(0,1fr)_auto_auto]"
                  >
                    <span className="bg-muted font-jetbrains text-accent-violet grid h-9.5 min-w-9.5 shrink-0 place-items-center rounded-[10px] px-1 text-[0.6875rem] font-extrabold">
                      {program.code}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold">{program.title}</h3>
                      <p className="text-muted-foreground mt-0.5 block text-[0.8125rem] wrap-break-word">
                        {program.description}
                      </p>
                    </div>
                    <span className="text-muted-foreground col-start-2 row-start-2 justify-self-end text-[0.8125rem] font-medium whitespace-nowrap sm:col-start-3 sm:row-start-1">
                      {educationLevelLabels[program.educationLevel]}
                    </span>
                    <ChevronRightIcon
                      aria-hidden="true"
                      className="text-muted-foreground col-start-3 row-start-1 size-4 sm:col-start-4"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="contacts">
          <h2
            id="contacts"
            className="mb-4 text-lg font-bold"
          >
            Контакти
          </h2>
          <ul className="bg-card-new divide-y overflow-hidden rounded-xl border">
            {contactAddress && (
              <li className="flex min-w-0 items-center gap-3.5 p-3.5">
                <span className="text-muted-foreground grid size-[34px] shrink-0 place-items-center rounded-[9px] border">
                  <MapPinIcon
                    aria-hidden="true"
                    className="size-4"
                  />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold">Адреса</h3>
                  <p className="text-muted-foreground mt-0.5 block text-[0.8125rem] wrap-break-word">
                    {contactAddress}
                  </p>
                </div>
              </li>
            )}
            {email && (
              <li className="flex min-w-0 flex-wrap items-center gap-3.5 p-3.5">
                <span className="text-muted-foreground grid size-[34px] shrink-0 place-items-center rounded-[9px] border">
                  <MailIcon
                    aria-hidden="true"
                    className="size-4"
                  />
                </span>
                <div className="min-w-0 grow basis-32">
                  <h3 className="text-sm font-bold">Пошта</h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-muted-foreground hover:text-foreground mt-0.5 block text-[0.8125rem] wrap-break-word hover:underline"
                  >
                    {email}
                  </a>
                </div>
                <CopyButton
                  className="ml-auto"
                  text={email}
                  label="Скопіювати"
                  copiedLabel="Скопійовано"
                  variant="outline"
                  size="sm"
                />
              </li>
            )}
            <li>
              <Link
                href={DEFAULT_SCHEDULE_PATH}
                className="hover:bg-muted/50 flex min-w-0 items-center gap-3.5 p-3.5 focus-visible:outline-offset-[-2px]"
              >
                <span className="text-muted-foreground grid size-[34px] shrink-0 place-items-center rounded-[9px] border">
                  <CalendarDaysIcon
                    aria-hidden="true"
                    className="size-4"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold">Розклад</h3>
                  <p className="text-muted-foreground mt-0.5 block text-[0.8125rem] wrap-break-word">
                    Заняття за групою, викладачем або аудиторією
                  </p>
                </div>
                <ChevronRightIcon
                  aria-hidden="true"
                  className="text-muted-foreground size-4 shrink-0"
                />
              </Link>
            </li>
            {department.websiteUrl && (
              <li>
                <a
                  href={department.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-muted/50 flex min-w-0 items-center gap-3.5 p-3.5 focus-visible:outline-offset-[-2px]"
                >
                  <span className="text-muted-foreground grid size-[34px] shrink-0 place-items-center rounded-[9px] border">
                    <GlobeIcon
                      aria-hidden="true"
                      className="size-4"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold">Офіційний сайт кафедри</h3>
                    <p className="text-muted-foreground mt-0.5 block text-[0.8125rem] wrap-break-word">
                      {department.websiteUrl}
                    </p>
                  </div>
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    className="text-muted-foreground size-4 shrink-0"
                  />
                </a>
              </li>
            )}
          </ul>
        </section>

        {!!otherDepartments.length && (
          <section aria-labelledby="others">
            <div className="mb-4 flex items-center gap-3">
              <h2
                id="others"
                className="text-lg font-bold"
              >
                Інші кафедри
              </h2>
              <span className="font-jetbrains text-muted-foreground text-xs font-medium">
                <span className="sr-only">Кількість інших кафедр </span>
                {otherDepartments.length}
              </span>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {otherDepartments.map((other) => {
                const shortName = other.shortName.trim()

                return (
                  <li key={other.id}>
                    <Link
                      href={`/departments/${other.slug}`}
                      className="bg-card-new hover:bg-muted/50 flex h-full min-w-0 items-center gap-3.5 rounded-xl border p-3.5 focus-visible:outline-offset-[-2px]"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-muted font-jetbrains text-accent-violet grid h-9.5 min-w-9.5 shrink-0 place-items-center rounded-[10px] px-1 text-[0.6875rem] font-extrabold"
                      >
                        {shortName.slice(0, 2)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold">{shortName}</h3>
                        <p className="text-muted-foreground mt-0.5 block text-[0.8125rem] wrap-break-word">
                          {other.name}
                        </p>
                      </div>
                      <ArrowRightIcon
                        aria-hidden="true"
                        className="text-muted-foreground size-4 shrink-0"
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {department.sourceUrl && (
          <a
            href={department.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground self-start text-xs underline-offset-4 hover:underline"
          >
            Джерело відомостей про склад кафедри
            <ArrowUpRightIcon
              aria-hidden="true"
              className="ml-1 inline size-3"
            />
          </a>
        )}
      </div>
    </article>
  )
}

const DepartmentStaffSkeleton = ({ rows }: { rows: number }) => (
  <div
    aria-hidden="true"
    className="motion-reduce:[&_[data-slot=skeleton]]:animate-none"
  >
    <Skeleton className="mb-4 h-7 w-36" />
    <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
      <Skeleton className="h-9 w-full rounded-[10px] sm:w-[235px]" />
      <div className="flex gap-1.5">
        <Skeleton className="h-[30px] w-14 rounded-full" />
        <Skeleton className="h-[30px] w-20 rounded-full" />
        <Skeleton className="h-[30px] w-24 rounded-full" />
      </div>
    </div>
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,2.3fr)_minmax(17rem,1fr)]">
      <div className="bg-card-new min-w-0 divide-y overflow-hidden rounded-xl border">
        <div className="bg-muted/50 flex gap-4 px-3 py-2">
          <Skeleton className="h-4 w-3/5 max-w-24" />
          <Skeleton className="ml-auto h-4 w-20" />
        </div>
        {Array.from({ length: rows }, (_, index) => (
          <div
            key={index}
            className="flex min-h-14 items-center gap-2.5 px-3 py-3"
          >
            <Skeleton className="hidden size-8 shrink-0 rounded-full sm:block" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="ml-auto h-3 w-1/4" />
          </div>
        ))}
      </div>
      <div className="bg-card-new overflow-hidden rounded-xl border">
        <div className="border-b px-3.5 py-3">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="space-y-3 p-3.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  </div>
)

const DepartmentProfileSkeleton = () => (
  <article
    aria-hidden="true"
    className="motion-reduce:[&_[data-slot=skeleton]]:animate-none"
  >
    <header className={cn(styles.hero, 'relative isolate overflow-hidden')}>
      <div className="mx-auto w-full max-w-7xl px-4 pt-7 pb-6 md:px-12 md:pt-12 md:pb-8">
        <Skeleton className="mb-7 h-5 w-52 max-w-full rounded-md md:mb-9" />
        <div className="grid items-center gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8 lg:gap-12">
          <div className="min-w-0">
            <Skeleton className="h-[clamp(3.5rem,8.5vw,7rem)] w-2/5 max-w-64" />
            <div className="mt-4 max-w-3xl space-y-2">
              <Skeleton className="h-8 w-full md:h-9" />
              <Skeleton className="h-8 w-3/4 md:h-9" />
            </div>
            <div className="mt-4 max-w-xl space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Skeleton className="h-7 w-30 rounded-full" />
              <Skeleton className="h-7 w-36 rounded-full" />
              <Skeleton className="h-7 w-52 rounded-full" />
            </div>
          </div>
          <Skeleton className="size-34 rounded-full md:size-56 lg:mr-8 lg:size-68" />
        </div>
      </div>
    </header>
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-9 px-4 pt-8 pb-14 md:gap-10 md:px-12 md:pt-10 md:pb-18">
      <div>
        <Skeleton className="mb-3 h-6 w-40" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="bg-card-new overflow-hidden rounded-[14px] border sm:min-h-65"
            >
              <Skeleton className="h-27 rounded-none" />
              <div className="space-y-2.5 p-3.5">
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </article>
)

const DepartmentPage = ({ params }: ProfilePageProps) => (
  <Suspense fallback={<DepartmentProfileSkeleton />}>
    {params.then(({ slug }) => (
      <DepartmentProfile slug={slug} />
    ))}
  </Suspense>
)

export default DepartmentPage
