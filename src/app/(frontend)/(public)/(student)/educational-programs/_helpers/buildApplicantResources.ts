import type { EducationalProgramsPageSettingsSource } from '../_types'
import type { Media } from '@/payload-types'

const YEAR_PLACEHOLDER = '{year}'

type ApplicantResourceSource = EducationalProgramsPageSettingsSource['applicantResources'][number]

export const buildApplicantResources = (
  resources: ApplicantResourceSource[],
  activeAdmissionCampaignYear: number
) =>
  resources.flatMap((resource) => {
    const href =
      resource.destinationType === 'file'
        ? (resource.file as Media).url?.trim()
        : resource.href?.trim()

    if (!href) return []

    return [
      {
        title: resource.title.replaceAll(YEAR_PLACEHOLDER, String(activeAdmissionCampaignYear)),
        description: resource.description,
        href,
        opensInNewTab: resource.destinationType === 'file' || href.startsWith('http'),
      },
    ]
  })
