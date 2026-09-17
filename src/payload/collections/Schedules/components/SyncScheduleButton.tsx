'use client'

import { Button, PillSelector } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { SCHEDULE_SOURCES } from '@/shared/schedule/config'

export function SyncScheduleButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [message, setMessage] = useState('')
  const [sources, setSources] = useState<string[]>([])

  const pills = SCHEDULE_SOURCES.map((source) => ({
    name: source.key,
    selected: sources.includes(source.key),
  }))

  const allSourcesSelected = sources.length === SCHEDULE_SOURCES.length

  const toggleAllSources = () =>
    setSources(allSourcesSelected ? [] : SCHEDULE_SOURCES.map((source) => source.key))

  const synchronize = () => {
    setMessage('')

    startTransition(async () => {
      try {
        const requests = sources.map((source) =>
          fetch(`/api/schedules/sync?source=${encodeURIComponent(source)}`, { method: 'POST' })
        )
        const responses = await Promise.all(requests)
        if (responses.some((res) => !res.ok)) throw new Error('Schedule import failed')

        setMessage('Вибрані розклади успішно оновлено.')
        setSources([])
      } catch {
        setMessage('Оновлення не вдалося.')
      } finally {
        router.refresh()
      }
    })
  }

  return (
    <div className="mb-6 ml-18 flex max-w-xl flex-col">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">Джерела розкладу</span>
          <Button
            type="button"
            onClick={toggleAllSources}
            disabled={isPending}
            className="my-2 font-medium"
          >
            {allSourcesSelected ? 'Скасувати всі' : 'Вибрати всі'}
          </Button>
        </div>
        <PillSelector
          pills={pills}
          onClick={({ pill }) =>
            setSources((current) =>
              current.includes(pill.name)
                ? current.filter((source) => source !== pill.name)
                : [...current, pill.name]
            )
          }
        />
      </div>
      <div className="flex items-center gap-3">
        <Button
          disabled={isPending || !sources.length}
          onClick={synchronize}
          className="py-2"
        >
          {isPending ? 'Завантаження…' : 'Оновити вибраний розклад'}
        </Button>
        <span className="text-[12px] text-neutral-400">
          Вибрано: {sources.length}/{SCHEDULE_SOURCES.length}
        </span>
      </div>
      <p
        role="status"
        className="text-lg text-orange-300"
      >
        {message}
      </p>
    </div>
  )
}
