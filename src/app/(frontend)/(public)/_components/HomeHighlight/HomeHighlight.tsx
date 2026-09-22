'use client'

import { useEffect, useRef } from 'react'

import type { ReactNode } from 'react'

type HomeHighlightTone = 'amber' | 'sky' | 'coral' | 'mint'

export const HomeHighlight = ({
  children,
  tone,
}: {
  children: ReactNode
  tone: HomeHighlightTone
}) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || window.CSS?.supports('animation-timeline: view()')) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionPreference.matches || !('IntersectionObserver' in window)) return

    let isVisible = false
    const updateHighlight = () => {
      element.style.setProperty(
        '--home-highlighted',
        motionPreference.matches || isVisible ? '1' : '0'
      )
    }

    updateHighlight()

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        updateHighlight()
      },
      { threshold: 0.8, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(element)
    motionPreference.addEventListener('change', updateHighlight)

    return () => {
      observer.disconnect()
      motionPreference.removeEventListener('change', updateHighlight)
    }
  }, [])

  return (
    <mark
      ref={ref}
      className="home-highlight"
      data-tone={tone}
    >
      <span>{children}</span>
    </mark>
  )
}
