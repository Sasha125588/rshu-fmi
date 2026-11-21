'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { LinkProps } from 'next/link'

export function HoverPrefetchLink<Path>({
  href,
  prefetch,
  onMouseEnter,
  onFocus,
  ...props
}: LinkProps<Path>) {
  const [intendedHref, setIntendedHref] = useState<typeof href>()
  const intentPrefetch = intendedHref === href ? true : 'auto'

  return (
    <Link<Path>
      {...props}
      href={href}
      prefetch={prefetch === undefined ? intentPrefetch : prefetch}
      onMouseEnter={(event) => {
        onMouseEnter?.(event)
        if (prefetch === undefined && !event.defaultPrevented) setIntendedHref(href)
      }}
      onFocus={(event) => {
        onFocus?.(event)
        if (prefetch === undefined && !event.defaultPrevented) setIntendedHref(href)
      }}
    />
  )
}
