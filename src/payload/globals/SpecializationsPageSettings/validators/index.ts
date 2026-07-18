import { validations } from 'payload'

import type { TextFieldSingleValidation, UploadFieldSingleValidation } from 'payload'

interface ApplicantResourceSiblingData {
  destinationType?: 'file' | 'link'
}

const isInternalHref = (value: string) => value.startsWith('/') && !value.startsWith('//')

const isHttpHref = (value: string) => {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol)
  } catch {
    return false
  }
}

export const validateApplicantResourceHref: TextFieldSingleValidation = async (value, options) => {
  const defaultValidationResult = await validations.text(value, options)
  if (defaultValidationResult !== true) return defaultValidationResult

  const { destinationType } = options.siblingData as ApplicantResourceSiblingData
  if (destinationType !== 'link') return true

  const href = value?.trim()
  if (!href) return 'Вкажіть внутрішнє або зовнішнє посилання.'

  return (
    isInternalHref(href) ||
    isHttpHref(href) ||
    'Використовуйте внутрішній шлях з / або повне посилання з http:// чи https://.'
  )
}

export const validateApplicantResourceFile: UploadFieldSingleValidation = async (
  value,
  options
) => {
  const defaultValidationResult = await validations.upload(value, options)
  if (defaultValidationResult !== true) return defaultValidationResult

  const { destinationType } = options.siblingData as ApplicantResourceSiblingData

  return destinationType !== 'file' || value ? true : 'Завантажте PDF-файл.'
}
