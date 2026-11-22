import { ArrowUpRightIcon, CalendarDaysIcon, UserRoundIcon } from 'lucide-react'
import Link from 'next/link'

import { formatProjectDeadline } from '../_helpers/recruitment'
import { HoverPrefetchLink } from '@/components/common'
import { Badge } from '@/components/ui'
import { PROJECT_CATEGORY_LABELS } from '@/payload/collections/Projects/constants'

import type { toProjectCard } from '../_helpers'

export const ProjectCard = ({
  title,
  slug,
  summary,
  category,
  deadline,
  skills,
  initiatorName,
  open,
  prefetchOnIntent = false,
}: ReturnType<typeof toProjectCard> & { prefetchOnIntent?: boolean }) => {
  const TitleLink = prefetchOnIntent ? HoverPrefetchLink : Link

  return (
    <article className="group bg-card flex flex-col gap-4 rounded-xl border p-5 sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground min-w-0 text-sm font-semibold">
          {PROJECT_CATEGORY_LABELS[category]}
        </span>
        <ProjectRecruitmentBadge open={open} />
      </div>
      <div>
        <h3 className="text-xl leading-tight font-extrabold tracking-tight">
          <TitleLink
            href={`/projects/${slug}`}
            className="focus-visible:ring-ring inline-flex w-fit max-w-full items-baseline gap-2 rounded-sm outline-none hover:underline focus-visible:ring-2"
          >
            <span className="wrap-break-word">{title}</span>
            <ArrowUpRightIcon
              aria-hidden="true"
              className="text-muted-foreground size-4 shrink-0 self-center"
            />
          </TitleLink>
        </h3>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{summary}</p>
      </div>
      {!!skills.length && (
        <ul
          aria-label="Навички й технології"
          className="flex flex-wrap gap-1.5"
        >
          {skills.slice(0, 4).map((skill, index) => (
            <li key={`${skill}-${index}`}>
              <Badge variant="outline">{skill}</Badge>
            </li>
          ))}
          {skills.length > 4 && (
            <li>
              <Badge variant="outline">+{skills.length - 4}</Badge>
            </li>
          )}
        </ul>
      )}
      {(initiatorName || (open && deadline)) && (
        <div className="text-muted-foreground mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t pt-3 text-xs">
          {initiatorName && (
            <span className="inline-flex items-center gap-1.5">
              <UserRoundIcon
                aria-hidden="true"
                className="size-3.5"
              />
              {initiatorName}
            </span>
          )}
          {open && deadline && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDaysIcon
                aria-hidden="true"
                className="size-3.5"
              />
              До <time dateTime={deadline}>{formatProjectDeadline(deadline)}</time>
            </span>
          )}
        </div>
      )}
    </article>
  )
}

export const ProjectRecruitmentBadge = ({ open }: { open: boolean }) => (
  <Badge
    variant={open ? 'success' : 'secondary'}
    className="border-success-foreground/20 border font-semibold"
  >
    {open ? 'Набір відкрито' : 'Набір закрито'}
  </Badge>
)
