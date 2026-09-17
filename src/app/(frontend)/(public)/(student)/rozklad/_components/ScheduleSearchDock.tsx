import { ChevronDownIcon } from 'lucide-react'
import { useQueryStates } from 'nuqs'

import { scheduleSearchParams } from '../_constants'
import { SCHEDULE_MODES } from '../_constants/modes'
import { roomLabel, scheduleOptions } from '../_helpers'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import type { ScheduleData, ScheduleMode } from '@/shared/schedule/types'
import type { ReactElement, ReactNode } from 'react'

interface ScheduleSearchDockProps {
  schedule: ScheduleData
  openSearch: () => void
  selectionTrigger: (children: ReactNode, ariaLabel: string) => ReactElement
}

export const ScheduleSearchDock = ({
  schedule,
  openSearch,
  selectionTrigger,
}: ScheduleSearchDockProps) => {
  const [state, setState] = useQueryStates(
    {
      mode: scheduleSearchParams.mode,
      selected: scheduleSearchParams.selected,
      subgroup: scheduleSearchParams.subgroup,
    },
    { history: 'push', scroll: false }
  )

  const mode = SCHEDULE_MODES.find((item) => item.value === state.mode)!

  const options = scheduleOptions(schedule, state.mode)
  const selected = options.includes(state.selected) ? state.selected : ''

  const selectedLabel = selected
    ? state.mode === 'room'
      ? roomLabel(selected)
      : selected
    : mode.selectionLabel

  const selectMode = (values: string[]) => {
    const value = values[0] as ScheduleMode

    if (value !== state.mode) setState({ mode: value, selected: null, subgroup: null })
    openSearch()
  }

  return (
    <div className="bg-card/95 border-border/80 flex h-11 w-full max-w-full items-center rounded-2xl border p-1 shadow-sm backdrop-blur-xl sm:w-fit">
      <ToggleGroup
        aria-label="Шукати розклад за"
        value={[state.mode]}
        onValueChange={selectMode}
        size="sm"
        spacing={1}
        className="gap-1"
      >
        {SCHEDULE_MODES.map(({ value, label, icon: Icon }) => (
          <Tooltip key={value}>
            <TooltipTrigger
              render={
                <ToggleGroupItem
                  value={value}
                  aria-label={label}
                  className="text-muted-foreground hover:text-foreground data-[state=on]:bg-accent-violet/18 data-[state=on]:text-accent-violet aria-pressed:bg-accent-violet/18 aria-pressed:text-accent-violet size-8.5 rounded-[12px] p-0 transition-colors [&_svg]:size-5"
                />
              }
            >
              <Icon aria-hidden="true" />
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </ToggleGroup>

      <Separator
        orientation="vertical"
        className="mx-1.5 my-0.5"
      />

      {selectionTrigger(
        <>
          <span className="truncate">{selectedLabel}</span>
          <ChevronDownIcon
            aria-hidden="true"
            data-icon="inline-end"
            className="size-4.5"
          />
        </>,
        `${mode.selectionLabel}. Поточний вибір: ${selectedLabel}`
      )}
    </div>
  )
}
