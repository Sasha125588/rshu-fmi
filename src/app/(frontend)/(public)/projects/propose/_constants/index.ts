import { CONTACT_LIMITS } from '@/shared/projects/constants'

export const PROPOSAL_LIMITS = {
  ...CONTACT_LIMITS,
  title: 120,
  description: 4_000,
  lookingFor: 1_000,
} as const

export const INITIAL_VALUES = {
  title: '',
  description: '',
  lookingFor: '',
  name: '',
  group: '',
  course: '',
  contact: '',
  showInitiatorName: false,
}

export type ProposalFormState = {
  values: typeof INITIAL_VALUES
  errors:
    | (Partial<Record<keyof typeof PROPOSAL_LIMITS, { message: string }[]>> & { form?: string })
    | null
  success: boolean
}

export const INITIAL_PROPOSAL_STATE: ProposalFormState = {
  values: INITIAL_VALUES,
  errors: null,
  success: false,
}
