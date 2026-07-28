import { RefreshCwIcon } from 'lucide-react'

import { NewsHeaderBackground } from './NewsHeaderBackground'
import { NewsSourceNav } from './NewsSourceNav'
import { Typography } from '@/components/ui'

export const NewsHeader = () => (
  <header className="relative isolate overflow-hidden border-b px-4 pt-10 md:px-12 md:pt-14">
    <NewsHeaderBackground />

    <div className="relative z-10 max-w-3xl">
      <Typography
        as="h2"
        variant="heading-xl"
        className="font-black"
      >
        Новини
      </Typography>
      <Typography
        as="p"
        variant="body-md"
        className="text-muted-foreground mt-4 max-w-2xl leading-7 md:text-lg"
      >
        Події факультету, університету та кафедр в одному інформаційному потоці.
      </Typography>
    </div>

    <div className="relative z-10 mt-8 flex flex-col gap-4 pb-6 md:mt-10 md:pb-8 lg:flex-row lg:items-center lg:justify-between">
      <NewsSourceNav />
      <Typography
        as="p"
        variant="caption"
        className="font-jetbrains text-muted-foreground"
      >
        <span className="bg-background flex items-center gap-2 rounded-full box-decoration-clone px-2">
          <RefreshCwIcon
            aria-hidden="true"
            size={14}
          />
          Дані оновлюються щогодини
        </span>
      </Typography>
    </div>
  </header>
)
