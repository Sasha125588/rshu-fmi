'use client'

import { SerwistProvider } from '@serwist/turbopack/react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
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
      <NuqsAdapter>
        <ThemeProvider>{children}</ThemeProvider>
      </NuqsAdapter>
    </SerwistProvider>
  )
}
