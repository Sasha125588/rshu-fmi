import { revalidatePath } from 'next/cache'

import { studyFormLabels } from '../../EducationalPrograms/constants'
import { getRelationId } from '@/payload/helpers'

import type { AdmissionCampaign } from '@/payload-types'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
} from 'payload'

const SPECIALIZATIONS_PAGE_PATH = '/specializations'

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
    depth: 0,
    id: programId,
    overrideAccess: true,
    req,
    select: {
      shortTitle: true,
    },
  })

  data.adminTitle = `${campaignYear} · ${program.shortTitle} · ${studyFormLabels[studyForm]}`

  return data
}

export const revalidateAdmissionCampaignConsumers: CollectionAfterChangeHook<AdmissionCampaign> = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    payload.logger.info(`Revalidating admission campaign consumer at ${SPECIALIZATIONS_PAGE_PATH}`)
    revalidatePath(SPECIALIZATIONS_PAGE_PATH)
  }

  return doc
}

export const revalidateAdmissionCampaignConsumersAfterDelete: CollectionAfterDeleteHook<
  AdmissionCampaign
> = ({ doc, req: { context, payload } }) => {
  if (context.disableRevalidate || doc?._status !== 'published') return doc

  payload.logger.info(`Revalidating admission campaign consumer at ${SPECIALIZATIONS_PAGE_PATH}`)
  revalidatePath(SPECIALIZATIONS_PAGE_PATH)

  return doc
}
