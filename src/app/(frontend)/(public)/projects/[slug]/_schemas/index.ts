import { z } from 'zod'

import { APPLICATION_LIMITS, INITIAL_VALUES } from '../_constants'
import { CONTACT_LIMITS, PROJECT_COURSES, projectContactSchema } from '@/shared/projects'

const applicationSchema = z.object({
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
  message: z
    .string({ error: 'Введи текстове значення.' })
    .max(APPLICATION_LIMITS.message, `Введи не більше ${APPLICATION_LIMITS.message} символів.`)
    .trim(),
  roleId: z
    .string({ error: 'Введи текстове значення.' })
    .max(APPLICATION_LIMITS.roleId, `Введи не більше ${APPLICATION_LIMITS.roleId} символів.`)
    .trim()
    .transform((value) => value || undefined),
})

export const parseProjectApplication = (form: FormData) => {
  const values = { ...INITIAL_VALUES }
  const input: Partial<Record<keyof typeof values, unknown>> = {}

  for (const field of applicationSchema.keyof().options) {
    const value = String(form.get(field) ?? '')

    input[field] = value
    values[field] = value.slice(0, APPLICATION_LIMITS[field]).toWellFormed()
  }

  return { values, result: applicationSchema.safeParse(input) }
}
