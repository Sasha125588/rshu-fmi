import { describe, expect, test } from 'bun:test'
import { z } from 'zod'

import { parseProjectApplication } from '.'
import { APPLICATION_LIMITS } from '../_constants'

function form(fields: Record<string, FormDataEntryValue>) {
  const data = new FormData()
  for (const [name, value] of Object.entries(fields)) data.append(name, value)
  return data
}

const contact = {
  name: '  Олена Петренко ',
  group: ' ІПЗ-21 ',
  course: '2',
  contact: ' Student@EXAMPLE.EDU.UA ',
}
const normalizedContact = {
  name: 'Олена Петренко',
  group: 'ІПЗ-21',
  course: '2' as const,
  contact: 'Student@EXAMPLE.EDU.UA',
}

describe('project application form', () => {
  test('keeps only the chosen role ID for lookup and ignores unexpected fields', () => {
    expect(
      parseProjectApplication(
        form({
          ...contact,
          roleId: 'role-1',
          message: '  Допоможу з дизайном.\nМожу почати в грудні. ',
          roleTitle: 'Forged role',
          project: '12',
          publisher: '42',
          showInitiatorName: 'on',
        })
      )
    ).toEqual({
      values: {
        ...contact,
        roleId: 'role-1',
        message: '  Допоможу з дизайном.\nМожу почати в грудні. ',
      },
      result: {
        success: true,
        data: {
          ...normalizedContact,
          roleId: 'role-1',
          message: 'Допоможу з дизайном.\nМожу почати в грудні.',
        },
      },
    })
  })

  test('accepts absent or blank optional fields', () => {
    expect(parseProjectApplication(form(contact))).toEqual({
      values: { ...contact, roleId: '', message: '' },
      result: {
        success: true,
        data: { ...normalizedContact, message: '', roleId: undefined },
      },
    })
    expect(parseProjectApplication(form({ ...contact, roleId: '' })).result.success).toBe(true)
  })

  test('rejects optional fields that exceed their length limits', () => {
    const { values, result } = parseProjectApplication(
      form({
        ...contact,
        roleId: 'x'.repeat(APPLICATION_LIMITS.roleId + 1),
        message: 'y'.repeat(APPLICATION_LIMITS.message + 1),
      })
    )
    expect(values).toMatchObject({
      roleId: 'x'.repeat(APPLICATION_LIMITS.roleId),
      message: 'y'.repeat(APPLICATION_LIMITS.message),
    })
    if (result.success) throw new Error('Expected application validation to fail')
    expect(z.flattenError(result.error).fieldErrors).toEqual({
      roleId: [expect.any(String)],
      message: [expect.any(String)],
    })
  })

  test('requires a group and a valid course, and rejects other links', () => {
    const { result } = parseProjectApplication(
      form({ ...contact, group: ' ', course: '7', contact: 'https://example.test/contact' })
    )
    if (result.success) throw new Error('Expected application validation to fail')
    expect(z.flattenError(result.error).fieldErrors).toEqual({
      group: [expect.any(String)],
      course: [expect.any(String)],
      contact: [expect.any(String)],
    })
  })
})
