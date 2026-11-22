import { describe, expect, test } from 'bun:test'
import { z } from 'zod'

import { parseProjectProposal } from '.'
import { PROPOSAL_LIMITS } from '../_constants'

function form(fields: Record<string, FormDataEntryValue>) {
  const data = new FormData()
  for (const [name, value] of Object.entries(fields)) data.append(name, value)
  return data
}

const proposal = {
  name: '  Олена Петренко ',
  group: ' ІПЗ-21 ',
  course: '2',
  contact: ' Student@EXAMPLE.EDU.UA ',
  title: '  Ідея для факультету ',
  description: '  Опис ідеї. ',
}

describe('project proposal form', () => {
  test('separates form values from normalized data and ignores unexpected input', () => {
    expect(
      parseProjectProposal(
        form({
          ...proposal,
          lookingFor: '  Дизайнерів  ',
          showInitiatorName: 'on',
          category: 'admin-only',
          status: 'reviewed',
          $ACTION_REF_1: 'metadata',
        })
      )
    ).toEqual({
      values: { ...proposal, lookingFor: '  Дизайнерів  ', showInitiatorName: true },
      result: {
        success: true,
        data: {
          name: 'Олена Петренко',
          group: 'ІПЗ-21',
          course: '2',
          contact: 'Student@EXAMPLE.EDU.UA',
          title: 'Ідея для факультету',
          description: 'Опис ідеї.',
          lookingFor: 'Дизайнерів',
          showInitiatorName: true,
        },
      },
    })
  })

  test('defaults to private and trims blank optional text', () => {
    const parsed = parseProjectProposal(form({ ...proposal, lookingFor: '  ' }))
    expect(parsed).toMatchObject({
      values: { lookingFor: '  ', showInitiatorName: false },
      result: { success: true, data: { showInitiatorName: false, lookingFor: '' } },
    })
  })

  test('does not publish the name for a checkbox value other than on', () => {
    expect(parseProjectProposal(form({ ...proposal, showInitiatorName: 'true' }))).toMatchObject({
      values: { showInitiatorName: false },
      result: { success: true, data: { showInitiatorName: false } },
    })
  })

  test('rejects an overlong title and an invalid contact', () => {
    const data = form({
      ...proposal,
      title: 'x'.repeat(PROPOSAL_LIMITS.title + 1),
      contact: 'invalid email',
    })
    const { values, result } = parseProjectProposal(data)
    expect(values).toEqual({
      ...proposal,
      title: 'x'.repeat(PROPOSAL_LIMITS.title),
      contact: 'invalid email',
      lookingFor: '',
      showInitiatorName: false,
    })
    if (result.success) throw new Error('Expected proposal validation to fail')
    expect(z.flattenError(result.error).fieldErrors).toEqual({
      title: [expect.any(String)],
      contact: [expect.any(String)],
    })
  })

  test('returns every error for each field', () => {
    const whitespaceTitle = ' '.repeat(PROPOSAL_LIMITS.title)
    const { values, result } = parseProjectProposal(
      form({ ...proposal, title: `${whitespaceTitle} `, description: ' ' })
    )
    expect(values).toEqual({
      ...proposal,
      title: whitespaceTitle,
      description: ' ',
      lookingFor: '',
      showInitiatorName: false,
    })
    if (result.success) throw new Error('Expected proposal validation to fail')
    expect(z.flattenError(result.error).fieldErrors).toEqual({
      title: [`Введи не більше ${PROPOSAL_LIMITS.title} символів.`, 'Введи назву проєкту.'],
      description: ['Опиши свою ідею.'],
    })
  })
})
