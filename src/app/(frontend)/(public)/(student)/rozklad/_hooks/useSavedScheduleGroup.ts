import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

import { scheduleSearchParams } from '../_constants'

export function useSavedScheduleGroup({
  groups,
  selected,
  sourceKey,
}: {
  groups: string[]
  selected: string
  sourceKey: string
}) {
  const storageKey = `fmi.schedule.group.v1:${sourceKey}`
  const [, setSelected] = useQueryState('selected', scheduleSearchParams.selected)
  const [savedGroup, setSavedGroup] = useState('')

  useEffect(() => {
    setSavedGroup('')

    try {
      const saved = localStorage.getItem(storageKey) ?? ''
      if (!groups.includes(saved)) return

      setSavedGroup(saved)
      const params = new URLSearchParams(window.location.search)
      if (!params.has('selected') && !params.has('mode')) setSelected(saved, { history: 'replace' })
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
