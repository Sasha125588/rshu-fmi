'use client'

import { useEffect, useState } from 'react'

import { getHistoryEraAnchor } from '../_constants'
import { cn } from '@/lib/utils'

import type { HistoryEra, HistoryEraId } from '../_constants'

interface HistoryEraNavProps {
  eras: readonly HistoryEra[]
}

export const HistoryEraNav = ({ eras }: HistoryEraNavProps) => {
  const [activeEra, setActiveEra] = useState<HistoryEraId>(eras[0]?.id ?? 'origins')

  useEffect(() => {
    const eraSections = eras
      .map((era) => document.getElementById(getHistoryEraAnchor(era.id)))
      .filter((section) => section !== null)

    if (eraSections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (!visibleEntry) return

        const era = eras.find((item) => getHistoryEraAnchor(item.id) === visibleEntry.target.id)
        if (era) setActiveEra(era.id)
      },
      { rootMargin: '-38% 0px -54%', threshold: 0 }
    )

    eraSections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [eras])

  return (
    <nav
      aria-label="Ери історії факультету"
      className="bg-background/90 sticky top-16 z-40 border-y backdrop-blur-xl"
    >
      <div className="scrollbar-none overflow-x-auto px-4 md:px-12 [&::-webkit-scrollbar]:hidden">
        <div className="flex h-18 min-w-max items-center gap-7 md:gap-10">
          {eras.map((era) => {
            const isActive = era.id === activeEra

            return (
              <a
                key={era.id}
                href={`#${getHistoryEraAnchor(era.id)}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setActiveEra(era.id)}
                className={cn(
                  'after:bg-accent-violet relative flex shrink-0 flex-col gap-0.5 py-2 text-left transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:transition-transform focus-visible:outline-none focus-visible:after:scale-x-100',
                  isActive
                    ? 'text-foreground after:scale-x-100'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="font-jetbrains text-[0.625rem] tracking-[0.14em] uppercase opacity-65">
                  {era.range}
                </span>
                <span className="text-sm font-medium">{era.label}</span>
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
