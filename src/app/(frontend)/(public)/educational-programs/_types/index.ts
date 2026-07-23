import {
  ADMISSION_CAMPAIGN_SELECT,
  CATALOG_EDUCATIONAL_PROGRAM_POPULATE,
  EDUCATIONAL_PROGRAMS_PAGE_SETTINGS_SELECT,
  SPECIALTY_SELECT,
  TUITION_RATE_SELECT,
} from '../_constants'

import type { TransformCollectionWithSelect, TransformGlobalWithSelect } from 'payload'

export type CatalogAdmissionCampaignSource = TransformCollectionWithSelect<
  'admission-campaigns',
  typeof ADMISSION_CAMPAIGN_SELECT
>

export type CatalogEducationalProgramSource = TransformCollectionWithSelect<
  'educational-programs',
  typeof CATALOG_EDUCATIONAL_PROGRAM_POPULATE
>

export type CatalogSpecialtySource = TransformCollectionWithSelect<
  'specialties',
  typeof SPECIALTY_SELECT
>

export type CatalogTuitionRateSource = TransformCollectionWithSelect<
  'tuition-rates',
  typeof TUITION_RATE_SELECT
>

export type EducationalProgramsPageSettingsSource = TransformGlobalWithSelect<
  'educational-programs-page-settings',
  typeof EDUCATIONAL_PROGRAMS_PAGE_SETTINGS_SELECT
>

export type CatalogStudyFormSource = CatalogEducationalProgramSource['studyForms'][number] & {
  admission: CatalogAdmissionCampaignSource | null
  tuition: CatalogTuitionRateSource | null
}

export type CatalogEnrichedEducationalProgramSource = Omit<
  CatalogEducationalProgramSource,
  'studyForms'
> & {
  studyForms: CatalogStudyFormSource[]
}

export type CatalogEnrichedSpecialtySource = Omit<CatalogSpecialtySource, 'educationalPrograms'> & {
  educationalPrograms?: {
    docs?: CatalogEnrichedEducationalProgramSource[]
    hasNextPage?: boolean
    totalDocs?: number
  }
}
