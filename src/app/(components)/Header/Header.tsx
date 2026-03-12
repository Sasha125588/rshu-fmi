import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { MobileNav } from './Navbar/components/MobileNav/MobileNav'
import { Navbar } from './Navbar/Navbar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/animate-ui/radix/sheet'
import { Button } from '@/components/ui/button'

export const Header = () => {
  return (
    <header className="bg-background/80 sticky top-0 z-50 -mx-4 mb-8 border-b border-white/5 px-4 backdrop-blur-xl md:-mx-8 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-3">
        <div className="flex w-full items-center gap-6">
          <Link
            href="/"
            className="shrink-0"
          >
            <Image
              src="/images/logo.webp"
              priority
              loading="eager"
              alt="FMI Logo"
              width={56}
              height={56}
            />
          </Link>
          <div className="hidden w-full md:block">
            <Navbar />
          </div>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <Menu className="size-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="h-full w-[300px] overflow-auto pr-0 sm:w-[400px]"
            >
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src="/images/logo.webp"
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
}
