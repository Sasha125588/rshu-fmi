import type { EducationalProgram } from '@/payload-types'
import type { CollectionBeforeValidateHook, FieldHook } from 'payload'

type ProgramIdentityData = Partial<
  Pick<
    EducationalProgram,
    | 'adminTitle'
    | 'educationLevel'
    | 'legacySpecialtyCode'
    | 'shortTitle'
    | 'specialtyCode'
    | 'title'
  >
>

type EducationLevel = EducationalProgram['educationLevel']

const educationLevelLabels = {
  bachelor: 'Бакалавр',
  master: 'Магістр',
} satisfies Record<EducationLevel, string>

const buildProgramAdminTitle = (data: ProgramIdentityData) => {
  const title = data.title || data.shortTitle
  const educationLevel = educationLevelLabels[data.educationLevel!]
  const codes = [data.specialtyCode, data.legacySpecialtyCode].filter(Boolean).join(' / ')

  return [title, `— ${educationLevel}`, `(${codes})`].filter(Boolean).join(' ')
}

export const setProgramAdminTitle: CollectionBeforeValidateHook<EducationalProgram> = ({
  data,
}) => {
  if (!data) return data

  data.adminTitle = buildProgramAdminTitle(data)
}

export const getProgramAdminTitle: FieldHook<
  EducationalProgram,
  EducationalProgram['adminTitle'],
  EducationalProgram
> = ({ siblingData, value }) => {
  if (value && value.trim()) return value

  return buildProgramAdminTitle(siblingData)
}
