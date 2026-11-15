'use client'

import { ArrowRightIcon, XIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { use, useId, useState } from 'react'
import { browser } from 'react-dom'

import { Button, Typography } from '@/components/ui'

import type { Route } from 'next'

interface AnnouncementProps<Path extends string> {
  href: Route<Path>
  sectionPath: string
  title: string
  description: string
  dismissLabel: string
  storageKey: string
  version: string
  expiresAt?: number
}

export const Announcement = <Path extends string>({
  href,
  sectionPath,
  title,
  description,
  dismissLabel,
  storageKey,
  version,
  expiresAt,
}: AnnouncementProps<Path>) => {
  use(browser('Announcements depend on localStorage.'))

  const pathname = usePathname()
  const titleId = useId()
  const shouldReduceMotion = useReducedMotion() === true
  const isOnTargetSection = pathname === sectionPath || pathname.startsWith(`${sectionPath}/`)

  const [isVisible, setIsVisible] = useState(() => {
    if (expiresAt !== undefined && Date.now() >= expiresAt) return false

    try {
      return localStorage.getItem(storageKey) !== version
    } catch {
      return true
    }
  })

  const dismiss = () => {
    setIsVisible(false)

    try {
      localStorage.setItem(storageKey, version)
    } catch {}
  }

  return (
    <AnimatePresence>
      {isVisible && !isOnTargetSection && (
        <motion.aside
          aria-labelledby={titleId}
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
          className="bg-background border-border pointer-events-auto rounded-2xl border p-2 shadow-[0_18px_60px_-20px_rgb(0_0_0/0.35)]"
        >
          <div className="flex items-start gap-1">
            <Link
              href={href}
              onClick={dismiss}
              className="group focus-visible:ring-ring flex min-w-0 flex-1 items-center gap-3 rounded-xl p-2 outline-none focus-visible:ring-3"
            >
              <span className="bg-foreground text-background shrink-0 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide">
                НОВЕ
              </span>

              <span className="min-w-0 flex-1">
                <Typography
                  id={titleId}
                  as="span"
                  variant="label"
                  className="block"
                >
                  {title}
                </Typography>
                <Typography
                  as="span"
                  variant="caption"
                  className="text-muted-foreground mt-0.5 block"
                >
                  {description}
                </Typography>
              </span>

              <ArrowRightIcon
                aria-hidden="true"
                className="text-muted-foreground size-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
              />
            </Link>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground shrink-0"
              aria-label={dismissLabel}
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
