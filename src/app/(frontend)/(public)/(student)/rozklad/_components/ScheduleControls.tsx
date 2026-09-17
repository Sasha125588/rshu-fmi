import { ChevronDownIcon } from 'lucide-react'
import { useQueryStates } from 'nuqs'

import { SCHEDULE_DAY_VALUES, scheduleSearchParams } from '../_constants'
import { Button } from '@/components/ui/button'
import { lessonForms, pluralRules } from '@/lib'
import { cn } from '@/lib/utils'
import { SCHEDULE_DAYS, SCHEDULE_SHORT_DAYS } from '@/shared/schedule/config'

import type { KyivNow } from '../_helpers'
import type { ScheduleData } from '@/shared/schedule/types'

interface ScheduleControlsProps {
  lessons: ScheduleData['lessons']
  now: KyivNow
}

export const ScheduleControls = ({ lessons, now }: ScheduleControlsProps) => {
  const [state, setState] = useQueryStates(
    {
      mode: scheduleSearchParams.mode,
      view: scheduleSearchParams.view,
      day: scheduleSearchParams.day,
      subgroup: scheduleSearchParams.subgroup,
    },
    { history: 'push', scroll: false }
  )
  const activeDay = state.day === 'today' ? now.day : +state.day

  return (
    <>
      <div className="my-5 flex flex-wrap items-center justify-between gap-4 border-y py-4">
        <fieldset
          className="bg-muted flex rounded-full p-1"
          aria-label="Вигляд розкладу"
        >
          <legend className="sr-only">Вигляд розкладу</legend>
          {(['day', 'week'] as const).map((value) => (
            <label
              key={value}
              className={cn(
                'has-focus-visible:ring-ring relative cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors has-focus-visible:ring-2',
                state.view === value && 'bg-background shadow-sm'
              )}
            >
              <input
                className="sr-only"
                type="radio"
                name="schedule-view"
                value={value}
                checked={state.view === value}
                onChange={() => setState({ view: value })}
              />
              {value === 'day' ? 'День' : 'Тиждень'}
            </label>
          ))}
        </fieldset>
        <div className="flex items-center gap-3">
          {state.mode === 'group' && (
            <label className="relative flex items-center text-sm">
              <span className="sr-only">Підгрупа</span>
              <select
                aria-label="Підгрупа"
                value={state.subgroup}
                onChange={(event) =>
                  setState({ subgroup: event.target.value as 'all' | '1' | '2' })
                }
                className="bg-background focus-visible:outline-primary min-h-10 appearance-none rounded-xl border py-2 pr-8 pl-3 focus-visible:outline-2"
              >
                <option value="all">Усі підгрупи</option>
                <option value="1">Підгрупа 1</option>
                <option value="2">Підгрупа 2</option>
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none absolute right-2 size-4"
              />
            </label>
          )}
          <Button
            variant="ghost"
            onClick={() => setState({ day: null, view: null })}
          >
            Сьогодні
          </Button>
        </div>
      </div>
      {state.view === 'day' && (
        <nav
          aria-label="День тижня"
          className="mb-6 grid grid-cols-7 gap-1 sm:gap-2"
        >
          {SCHEDULE_DAY_VALUES.map((day, index) => {
            const count = lessons.filter((lesson) => lesson.day === index + 1).length

            return (
              <Button
                key={day}
                variant={activeDay === index + 1 ? 'default' : 'ghost'}
                onClick={() => setState({ day })}
                className="h-auto min-h-14 flex-col gap-1 rounded-2xl px-1 py-3"
                aria-label={SCHEDULE_DAYS[index]}
                aria-current={activeDay === index + 1 ? 'date' : undefined}
              >
                <span>{SCHEDULE_SHORT_DAYS[index]}</span>
                <span
                  className={cn(
                    'font-jetbrains text-[10px]',
                    activeDay === index + 1 ? 'text-primary-foreground/75' : 'text-muted-foreground'
                  )}
                >
                  {count} {lessonForms[pluralRules.select(count)]}
                </span>
              </Button>
            )
          })}
        </nav>
      )}
    </>
  )
}
