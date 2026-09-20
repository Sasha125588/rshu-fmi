import { CalendarDaysIcon } from 'lucide-react'

import { isCurrentLesson } from '../_helpers'
import { LessonCard } from './LessonCard'
import { useScheduleExplorer } from './ScheduleExplorerContext'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Skeleton } from '@/components/ui/skeleton'
import { lessonForms, pluralRules } from '@/lib'
import { cn } from '@/lib/utils'
import { SCHEDULE_DAYS } from '@/shared/schedule/config'

import type { KyivNow } from '../_helpers'
import type { ScheduleData } from '@/shared/schedule/types'

interface ScheduleDaysProps {
  lessons: ScheduleData['lessons']
  now: KyivNow | null
  schedule: ScheduleData
}

export const ScheduleDays = ({ lessons, now, schedule }: ScheduleDaysProps) => {
  const { state } = useScheduleExplorer()

  const activeDay = state.day === 'today' ? now?.day : +state.day
  if (state.view === 'day' && activeDay === undefined) {
    return (
      <div
        className="grid gap-3"
        aria-busy="true"
        aria-label="Визначаємо поточний день за київським часом"
      >
        <Skeleton className="h-6 w-40 rounded-md" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    )
  }

  const activeDays =
    state.view === 'week' ? [1, 2, 3, 4, 5, 6, 7] : activeDay === undefined ? [] : [activeDay]

  return (
    <>
      {state.view === 'day' && (
        <div className="mb-5 flex items-center gap-3">
          <h3 className="text-xl font-bold">{SCHEDULE_DAYS[activeDay! - 1]}</h3>
          {now?.day === activeDay && <span className="text-accent-violet text-xs">Сьогодні</span>}
        </div>
      )}

      <div className={cn(state.view === 'week' && 'grid gap-4 md:grid-cols-2 xl:grid-cols-5')}>
        {activeDays.map((day) => {
          const items = lessons.filter((lesson) => lesson.day === day)
          return (
            <div
              key={day}
              className={cn(state.view === 'week' && day >= 6 && !items.length && 'md:col-span-1')}
            >
              {state.view === 'week' && (
                <div className="mb-3 flex items-center justify-between border-b pb-3">
                  <h3 className={cn('font-bold', now?.day === day && 'text-accent-violet')}>
                    {SCHEDULE_DAYS[day - 1]}
                  </h3>
                  <span className="font-jetbrains text-muted-foreground text-xs">
                    {items.length} {lessonForms[pluralRules.select(items.length)]}
                  </span>
                </div>
              )}
              {items.length > 0 ? (
                <div className="grid gap-3">
                  {items.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={cn(
                        state.view === 'day' && 'grid gap-3 md:grid-cols-[100px_1fr] md:gap-5'
                      )}
                    >
                      {state.view === 'day' && (
                        <div className="hidden pt-5 md:block">
                          <div className="font-jetbrains text-2xl font-medium tracking-tight">
                            {lesson.start}
                          </div>
                          <div className="font-jetbrains text-muted-foreground mt-1 text-xs">
                            до {lesson.end}
                          </div>
                          <div className="text-muted-foreground mt-4 text-xs">
                            {lesson.slot > 0 ? `${lesson.slot} пара` : 'За окремим часом'}
                          </div>
                        </div>
                      )}
                      <LessonCard
                        lesson={lesson}
                        compact={state.view === 'week'}
                        current={now ? isCurrentLesson(lesson, now, schedule.effectiveFrom) : false}
                      />
                    </div>
                  ))}
                </div>
              ) : state.view === 'day' ? (
                <Empty className="bg-muted/20 min-h-56 border">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <CalendarDaysIcon />
                    </EmptyMedia>
                    <EmptyTitle>На цей день пар немає</EmptyTitle>
                    <EmptyDescription>
                      Для вибраного розкладу заняття не зазначені. Можна переглянути інший день або
                      весь тиждень.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <p className="text-muted-foreground rounded-2xl border border-dashed p-5 text-sm">
                  Без занять
                </p>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
