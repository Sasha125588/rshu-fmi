import {
  ArrowUpRight,
  BrainCircuitIcon,
  CodeXmlIcon,
  HelpCircleIcon,
  MonitorDot,
  NetworkIcon,
  PiIcon,
} from 'lucide-react'
import Link from 'next/link'

import { Badge, Typography } from '@/components/ui'
import { educationLevelLabels } from '@/payload/collections/EducationalPrograms/constants'

import type { EducationalProgram, Specialty } from '@/payload-types'
import type { LucideIcon } from 'lucide-react'

const SPECIALTY_ICONS: Record<string, LucideIcon> = {
  F2: CodeXmlIcon,
  F3: BrainCircuitIcon,
  'A4.04': PiIcon,
  'A4.09': MonitorDot,
  'A5.39': NetworkIcon,
}

interface ProgramCardProps {
  program: EducationalProgram
  specialty: Specialty
}

export const ProgramCard = ({ program, specialty }: ProgramCardProps) => {
  const Icon = SPECIALTY_ICONS[specialty.code] ?? HelpCircleIcon

  return (
    <article className="group border-border bg-card-new/30 hover:border-accent-violet/45 hover:bg-foreground/4 has-focus-visible:border-accent-violet min-w-0 rounded-lg border p-4 transition-[border-color,background-color] duration-200 sm:p-5">
      <div className="flex h-full gap-4">
        <span className="border-border bg-background/40 group-hover:border-accent-violet/35 flex size-11 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200">
          <Icon
            className="text-accent-violet"
            size={18}
          />
        </span>

        <div className="flex min-w-0 flex-col justify-between">
          <Typography
            as="div"
            variant="caption"
            className="text-muted-foreground mb-2 flex flex-wrap items-center gap-2"
          >
            <Badge
              variant="outline"
              className="font-jetbrains text-accent-violet"
            >
              {specialty.code}
            </Badge>
            <span className="font-jetbrains text-accent-violet">{specialty.abbreviation}</span>
            <span>{educationLevelLabels[program.educationLevel]}</span>
          </Typography>

          <Typography
            as="h3"
            variant="title-md"
          >
            {specialty.title}
          </Typography>

          <Typography
            as="p"
            variant="body-md"
            className="text-muted-foreground/80 mt-2 line-clamp-2"
          >
            {specialty.description}
          </Typography>

          <div className="mt-4 flex flex-wrap gap-2">
            {specialty.tags?.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="font-jetbrains text-foreground/80 text-xs"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>

        <Link
          href={`/educational-programs/${program.slug}`}
          className="text-muted-foreground hover:text-accent-violet focus-visible:text-accent-violet focus-visible:ring-accent-violet/30 shrink-0 rounded-sm transition-colors focus-visible:ring-3 focus-visible:outline-none"
          aria-label={`Детальніше про ${program.title}`}
        >
          <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  )
}
