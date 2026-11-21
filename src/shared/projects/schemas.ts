import { z } from 'zod'

import { CONTACT_LIMITS } from './constants'

const telegram = /^(?:@|(?:https?:\/\/)?t\.me\/)([a-z][a-z0-9_]{3,31})\/?$/i

export const projectContactSchema = z
  .string({ error: 'Введи текстове значення.' })
  .trim()
  .min(1, 'Вкажи контакт.')
  .max(CONTACT_LIMITS.contact, `Введи не більше ${CONTACT_LIMITS.contact} символів.`)
  .refine(
    (value) => z.email().safeParse(value).success || telegram.test(value),
    'Вкажи email або @нікнейм в телеграмі.'
  )
