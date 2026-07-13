import { ArrowUpRightIcon } from 'lucide-react'

import { scheduleData } from './constants'
import { Typography } from '@/components/ui'

export const WorkingHours = () => (
  <div className="grid border-y lg:grid-cols-2 lg:divide-x">
    <article className="py-8 lg:py-10 lg:pr-12">
      <Typography
        as="p"
        variant="overline"
        className="text-muted-foreground"
      >
        Де нас знайти
      </Typography>
      <Typography
        as="h3"
        variant="title-lg"
        className="mt-5 max-w-xl"
      >
        Факультет математики та інформатики РДГУ
      </Typography>
      <address className="text-muted-foreground mt-6 space-y-2 text-base leading-7 not-italic">
        <p>33028, Україна, м. Рівне</p>
        <p>вул. Пластова, 31</p>
        <p className="text-foreground font-semibold">1-й поверх · кабінет 108</p>
      </address>
    </article>

    <article className="border-t py-8 lg:border-t-0 lg:py-10 lg:pl-12">
      <Typography
        as="p"
        variant="overline"
        className="text-muted-foreground"
      >
        Коли приходити
      </Typography>

      <dl className="mt-5 divide-y">
        {scheduleData.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 py-3 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <dt className="text-muted-foreground text-sm">{item.label}</dt>
            <dd className="text-sm font-semibold sm:text-right">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t pt-5">
        <Typography
          as="p"
          variant="caption"
          className="text-muted-foreground max-w-lg leading-5"
        >
          Графік приймальної комісії змінюється протягом вступної кампанії.
        </Typography>
        <a
          href="https://www.rshu.edu.ua/pryimalna-komisiia"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-violet mt-3 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
        >
          Актуальний графік приймальної комісії
          <ArrowUpRightIcon
            aria-hidden="true"
            size={15}
          />
        </a>
      </div>
    </article>
  </div>
)
