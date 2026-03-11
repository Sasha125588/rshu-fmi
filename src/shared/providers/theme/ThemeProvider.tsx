'use client'

import * as React from 'react'

import { type Theme, ThemeContext } from './ThemeContext'
import { COOKIES } from '@/shared/constants/cookies'
import { getCookie } from '@/shared/hooks/cookies/getCookie'
import { setCookie } from '@/shared/hooks/cookies/setCookie'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    return (getCookie(COOKIES.THEME) as Theme) ?? 'dark'
  })

  React.useLayoutEffect(() => {
    setCookie(COOKIES.THEME, theme, { path: '/' })
    const root = document.documentElement

    root.classList.remove('dark', 'light')
    root.classList.add(theme)
  }, [theme])

  const value = React.useMemo(() => ({ value: theme, set: setTheme }), [theme])

  return <ThemeContext value={value}>{children}</ThemeContext>
}
