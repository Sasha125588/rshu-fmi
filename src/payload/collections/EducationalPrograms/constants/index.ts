import type { EducationalProgram } from '@/payload-types'

export type StudyForm = EducationalProgram['studyForms'][number]['form']

export type EducationLevel = EducationalProgram['educationLevel']

export const studyFormLabels = {
  'full-time': 'Денна',
  'part-time': 'Заочна',
} satisfies Record<StudyForm, string>

export const educationLevelLabels = {
  bachelor: 'Бакалавр',
  master: 'Магістр',
} satisfies Record<EducationLevel, string>
