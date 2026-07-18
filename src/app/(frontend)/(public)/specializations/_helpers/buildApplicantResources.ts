import type { SpecializationsPageSettingsSource } from '../_types'
import type { Media } from '@/payload-types'

const YEAR_PLACEHOLDER = '{year}'

type ApplicantResourceSource = SpecializationsPageSettingsSource['applicantResources'][number]

export const buildApplicantResources = (
  resources: ApplicantResourceSource[],
  activeAdmissionCampaignYear: number
) =>
  resources.flatMap((resource, index) => {
    const href =
      resource.destinationType === 'file'
        ? (resource.file as Media).url?.trim()
        : resource.href?.trim()

    if (!href) return []

    return [
      {
        key: resource.id ?? `${index}:${href}`,
        title: resource.title.replaceAll(YEAR_PLACEHOLDER, String(activeAdmissionCampaignYear)),
        description: resource.description,
        href,
        opensInNewTab: resource.destinationType === 'file' || href.startsWith('http'),
      },
    ]
  })
