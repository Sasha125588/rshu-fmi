'use client'

import { ArrowRightIcon, XIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { use, useState } from 'react'
import { browser } from 'react-dom'

import { Button, Typography } from '@/components/ui'
import { LOCAL_STORAGE } from '@/shared/constants/localstorage'

const ANNOUNCEMENT_EXPIRES_AT = new Date('2026-09-26T00:00:00+03:00').getTime()
const ANNOUNCEMENT_VERSION = '1'

export const ScheduleAnnouncement = () => {
  use(browser('Schedule announcement depends on localStorage.'))

  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion() === true

  const [isVisible, setIsVisible] = useState(() => {
    if (Date.now() >= ANNOUNCEMENT_EXPIRES_AT) return false

    try {
      return localStorage.getItem(LOCAL_STORAGE.ANNOUNCEMENT.SCHEDULE) !== ANNOUNCEMENT_VERSION
    } catch {
      return true
    }
  })

  const dismiss = () => {
    setIsVisible(false)

    try {
      localStorage.setItem(LOCAL_STORAGE.ANNOUNCEMENT.SCHEDULE, ANNOUNCEMENT_VERSION)
    } catch {}
  }

  return (
    <AnimatePresence>
      {isVisible && !pathname.startsWith('/rozklad') && (
        <motion.aside
          key="schedule-announcement"
          aria-labelledby="schedule-announcement-title"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 16, y: 12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0, transition: { duration: 0.15 } }
              : {
                  opacity: 0,
                  y: 8,
                  transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.15 }
              : { type: 'spring', stiffness: 360, damping: 30, mass: 0.8 }
          }
          className="bg-background border-border fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 rounded-2xl border p-2 shadow-[0_18px_60px_-20px_rgb(0_0_0/0.35)] sm:right-6 sm:bottom-6 sm:left-auto sm:w-80"
        >
          <div className="flex items-start gap-1">
            <Link
              href="/rozklad"
              onClick={dismiss}
              className="group focus-visible:ring-ring flex min-w-0 flex-1 items-center gap-3 rounded-xl p-2 outline-none focus-visible:ring-3"
            >
              <span className="bg-foreground text-background shrink-0 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide">
                НОВЕ
              </span>

              <span className="min-w-0 flex-1">
                <Typography
                  id="schedule-announcement-title"
                  as="span"
                  variant="label"
                  className="block"
                >
                  Розклад занять
                </Typography>
                <Typography
                  as="span"
                  variant="caption"
                  className="text-muted-foreground mt-0.5 block"
                >
                  Уже доступний на сайті
                </Typography>
              </span>

              <ArrowRightIcon
                aria-hidden="true"
                className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground shrink-0"
              aria-label="Закрити повідомлення про розклад"
              onClick={dismiss}
            >
              <XIcon />
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
