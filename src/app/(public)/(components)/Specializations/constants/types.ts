import type { LucideIcon } from 'lucide-react'

export interface SpecializationItem {
  id: string
  title: string
  shortTitle: string
  description: string
  tags: string[]
  date: string
  icon: LucideIcon
}

interface Line {
  text: string
  color?: string
}

export interface SpecializationVisual {
  label: string
  lines: Line[]
}
