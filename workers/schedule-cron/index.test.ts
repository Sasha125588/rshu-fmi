import { expect, test } from 'bun:test'

import worker from './index'

test('scheduled handler never calls Vercel in skipped hours and syncs in active hours', async () => {
  const originalFetch = globalThis.fetch
  const requests: string[] = []
  const env = { SCHEDULE_BASE_URL: 'https://example.org', CRON_SECRET: 'test-only' }

  try {
    globalThis.fetch = (async (input: URL | RequestInfo) => {
      const url = String(input)
      requests.push(url)
      return Response.json(url.endsWith('/sources') ? { sources: ['bachelor-1'] } : {})
    }) as typeof fetch

    for (const time of ['06:00', '18:00', '20:00', '22:00', '23:00']) {
      await worker.scheduled({ scheduledTime: Date.parse(`2026-07-14T${time}:00+03:00`) }, env)
    }
    expect(requests).toEqual([])

    for (const time of ['07:00', '16:00', '17:00', '19:00', '21:00']) {
      await worker.scheduled({ scheduledTime: Date.parse(`2026-07-14T${time}:00+03:00`) }, env)
    }
    expect(requests).toEqual(
      Array.from({ length: 5 }, () => [
        'https://example.org/api/schedules/sources',
        'https://example.org/api/schedules/sync?source=bachelor-1',
      ]).flat()
    )
  } finally {
    globalThis.fetch = originalFetch
  }
})
