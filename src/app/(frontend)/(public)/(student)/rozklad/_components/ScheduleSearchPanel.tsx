'use client'

import { useState } from 'react'

import { getScheduleMode } from '../_constants/modes'
import { useScheduleExplorer } from './ScheduleExplorerContext'
import { ScheduleSearchContent } from './ScheduleSearchContent'
import { ScheduleSearchDock } from './ScheduleSearchDock'
import { Kbd, KbdGroup } from '@/components/ui'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useHotkeys, useMediaQuery, useOperatingSystem } from '@/shared/hooks'

import type { ScheduleSource } from '@/shared/schedule/config'
import type { ScheduleData } from '@/shared/schedule/types'

const SCHEDULE_SHORTCUT_KEY = 'S'

export function ScheduleSearchPanel({
  schedule,
  source,
}: {
  schedule: ScheduleData
  source: ScheduleSource
}) {
  const { state } = useScheduleExplorer()
  const [opened, setOpened] = useState(false)

  const title = getScheduleMode(state.mode).selectionLabel

  const isDesktop = useMediaQuery('(min-width: 40rem)')

  const operatingSystem = useOperatingSystem()
  const modifierLabel = operatingSystem === 'macos' ? '⌥' : 'Alt'

  const openSearch = () => setOpened(true)
  const closeSearch = () => setOpened(false)

  useHotkeys(`alt+code:Key${SCHEDULE_SHORTCUT_KEY}`, () => openSearch(), {
    enabled: isDesktop && !opened,
  })

  return (
    <section
      aria-label="Пошук розкладу"
      className="sticky top-20 z-40 -mt-5 flex w-full sm:w-fit"
    >
      <div className="hidden sm:block">
        <Popover
          open={opened && isDesktop}
          onOpenChange={setOpened}
        >
          <ScheduleSearchDock
            schedule={schedule}
            openSearch={openSearch}
            shortcut={
              <KbdGroup
                aria-hidden="true"
                data-icon="inline-end"
                className="shrink-0"
              >
                <Kbd>{modifierLabel}</Kbd>
                <Kbd>{SCHEDULE_SHORTCUT_KEY}</Kbd>
              </KbdGroup>
            }
            selectionTrigger={(children, ariaLabel) => (
              <PopoverTrigger
                aria-label={ariaLabel}
                aria-keyshortcuts={`Alt+${SCHEDULE_SHORTCUT_KEY}`}
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="max-w-64 gap-2 px-3 text-base font-normal"
                  />
                }
              >
                {children}
              </PopoverTrigger>
            )}
          />
          <PopoverContent
            align="start"
            sideOffset={8}
            className="w-[min(24rem,var(--available-width))] gap-3"
          >
            <PopoverHeader className="flex-row items-center justify-between gap-3">
              <PopoverTitle>{title}</PopoverTitle>
              <PopoverDescription className="shrink-0">
                <span className="sr-only">Натисніть Escape, щоб закрити панель.</span>
                <Kbd aria-hidden="true">Esc</Kbd>
              </PopoverDescription>
            </PopoverHeader>
            <ScheduleSearchContent
              schedule={schedule}
              source={source}
              close={closeSearch}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full sm:hidden">
        <Sheet
          open={opened && !isDesktop}
          onOpenChange={setOpened}
        >
          <ScheduleSearchDock
            schedule={schedule}
            openSearch={openSearch}
            selectionTrigger={(children, ariaLabel) => (
              <SheetTrigger
                aria-label={ariaLabel}
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="min-w-0 flex-1 gap-2 px-3 text-base font-normal"
                  />
                }
              >
                {children}
              </SheetTrigger>
            )}
          />
          <SheetContent
            side="bottom"
            className="max-h-[85dvh]"
          >
            <SheetHeader className="pb-3">
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto px-6 pb-6">
              <ScheduleSearchContent
                schedule={schedule}
                source={source}
                close={closeSearch}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  )
}
