'use client'

import { SerwistProvider } from '@serwist/next/react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode } from 'react'

import { ThemeProvider } from './_contexts/theme'
import { TooltipProvider } from '@/components/ui/tooltip'

interface Props {
  children: ReactNode
}

export const Provider = ({ children }: Props) => {
  return (
    <NuqsAdapter>
      <SerwistProvider
        swUrl="/sw.js"
        disable={process.env.NODE_ENV !== 'production'}
        cacheOnNavigation={false}
        options={{ scope: '/' }}
      >
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </SerwistProvider>
    </NuqsAdapter>
  )
}
