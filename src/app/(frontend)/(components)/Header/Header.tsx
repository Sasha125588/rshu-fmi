import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { MobileNav } from './Navbar/components/MobileNav/MobileNav'
import { Navbar } from './Navbar/Navbar'
import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'

export const Header = () => (
  <header className="border-border sticky top-0 z-50 border-b px-6 backdrop-blur-xl md:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex w-full items-center gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-lg pr-1 opacity-90 transition hover:opacity-100"
        >
          <Image
            src="/images/logo.avif"
            loading="eager"
            alt="FMI Logo"
            width={36}
            height={36}
            className="size-9"
          />
          <span className="font-jetbrains hidden text-sm font-semibold tracking-wide sm:inline">
            ФМІ РДГУ
          </span>
        </Link>
        <Separator
          orientation="vertical"
          className="hidden h-7 self-center! md:block"
        />
        <div className="hidden w-full md:block">
          <Navbar />
        </div>
      </div>

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
            <Menu data-icon="inline-start" />
            <span className="sr-only">Toggle menu</span>
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
                  height={80}
                />
              </SheetTitle>
            </SheetHeader>
            <MobileNav />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
)
