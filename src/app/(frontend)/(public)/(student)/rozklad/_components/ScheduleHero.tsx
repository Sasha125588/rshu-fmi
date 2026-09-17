import { ScheduleSculpture } from './ScheduleSculpture'
import { Typography } from '@/components/ui/typography'

import type { ReactNode } from 'react'

export function ScheduleHero({ sourceMeta }: { sourceMeta: ReactNode }) {
  return (
    <header className="relative isolate flex min-h-80 items-center overflow-hidden border-b px-4 py-12 md:min-h-88 md:px-12 md:py-16">
      <ScheduleSculpture />

      <div className="relative z-10 mx-auto w-full max-w-[1504px]">
        <div className="max-w-xl">
          <Typography
            as="h1"
            variant="heading-lg"
            className="font-bold md:text-6xl"
          >
            Розклад занять
          </Typography>
          <Typography
            as="p"
            variant="body-md"
            className="text-muted-foreground mt-4 max-w-lg leading-7 md:text-lg"
          >
            Пари, аудиторії та онлайн-заняття вашої групи в одному місці.
          </Typography>
        </div>

        <div className="text-muted-foreground mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs">
          {sourceMeta}
        </div>
      </div>
    </header>
  )
}
