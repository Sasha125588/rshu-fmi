import { validations } from 'payload'

import type { TextFieldSingleValidation } from 'payload'

export const validateUrl: TextFieldSingleValidation = async (value, options) => {
  const defaultValidationResult = await validations.text(value, options)
  if (defaultValidationResult !== true || !value) return defaultValidationResult

  try {
    const url = new URL(value)

    return (
      ['http:', 'https:'].includes(url.protocol) ||
      'Використовуйте посилання з http:// або https://.'
    )
  } catch {
    return 'Вкажіть коректне посилання.'
  }
}
