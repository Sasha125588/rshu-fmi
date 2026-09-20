import { ArrowUpRightIcon, MapPinIcon, VideoIcon } from 'lucide-react'

import { audienceLabel, roomLabel } from '../_helpers'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import type { ScheduleLesson } from '@/shared/schedule/types'
interface LessonCardProps {
  lesson: ScheduleLesson
  current: boolean
  compact?: boolean
}

export const LessonCard = ({ lesson, current, compact = false }: LessonCardProps) => {
  return (
    <article
      className={cn(
        'bg-card relative flex h-full flex-col gap-3 rounded-2xl border p-4 transition-colors',
        current && 'border-accent-violet bg-accent-violet/5 ring-accent-violet/20 ring-1',
        !current && 'hover:border-accent-violet/35',
        !compact && 'md:p-6'
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-jetbrains text-muted-foreground text-xs">
          {lesson.slot > 0 && `${lesson.slot} пара · `}
          {lesson.start}–{lesson.end}
        </span>
        {lesson.cancelled ? (
          <Badge variant="destructive">Не буде</Badge>
        ) : (
          current && <Badge>Зараз</Badge>
        )}
      </div>
      <h3
        className={cn(
          'leading-snug font-bold text-balance',
          compact ? 'text-sm' : 'text-lg md:text-xl'
        )}
      >
        {lesson.subject}
      </h3>
      <p className="text-muted-foreground text-sm">{lesson.teacher}</p>
      <p className="text-muted-foreground text-xs leading-relaxed">{audienceLabel(lesson)}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t pt-3">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          {lesson.online ? (
            <VideoIcon
              aria-hidden="true"
              className="text-accent-violet size-4"
            />
          ) : (
            <MapPinIcon
              aria-hidden="true"
              className="text-accent-violet size-4"
            />
          )}
          {lesson.online ? 'Онлайн' : roomLabel(lesson.room)}
        </span>
        {lesson.meetingUrl && !lesson.cancelled && (
          <a
            href={lesson.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-violet inline-flex min-h-8 items-center gap-1 rounded-md text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
            aria-label={`Приєднатися: ${lesson.subject}`}
          >
            Приєднатися
            <ArrowUpRightIcon
              aria-hidden="true"
              className="size-4"
            />
          </a>
        )}
      </div>
    </article>
  )
}
