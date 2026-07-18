import { type EducationLevel, educationLevelLabels } from '../../EducationalPrograms/constants'
import { type DocumentType, documentTypeLabels } from '../constants'

const unique = (values: string[]) => [...new Set(values)]

const getDocumentYear = (value?: null | string) => {
  if (!value) return undefined

  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? undefined : String(date.getUTCFullYear())
}

export interface DocumentTitleProgram {
  educationLevel: EducationLevel
  shortTitle: string
}

interface BuildDocumentTitleArgs {
  documentDate?: string | null
  documentType?: DocumentType
  educationalPrograms: DocumentTitleProgram[]
  periodLabel?: string | null
}

export const buildDocumentTitle = ({
  documentDate,
  documentType,
  educationalPrograms = [],
  periodLabel,
}: BuildDocumentTitleArgs) => {
  const programTitles = unique(educationalPrograms.map((program) => program.shortTitle.trim()))
  const educationLevels = unique(
    educationalPrograms.map((program) => educationLevelLabels[program.educationLevel])
  )
  const period = periodLabel?.trim() || getDocumentYear(documentDate)

  return [
    documentTypeLabels[documentType!],
    programTitles.join(' / '),
    educationLevels.join(' / '),
    period,
  ]
    .filter(Boolean)
    .join(' ')
}
