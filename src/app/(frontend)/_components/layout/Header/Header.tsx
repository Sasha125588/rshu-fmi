import { ArrowRightIcon, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { ThemeSwitcher } from '../../ThemeSwitcher/ThemeSwitcher'
import { Navbar } from './Navbar/Navbar'
import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Typography,
  buttonVariants,
} from '@/components/ui'
import { cn } from '@/lib/utils'

export const Header = () => (
  <header className="border-border sticky top-0 z-50 border-b px-6 backdrop-blur-xl md:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex w-full items-center gap-6">
        <Typography
          render={<Link href="/" />}
          as="span"
          variant="label"
          className="font-jetbrains hidden shrink-0 pr-1 tracking-wide opacity-90 transition hover:opacity-100 sm:flex"
        >
          ФМІ РДГУ
        </Typography>
        <Separator
          orientation="vertical"
          className="hidden h-7 self-center! md:block"
        />
        <div className="hidden w-full md:block">
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
            'hidden md:inline-flex'
          )}
        >
          Вступнику
          <ArrowRightIcon data-icon="inline-end" />
        </a>

        <div className="md:hidden">
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
                Toggle menu
              </Typography>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="h-full w-[300px] overflow-auto pr-0 sm:w-[400px]"
            >
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src="/images/logo.avif"
                    alt="FMI Logo"
                    width={80}
                    loading="eager"
                    height={80}
                  />
                </SheetTitle>
              </SheetHeader>
              {/* <MobileNav /> */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  </header>
)
