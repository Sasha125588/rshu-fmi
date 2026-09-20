export const CMS_CACHE_LIFE = {
  stale: 300,
  revalidate: 3600,
  expire: 86400,
} as const

export const CONTENT_CACHE_TAGS = {
  academicCouncil: 'content:academic-council',
  admissionCampaigns: 'content:admission-campaigns',
  departments: 'content:departments',
  documentCategories: 'content:document-categories',
  documents: 'content:documents',
  educationalProgramSettings: 'content:educational-program-settings',
  educationalPrograms: 'content:educational-programs',
  facultyNews: 'content:faculty-news',
  media: 'content:media',
  redirects: 'content:redirects',
  specialties: 'content:specialties',
  tuitionRates: 'content:tuition-rates',
  tuitionSettings: 'content:tuition-settings',
} as const
