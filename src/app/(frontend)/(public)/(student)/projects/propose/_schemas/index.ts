import { z } from 'zod'

import { INITIAL_VALUES, PROPOSAL_LIMITS } from '../_constants'
import { CONTACT_LIMITS, PROJECT_COURSES, projectContactSchema } from '@/shared/projects'

const proposalSchema = z.object({
  name: z
    .string({ error: 'Введи текстове значення.' })
    .max(CONTACT_LIMITS.name, `Введи не більше ${CONTACT_LIMITS.name} символів.`)
    .trim()
    .min(1, 'Введи ім’я.'),
  group: z
    .string({ error: 'Введи текстове значення.' })
    .max(CONTACT_LIMITS.group, `Введи не більше ${CONTACT_LIMITS.group} символів.`)
    .trim()
    .min(1, 'Вкажи групу.'),
  course: z.enum(PROJECT_COURSES, 'Обери курс.'),
  contact: projectContactSchema,
  title: z
    .string({ error: 'Введи текстове значення.' })
    .max(PROPOSAL_LIMITS.title, `Введи не більше ${PROPOSAL_LIMITS.title} символів.`)
    .trim()
    .min(1, 'Введи назву проєкту.'),
  description: z
    .string({ error: 'Введи текстове значення.' })
    .max(PROPOSAL_LIMITS.description, `Введи не більше ${PROPOSAL_LIMITS.description} символів.`)
    .trim()
    .min(1, 'Опиши свою ідею.'),
  lookingFor: z
    .string({ error: 'Введи текстове значення.' })
    .max(PROPOSAL_LIMITS.lookingFor, `Введи не більше ${PROPOSAL_LIMITS.lookingFor} символів.`)
    .trim()
    .optional(),
  showInitiatorName: z.boolean(),
})

export const parseProjectProposal = (form: FormData) => {
  const values = { ...INITIAL_VALUES }
  const input: Partial<Record<keyof typeof values, unknown>> = {}

  for (const field of proposalSchema.keyof().options) {
    const value = String(form.get(field) ?? '')

    if (field === 'showInitiatorName') {
      input[field] = value === 'on'
      values[field] = value === 'on'
    } else {
      input[field] = value
      values[field] = value.slice(0, PROPOSAL_LIMITS[field]).toWellFormed()
    }
  }

  return { values, result: proposalSchema.safeParse(input) }
}
