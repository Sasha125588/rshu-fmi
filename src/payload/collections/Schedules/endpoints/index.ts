import { revalidateTag } from 'next/cache'

import { checkRole } from '@/payload/access'
import { scheduleCacheTag } from '@/shared/schedule/cache'
import { SCHEDULE_SOURCES, getScheduleSource } from '@/shared/schedule/config'
import { syncSchedule } from '@/shared/schedule/sync'

import type { Endpoint, PayloadRequest } from 'payload'

export const isCronAuthorized = (headers: Headers) => {
  const secret = process.env.CRON_SECRET
  if (!secret) return false

  return headers.get('authorization') === `Bearer ${secret}`
}

const runSync = async (req: PayloadRequest) => {
  const source = getScheduleSource(req.searchParams.get('source') ?? '')

  if (!source) {
    return Response.json(
      { error: 'Невідоме джерело розкладу.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  try {
    const result = await syncSchedule(req.payload, source, (sourceKey) => {
      revalidateTag(scheduleCacheTag(sourceKey), { expire: 0 })
    })
    return Response.json(
      { source: source.key, ...result },
      {
        status: result.status === 'error' ? 502 : 200,
        headers: { 'Cache-Control': 'no-store' },
      }
    )
  } catch (error) {
    req.payload.logger.error({ msg: 'Schedule sync failed', source: source.key, error })
    return Response.json(
      { source: source.key, error: 'Не вдалося оновити розклад.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}

export const scheduleEndpoints: Endpoint[] = [
  {
    path: '/sources',
    method: 'get',
    handler: async (req) => {
      if (!isCronAuthorized(req.headers))
        return Response.json({ error: 'Unauthorized' }, { status: 401 })

      return Response.json(
        { sources: SCHEDULE_SOURCES.map(({ key }) => key) },
        { headers: { 'Cache-Control': 'no-store' } }
      )
    },
  },
  {
    path: '/sync',
    method: 'post',
    handler: async (req) => {
      if (!checkRole(['admin', 'editor'], req.user))
        return Response.json({ error: 'Доступ заборонено.' }, { status: 403 })

      const origin = req.headers.get('origin')
      if (origin && origin !== new URL(req.url!).origin)
        return Response.json({ error: 'Доступ заборонено.' }, { status: 403 })

      return runSync(req)
    },
  },
  {
    path: '/sync',
    method: 'get',
    handler: async (req) => {
      if (!isCronAuthorized(req.headers))
        return Response.json({ error: 'Unauthorized' }, { status: 401 })

      return runSync(req)
    },
  },
]
