export interface CronEnvironment {
  SCHEDULE_BASE_URL: string
  CRON_SECRET: string
}

async function request(url: URL, env: CronEnvironment) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${env.CRON_SECRET}` },
    redirect: 'manual',
    signal: AbortSignal.timeout(55_000),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')

    console.error('Request failed:', {
      url: url.toString(),
      status: response.status,
      body,
    })

    throw new Error(`Schedule endpoint returned HTTP ${response.status}`)
  }

  return response
}

export async function runScheduleCron(env: CronEnvironment) {
  const base = new URL(env.SCHEDULE_BASE_URL)

  const response = await request(new URL('/api/schedules/sources', base), env)
  const { sources } = (await response.json()) as { sources: string[] }

  const failures: string[] = []

  for (const source of sources) {
    const url = new URL('/api/schedules/sync', base)
    url.searchParams.set('source', source)

    try {
      await request(url, env)
    } catch (error) {
      console.error(`Failed to sync source "${source}"`, error)
      failures.push(source)
    }
  }

  if (failures.length) throw new Error(`Schedule import failed: ${failures.join(', ')}`)

  return { sources: sources.length }
}

export default {
  async scheduled(_controller: unknown, env: CronEnvironment) {
    await runScheduleCron(env)
  },
}
