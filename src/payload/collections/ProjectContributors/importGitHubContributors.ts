import { z } from 'zod'

import { adminOnly } from '@/payload/access'
import { FACULTY_SOCIAL_URLS } from '@/shared/constants/socials'

import type { Endpoint, PayloadRequest } from 'payload'

const contributorSchema = z.array(
  z.object({
    id: z.number().int().positive(),
    login: z.string().min(1).max(120),
    type: z.string(),
    avatar_url: z
      .string()
      .refine((url) => URL.parse(url)?.origin === 'https://avatars.githubusercontent.com')
      .optional()
      .catch(undefined),
  })
)

const readGitHubContributors = async () => {
  const repository = new URL(FACULTY_SOCIAL_URLS.github).pathname
  const url = new URL(`https://api.github.com/repos${repository}/contributors`)
  const signal = AbortSignal.timeout(10_000)
  const contributors = new Map<number, { id: number; login: string; avatar_url?: string }>()

  url.searchParams.set('per_page', '100')
  for (let page = 1; ; page++) {
    url.searchParams.set('page', String(page))
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2026-03-10',
      },
      signal,
    })

    if (response.status === 204) return contributors
    if (!response.ok) throw new Error(`GitHub contributors returned HTTP ${response.status}`)

    const items = contributorSchema.parse(await response.json())
    for (const item of items) {
      if (item.type === 'User' && !item.login.endsWith('[bot]')) contributors.set(item.id, item)
    }

    if (items.length < 100) return contributors
  }
}

const saveDrafts = async (
  req: PayloadRequest,
  contributors: Awaited<ReturnType<typeof readGitHubContributors>>
) => {
  const result = { created: 0, updated: 0 }

  for (const contributor of contributors.values()) {
    const options = {
      collection: 'project-contributors',
      overrideAccess: false,
      draft: true,
      req,
      depth: 0,
    } as const
    const findExisting = () =>
      req.payload.find({
        ...options,
        limit: 1,
        where: { githubId: { equals: contributor.id } },
        select: { source: true, githubAvatarUrl: true },
      })

    let existing = (await findExisting()).docs[0]

    if (!existing) {
      try {
        await req.payload.create({
          ...options,
          data: {
            name: contributor.login,
            source: 'github',
            githubId: contributor.id,
            githubAvatarUrl: contributor.avatar_url,
          },
        })
        result.created++
        continue
      } catch (error) {
        existing = (await findExisting()).docs[0]
        if (!existing) throw error
      }
    }

    const source = existing.source === 'project' ? 'both' : (existing.source ?? 'github')
    const githubAvatarUrl = contributor.avatar_url ?? existing.githubAvatarUrl

    if (source !== existing.source || githubAvatarUrl !== existing.githubAvatarUrl) {
      await req.payload.update({
        ...options,
        id: existing.id,
        data: { source, githubAvatarUrl },
      })
      result.updated++
    }
  }

  return result
}

export const importGitHubContributors: Endpoint = {
  path: '/import-github',
  method: 'post',
  handler: async (req) => {
    const origin = req.headers.get('origin')
    const requestUrl = new URL(req.origin)
    requestUrl.host = req.headers.get('host') ?? requestUrl.host

    if (!adminOnly({ req }) || (origin && origin !== requestUrl.origin))
      return Response.json({ error: 'Доступ заборонено.' }, { status: 403 })

    try {
      const contributors = await readGitHubContributors()
      return Response.json(await saveDrafts(req, contributors))
    } catch (err) {
      req.payload.logger.error({ err, msg: 'GitHub contributor import failed' })
      return Response.json({ error: 'Не вдалося завершити імпорт із GitHub.' }, { status: 502 })
    }
  },
}
