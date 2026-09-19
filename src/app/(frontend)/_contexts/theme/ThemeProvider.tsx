'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { ThemeContext } from './ThemeContext'
import { COOKIES } from '@/shared/constants'
import { getCookie, setCookie } from '@/shared/helpers'
import { usePreferredColorScheme } from '@/shared/hooks'

import type { Theme } from './ThemeContext'
import type { ReactNode } from 'react'

const TRANSITION_DURATION = 600

const getSystemTheme = (): Exclude<Theme, 'system'> => {
  if (typeof window === 'undefined') return 'dark'

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getTheme = (theme: Theme): Exclude<Theme, 'system'> =>
  theme === 'system' ? getSystemTheme() : theme

export interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = usePreferredColorScheme()

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system'

    return (getCookie(COOKIES.THEME) as Theme | undefined) ?? 'system'
  })

  const isTransitioningRef = useRef(false)
  const animationRef = useRef<Animation | null>(null)

  useLayoutEffect(() => {
    const root = document.documentElement
    const activeTheme = getTheme(theme)

    setCookie(COOKIES.THEME, theme, { path: '/' })

    root.classList.remove('dark', 'light')
    root.classList.add(activeTheme)
    root.style.colorScheme = activeTheme
  }, [theme, colorScheme])

  const animate = async (x: number, y: number, newTheme: Theme) => {
    if (isTransitioningRef.current) return

    const root = document.documentElement

    const width = window.innerWidth
    const height = window.innerHeight

    const radius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y))
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]

    isTransitioningRef.current = true

    root.dataset.themeTransition = 'active'
    root.style.setProperty('--theme-transition-duration', `${TRANSITION_DURATION}ms`)
    root.style.setProperty('--theme-transition-clip-start', clipPath[0])

    const cleanup = () => {
      animationRef.current?.cancel()
      animationRef.current = null

      delete root.dataset.themeTransition

      root.style.removeProperty('--theme-transition-duration')
      root.style.removeProperty('--theme-transition-clip-start')

      isTransitioningRef.current = false
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
    })

    try {
      await transition.ready

      const animation = root.animate(
        {
          clipPath,
        },
        {
          duration: TRANSITION_DURATION,
          easing: 'ease-in-out',
          fill: 'forwards',
          pseudoElement: '::view-transition-new(root)',
        }
      )

      animationRef.current = animation

      await transition.finished
    } catch {
    } finally {
      cleanup()
    }
  }

  const value = useMemo(
    () => ({
      value: getTheme(theme),
      set: setTheme,
      animate,
    }),
    [theme, colorScheme]
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
