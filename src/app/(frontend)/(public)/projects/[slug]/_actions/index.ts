'use server'

import 'server-only'
import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { isRecruitmentOpen } from '../../_helpers/recruitment'
import { INITIAL_APPLICATION_STATE } from '../_constants'
import { parseProjectApplication } from '../_schemas'

import type { ApplicationFormState } from '../_constants'

export async function submitProjectApplication(
  projectId: number,
  _prev: ApplicationFormState,
  form: FormData
): Promise<ApplicationFormState> {
  const { values, result } = parseProjectApplication(form)
  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error, ({ message }) => ({ message }))
    return { values, errors: fieldErrors, success: false }
  }

  try {
    const payload = await getPayload({ config })
    const project = await payload.findByID({
      collection: 'projects',
      depth: 0,
      draft: false,
      overrideAccess: true,
      id: projectId,
      select: {
        _status: true,
        deadline: true,
        publisher: true,
        recruiting: true,
        roles: { id: true, title: true },
      },
    })

    if (!isRecruitmentOpen(project, new Date())) {
      return { values, errors: { form: 'closed' }, success: false }
    }

    const { roleId, ...application } = result.data
    const roleTitle = project.roles?.find((role) => role.id === roleId)?.title
    if (roleTitle === undefined) {
      return {
        values,
        errors: {
          roleId: [{ message: 'Ця роль більше недоступна. Обери іншу або подай заявку без ролі.' }],
        },
        success: false,
      }
    }

    await payload.create({
      collection: 'project-applications',
      depth: 0,
      overrideAccess: true,
      data: {
        project: project.id,
        ...(typeof project.publisher === 'number' && { publisher: project.publisher }),
        ...application,
        course: +application.course,
        roleTitle,
        status: 'new',
      },
    })
    return { ...INITIAL_APPLICATION_STATE, success: true }
  } catch {
    return { values, errors: { form: 'unavailable' }, success: false }
  }
}
