import { getRelationId } from '@/payload/helpers'

import type {
  CatalogAdmissionCampaignSource,
  CatalogEducationalProgramSource,
  CatalogStudyForm,
  CatalogTuitionRateSource,
} from '../_types'
import type { StudyForm } from '@/payload/collections/EducationalPrograms/constants'

const getRecordKey = (programId: number, studyForm: StudyForm) => `${programId}:${studyForm}`

interface BuildSpecializationCatalogArgs {
  admissionCampaigns: CatalogAdmissionCampaignSource[]
  educationalPrograms: CatalogEducationalProgramSource[]
  tuitionRates: CatalogTuitionRateSource[]
}

export const buildSpecializationCatalog = ({
  admissionCampaigns,
  educationalPrograms,
  tuitionRates,
}: BuildSpecializationCatalogArgs) => {
  const admissionByProgramAndForm = new Map(
    admissionCampaigns.flatMap((campaign) => {
      const programId = getRelationId(campaign.educationalProgram)

      return programId ? [[getRecordKey(+programId, campaign.studyForm), campaign]] : []
    })
  )

  const tuitionByProgramAndForm = new Map(
    tuitionRates.flatMap((rate) => {
      const programId = getRelationId(rate.educationalProgram)

      return programId ? [[getRecordKey(+programId, rate.studyForm), rate]] : []
    })
  )
  const programsBySpecialty = new Map<string, CatalogEducationalProgramSource[]>()

  educationalPrograms.forEach((program) => {
    const specialtyPrograms = programsBySpecialty.get(program.specialtyCode) ?? []
    specialtyPrograms.push(program)

    programsBySpecialty.set(program.specialtyCode, specialtyPrograms)
  })

  return Array.from(programsBySpecialty.entries()).flatMap(([code, programs]) => {
    const representative =
      programs.find((program) => program.educationLevel === 'bachelor') ??
      programs.find((program) => program.educationLevel === 'master')

    if (!representative) return []

    const catalogPrograms = programs.map((program) => {
      const forms: CatalogStudyForm[] = (program.studyForms ?? []).map((studyForm) => {
        const key = getRecordKey(program.id, studyForm.form)
        const admission = admissionByProgramAndForm.get(key)
        const tuition = tuitionByProgramAndForm.get(key)

        return {
          form: studyForm.form,
          durationLabel: studyForm.durationLabel,
          tuition: tuition && {
            amountPerYear: tuition.amountPerYear,
            availability: tuition.availability,
          },
          admission: {
            averageBudgetScore: admission?.averageBudgetScore,
            averageContractScore: admission?.averageContractScore,
            licensedCapacity: admission?.licensedCapacity,
            maxStateOrder: admission?.maxStateOrder,
            statisticsUrl: admission?.statisticsUrl,
            statisticsYear: admission?.statisticsYear,
          },
        }
      })

      return {
        educationLevel: program.educationLevel,
        forms,
        slug: program.slug,
      }
    })

    return [
      {
        code,
        legacyCode: representative.legacySpecialtyCode,
        title: representative.specialtyName,
        description: representative.description,
        tags: (representative.tags ?? []).map((tag) => tag.label),
        programs: catalogPrograms,
      },
    ]
  })
}
