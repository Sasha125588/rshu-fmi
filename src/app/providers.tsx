'use client'

import { type ReactNode } from 'react'
import { SerwistProvider } from '@serwist/turbopack/react'

import { ThemeProvider } from '@/shared/providers'

interface Props {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <SerwistProvider
      swUrl="/serwist/sw.js"
      disable={process.env.NODE_ENV !== 'production'}
    >
      <ThemeProvider>{children}</ThemeProvider>
    </SerwistProvider>
  )
}
