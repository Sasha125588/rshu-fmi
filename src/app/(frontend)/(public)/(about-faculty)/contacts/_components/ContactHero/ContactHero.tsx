import { MailIcon, PhoneIcon } from 'lucide-react'

import { InfiniteCorridorCanvas } from './InfiniteCorridorCanvas'
import { Typography, buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'

export const ContactHero = () => (
  <header className="relative isolate min-h-[42rem] overflow-hidden border-b md:min-h-[calc(100svh-4rem)]">
    <InfiniteCorridorCanvas />
    <div className="from-background via-background/94 pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-linear-to-r to-transparent md:w-[74%] lg:w-[64%]" />
    <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-t to-transparent" />

    <div className="relative z-20 flex min-h-[42rem] items-end px-4 py-14 md:min-h-[calc(100svh-4rem)] md:px-12 md:py-20">
      <div className="max-w-3xl">
        <Typography
          as="h1"
          variant="heading-xl"
          className="mt-5 font-black"
        >
          Контакти
        </Typography>
        <Typography
          as="p"
          variant="heading-md"
          className="mt-5 max-w-2xl"
        >
          Правильні двері – кабінет <span className="text-accent-violet">108</span>.
        </Typography>
        <Typography
          as="p"
          variant="body-md"
          className="text-muted-foreground mt-4 max-w-xl leading-7 md:text-lg"
        >
          Телефон, пошта, графік роботи й адреса факультету – без зайвих коридорів між вами та
          потрібною відповіддю.
        </Typography>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
          <a
            href="tel:+380362266594"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-foreground! text-background! hover:bg-foreground/80! gap-2 px-5 font-semibold'
            )}
          >
            <PhoneIcon aria-hidden="true" />
            Зателефонувати
          </a>
          <a
            href="mailto:dekanat.fmi@rshu.edu.ua"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'gap-2 px-5')}
          >
            <MailIcon aria-hidden="true" />
            Написати
          </a>
        </div>
      </div>
    </div>
  </header>
)
