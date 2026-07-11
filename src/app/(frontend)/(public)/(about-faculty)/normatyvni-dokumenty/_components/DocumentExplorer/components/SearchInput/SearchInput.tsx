import { useEffect, useState } from 'react'

import { GooeyInput } from '@/components/ui'
import { useDebounceEffect } from '@/shared/hooks'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const [localValue, setLocalValue] = useState(value)

  useDebounceEffect(() => onChange(localValue), 250, [localValue])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <GooeyInput
      value={localValue}
      onValueChange={setLocalValue}
      placeholder="Пошук документа"
      collapsedWidth={176}
      expandedWidth={170}
      classNames={{
        root: 'justify-start',
        trigger: 'bg-background ring-border hover:ring-accent-violet/35',
        bubbleSurface: 'bg-background text-accent-violet ring-border',
      }}
    />
  )
}
