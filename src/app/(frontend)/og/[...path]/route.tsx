import { getEducationalProgramBySlug } from '../../(public)/educational-programs/[slug]/_api/getEducationalProgramBySlug'
import { resolveFacultyNewsRoute } from '../../(public)/news/faculty/[slug]/_helpers'
import { newsDateFormatter } from '@/lib/formatters'
import { NEWS_SOURCE_CONFIG } from '@/shared/news/config'
import { SOCIAL_CARDS, renderSocialCard } from '@/shared/og'
import { getScheduleSource } from '@/shared/schedule/config'

import type { ExternalNewsSource } from '@/shared/news/types'
import type { SocialCard } from '@/shared/og'

const getCard = async (segments: string[]): Promise<SocialCard | undefined> => {
  const path = `/${segments.join('/')}`

  const staticCard = SOCIAL_CARDS[path === '/home' ? '/' : path]
  if (staticCard) return staticCard

  if (segments[0] === 'news' && segments.length === 3 && segments[1] === 'faculty') {
    const resolution = await resolveFacultyNewsRoute(segments[2])
    if (resolution.kind !== 'article') return undefined

    return {
      title: resolution.article.title,
      subtitle: `Новини факультету · ${newsDateFormatter.format(new Date(resolution.article.publishedAt))}`,
      photo: resolution.article.coverImage,
    }
  }

  if (
    segments[0] === 'news' &&
    (segments.length === 2 ||
      (segments.length === 4 && segments[2] === 'page' && /^[1-9]\d*$/.test(segments[3])))
  ) {
    const source = segments[1]

    const card = source === 'faculty' ? SOCIAL_CARDS['/news/faculty'] : undefined
    const config = Object.hasOwn(NEWS_SOURCE_CONFIG, source)
      ? NEWS_SOURCE_CONFIG[source as ExternalNewsSource]
      : undefined

    if (!card && !config) return undefined

    return {
      ...(card ?? {
        title: `Новини: ${config!.fullLabel}`,
        subtitle: 'Новини університету та кафедр',
      }),
      ...(segments[3]
        ? { subtitle: `${card?.subtitle ?? config!.fullLabel} · Сторінка ${segments[3]}` }
        : {}),
      highlight: 'Новини',
    }
  }

  if (segments[0] === 'educational-programs' && segments.length === 2) {
    const program = await getEducationalProgramBySlug(segments[1])
    if (!program) return undefined

    const code = typeof program.specialty === 'object' ? program.specialty.code : undefined

    return {
      title: program.title,
      subtitle: [
        'Освітня програма',
        code,
        program.educationLevel === 'master' ? 'Магістр' : 'Бакалавр',
      ]
        .filter(Boolean)
        .join(' · '),
      highlight: program.title,
    }
  }

  if (segments[0] === 'rozklad' && segments.length === 2) {
    const source = getScheduleSource(segments[1])
    if (!source) return undefined

    return {
      title: 'Розклад занять',
      subtitle: source.label,
      highlight: 'занять',
    }
  }

  return undefined
}

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) => {
  const { path } = await params

  const card = await getCard(path)
  if (!card) return new Response('Not found', { status: 404 })

  return renderSocialCard(
    card,
    new URL(request.url).searchParams.get('highlight') !== 'off',
    request.url
  )
}
