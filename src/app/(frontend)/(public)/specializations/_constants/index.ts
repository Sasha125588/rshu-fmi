import type {
  AdmissionCampaignsSelect,
  EducationalProgramsSelect,
  MediaSelect,
  SpecializationsPageSettingsSelect,
  TuitionPageSettingsSelect,
  TuitionRatesSelect,
} from '@/payload-types'

export const SPECIALIZATIONS_PAGE_SETTINGS_SELECT = {
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
    specialtyCodes: {
      code: true,
    },
    title: true,
  },
} as const satisfies SpecializationsPageSettingsSelect

export const APPLICANT_RESOURCE_MEDIA_SELECT = {
  filename: true,
  prefix: true,
  url: true,
} as const satisfies MediaSelect

export const TUITION_PAGE_SETTINGS_SELECT = {
  activeAcademicYear: true,
} as const satisfies TuitionPageSettingsSelect

export const EDUCATIONAL_PROGRAM_SELECT = {
  description: true,
  educationLevel: true,
  legacySpecialtyCode: true,
  slug: true,
  specialtyCode: true,
  specialtyName: true,
  studyForms: {
    durationLabel: true,
    form: true,
  },
  tags: {
    label: true,
  },
} as const satisfies EducationalProgramsSelect

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
