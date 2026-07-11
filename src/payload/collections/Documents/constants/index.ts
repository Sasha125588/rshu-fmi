export const DOCUMENT_TYPE_OPTIONS = [
  { label: 'Положення', value: 'regulation' },
  { label: 'Наказ', value: 'order' },
  { label: 'Освітня програма', value: 'educational-program' },
  { label: 'Попередня редакція ОП', value: 'previous-educational-program' },
  { label: 'Силабус', value: 'syllabus' },
  { label: 'Робоча програма', value: 'work-program' },
  { label: 'Навчальний план', value: 'curriculum' },
  { label: 'Акредитаційні матеріали', value: 'accreditation' },
  { label: 'Рецензія / відгук', value: 'review' },
  { label: 'Інше', value: 'other' },
] as const

export type DocumentType = (typeof DOCUMENT_TYPE_OPTIONS)[number]['value']
export type EducationLevel = 'bachelor' | 'master'

export const documentTypeLabels = Object.fromEntries(
  DOCUMENT_TYPE_OPTIONS.map((option) => [option.value, option.label])
) as Record<DocumentType, string>

export const educationLevelLabels: Record<EducationLevel, string> = {
  bachelor: 'Бакалавр',
  master: 'Магістр',
}
