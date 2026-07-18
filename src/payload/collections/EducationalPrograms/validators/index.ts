import { validations } from 'payload'

import type { StudyForm } from '../constants'
import type { ArrayFieldValidation } from 'payload'

interface StudyFormRow {
  form?: StudyForm
}

export const validateStudyForms: ArrayFieldValidation = async (value, options) => {
  const defaultValidationResult = await validations.array(value, options)
  if (defaultValidationResult !== true || !value) return defaultValidationResult

  const forms = (value as StudyFormRow[]).map((item) => item.form).filter((form) => !!form)

  return new Set(forms).size === forms.length || 'Кожну форму навчання можна додати лише один раз.'
}
