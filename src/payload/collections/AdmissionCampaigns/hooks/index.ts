import { revalidatePath } from 'next/cache'

import { studyFormLabels } from '../../EducationalPrograms/constants'
import { getRelationId } from '@/payload/helpers'

import type { AdmissionCampaign } from '@/payload-types'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
  PayloadRequest,
} from 'payload'

export const setCampaignAdminTitle: CollectionBeforeValidateHook<AdmissionCampaign> = async ({
  data,
  originalDoc,
  req,
}) => {
  if (!data) return data

  const programId = getRelationId(data.educationalProgram ?? originalDoc?.educationalProgram)
  const campaignYear = data.campaignYear ?? originalDoc?.campaignYear
  const studyForm = data.studyForm ?? originalDoc?.studyForm

  if (!programId || !campaignYear || !studyForm) {
    data.adminTitle = null

    return data
  }

  const program = await req.payload.findByID({
    collection: 'educational-programs',
    depth: 1,
    id: programId,
    overrideAccess: true,
    req,
    populate: {
      specialties: {
        abbreviation: true,
      },
    },
  })

  const specialty = program && typeof program.specialty === 'object' ? program.specialty : undefined

  if (!specialty) return data

  data.adminTitle = `${campaignYear} · ${specialty.abbreviation} · ${studyFormLabels[studyForm]}`

  return data
}
const ADMISSION_CAMPAIGN_CONSUMER_PATHS = ['/educational-programs']

const getEducationalProgramConsumerPaths = async (
  req: PayloadRequest,
  ...campaigns: AdmissionCampaign[]
) => {
  const paths = new Set(ADMISSION_CAMPAIGN_CONSUMER_PATHS)
  const programIds = campaigns
    .map((campaign) => getRelationId(campaign?.educationalProgram))
    .filter((id) => id !== undefined)

  if (!programIds.length) return paths

  const programs = await req.payload.find({
    collection: 'educational-programs',
    depth: 0,
    overrideAccess: true,
    pagination: false,
    req,
    select: {
      slug: true,
    },
    where: {
      id: {
        in: programIds,
      },
      _status: {
        equals: 'published',
      },
    },
  })

  for (const program of programs.docs) {
    paths.add(`/educational-programs/${program.slug}`)
  }

  return paths
}

export const revalidateAdmissionCampaignConsumers: CollectionAfterChangeHook<
  AdmissionCampaign
> = async ({ doc, previousDoc, req }) => {
  if (req.context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    for (const path of await getEducationalProgramConsumerPaths(req, doc, previousDoc)) {
      req.payload.logger.info(`Revalidating admission campaign consumer at ${path}`)
      revalidatePath(path)
    }
  }

  return doc
}

export const revalidateAdmissionCampaignConsumersAfterDelete: CollectionAfterDeleteHook<
  AdmissionCampaign
> = async ({ doc, req }) => {
  if (req.context.disableRevalidate || doc?._status !== 'published') return doc

  for (const path of await getEducationalProgramConsumerPaths(req, doc)) {
    req.payload.logger.info(`Revalidating admission campaign consumer at ${path}`)
    revalidatePath(path)
  }

  return doc
}
