import { getRelationId } from '@/payload/helpers'

import type {
  CatalogAdmissionCampaignSource,
  CatalogSpecialtySource,
  CatalogTuitionRateSource,
  EducationalProgramsPageSettingsSource,
} from '../_types'

const buildKey = (programId: number, studyForm: string) => `${programId}:${studyForm}`

interface BuildCatalogGroupsArgs {
  admissionCampaigns: CatalogAdmissionCampaignSource[]
  groups: EducationalProgramsPageSettingsSource['groups']
  specialties: CatalogSpecialtySource[]
  tuitionRates: CatalogTuitionRateSource[]
}

export const buildCatalogGroups = ({
  admissionCampaigns,
  groups,
  specialties,
  tuitionRates,
}: BuildCatalogGroupsArgs) => {
  const admissionByKey = new Map(
    admissionCampaigns.flatMap((campaign) => {
      const programId = getRelationId(campaign.educationalProgram)
      return programId ? [[buildKey(+programId, campaign.studyForm), campaign]] : []
    })
  )

  const tuitionByKey = new Map(
    tuitionRates.flatMap((rate) => {
      const programId = getRelationId(rate.educationalProgram)
      return programId ? [[buildKey(+programId, rate.studyForm), rate]] : []
    })
  )

  const specialtyById = new Map(
    specialties.map((specialty) => [
      specialty.id,
      {
        ...specialty,
        educationalPrograms: {
          ...specialty.educationalPrograms,
          docs: (specialty.educationalPrograms?.docs ?? []).flatMap((program) => {
            if (typeof program !== 'object') return []

            return [
              {
                ...program,
                studyForms: program.studyForms.map((studyForm) => ({
                  ...studyForm,
                  admission: admissionByKey.get(buildKey(program.id, studyForm.form)) ?? null,
                  tuition: tuitionByKey.get(buildKey(program.id, studyForm.form)) ?? null,
                })),
              },
            ]
          }),
        },
      },
    ])
  )

  return groups.map((group) => ({
    title: group.title,
    interestLabel: group.interestLabel,
    description: group.description,
    anchor: group.anchor,
    specialties: group.specialties.flatMap((specialtyRelation) => {
      const specialtyId = getRelationId(specialtyRelation)
      const specialty = specialtyId ? specialtyById.get(+specialtyId) : undefined

      return specialty ? [specialty] : []
    }),
  }))
}
