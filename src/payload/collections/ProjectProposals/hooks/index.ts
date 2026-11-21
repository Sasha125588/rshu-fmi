import { slugifyValue } from '@/payload/helpers'

import type { CollectionBeforeChangeHook } from 'payload'

export const convertProposalToDraft: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (data.createDraft !== true || operation !== 'update' || !originalDoc || originalDoc.project)
    return data

  const { id, title, description, name, showInitiatorName } = originalDoc
  const summary = description.trim().replace(/\s+/g, ' ')

  const project = await req.payload.create({
    collection: 'projects',
    data: {
      title,
      slug: slugifyValue(title),
      summary: summary.length > 280 ? `${summary.slice(0, 279).trimEnd()}…` : summary,
      description,
      category: 'other',
      recruiting: false,
      sourceProposal: id,
      ...(showInitiatorName === true ? { initiatorName: name } : {}),
    },
    depth: 0,
    draft: true,
    overrideAccess: true,
    req,
  })

  data.project = project.id
  data.status = 'reviewed'

  return data
}
