'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

import type { ReactNode } from 'react'

interface HomeRevealProps {
  children: ReactNode
  className?: string
  variant?: 'rise' | 'left' | 'right' | 'fade' | 'settle'
  delayed?: boolean
}

export const HomeReveal = ({
  children,
  className,
  variant = 'rise',
  delayed = false,
}: HomeRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionPreference.matches) return

    element.dataset.homeReveal = 'pending'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.dataset.homeReveal = 'visible'
        observer.disconnect()
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    )

    const onMotionPreferenceChange = () => {
      if (!motionPreference.matches) return
      element.dataset.homeReveal = 'visible'
      observer.disconnect()
    }

    observer.observe(element)
    motionPreference.addEventListener('change', onMotionPreferenceChange)

    return () => {
      observer.disconnect()
      motionPreference.removeEventListener('change', onMotionPreferenceChange)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'home-reveal',
        `home-reveal-${variant}`,
        delayed && 'home-reveal-delayed',
        className
      )}
      onFocusCapture={() => {
        if (ref.current) ref.current.dataset.homeReveal = 'visible'
      }}
    >
      {children}
    </div>
  )
}
