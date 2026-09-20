'use client'

import { useState } from 'react'

import { getScheduleMode } from '../_constants/modes'
import { useScheduleExplorer } from './ScheduleExplorerContext'
import { ScheduleSearchContent } from './ScheduleSearchContent'
import { ScheduleSearchDock } from './ScheduleSearchDock'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import type { ScheduleSource } from '@/shared/schedule/config'
import type { ScheduleData } from '@/shared/schedule/types'

export function ScheduleSearchPanel({
  schedule,
  source,
}: {
  schedule: ScheduleData
  source: ScheduleSource
}) {
  const { state } = useScheduleExplorer()
  const [desktopOpen, setDesktopOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const title = getScheduleMode(state.mode).selectionLabel

  return (
    <section
      aria-label="Пошук розкладу"
      className="sticky top-20 z-40 -mt-5 flex w-full sm:w-fit"
    >
      <div className="hidden sm:block">
        <Popover
          open={desktopOpen}
          onOpenChange={setDesktopOpen}
        >
          <ScheduleSearchDock
            schedule={schedule}
            openSearch={() => setDesktopOpen(true)}
            selectionTrigger={(children, ariaLabel) => (
              <PopoverTrigger
                aria-label={ariaLabel}
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
            <PopoverHeader>
              <PopoverTitle>{title}</PopoverTitle>
            </PopoverHeader>
            <ScheduleSearchContent
              schedule={schedule}
              source={source}
              close={() => setDesktopOpen(false)}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full sm:hidden">
        <Sheet
          open={mobileOpen}
          onOpenChange={setMobileOpen}
        >
          <ScheduleSearchDock
            schedule={schedule}
            openSearch={() => setMobileOpen(true)}
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
                close={() => setMobileOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  )
}
