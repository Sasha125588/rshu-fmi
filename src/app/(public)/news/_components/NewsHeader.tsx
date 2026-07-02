import { RefreshCwIcon } from 'lucide-react'

import { NewsHeaderBackground } from './NewsHeaderBackground'
import { NewsSourceNav } from './NewsSourceNav'

import type { NewsSource } from '@/shared/news'

interface NewsHeaderProps {
  activeSource?: NewsSource
}

export const NewsHeader = ({ activeSource }: NewsHeaderProps) => (
  <header className="relative isolate overflow-hidden border-b px-4 pt-10 md:px-12 md:pt-14">
    <NewsHeaderBackground />

    <div className="relative z-10 max-w-3xl">
      <h1 className="font-jetbrains text-5xl leading-tight font-bold tracking-tight text-balance md:text-7xl">
        Новини
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7 md:text-lg">
        Події університету та кафедр в одному інформаційному потоці.
      </p>
    </div>

    <div className="relative z-10 mt-8 flex flex-col gap-4 pb-6 md:mt-10 md:pb-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <NewsSourceNav activeSource={activeSource} />
      </div>

      <p className="font-jetbrains text-muted-foreground text-xs">
        <span className="bg-background flex items-center gap-2 rounded-full box-decoration-clone px-2">
          <RefreshCwIcon
            aria-hidden="true"
            className="size-3.5"
          />
          Дані оновлюються щогодини
        </span>
      </p>
    </div>
  </header>
)
