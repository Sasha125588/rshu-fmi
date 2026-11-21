import { expect } from '@playwright/test'

import type { APIRequestContext, APIResponse } from '@playwright/test'

const adminEmail = 'board-test-admin@example.test'
export const adminPassword = 'local-board-testing-only-29!'

export const auth = (token: string) => ({ Authorization: `JWT ${token}` })

export const login = (request: APIRequestContext, email: string) =>
  request.post('/api/users/login', { data: { email, password: adminPassword } })

export const json = async (response: APIResponse) => {
  expect(response.ok(), `${response.status()} ${await response.text()}`).toBe(true)
  return response.json()
}

export const getProjectBoardAdminToken = async (
  request: APIRequestContext,
  baseURL: string | undefined
): Promise<string> => {
  if (!baseURL || !['127.0.0.1', 'localhost'].includes(new URL(baseURL).hostname)) {
    throw new Error('Project board fixtures must only run on the local test server.')
  }

  let response = await login(request, adminEmail)
  if (!response.ok()) {
    const registration = await request.post('/api/users/first-register', {
      data: { email: adminEmail, password: adminPassword, name: 'Board test admin' },
    })
    // Another suite may have registered the first user in the meantime.
    response = registration.ok() ? registration : await login(request, adminEmail)
  }

  return (await json(response)).token
}
