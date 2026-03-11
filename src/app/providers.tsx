'use client'

import { type ReactNode } from 'react'

import { ThemeProvider } from '@/shared/providers'

interface Props {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
