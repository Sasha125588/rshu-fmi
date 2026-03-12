'use client'

import { ArrowRightIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

import { HoverBorderGradient } from '@/components/aceternity-ui/components/hover-border-gradient'
import { Button } from '@/components/ui/button'

export const BecomeAStudent = () => (
  <section className="relative flex min-h-[70vh] flex-col items-center justify-center py-12">
    <div className="bg-green-primary/10 pointer-events-none absolute top-1/2 left-1/2 h-[150px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] md:h-[400px] md:w-[600px]" />

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative text-center text-5xl font-bold tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl"
    >
      Факультет математики
      <br />
      <span className="text-green-primary">&amp;&amp;</span> інформатики
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
      className="text-muted-foreground relative mt-6 max-w-xl text-center text-lg md:text-xl"
    >
      Більше 90 років досвіду в підготовці математиків, програмістів та вчителів. Ваш шлях до успіху
      в цифровому світі починається тут.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      className="relative mt-10 flex flex-col gap-4 sm:flex-row"
    >
      <Link
        href="https://www.rshu.edu.ua/pryimalna-komisiia"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Перейти на сторінку приймальної комісії"
      >
        <Button className="group bg-button-primary hover:bg-green-secondary dark:bg-green-primary/50 dark:hover:bg-green-primary/40 flex h-12 w-full cursor-pointer items-center justify-between rounded-full sm:w-auto sm:justify-start">
          <p className="text-base font-semibold text-white">Стати студентом</p>
          <div className="mr-[-10px] rounded-full bg-white p-2">
            <ArrowRightIcon className="size-5 text-black/80 transition-all duration-200 group-hover:translate-x-0.5" />
          </div>
        </Button>
      </Link>
      <Link
        href="#specializations"
        aria-label="Перейти до спеціальностей факультету"
      >
        <HoverBorderGradient
          containerClassName="rounded-full w-full sm:w-auto"
          className="text-accent-foreground bg-background flex h-12 w-full cursor-pointer items-center justify-center space-x-2 sm:w-auto"
        >
          <p className="text-base font-normal">Спеціальності</p>
        </HoverBorderGradient>
      </Link>
    </motion.div>
  </section>
)
