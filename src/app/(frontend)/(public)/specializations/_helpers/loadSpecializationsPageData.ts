import 'server-only'
import config from '@payload-config'
import { getPayload } from 'payload'

import {
  ADMISSION_CAMPAIGN_SELECT,
  APPLICANT_RESOURCE_MEDIA_SELECT,
  EDUCATIONAL_PROGRAM_SELECT,
  SPECIALIZATIONS_PAGE_SETTINGS_SELECT,
  TUITION_PAGE_SETTINGS_SELECT,
  TUITION_RATE_SELECT,
} from '../_constants'

export const loadSpecializationsPageData = async () => {
  const payload = await getPayload({ config })

  const specializationsSettingsPromise = payload.findGlobal({
    slug: 'specializations-page-settings',
    depth: 1,
    overrideAccess: false,
    populate: {
      media: APPLICANT_RESOURCE_MEDIA_SELECT,
    },
    select: SPECIALIZATIONS_PAGE_SETTINGS_SELECT,
  })
  const tuitionSettingsPromise = payload.findGlobal({
    slug: 'tuition-page-settings',
    depth: 0,
    overrideAccess: false,
    select: TUITION_PAGE_SETTINGS_SELECT,
  })
  const educationalProgramsPromise = payload.find({
    collection: 'educational-programs',
    depth: 0,
    overrideAccess: false,
    pagination: false,
    select: EDUCATIONAL_PROGRAM_SELECT,
  })

  const [specializationsSettings, tuitionSettings] = await Promise.all([
    specializationsSettingsPromise,
    tuitionSettingsPromise,
  ])

  const [educationalPrograms, admissionCampaigns, tuitionRates] = await Promise.all([
    educationalProgramsPromise,
    payload.find({
      collection: 'admission-campaigns',
      depth: 0,
      overrideAccess: false,
      pagination: false,
      select: ADMISSION_CAMPAIGN_SELECT,
      where: {
        campaignYear: {
          equals: specializationsSettings.activeAdmissionCampaignYear,
        },
      },
    }),
    payload.find({
      collection: 'tuition-rates',
      depth: 0,
      overrideAccess: false,
      pagination: false,
      select: TUITION_RATE_SELECT,
      where: {
        academicYear: {
          equals: tuitionSettings.activeAcademicYear,
        },
      },
    }),
  ])

  return {
    activeAdmissionCampaignYear: specializationsSettings.activeAdmissionCampaignYear,
    admissionCampaigns: admissionCampaigns.docs,
    applicantResources: specializationsSettings.applicantResources,
    educationalPrograms: educationalPrograms.docs,
    groups: specializationsSettings.groups,
    tuitionRates: tuitionRates.docs,
  }
}
