import { ArrowRightIcon, CalendarDaysIcon, MenuIcon } from 'lucide-react'
import Link from 'next/link'

import { ThemeSwitcher } from '../../ThemeSwitcher/ThemeSwitcher'
import { NAVIGATION } from './Navbar/constants'
import { Navbar } from './Navbar/Navbar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Typography,
  buttonVariants,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { DEFAULT_SCHEDULE_PATH } from '@/shared/schedule/config'

import type { Route } from 'next'

export const Header = () => (
  <header className="border-border bg-background/85 sticky top-0 z-50 border-b px-4 backdrop-blur-xl sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex min-w-0 items-center gap-6">
        <Typography
          render={<Link href="/" />}
          as="span"
          variant="label"
          className="font-jetbrains shrink-0 pr-1 tracking-wide opacity-90 transition-opacity hover:opacity-100"
        >
          ФМІ РДГУ
        </Typography>
        <Separator
          orientation="vertical"
          className="hidden h-7 self-center! lg:block"
        />
        <div className="hidden min-w-0 lg:block">
          <Navbar />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ThemeSwitcher />

        <a
          href="https://www.rshu.edu.ua/pryimalna-komisiia"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({
              variant: 'secondary',
              size: 'sm',
            }),
            'hidden lg:inline-flex'
          )}
        >
          Вступнику
          <ArrowRightIcon data-icon="inline-end" />
        </a>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                />
              }
            >
              <MenuIcon data-icon="inline-start" />
              <Typography
                as="span"
                variant="caption"
                className="sr-only"
              >
                Відкрити меню
              </Typography>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="h-full overflow-hidden data-[side=left]:w-[min(20rem,calc(100vw-1.5rem))]!"
            >
              <SheetHeader className="border-border shrink-0 border-b py-5">
                <SheetTitle className="flex items-center gap-3 pr-9">
                  <span className="font-jetbrains shrink-0 tracking-wide opacity-90 transition-opacity hover:opacity-100">
                    ФМІ РДГУ
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Мобільна навігація"
                className="min-h-0 flex-1 overflow-y-auto px-4 py-5"
              >
                <Accordion className="overflow-visible rounded-none border-0">
                  {NAVIGATION.map((item) =>
                    item.cards ? (
                      <AccordionItem
                        key={item.label}
                        value={item.label}
                        className="border-border bg-muted/45 data-open:bg-muted/60 my-1.5 overflow-hidden rounded-xl border"
                      >
                        <AccordionTrigger className="hover:bg-muted/70 **:data-[slot=accordion-trigger-icon]:text-accent-violet min-h-14 items-center px-4 py-3 text-base font-semibold hover:no-underline">
                          {item.label}
                        </AccordionTrigger>
                        <AccordionContent className="border-border/70 flex flex-col gap-1 border-t pt-2 pb-3 [&_a]:no-underline">
                          {item.cards.map((card) => (
                            <SheetClose
                              key={card.title}
                              nativeButton={false}
                              role="link"
                              render={<Link href={card.href as Route} />}
                              className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring flex min-h-11 items-center rounded-md px-3 text-sm focus-visible:ring-2"
                            >
                              {card.title}
                            </SheetClose>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <div key={item.label}>
                        <SheetClose
                          nativeButton={false}
                          role="link"
                          render={<Link href={item.href as Route} />}
                          className="text-foreground/85 hover:text-accent-violet focus-visible:ring-ring flex min-h-14 items-center justify-between rounded-md px-3 text-base font-medium focus-visible:ring-2"
                        >
                          {item.label}
                          <ArrowRightIcon
                            aria-hidden
                            className="text-muted-foreground size-4"
                          />
                        </SheetClose>
                      </div>
                    )
                  )}
                </Accordion>
              </nav>
              <div className="border-border bg-popover shrink-0 border-t px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <SheetClose
                  nativeButton={false}
                  role="link"
                  render={<Link href={DEFAULT_SCHEDULE_PATH} />}
                  className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring mb-2 flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium focus-visible:ring-2"
                >
                  <CalendarDaysIcon
                    aria-hidden
                    className="size-4"
                  />
                  Розклад
                </SheetClose>
                <SheetClose
                  nativeButton={false}
                  role="link"
                  render={
                    <a
                      href="https://www.rshu.edu.ua/pryimalna-komisiia"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  className="bg-accent-violet-dark text-primary-foreground hover:bg-accent-violet-dark/85 focus-visible:ring-ring flex min-h-11 items-center justify-between rounded-md px-4 font-semibold focus-visible:ring-2"
                >
                  Вступнику
                  <ArrowRightIcon
                    className="size-4"
                    aria-hidden
                  />
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  </header>
)
