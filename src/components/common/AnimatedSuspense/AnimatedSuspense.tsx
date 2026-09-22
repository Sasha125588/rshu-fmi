import { Suspense, ViewTransition } from 'react'

import type { ReactNode } from 'react'

interface AnimatedSuspenseProps {
  children: ReactNode
  fallback: ReactNode
}

export const AnimatedSuspense = ({ children, fallback }: AnimatedSuspenseProps) => (
  <Suspense
    fallback={
      <ViewTransition
        default="none"
        exit="suspense-reveal"
      >
        {fallback}
      </ViewTransition>
    }
  >
    <ViewTransition
      enter="suspense-reveal"
      default="none"
    >
      {children}
    </ViewTransition>
  </Suspense>
)
