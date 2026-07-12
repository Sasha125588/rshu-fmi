'use client'

import { useScroll } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { getHistoryEraAnchor } from '../_constants'
import { useActiveHistoryEra } from './HistoryAnimationCoordinator'
import { HistoryEvolutionCanvas } from './HistoryEvolutionCanvas'
import { HistoryTimeline } from './HistoryTimeline'
import { HistoryTodayPillars } from './HistoryTodayPillars'
import { Typography } from '@/components/ui'

import type { HistoryEra, HistoryEvent, HistoryPillar } from '../_constants'

interface HistoryChapterProps {
  era: HistoryEra
  events: HistoryEvent[]
  pillars?: HistoryPillar[]
}

interface ActiveHistoryItem {
  id: string
  visualNode: number
}

export const HistoryChapter = ({ era, events, pillars = [] }: HistoryChapterProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const activeEra = useActiveHistoryEra()
  const initialItem = events[0]
  const [activeItem, setActiveItem] = useState<ActiveHistoryItem>({
    id: initialItem?.id ?? `pillar-${pillars[0]?.id ?? 'mathematics'}`,
    visualNode: era.id === 'today' ? -1 : 0,
  })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-history-item]'))
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (!visibleEntry) return

        const element = visibleEntry.target as HTMLElement
        setActiveItem({
          id: element.dataset.historyItem ?? '',
          visualNode: Number(element.dataset.visualNode ?? -1),
        })
      },
      { rootMargin: '-40% 0px -48%', threshold: 0 }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [era.id])

  const titleId = `history-chapter-${era.id}-title`

  return (
    <section
      ref={sectionRef}
      id={getHistoryEraAnchor(era.id)}
      aria-labelledby={titleId}
      className="scroll-mt-[8.5rem] border-b px-4 md:px-12"
    >
      <div className="grid lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] xl:grid-cols-[minmax(24rem,0.88fr)_minmax(0,1.12fr)]">
        <div className="py-12 md:py-16 lg:sticky lg:top-[8.5rem] lg:h-[calc(100vh-8.5rem)] lg:border-r lg:py-10 lg:pr-10 xl:pr-14">
          <div className="flex h-full flex-col">
            <div className="max-w-lg">
              <p className="font-jetbrains text-accent-violet text-xs font-medium tracking-[0.08em]">
                {era.range}
              </p>
              <Typography
                id={titleId}
                as="h2"
                variant="heading-lg"
                className="mt-3"
              >
                {era.label}
              </Typography>
              <Typography
                as="p"
                variant="body-sm"
                className="text-muted-foreground mt-3 max-w-md"
              >
                {era.description}
              </Typography>
            </div>

            <div className="mt-8 min-h-80 flex-1 lg:mt-6 lg:min-h-0">
              <HistoryEvolutionCanvas
                phase={era.id}
                isActive={activeEra === era.id}
                activeNode={activeItem.visualNode}
                scrollProgress={scrollYProgress}
              />
            </div>
          </div>
        </div>

        <div className="lg:pl-10 xl:pl-14">
          <HistoryTimeline
            events={events}
            phase={era.id}
            activeItemId={activeItem.id}
          />

          {era.id === 'today' && pillars.length > 0 && (
            <HistoryTodayPillars
              pillars={pillars}
              activeItemId={activeItem.id}
            />
          )}
        </div>
      </div>
    </section>
  )
}
