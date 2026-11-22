'use server'

import 'server-only'
import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { INITIAL_PROPOSAL_STATE } from '../_constants'
import { parseProjectProposal } from '../_schemas'

import type { ProposalFormState } from '../_constants'

export const submitProjectProposal = async (
  _prev: ProposalFormState,
  form: FormData
): Promise<ProposalFormState> => {
  const { values, result } = parseProjectProposal(form)
  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error, ({ message }) => ({ message }))
    return { values, errors: fieldErrors, success: false }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'project-proposals',
      data: { ...result.data, course: +result.data.course, status: 'new' },
      depth: 0,
      overrideAccess: true,
    })

    return { ...INITIAL_PROPOSAL_STATE, success: true }
  } catch {
    return {
      values,
      errors: { form: 'Невідома помилка. Спробуй надіслати форму пізніше.' },
      success: false,
    }
  }
}
