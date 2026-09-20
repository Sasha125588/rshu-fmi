import { instant } from '@next/playwright'
import { expect, test } from '@playwright/test'

import type { Page } from '@playwright/test'

const SOURCE_LINK = '[data-testid="schedule-source-link"][data-source="master-1"]'

const openSourcePicker = async (page: Page) => {
  await page.getByRole('button', { name: 'Обрати групу. Поточний вибір: Обрати групу' }).click()
}

test('schedule shell is served on an initial load', async ({ page, baseURL }) => {
  await instant(
    page,
    async () => {
      await page.goto('/rozklad/bachelor-1')
      await expect(page.getByTestId('schedule-shell')).toBeVisible()
    },
    { baseURL: new URL(baseURL!).origin }
  )
})

test('a prefetched schedule source commits under instant()', async ({ page }) => {
  await page.goto('/rozklad/bachelor-1')
  await openSourcePicker(page)
  await page.getByRole('tab', { name: 'Магістратура' }).click()
  const trigger = page.getByTestId('schedule-source-option-master-1')
  await expect(trigger).toBeVisible()

  await instant(page, async () => {
    await trigger.click()
    await expect(page.locator(SOURCE_LINK)).toBeVisible()
  })
})
