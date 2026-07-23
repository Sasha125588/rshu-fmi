import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'

import { HistoryChapter } from './_components/HistoryChapter'
import { HistoryEraNav } from './_components/HistoryEraNav'
import { OFFICIAL_HISTORY_URL, historyEras, historyEvents, historyPillars } from './_constants'
import { ActiveHistoryEraIdProvider } from './_contexts/activeHistoryEraId'
import { Typography } from '@/components/ui'
import { SITE_URL } from '@/shared/constants'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Історія факультету',
  description:
    'Історія факультету математики та інформатики РДГУ: від Учительського інституту 1940 року до сучасних напрямів математики, IT та цифрової освіти.',
  alternates: {
    canonical: '/history',
  },
  openGraph: {
    title: 'Історія факультету математики та інформатики',
    description:
      'Історія факультету математики та інформатики РДГУ: від Учительського інституту до сучасних напрямів математики, IT та цифрової освіти',
    images: [
      {
        url: new URL('/images/logo.avif', SITE_URL).href,
        width: 120,
        height: 120,
        type: 'image/avif',
        alt: 'ФМІ логотип',
      },
    ],
    url: new URL('/history', SITE_URL).href,
    type: 'website',
    locale: 'uk_UA',
  },
}

const HistoryPage = async () => {
  return (
    <div className="overflow-x-clip">
      <header className="px-4 md:px-12">
        <div className="flex items-end py-14 md:py-20">
          <div className="max-w-4xl">
            <Typography
              as="h1"
              variant="heading-xl"
              className="font-black"
            >
              Історія факультету
            </Typography>
            <Typography
              as="p"
              variant="body-md"
              className="text-muted-foreground mt-5 max-w-2xl leading-7 md:text-lg"
            >
              Від фізико-математичної школи 1940 року до сучасної освіти в математиці, інформатиці
              та цифрових технологіях.
            </Typography>
          </div>
        </div>
      </header>
      <ActiveHistoryEraIdProvider>
        <HistoryEraNav />

        <main>
          {historyEras.map((era) => (
            <HistoryChapter
              key={era.id}
              era={era}
              events={historyEvents.filter((event) => event.era === era.id)}
              pillars={era.id === 'today' ? historyPillars : undefined}
            />
          ))}

          <div className="px-4 pb-18 md:px-12 md:pb-24">
            <section className="border-b py-10 md:py-14">
              <div className="flex max-w-5xl flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
                <div className="max-w-2xl">
                  <Typography
                    as="h2"
                    variant="heading-md"
                  >
                    Продовжи історію факультету
                  </Typography>
                  <Typography
                    as="p"
                    variant="body-sm"
                    className="text-muted-foreground mt-3"
                  >
                    Переглянь освітні програми й обери напрям, у якому хочеш розвиватися.
                  </Typography>
                </div>

                <Link
                  href={'/educational-programs'}
                  className="text-accent-violet inline-flex shrink-0 items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
                >
                  Освітні програми
                  <ArrowRightIcon
                    data-icon="inline-end"
                    className="stroke-[1.5px]"
                  />
                </Link>
              </div>
            </section>

            <div className="mt-8 flex items-center justify-between text-sm">
              <p className="text-muted-foreground flex max-w-3xl flex-wrap items-center gap-x-2 gap-y-1">
                Історичні факти адаптовано з офіційної сторінки РДГУ.
                <a
                  href={OFFICIAL_HISTORY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-violet inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
                >
                  Переглянути повну історію
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    size={15}
                  />
                </a>
              </p>
              <p className="text-muted-foreground/20">thx u witchblvde🖤</p>
            </div>
          </div>
        </main>
      </ActiveHistoryEraIdProvider>
    </div>
  )
}

export default HistoryPage
