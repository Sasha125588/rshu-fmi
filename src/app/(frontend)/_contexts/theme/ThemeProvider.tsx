'use client'

import { type ReactNode, useLayoutEffect, useMemo, useState } from 'react'

import { type Theme, ThemeContext } from './ThemeContext'
import { COOKIES } from '@/shared/constants/cookies'
import { dispatchCookieEvent, getCookie, setCookie } from '@/shared/helpers/cookies'
import { usePreferredColorScheme } from '@/shared/hooks'

const getSystemTheme = (): Exclude<Theme, 'system'> => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getTheme = (theme: Theme): Exclude<Theme, 'system'> => {
  if (theme === 'system') return getSystemTheme()
  return theme
}

export interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = usePreferredColorScheme()
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system'
    return (getCookie(COOKIES.THEME) as Theme | undefined) ?? 'system'
  })

  useLayoutEffect(() => {
    const root = document.documentElement
    const activeTheme = getTheme(theme)

    dispatchCookieEvent()
    setCookie(COOKIES.THEME, theme, { path: '/' })

    root.classList.remove('dark', 'light')
    root.classList.add(activeTheme)
  }, [theme, colorScheme])

  const animate = async (x: number, y: number, theme: Theme) => {
    const radius = Math.hypot(window.innerWidth, window.innerHeight)

    await document.startViewTransition(() => {
      setTheme(theme)
    }).ready

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }

  const value = useMemo(
    () => ({ value: getTheme(theme), set: setTheme, animate }),
    [theme, colorScheme]
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
