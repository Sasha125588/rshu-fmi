'use client'

import { type ReactNode } from 'react'

import { ThemeProvider } from '@/shared/providers'

interface Props {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  return <ThemeProvider>{children}</ThemeProvider>
}
