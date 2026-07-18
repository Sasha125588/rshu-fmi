import type { EducationLevel, StudyForm } from '@/payload/collections/EducationalPrograms/constants'
import type { TuitionAvailability } from '@/payload/collections/TuitionRates/types'

export interface TuitionRateView {
  amountPerYear: number | null
  availability: TuitionAvailability
  note: string | null
  totalAmount: number | null
}

export interface ProgramFormView {
  durationLabel: string
}

export type TuitionCell = {
  programForm: ProgramFormView | null
  rate: TuitionRateView | null
}

export interface TuitionProgramRow {
  cells: Record<StudyForm, TuitionCell>
  code: string
  id: number
  title: string
}

export type TuitionCatalog = Record<EducationLevel, TuitionProgramRow[]>
