import { instant } from '@next/playwright'
import { expect, test } from '@playwright/test'

import type { Page } from '@playwright/test'

type PaginationCase = {
  contentTestId: string
  name: string
  shellTestId: string
  sourcePath: string
}

const paginationCases: PaginationCase[] = [
  {
    contentTestId: 'external-news-page-content',
    name: 'external news pagination',
    shellTestId: 'external-news-page-shell',
    sourcePath: '/news/university',
  },
  {
    contentTestId: 'faculty-news-page-content',
    name: 'faculty news pagination',
    shellTestId: 'faculty-news-page-shell',
    sourcePath: '/news/faculty',
  },
]

const getNextPage = async (page: Page, sourcePath: string) => {
  await page.goto(sourcePath)

  const trigger = page.getByTestId('news-pagination-next')
  await expect(trigger).toBeVisible()

  const href = await trigger.getAttribute('href')
  if (!href) throw new Error(`The next-page link on ${sourcePath} must have an href.`)

  return { href, trigger }
}

for (const { contentTestId, name, shellTestId, sourcePath } of paginationCases) {
  test(`${name} shell is served on an initial load`, async ({ page, baseURL }) => {
    const { href } = await getNextPage(page, sourcePath)

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
    const { trigger } = await getNextPage(page, sourcePath)

    await instant(page, async () => {
      await trigger.click()
      await expect(page.getByTestId(shellTestId)).toBeVisible()
      await expect(page.getByTestId(contentTestId)).toHaveCount(0)
    })

    await expect(page.getByTestId(contentTestId)).toBeVisible()
  })
}
