import { getRelationId } from '@/payload/helpers'

import type { TuitionCatalog, TuitionCell } from '../_types'
import type { EducationalProgram, TuitionRate } from '@/payload-types'
import type { StudyForm } from '@/payload/collections/EducationalPrograms/constants'

const STUDY_FORMS = ['full-time', 'part-time'] as const satisfies StudyForm[]

const getRecordKey = (programId: number, studyForm: StudyForm) => `${programId}:${studyForm}`

const buildCell = (
  program: EducationalProgram,
  studyForm: StudyForm,
  rate: TuitionRate | undefined
) => {
  const configuredForm = program.studyForms?.find((item) => item.form === studyForm)

  if (!configuredForm || !rate) return { programForm: null, rate: null }

  return {
    programForm: {
      durationLabel: configuredForm.durationLabel,
    },
    rate: {
      amountPerYear: rate.amountPerYear || null,
      availability: rate.availability,
      note: rate.note || null,
      totalAmount: rate.totalAmount || null,
    },
  }
}

interface BuildTuitionCatalogArgs {
  educationalPrograms: EducationalProgram[]
  tuitionRates: TuitionRate[]
}

export const buildTuitionCatalog = ({
  educationalPrograms,
  tuitionRates,
}: BuildTuitionCatalogArgs) => {
  const ratesByProgramAndForm = new Map<string, TuitionRate>(
    tuitionRates
      .filter((rate) => !!getRelationId(rate.educationalProgram))
      .map((rate) => {
        return [getRecordKey(+getRelationId(rate.educationalProgram)!, rate.studyForm), rate]
      })
  )

  const catalog: TuitionCatalog = {
    bachelor: [],
    master: [],
  }
  const programSortKeys = new Map<
    number,
    { programOrder: number; specialtyOrder: number; title: string }
  >()

  educationalPrograms.forEach((program) => {
    const specialty = typeof program.specialty === 'object' ? program.specialty : null

    if (!specialty) return

    const cells = STUDY_FORMS.reduce(
      (acc, studyForm) => {
        const key = getRecordKey(program.id, studyForm)

        acc[studyForm] = buildCell(program, studyForm, ratesByProgramAndForm.get(key))
        return acc
      },
      {} as Record<StudyForm, TuitionCell>
    )

    catalog[program.educationLevel].push({
      cells,
      code: specialty.code,
      id: program.id,
      title: program.title,
    })
    programSortKeys.set(program.id, {
      programOrder: program.sortOrder ?? 0,
      specialtyOrder: specialty.sortOrder ?? 0,
      title: program.title,
    })
  })

  for (const level of ['bachelor', 'master'] as const) {
    catalog[level].sort((first, second) => {
      const firstKey = programSortKeys.get(first.id)!
      const secondKey = programSortKeys.get(second.id)!

      return (
        firstKey.specialtyOrder - secondKey.specialtyOrder ||
        firstKey.programOrder - secondKey.programOrder ||
        firstKey.title.localeCompare(secondKey.title, 'uk')
      )
    })
  }

  return catalog
}
