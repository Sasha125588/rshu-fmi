import type { LucideIcon } from 'lucide-react'

export interface NavCardItem {
  title: string
  description: string
  href: string
  icon: LucideIcon
  external?: boolean
}

export interface NavItem {
  label: string
  href: string
  featured?: NavCardItem
  cards?: NavCardItem[]
}
