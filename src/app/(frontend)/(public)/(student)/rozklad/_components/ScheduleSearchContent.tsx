import { CheckIcon } from 'lucide-react'
import Link from 'next/link'

import { serializeScheduleSearchParams } from '../_constants'
import { roomLabel, scheduleOptions } from '../_helpers'
import { useScheduleExplorer } from './ScheduleExplorerContext'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SCHEDULE_LEVELS, SCHEDULE_SOURCES, type ScheduleSource } from '@/shared/schedule/config'

import type { ScheduleData } from '@/shared/schedule/types'
import type { Route } from 'next'

const SOURCES_BY_LEVEL = SCHEDULE_LEVELS.map((level) => ({
  ...level,
  sources: SCHEDULE_SOURCES.filter((item) => item.level === level.value),
}))

interface ScheduleSearchContentProps {
  schedule: ScheduleData
  source: ScheduleSource
  close: () => void
}

export const ScheduleSearchContent = ({ schedule, source, close }: ScheduleSearchContentProps) => {
  const { state, setState } = useScheduleExplorer()

  const options = scheduleOptions(schedule, state.mode)
  const selected = options.includes(state.selected) ? state.selected : ''

  const isGrid = state.mode === 'group'
  const idleVariant = isGrid ? 'outline' : 'ghost'

  const selectOption = (value: string) => {
    setState({ selected: value, subgroup: null })
    close()
  }

  const getSourceHref = (item: ScheduleSource) =>
    serializeScheduleSearchParams(`/rozklad/${item.key}`, {
      ...state,
      selected: null,
      subgroup: null,
    }) as Route

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Tabs
          key={source.level}
          defaultValue={source.level}
          className="gap-2"
        >
          <TabsList
            className="w-full"
            aria-label="Рівень навчання"
          >
            {SOURCES_BY_LEVEL.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {SOURCES_BY_LEVEL.map((item) => (
            <TabsContent
              key={item.value}
              value={item.value}
            >
              <nav
                className="grid auto-cols-fr grid-flow-col gap-1.5"
                aria-label={`Курс: ${item.label.toLowerCase()}`}
              >
                {item.sources.map((sourceItem) => {
                  const active = source.key === sourceItem.key

                  return (
                    <Button
                      key={sourceItem.key}
                      nativeButton={false}
                      render={
                        <Link
                          href={getSourceHref(sourceItem)}
                          prefetch={true}
                          data-testid={`schedule-source-option-${sourceItem.key}`}
                        />
                      }
                      variant={active ? 'secondary' : 'outline'}
                      className={cn(active && 'border-accent-violet text-accent-violet')}
                      aria-label={sourceItem.label}
                      aria-current={active ? 'page' : undefined}
                      onClick={close}
                    >
                      {sourceItem.course}
                    </Button>
                  )
                })}
              </nav>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {options.length ? (
        <div
          role="group"
          className={cn(
            'mt-1 max-h-80 overflow-y-auto',
            isGrid ? 'grid grid-cols-3 gap-1.5' : 'flex flex-col gap-1'
          )}
          aria-label="Доступні варіанти розкладу"
        >
          {options.map((option) => {
            const active = selected === option

            return (
              <Button
                key={option}
                type="button"
                variant={active ? 'secondary' : idleVariant}
                className={cn(
                  'h-auto py-2.5 whitespace-normal',
                  isGrid ? 'justify-center' : 'w-full justify-between',
                  active && 'border-accent-violet text-accent-violet'
                )}
                onClick={() => selectOption(option)}
                aria-pressed={active}
              >
                <span className="min-w-0 text-left">
                  {state.mode === 'room' ? roomLabel(option) : option}
                </span>
                {active && !isGrid && (
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
