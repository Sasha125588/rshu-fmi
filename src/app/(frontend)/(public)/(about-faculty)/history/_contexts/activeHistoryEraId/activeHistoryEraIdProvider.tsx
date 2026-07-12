'use client'

import { type ReactNode, useEffect, useMemo, useState } from 'react'

import { type HistoryEraId, getHistoryEraAnchor, historyEras } from '../../_constants'
import { ActiveHistoryEraIdContext } from './activeHistoryEraIdContext'

export interface ActiveHistoryEraProviderProps {
  children: ReactNode
}

export const ActiveHistoryEraIdProvider = ({ children }: ActiveHistoryEraProviderProps) => {
  const [id, setId] = useState<HistoryEraId>(historyEras[0].id)

  useEffect(() => {
    const sections = historyEras.map((era) => ({
      era,
      element: document.getElementById(getHistoryEraAnchor(era.id))!,
    }))

    const selectCenteredEra = () => {
      const viewportCenter = window.innerHeight * 0.5
      const centeredSection = sections.find(({ element }) => {
        const bounds = element.getBoundingClientRect()
        return bounds.top <= viewportCenter && bounds.bottom >= viewportCenter
      })

      if (centeredSection) setId(centeredSection.era.id)
    }

    const observer = new IntersectionObserver(selectCenteredEra, {
      rootMargin: '-50% 0px -50%',
      threshold: 0,
    })

    sections.forEach(({ element }) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const value = useMemo(() => ({ value: id, set: setId }), [id])

  return <ActiveHistoryEraIdContext value={value}>{children}</ActiveHistoryEraIdContext>
}
