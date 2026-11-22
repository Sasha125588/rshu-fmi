import { instant } from '@next/playwright'
import { expect, test } from '@playwright/test'
import { randomUUID } from 'node:crypto'

import { auth, getProjectBoardAdminToken, json } from './fixtures/project-board'

const suffix = randomUUID().slice(0, 8)
const title = `Проєкт для instant-тестів ${suffix}`
const description = `Повний опис для instant-тестів ${suffix}.`
const path = `/projects/instant-test-${suffix}`

test.describe('Миттєва навігація дошки проєктів', () => {
  test.skip(
    process.env.PROJECT_BOARD_E2E !== '1' || process.env.NEXT_INSTANT_TESTS !== '1',
    'Потрібна окрема тестова БД і збірка з PROJECT_BOARD_E2E=1 та NEXT_INSTANT_TESTS=1'
  )

  test.beforeAll(async ({ request, baseURL }) => {
    const token = await getProjectBoardAdminToken(request, baseURL)
    await json(
      await request.post('/api/projects', {
        headers: auth(token),
        data: {
          title,
          slug: `instant-test-${suffix}`,
          summary: 'Короткий опис для каталогу.',
          description,
          category: 'research',
          recruiting: true,
          deadline: '2099-12-01',
          roles: [{ title: 'Автор задач', spots: 2 }],
          _status: 'published',
        },
      })
    )
  })

  test('shows the filtered catalog without request-time rendering', async ({ page, baseURL }) => {
    await instant(
      page,
      async () => {
        await page.goto(`/projects?q=${suffix}&open=true`)
        await expect(page.getByRole('link', { name: title, exact: true })).toBeVisible()
        await expect(page.getByRole('checkbox', { name: 'Лише відкритий набір' })).toBeChecked()
      },
      { baseURL }
    )
  })

  test('serves the project loading shell on a direct visit', async ({ page, baseURL }) => {
    const apply = page.getByRole('button', { name: 'Долучитися', exact: true })

    await instant(
      page,
      async () => {
        await page.goto(path)
        await expect(page.getByLabel('Завантаження проєкту', { exact: true })).toBeVisible()
        await expect(apply).toHaveCount(0)
      },
      { baseURL }
    )

    await expect(page.getByRole('heading', { name: title, level: 1 })).toBeVisible()
    await expect(apply).toBeVisible()
  })

  test('prefetches project content on card intent and streams recruitment after navigation', async ({
    page,
  }) => {
    await page.goto(`/projects?q=${suffix}`)
    const card = page.getByRole('link', { name: title, exact: true })
    await expect(card).toBeVisible()

    const heading = page.getByRole('heading', { name: title, level: 1 })
    const apply = page.getByRole('button', { name: 'Долучитися', exact: true })
    const roles = page.getByRole('heading', { name: 'Відкриті ролі', exact: true })
    const status = page
      .locator('header')
      .filter({ has: heading })
      .getByText('Набір відкрито', { exact: true })

    await instant(page, async () => {
      await card.hover()
      await card.click()
      await page.waitForURL((url) => url.pathname === path && !url.search)
      await expect(heading).toBeVisible()
      await expect(page.getByText(description, { exact: true })).toBeVisible()
      await expect(roles).toBeVisible()
      await expect(apply).toHaveCount(0)
      await expect(status).toHaveCount(0)
    })

    await expect(apply).toBeVisible()
    await expect(status).toBeVisible()
  })
})
