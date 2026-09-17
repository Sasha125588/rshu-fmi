'use client'

import { BookmarkIcon, CalendarDaysIcon, LinkIcon } from 'lucide-react'
import { useQueryStates } from 'nuqs'

import { scheduleSearchParams, serializeScheduleSearchParams } from '../_constants'
import { getScheduleMode } from '../_constants/modes'
import { scheduleOptions, selectLessons } from '../_helpers'
import { useSavedScheduleGroup } from '../_hooks/useSavedScheduleGroup'
import { ScheduleControls } from './ScheduleControls'
import { ScheduleDays } from './ScheduleDays'
import { Button } from '@/components/ui/button'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { cn } from '@/lib/utils'
import { useCopy } from '@/shared/hooks'

import type { KyivNow } from '../_helpers'
import type { ScheduleSource } from '@/shared/schedule/config'
import type { ScheduleData } from '@/shared/schedule/types'

type ScheduleResultsProps = {
  now: KyivNow
  schedule: ScheduleData
  source: ScheduleSource
}

export function ScheduleResults({ now, schedule, source }: ScheduleResultsProps) {
  const [state] = useQueryStates({
    mode: scheduleSearchParams.mode,
    selected: scheduleSearchParams.selected,
    subgroup: scheduleSearchParams.subgroup,
  })

  const options = scheduleOptions(schedule, state.mode)
  const selected = options.includes(state.selected) ? state.selected : ''

  const lessons = selected ? selectLessons(schedule, state.mode, selected, state.subgroup) : []

  const title = state.mode === 'room' ? `Аудиторія ${selected}` : selected

  if (!selected) return <NoScheduleSelected selected={state.selected} />

  return (
    <section
      className="mt-10 md:mt-14"
      aria-label={`Розклад: ${title}`}
    >
      <ScheduleHeading
        lessons={lessons}
        effectiveFrom={schedule.effectiveFrom}
        groups={schedule.groups}
        selected={selected}
        source={source}
        title={title}
      />
      <ScheduleControls
        lessons={lessons}
        now={now}
      />
      <ScheduleDays
        lessons={lessons}
        now={now}
        schedule={schedule}
      />
    </section>
  )
}

const ScheduleHeading = ({
  lessons,
  effectiveFrom,
  groups,
  selected,
  source,
  title,
}: {
  lessons: ScheduleData['lessons']
  effectiveFrom: string
  groups: string[]
  selected: string
  source: ScheduleSource
  title: string
}) => {
  const [state] = useQueryStates(scheduleSearchParams)

  const mode = getScheduleMode(state.mode)

  const { savedGroup, toggleSavedGroup } = useSavedScheduleGroup({
    groups,
    selected,
    sourceKey: source.key,
  })

  const { copied, copy } = useCopy()

  const share = async () => {
    const url = serializeScheduleSearchParams(window.location.href, {
      ...state,
      source: source.key,
      selected,
    })
    await copy(url)
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="font-jetbrains text-accent-violet text-xs tracking-widest uppercase">
            {mode.label} · {source.label}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            {lessons.length} занять на тиждень · за розкладом із{' '}
            {effectiveFrom.split('-').reverse().join('.')}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {state.mode === 'group' && (
            <Button
              variant="outline"
              onClick={toggleSavedGroup}
              aria-pressed={savedGroup === selected}
            >
              <BookmarkIcon
                aria-hidden="true"
                data-icon="inline-start"
                className={cn(savedGroup === selected && 'fill-current')}
              />
              {savedGroup === selected ? 'Моя група' : 'Зберегти групу'}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => share()}
          >
            <LinkIcon
              aria-hidden="true"
              data-icon="inline-start"
            />
            {copied ? 'Скопійовано' : 'Поділитися'}
          </Button>
        </div>
      </div>
    </>
  )
}

const NoScheduleSelected = ({ selected }: { selected: string }) => (
  <Empty className="my-10 min-h-72 border">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <CalendarDaysIcon />
      </EmptyMedia>
      <EmptyTitle>{selected ? 'Такого розкладу немає' : 'Ваш тиждень починається тут'}</EmptyTitle>
      <EmptyDescription>
        {selected
          ? 'Можливо, посилання застаріло. Виберіть групу, викладача або аудиторію вище.'
          : 'Виберіть свою групу, щоб побачити пари, аудиторії та посилання на онлайн-заняття.'}
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
)
