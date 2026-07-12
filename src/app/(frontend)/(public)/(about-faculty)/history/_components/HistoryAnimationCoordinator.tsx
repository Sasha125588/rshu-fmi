'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { getHistoryEraAnchor } from '../_constants'

import type { HistoryEra, HistoryEraId } from '../_constants'
import type { ReactNode } from 'react'

const ActiveHistoryEraContext = createContext<HistoryEraId>('origins')

interface HistoryAnimationCoordinatorProps {
  eras: HistoryEra[]
  children: ReactNode
}

export const HistoryAnimationCoordinator = ({
  eras,
  children,
}: HistoryAnimationCoordinatorProps) => {
  const [activeEra, setActiveEra] = useState<HistoryEraId>(eras[0]?.id ?? 'origins')

  useEffect(() => {
    const sections = eras
      .map((era) => ({
        era,
        element: document.getElementById(getHistoryEraAnchor(era.id)),
      }))
      .filter((item): item is { era: HistoryEra; element: HTMLElement } => item.element !== null)

    if (sections.length === 0) return

    const selectCenteredEra = () => {
      const viewportCenter = window.innerHeight * 0.5
      const centeredSection = sections.find(({ element }) => {
        const bounds = element.getBoundingClientRect()
        return bounds.top <= viewportCenter && bounds.bottom >= viewportCenter
      })

      if (centeredSection) setActiveEra(centeredSection.era.id)
    }

    const observer = new IntersectionObserver(selectCenteredEra, {
      rootMargin: '-49% 0px -49%',
      threshold: 0,
    })

    sections.forEach(({ element }) => observer.observe(element))
    selectCenteredEra()

    return () => observer.disconnect()
  }, [eras])

  return (
    <ActiveHistoryEraContext.Provider value={activeEra}>
      {children}
    </ActiveHistoryEraContext.Provider>
  )
}

export const useActiveHistoryEra = () => useContext(ActiveHistoryEraContext)
