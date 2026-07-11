import { useEffect, useRef } from 'react'

import type { DependencyList, EffectCallback } from 'react'

export const useDebounceEffect = (effect: EffectCallback, delay: number, deps?: DependencyList) => {
  const mountedRef = useRef(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cleanupRef = useRef<ReturnType<EffectCallback>>(undefined)
  const effectRef = useRef(effect)
  const delayRef = useRef(delay)

  effectRef.current = effect
  delayRef.current = delay

  useEffect(() => {
    if (mountedRef.current) {
      mountedRef.current = false
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    timeoutRef.current = setTimeout(() => {
      cleanupRef.current = effectRef.current()
    }, delayRef.current)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = null
      if (typeof cleanupRef.current === 'function') cleanupRef.current()
    }
  }, deps)
}
