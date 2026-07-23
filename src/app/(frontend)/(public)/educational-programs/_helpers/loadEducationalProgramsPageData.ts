import 'server-only'
import config from '@payload-config'
import { getPayload } from 'payload'

import {
  ADMISSION_CAMPAIGN_SELECT,
  APPLICANT_RESOURCE_MEDIA_SELECT,
  CATALOG_EDUCATIONAL_PROGRAM_POPULATE,
  EDUCATIONAL_PROGRAMS_PAGE_SETTINGS_SELECT,
  SPECIALTY_SELECT,
  TUITION_PAGE_SETTINGS_SELECT,
  TUITION_RATE_SELECT,
} from '../_constants'

export const loadEducationalProgramsPageData = async () => {
  const payload = await getPayload({ config })

  const [educationalProgramsSettings, tuitionSettings] = await Promise.all([
    payload.findGlobal({
      slug: 'educational-programs-page-settings',
      depth: 1,
      overrideAccess: false,
      populate: {
        media: APPLICANT_RESOURCE_MEDIA_SELECT,
        specialties: {
          code: true,
        },
      },
      select: EDUCATIONAL_PROGRAMS_PAGE_SETTINGS_SELECT,
    }),
    payload.findGlobal({
      slug: 'tuition-page-settings',
      depth: 0,
      overrideAccess: false,
      select: TUITION_PAGE_SETTINGS_SELECT,
    }),
  ])

  const [specialties, admissionCampaigns, tuitionRates] = await Promise.all([
    payload.find({
      collection: 'specialties',
      depth: 1,
      joins: {
        educationalPrograms: {
          limit: 0,
          sort: 'sortOrder',
        },
      },
      overrideAccess: false,
      pagination: false,
      populate: {
        'educational-programs': CATALOG_EDUCATIONAL_PROGRAM_POPULATE,
      },
      select: SPECIALTY_SELECT,
      sort: ['sortOrder', 'code'],
    }),
    payload.find({
      collection: 'admission-campaigns',
      depth: 0,
      overrideAccess: false,
      pagination: false,
      select: ADMISSION_CAMPAIGN_SELECT,
      sort: 'sortOrder',
      where: {
        campaignYear: {
          equals: educationalProgramsSettings.activeAdmissionCampaignYear,
        },
      },
    }),
    payload.find({
      collection: 'tuition-rates',
      depth: 0,
      overrideAccess: false,
      pagination: false,
      select: TUITION_RATE_SELECT,
      sort: 'sortOrder',
      where: {
        academicYear: {
          equals: tuitionSettings.activeAcademicYear,
        },
      },
    }),
  ])

  return {
    activeAdmissionCampaignYear: educationalProgramsSettings.activeAdmissionCampaignYear,
    admissionCampaigns: admissionCampaigns.docs,
    applicantResources: educationalProgramsSettings.applicantResources,
    groups: educationalProgramsSettings.groups,
    specialties: specialties.docs,
    tuitionRates: tuitionRates.docs,
  }
}
