'use client'

import { SerwistProvider } from '@serwist/turbopack/react'
import { type ReactNode } from 'react'

import { ThemeProvider } from './_contexts/theme'

interface Props {
  children: ReactNode
}

export const Provider = ({ children }: Props) => {
  return (
    <SerwistProvider
      swUrl="/serwist/sw.js"
      disable={process.env.NODE_ENV !== 'production'}
    >
      <ThemeProvider>{children}</ThemeProvider>
    </SerwistProvider>
  )
}
