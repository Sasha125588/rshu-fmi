'use client'

import { Button, useConfig } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export function ImportGitHubButton() {
  const {
    config: { routes },
  } = useConfig()
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const importContributors = () => {
    setMessage('')
    startTransition(async () => {
      try {
        const response = await fetch(`${routes.api}/project-contributors/import-github`, {
          method: 'POST',
        })
        if (!response.ok) throw new Error('Import failed')

        const { created, updated } = (await response.json()) as { created: number; updated: number }
        setMessage(`Створено чернеток: ${created}. Оновлено: ${updated}.`)
      } catch {
        setMessage('Не вдалося завершити імпорт із GitHub.')
      } finally {
        router.refresh()
      }
    })
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        disabled={pending}
        onClick={importContributors}
      >
        {pending ? 'Імпортуємо…' : 'Імпортувати з GitHub'}
      </Button>
      <p role="status">{message}</p>
    </div>
  )
}
