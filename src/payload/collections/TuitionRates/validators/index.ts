import { type NumberFieldSingleValidation, validations } from 'payload'

import type { TuitionAvailability } from '../types'

interface TuitionRateSiblingData {
  availability?: TuitionAvailability
}

export const validateAnnualAmount: NumberFieldSingleValidation = async (value, options) => {
  const defaultValidationResult = await validations.number(value, options)
  if (defaultValidationResult !== true) return defaultValidationResult

  const { availability } = options.siblingData as TuitionRateSiblingData

  if (availability === 'available' && (value === null || value === undefined))
    return 'Для доступного тарифу вкажіть вартість за рік.'

  return true
}
