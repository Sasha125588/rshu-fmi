'use client'

import { TextField, useConfig, useField, useFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

import { buildDocumentTitle } from '../helpers'

import type { DocumentType } from '../constants'
import type { DocumentTitleProgram } from '../helpers'
import type { TextFieldClientComponent } from 'payload'

interface EducationalProgramResponse {
  educationLevel: DocumentTitleProgram['educationLevel']
  specialty: number | { abbreviation: string }
}

export const DocumentTitleField: TextFieldClientComponent = (props) => {
  const { config } = useConfig()

  const documentType = useFormFields(([fields]) => fields.documentType?.value as DocumentType)
  const documentDate = useFormFields(([fields]) => fields.documentDate?.value as string | undefined)
  const periodLabel = useFormFields(([fields]) => fields.periodLabel?.value as string | undefined)
  const educationalProgramIDs =
    useFormFields(([fields]) => fields.educationalPrograms?.value as number[] | null) ?? []

  const { setValue: setTitle, value: title } = useField<string>({ path: props.path })
  const { setValue: setGeneratedTitleSnapshot, value: generatedTitleSnapshot } = useField<string>({
    path: 'generatedTitleSnapshot',
  })

  const [educationalPrograms, setEducationalPrograms] = useState<DocumentTitleProgram[]>([])

  useEffect(() => {
    if (!educationalProgramIDs.length) {
      setEducationalPrograms([])
      return
    }

    const loadPrograms = async () => {
      try {
        const programs = await Promise.all(
          educationalProgramIDs.map(async (id) => {
            const query = new URLSearchParams({ depth: '1' })
            query.set('populate[specialties][abbreviation]', 'true')
            query.set('select[educationLevel]', 'true')
            query.set('select[specialty]', 'true')
            const response = await fetch(
              `${config.routes.api}/educational-programs/${encodeURIComponent(id)}?${query}`,
              {
                credentials: 'same-origin',
              }
            )

            if (!response.ok) {
              throw new Error(`Failed to load educational program ${id}`)
            }

            const program = (await response.json()) as EducationalProgramResponse

            if (typeof program.specialty !== 'object') {
              throw new TypeError(`Educational program ${id} has no populated specialty`)
            }

            return {
              educationLevel: program.educationLevel,
              specialtyAbbreviation: program.specialty.abbreviation,
            }
          })
        )

        setEducationalPrograms(programs)
      } catch (error) {
        console.error('Failed to load educational programs for the document title', error)
        setEducationalPrograms([])
      }
    }

    loadPrograms()
  }, [config.routes.api, educationalProgramIDs])

  const nextGeneratedTitle = buildDocumentTitle({
    documentType,
    educationalPrograms,
    periodLabel,
    documentDate,
  })

  useEffect(() => {
    const currentTitle = title?.trim() ?? ''
    const currentSnapshot = generatedTitleSnapshot?.trim() ?? ''
    const shouldUpdateTitle =
      !currentTitle || currentTitle === currentSnapshot || currentTitle === nextGeneratedTitle

    if (shouldUpdateTitle) setTitle(nextGeneratedTitle)

    if (generatedTitleSnapshot !== nextGeneratedTitle) setGeneratedTitleSnapshot(nextGeneratedTitle)
  }, [generatedTitleSnapshot, nextGeneratedTitle, title])

  return <TextField {...props} />
}
