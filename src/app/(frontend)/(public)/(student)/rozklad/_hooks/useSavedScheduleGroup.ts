import { useEffect, useState } from 'react'

import { LOCAL_STORAGE_PREFIX } from '@/shared/constants/localstorage'

export function useSavedScheduleGroup({
  groups,
  selected,
  sourceKey,
  selectSavedGroup,
}: {
  groups: string[]
  selected: string
  sourceKey: string
  selectSavedGroup: (value: string) => void
}) {
  const storageKey = `${LOCAL_STORAGE_PREFIX}-schedule:group.v1:${sourceKey}`
  const [savedGroup, setSavedGroup] = useState('')

  useEffect(() => {
    setSavedGroup('')

    try {
      const saved = localStorage.getItem(storageKey) ?? ''
      if (!groups.includes(saved)) return

      setSavedGroup(saved)
      const params = new URLSearchParams(window.location.search)
      if (!params.has('selected') && !params.has('mode')) selectSavedGroup(saved)
    } catch {}
  }, [groups, storageKey])

  const toggleSavedGroup = () => {
    if (!selected) return

    try {
      if (savedGroup === selected) {
        localStorage.removeItem(storageKey)
        setSavedGroup('')
      } else {
        localStorage.setItem(storageKey, selected)
        setSavedGroup(selected)
      }
    } catch {}
  }

  return { savedGroup, toggleSavedGroup }
}
