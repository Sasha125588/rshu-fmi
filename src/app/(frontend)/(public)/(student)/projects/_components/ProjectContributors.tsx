import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { getProjectContributors } from '../_api/queries'
import { ContributorAvatarImage } from './ContributorAvatarImage'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'

const FALLBACK_AVATAR_COUNT = 10

const SOURCE_LABELS = {
  project: 'Участь у проєктах',
  github: 'Внесок у сайт',
  both: 'Участь у проєктах і внесок у сайт',
}

type ProjectContributor = Awaited<ReturnType<typeof getProjectContributors>>[number]

export const ProjectContributors = async () => {
  const contributors = await getProjectContributors()

  return (
    <section
      aria-labelledby="project-contributors"
      className="flex max-w-[44rem] flex-wrap items-center gap-x-6 gap-y-3"
    >
      <div className="flex shrink-0 items-center gap-2.5">
        <h2
          id="project-contributors"
          className="text-[22px] font-bold tracking-tight sm:text-[26px]"
        >
          Долучилися
        </h2>
        <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-sm font-semibold tabular-nums">
          {contributors.length}
        </span>
      </div>
      <ul className="flex min-w-0 flex-wrap items-center gap-2">
        {contributors.map((contributor) => (
          <li key={contributor.id}>
            <ContributorAvatar {...contributor} />
          </li>
        ))}
        <li>
          <Link
            href="/projects?open=true#project-catalog"
            aria-label="Переглянути проєкти з відкритим набором"
            className="border-muted-foreground/55 text-muted-foreground hover:border-foreground/60 hover:bg-muted hover:text-foreground focus-visible:ring-ring grid size-11 place-items-center rounded-full border-2 border-dashed transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:size-13"
          >
            <PlusIcon
              aria-hidden="true"
              className="size-4.5 sm:size-5"
            />
          </Link>
        </li>
      </ul>
    </section>
  )
}

const ContributorAvatar = ({ id, name, source, githubId, githubAvatarUrl }: ProjectContributor) => {
  const label = `${name} · ${SOURCE_LABELS[source]}`
  const identity = githubId == null ? `payload:${id}` : `github:${githubId}`
  const hash = Array.from(identity).reduce(
    (hash, character) => Math.imul(hash ^ character.charCodeAt(0), 16777619),
    2166136261
  )
  const avatarNumber = ((hash >>> 0) % FALLBACK_AVATAR_COUNT) + 1

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            role="img"
            tabIndex={0}
          />
        }
        aria-label={label}
        className="bg-muted border-border focus-visible:ring-ring relative grid size-11 shrink-0 place-items-center rounded-full border outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:size-13"
      >
        <ContributorAvatarImage
          fallbackSrc={`/images/project-contributor-avatars/${avatarNumber}.png`}
          githubAvatarUrl={githubId == null ? null : githubAvatarUrl}
        />
      </TooltipTrigger>
      <TooltipContent
        role="tooltip"
        sideOffset={7}
      >
        {name}
      </TooltipContent>
    </Tooltip>
  )
}
