'use client'

import { SelectInput, useField, useFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

import type { EducationalProgram } from '@/payload-types'
import type { StudyForm } from '@/payload/collections/EducationalPrograms/constants'
import type { OptionObject, SelectFieldClientComponent } from 'payload'

interface LoadedStudyForms {
  educationalProgramId: EducationalProgram['id']
  forms: StudyForm[]
}

export const StudyFormSelect: SelectFieldClientComponent = (props) => {
  const { value, setValue } = useField<StudyForm>({ path: props.path })
  const educationalProgramId = useFormFields(([fields]) => fields.educationalProgram?.value) as
    | EducationalProgram['id']
    | undefined

  const [loadedStudyForms, setLoadedStudyForms] = useState<LoadedStudyForms | null>(null)
  const allowedForms =
    loadedStudyForms && loadedStudyForms.educationalProgramId === educationalProgramId
      ? loadedStudyForms.forms
      : null

  useEffect(() => {
    if (!educationalProgramId) {
      setLoadedStudyForms(null)
      return
    }

    const loadStudyForms = async () => {
      try {
        const response = await fetch(
          `/api/educational-programs/${educationalProgramId}?depth=0&select[studyForms]=true`
        )

        if (!response.ok) {
          throw new Error(`Failed to load educational program ${educationalProgramId}`)
        }

        const { studyForms } = (await response.json()) as Pick<EducationalProgram, 'studyForms'>
        const forms = studyForms.map(({ form }) => form)
        setLoadedStudyForms({ educationalProgramId, forms })
      } catch (error) {
        console.error('Failed to load educational programs for the document title', error)
        setLoadedStudyForms({ educationalProgramId, forms: [] })
      }
    }

    loadStudyForms()
  }, [educationalProgramId])

  useEffect(() => {
    if (allowedForms && value && !allowedForms.includes(value)) setValue(null)
  }, [allowedForms, value])

  const filteredOptions = (props.field.options as OptionObject[]).filter((option) => {
    if (!allowedForms) return true
    return allowedForms.includes(option.value as StudyForm)
  })

  return (
    <SelectInput
      path={props.path}
      name={props.field.name}
      label={props.field.label ? props.field.label : props.field.name}
      value={value}
      onChange={(option) => setValue((option as OptionObject).value)}
      options={filteredOptions}
      required={props.field.required}
    />
  )
}
