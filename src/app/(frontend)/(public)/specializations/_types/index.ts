import {
  ADMISSION_CAMPAIGN_SELECT,
  EDUCATIONAL_PROGRAM_SELECT,
  SPECIALIZATIONS_PAGE_SETTINGS_SELECT,
  TUITION_RATE_SELECT,
} from '../_constants'

import type { TuitionRate } from '@/payload-types'
import type { EducationLevel, StudyForm } from '@/payload/collections/EducationalPrograms/constants'
import type { TransformCollectionWithSelect, TransformGlobalWithSelect } from 'payload'

export interface CatalogStudyForm {
  admission: {
    averageBudgetScore?: number | null
    averageContractScore?: number | null
    licensedCapacity?: number | null
    maxStateOrder?: number | null
    statisticsUrl?: string | null
    statisticsYear?: number | null
  }
  durationLabel: string
  form: StudyForm
  tuition?: {
    availability: TuitionRate['availability']
    amountPerYear?: number | null
  }
}

export interface CatalogProgram {
  educationLevel: EducationLevel
  forms: CatalogStudyForm[]
  slug: string
}

export interface CatalogSpecialty {
  code: string
  description: string
  legacyCode: string
  programs: CatalogProgram[]
  tags: string[]
  title: string
}

export type CatalogEducationalProgramSource = TransformCollectionWithSelect<
  'educational-programs',
  typeof EDUCATIONAL_PROGRAM_SELECT
>

export type CatalogAdmissionCampaignSource = TransformCollectionWithSelect<
  'admission-campaigns',
  typeof ADMISSION_CAMPAIGN_SELECT
>

export type CatalogTuitionRateSource = TransformCollectionWithSelect<
  'tuition-rates',
  typeof TUITION_RATE_SELECT
>

export type SpecializationsPageSettingsSource = TransformGlobalWithSelect<
  'specializations-page-settings',
  typeof SPECIALIZATIONS_PAGE_SETTINGS_SELECT
>
