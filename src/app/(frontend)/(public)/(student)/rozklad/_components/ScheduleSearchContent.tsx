import { CheckIcon } from 'lucide-react'
import { useQueryStates } from 'nuqs'

import { scheduleSearchParams } from '../_constants'
import { roomLabel, scheduleOptions } from '../_helpers'
import { Button } from '@/components/ui/button'
import { SCHEDULE_SOURCES, type ScheduleSource } from '@/shared/schedule/config'

import type { ScheduleData } from '@/shared/schedule/types'

interface ScheduleSearchContentProps {
  schedule: ScheduleData
  source: ScheduleSource
  close: () => void
}

export const ScheduleSearchContent = ({ schedule, source, close }: ScheduleSearchContentProps) => {
  const [state, setState] = useQueryStates(
    {
      source: scheduleSearchParams.source,
      mode: scheduleSearchParams.mode,
      selected: scheduleSearchParams.selected,
      subgroup: scheduleSearchParams.subgroup,
    },
    { history: 'push', scroll: false }
  )

  const options = scheduleOptions(schedule, state.mode)
  const selected = options.includes(state.selected) ? state.selected : ''

  const selectOption = (value: string) => {
    setState({ selected: value, subgroup: null })
    close()
  }

  const changeSource = (value: string) =>
    setState({ source: value, selected: null, subgroup: null }, { shallow: false })

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center justify-between gap-3 text-sm font-medium">
        Курс
        <select
          value={source.key}
          onChange={(event) => changeSource(event.target.value)}
          className="bg-background min-h-8 rounded-lg border px-2 text-sm"
        >
          {SCHEDULE_SOURCES.map((item) => (
            <option
              key={item.key}
              value={item.key}
            >
              {item.label}
            </option>
          ))}
        </select>
      </label>

      {options.length ? (
        <div
          className="flex max-h-80 flex-col gap-1 overflow-y-auto"
          aria-label="Доступні варіанти розкладу"
        >
          {options.map((option) => {
            const active = selected === option

            return (
              <Button
                key={option}
                type="button"
                variant={active ? 'secondary' : 'ghost'}
                className="h-auto w-full justify-between py-2.5 whitespace-normal"
                onClick={() => selectOption(option)}
                aria-pressed={active}
              >
                <span className="min-w-0 text-left">
                  {state.mode === 'room' ? roomLabel(option) : option}
                </span>
                {active && (
                  <CheckIcon
                    aria-hidden="true"
                    data-icon="inline-end"
                  />
                )}
              </Button>
            )
          })}
        </div>
      ) : (
        <p
          role="status"
          className="text-muted-foreground py-3 text-sm"
        >
          Для цього типу розкладу варіантів немає.
        </p>
      )}
    </div>
  )
}
