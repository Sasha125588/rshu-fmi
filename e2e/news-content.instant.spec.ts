import { instant } from '@next/playwright'
import { expect, test } from '@playwright/test'

import type { Locator, Page } from '@playwright/test'

type ContentCase = {
  contentTestId: string
  getDestination: (page: Page) => Promise<{ href: string; trigger: Locator }>
  name: string
  shellTestId: string
}

const readDestination = async (trigger: Locator, context: string) => {
  await expect(trigger).toBeVisible()

  const href = await trigger.getAttribute('href')
  if (!href) throw new Error(`${context} must have an href.`)

  return { href, trigger }
}

const contentCases: ContentCase[] = [
  {
    contentTestId: 'external-news-source-content',
    getDestination: async (page) => {
      await page.goto('/news/faculty')
      return readDestination(page.getByRole('link', { name: 'РДГУ', exact: true }), 'The RSHU link')
    },
    name: 'external news source',
    shellTestId: 'external-news-source-shell',
  },
  {
    contentTestId: 'faculty-news-article-content',
    getDestination: async (page) => {
      await page.goto('/news/faculty')
      return readDestination(
        page.getByTestId('faculty-news-article-link').filter({ visible: true }).first(),
        'The faculty-news article link'
      )
    },
    name: 'faculty news article',
    shellTestId: 'faculty-news-article-shell',
  },
]

for (const { contentTestId, getDestination, name, shellTestId } of contentCases) {
  test(`${name} shell is served on an initial load`, async ({ page, baseURL }) => {
    const { href } = await getDestination(page)

    await instant(
      page,
      async () => {
        await page.goto(href)
        await expect(page.getByTestId(shellTestId)).toBeVisible()
      },
      { baseURL: new URL(baseURL!).origin }
    )
  })

  test(`${name} link commits its shell under instant()`, async ({ page }) => {
    const { trigger } = await getDestination(page)

    await instant(page, async () => {
      await trigger.click()
      await expect(page.getByTestId(shellTestId)).toBeVisible()
      await expect(page.getByTestId(contentTestId)).toHaveCount(0)
    })

    await expect(page.getByTestId(contentTestId)).toBeVisible()
  })
}
