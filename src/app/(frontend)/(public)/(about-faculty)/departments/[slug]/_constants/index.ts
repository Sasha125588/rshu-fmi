import { BookOpenIcon, Code2Icon, FlaskConicalIcon, NetworkIcon } from 'lucide-react'
import { parseAsString, parseAsStringLiteral } from 'nuqs/server'

import type { StaffRole } from '../_types'

export const RESEARCH_ICONS = [FlaskConicalIcon, Code2Icon, BookOpenIcon, NetworkIcon]

export const STAFF_FORMS = {
  zero: 'співробітників',
  one: 'співробітник',
  two: 'співробітників',
  few: 'співробітники',
  many: 'співробітників',
  other: 'співробітників',
}

export const STAFF_ROLES = {
  professor: { label: 'Професор', group: 'Професори', color: 'bg-accent-violet' },
  associate: { label: 'Доцент', group: 'Доценти', color: 'bg-accent-violet/50' },
  senior: { label: 'Старший викладач', group: 'Старші викладачі', color: 'bg-muted-foreground' },
  lecturer: { label: 'Викладач', group: 'Викладачі', color: 'bg-muted-foreground/60' },
  assistant: { label: 'Лаборант', group: 'Лаборанти', color: 'bg-muted-foreground/45' },
  other: { label: 'Інша посада', group: 'Інші посади', color: 'bg-muted-foreground/25' },
} satisfies Record<StaffRole, { label: string; group: string; color: string }>

export const STAFF_ROLE_KEYS = Object.keys(STAFF_ROLES) as StaffRole[]

export const STAFF_SEARCH_PARAMS = {
  query: parseAsString.withDefault(''),
  role: parseAsStringLiteral(STAFF_ROLE_KEYS).withOptions({ history: 'push' }),
}
