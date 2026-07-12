'use client'

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'

import type { HistoryPillar } from '../_constants'

interface HistoryTodayPillarsProps {
  pillars: readonly HistoryPillar[]
  activeItemId: string
}

export const HistoryTodayPillars = ({ pillars, activeItemId }: HistoryTodayPillarsProps) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="bg-border absolute top-0 bottom-14 left-[5.25rem] w-px md:left-32"
      />

      {pillars.map((pillar, index) => {
        const itemId = `pillar-${pillar.id}`
        const isActive = activeItemId === itemId

        return (
          <div
            key={pillar.id}
            data-history-item={itemId}
            data-visual-node={index}
            className="grid grid-cols-[4.5rem_1.5rem_minmax(0,1fr)] gap-x-3 md:grid-cols-[7rem_2rem_minmax(0,1fr)] md:gap-x-5 lg:min-h-[52vh]"
          >
            <div className="font-jetbrains text-muted-foreground col-start-1 row-start-1 pt-14 text-right text-xs leading-4 font-medium tracking-tight md:text-sm">
              {index === 0 ? 'Сьогодні' : null}
            </div>

            <div className="relative z-10 col-start-2 row-start-1 flex justify-center pt-14">
              <span
                aria-hidden="true"
                className={cn(
                  'border-accent-violet bg-background block size-3 border transition-[background-color,transform] duration-300',
                  isActive && 'bg-accent-violet scale-110'
                )}
              />
            </div>

            <motion.article
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
              viewport={{ amount: 0.35, once: true }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="border-border col-start-3 row-start-1 flex max-w-3xl flex-col justify-center gap-5 border-t py-12 md:py-14"
            >
              <Typography
                as="h3"
                variant="title-lg"
              >
                {pillar.title}
              </Typography>

              <Typography
                as="p"
                variant="body-md"
                className="text-muted-foreground max-w-2xl"
              >
                {pillar.description}
              </Typography>

              <p className="text-muted-foreground max-w-2xl text-sm leading-6">
                <span className="text-foreground font-medium">Основа напряму:</span>{' '}
                {pillar.department}
              </p>

              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {pillar.programs.map((program) => (
                  <li key={program.label}>
                    <Link
                      href={program.href}
                      className="text-accent-violet text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {program.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        )
      })}
    </div>
  )
}
