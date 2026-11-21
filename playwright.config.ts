import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:3100'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  // The opt-in board suites share a fixture admin and write to the same local database.
  workers: process.env.PROJECT_BOARD_E2E === '1' ? 1 : undefined,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
