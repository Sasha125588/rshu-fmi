import { CONTACT_LIMITS } from '@/shared/projects/constants'

export const SPOT_FORMS = {
  zero: 'місць',
  one: 'місце',
  two: 'місця',
  few: 'місця',
  many: 'місць',
  other: 'місця',
} as const

export const PROJECT_DETAIL_LAYOUT = {
  header: 'bg-card-new border-b',
  headerContent: 'mx-auto max-w-7xl px-4 pt-8 pb-9 sm:px-6 md:px-12 md:pt-10',
  content: 'mx-auto flex max-w-7xl flex-col gap-12 px-4 py-9 sm:px-6 md:px-12 md:py-11',
  grid: 'grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]',
  sidebar:
    'bg-card-new flex min-w-0 flex-col gap-5 rounded-xl border p-5 lg:col-start-2 lg:row-start-1 lg:p-6',
  mainColumn: 'flex min-w-0 flex-col gap-8 lg:col-start-1 lg:row-start-1',
  title: 'max-w-4xl text-4xl leading-[1.07] font-bold tracking-tight text-balance md:text-6xl',
} as const

export const APPLICATION_LIMITS = {
  ...CONTACT_LIMITS,
  message: 1_200,
  roleId: 128,
} as const

export const INITIAL_VALUES = {
  name: '',
  group: '',
  course: '',
  contact: '',
  message: '',
  roleId: '',
}

export type ApplicationFormState = {
  values: typeof INITIAL_VALUES
  errors:
    | (Partial<Record<keyof typeof INITIAL_VALUES, { message: string }[]>> & {
        form?: 'closed' | 'unavailable'
      })
    | null
  success: boolean
}

export const INITIAL_APPLICATION_STATE: ApplicationFormState = {
  values: INITIAL_VALUES,
  errors: null,
  success: false,
}
