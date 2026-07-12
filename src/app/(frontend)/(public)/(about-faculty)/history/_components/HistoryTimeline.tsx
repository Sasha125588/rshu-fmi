'use client'

import { motion, useReducedMotion } from 'motion/react'

import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'

import type { HistoryEraId, HistoryEvent } from '../_constants'

interface HistoryTimelineProps {
  events: readonly HistoryEvent[]
  phase: HistoryEraId
  activeItemId: string
}

export const HistoryTimeline = ({ events, phase, activeItemId }: HistoryTimelineProps) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="bg-border absolute top-14 bottom-0 left-[5.25rem] w-px md:left-32"
      />

      <ol
        aria-label="Хронологія факультету"
        className="relative"
      >
        {events.map((event, index) => {
          const isActive = activeItemId === event.id

          return (
            <li
              key={event.id}
              data-history-item={event.id}
              data-visual-node={phase === 'today' ? -1 : index}
              className="grid grid-cols-[4.5rem_1.5rem_minmax(0,1fr)] gap-x-3 md:grid-cols-[7rem_2rem_minmax(0,1fr)] md:gap-x-5 lg:min-h-[48vh]"
            >
              <time className="font-jetbrains text-muted-foreground col-start-1 row-start-1 pt-14 text-right text-xs leading-4 font-medium tracking-tight md:text-sm">
                {event.year}
              </time>

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
                className="border-border col-start-3 row-start-1 flex max-w-3xl flex-col gap-4 border-t py-12 md:py-14"
              >
                <Typography
                  as="h3"
                  variant="title-md"
                >
                  {event.title}
                </Typography>

                <Typography
                  as="p"
                  variant="body-md"
                  className="text-muted-foreground"
                >
                  {event.description}
                </Typography>

                <p className="border-accent-violet/40 text-muted-foreground border-l pl-3 text-sm leading-5">
                  {event.fact}
                </p>
              </motion.article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
