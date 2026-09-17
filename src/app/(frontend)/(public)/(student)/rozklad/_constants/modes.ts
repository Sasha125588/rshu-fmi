import { GraduationCapIcon, MapPinIcon, UsersIcon } from 'lucide-react'

import type { ScheduleMode } from '@/shared/schedule/types'
import type { LucideIcon } from 'lucide-react'

export interface ScheduleModeOption {
  value: ScheduleMode
  label: string
  icon: LucideIcon
  selectionLabel: string
}

export const SCHEDULE_MODES = [
  {
    value: 'group',
    label: 'Група',
    icon: UsersIcon,
    selectionLabel: 'Обрати групу',
  },
  {
    value: 'teacher',
    label: 'Викладач',
    icon: GraduationCapIcon,
    selectionLabel: 'Обрати викладача',
  },
  {
    value: 'room',
    label: 'Аудиторія',
    icon: MapPinIcon,
    selectionLabel: 'Обрати аудиторію',
  },
] as const satisfies readonly ScheduleModeOption[]

export const getScheduleMode = (value: ScheduleMode) =>
  SCHEDULE_MODES.find((mode) => mode.value === value)!
