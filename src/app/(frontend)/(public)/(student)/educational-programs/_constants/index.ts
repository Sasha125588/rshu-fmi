import type {
  AdmissionCampaignsSelect,
  EducationalProgramsPageSettingsSelect,
  EducationalProgramsSelect,
  MediaSelect,
  SpecialtiesSelect,
  TuitionPageSettingsSelect,
  TuitionRatesSelect,
} from '@/payload-types'

export const EDUCATIONAL_PROGRAMS_PAGE_SETTINGS_SELECT = {
  activeAdmissionCampaignYear: true,
  applicantResources: {
    description: true,
    destinationType: true,
    file: true,
    href: true,
    id: true,
    title: true,
  },
  groups: {
    anchor: true,
    description: true,
    interestLabel: true,
    specialties: true,
    title: true,
  },
} as const satisfies EducationalProgramsPageSettingsSelect

export const APPLICANT_RESOURCE_MEDIA_SELECT = {
  filename: true,
  prefix: true,
  url: true,
} as const satisfies MediaSelect

export const TUITION_PAGE_SETTINGS_SELECT = {
  activeAcademicYear: true,
} as const satisfies TuitionPageSettingsSelect

export const CATALOG_EDUCATIONAL_PROGRAM_POPULATE = {
  educationLevel: true,
  slug: true,
  sortOrder: true,
  studyForms: {
    durationLabel: true,
    form: true,
  },
  title: true,
} as const satisfies EducationalProgramsSelect

export const SPECIALTY_SELECT = {
  abbreviation: true,
  code: true,
  description: true,
  educationalPrograms: true,
  legacyCode: true,
  sortOrder: true,
  tags: {
    label: true,
  },
  title: true,
} as const satisfies SpecialtiesSelect

export const ADMISSION_CAMPAIGN_SELECT = {
  averageBudgetScore: true,
  averageContractScore: true,
  educationalProgram: true,
  licensedCapacity: true,
  maxStateOrder: true,
  statisticsUrl: true,
  statisticsYear: true,
  studyForm: true,
} as const satisfies AdmissionCampaignsSelect

export const TUITION_RATE_SELECT = {
  amountPerYear: true,
  availability: true,
  educationalProgram: true,
  studyForm: true,
} as const satisfies TuitionRatesSelect
