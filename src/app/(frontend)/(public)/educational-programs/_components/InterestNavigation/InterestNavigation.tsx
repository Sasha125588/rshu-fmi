'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

interface InterestNavigationProps {
  groups: { anchor: string; interestLabel: string }[]
}

export const InterestNavigation = ({ groups }: InterestNavigationProps) => {
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.anchor ?? '')

  useEffect(() => {
    const sections = groups.flatMap((group) => {
      const element = document.getElementById(group.anchor)

      return element ? [{ element, group }] : []
    })

    const selectCenteredGroup = () => {
      const viewportCenter = window.innerHeight * 0.5
      const centeredSection = sections.find(({ element }) => {
        const bounds = element.getBoundingClientRect()

        return bounds.top <= viewportCenter && bounds.bottom >= viewportCenter
      })

      if (centeredSection) setActiveGroupId(centeredSection.group.anchor)
    }

    const observer = new IntersectionObserver(selectCenteredGroup, {
      rootMargin: '-50% 0px -50%',
      threshold: 0,
    })

    sections.forEach(({ element }) => observer.observe(element))

    return () => observer.disconnect()
  }, [groups])

  return (
    <nav
      aria-label="Обрати напрям за інтересами"
      className="bg-background/90 sticky top-16 z-40 border-y backdrop-blur-xl"
    >
      <div className="scrollbar-none overflow-x-auto px-4 md:px-12 [&::-webkit-scrollbar]:hidden">
        <ol className="flex h-18 min-w-max items-center gap-7 md:gap-10">
          {groups.map((group, index) => {
            const isActive = group.anchor === activeGroupId

            return (
              <li key={group.anchor}>
                <a
                  href={`#${group.anchor}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => setActiveGroupId(group.anchor)}
                  className={cn(
                    'after:bg-accent-violet relative flex shrink-0 flex-col gap-0.5 py-2 text-left transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:transition-transform focus-visible:outline-none focus-visible:after:scale-x-100',
                    isActive
                      ? 'text-foreground after:scale-x-100'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="font-jetbrains text-[0.625rem] tracking-[0.14em] uppercase opacity-65">
                    {String(index + 1).padStart(2, '0')} · напрям
                  </span>
                  <span className="text-sm font-medium">{group.interestLabel}</span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
