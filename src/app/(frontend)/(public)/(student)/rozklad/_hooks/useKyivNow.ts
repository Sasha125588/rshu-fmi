'use client'

import { useEffect, useState } from 'react'

import { getKyivNow } from '../_helpers'

import type { KyivNow } from '../_helpers'

const KYIV_NOW_TICK_MS = 60_000

export const useKyivNow = () => {
  const [now, setNow] = useState<KyivNow | null>(null)

  useEffect(() => {
    const update = () => setNow(getKyivNow(Date.now()))
    const updateWhenVisible = () => {
      if (document.visibilityState === 'visible') update()
    }

    update()
    const interval = window.setInterval(update, KYIV_NOW_TICK_MS)
    document.addEventListener('visibilitychange', updateWhenVisible)

    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', updateWhenVisible)
    }
  }, [])

  return now
}
