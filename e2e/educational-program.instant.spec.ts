import { instant } from '@next/playwright'
import { expect, test } from '@playwright/test'

import type { Page } from '@playwright/test'

const PROGRAM_LINK = '[data-testid="educational-program-link"]'

const getProgramDestination = async (page: Page) => {
  await page.goto('/educational-programs')

  const trigger = page.locator(PROGRAM_LINK).filter({ visible: true }).first()
  await expect(trigger).toBeVisible()

  const href = await trigger.getAttribute('href')
  if (!href) throw new Error('The educational program link must have an href.')

  return { href, trigger }
}

test('educational program shell is served on an initial load', async ({ page, baseURL }) => {
  const { href } = await getProgramDestination(page)

  await instant(
    page,
    async () => {
      await page.goto(href)
      await expect(page.getByTestId('educational-program-shell')).toBeVisible()
    },
    { baseURL: new URL(baseURL!).origin }
  )
})

test('an educational program link commits its shell under instant()', async ({ page }) => {
  const { trigger } = await getProgramDestination(page)

  await instant(page, async () => {
    await trigger.click()
    await expect(page.getByTestId('educational-program-shell')).toBeVisible()
    await expect(page.getByTestId('educational-program-content')).toHaveCount(0)
  })

  await expect(page.getByTestId('educational-program-content')).toBeVisible()
})
