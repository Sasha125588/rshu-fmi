'use client'

import { useAuth, useListQuery } from '@payloadcms/ui'

import styles from './applicationsScope.module.css'

import type { User } from '@/payload-types'
import type { Where } from 'payload'

export function ApplicationsScope() {
  const { user } = useAuth<User>()
  const { query, refineListData } = useListQuery()
  if (!user) return null

  const isPublisher = (where: Where) =>
    !Array.isArray(where.publisher) && String(where.publisher?.equals) === String(user.id)

  const requiresPublisher = (where: Where): boolean =>
    isPublisher(where) ||
    !!where.and?.some(requiresPublisher) ||
    !!(where.or?.length && where.or.every(requiresPublisher))

  const withoutPublisher = (where: Where): Where => {
    const next = { ...where }
    if (isPublisher(next)) delete next.publisher
    for (const operator of ['and', 'or'] as const) {
      if (!next[operator]) continue
      const conditions = next[operator]
        .map(withoutPublisher)
        .filter((entry) => Object.keys(entry).length)
      if (conditions.length) next[operator] = conditions
      else delete next[operator]
    }
    return next
  }
  const mine = query.where ? requiresPublisher(query.where) : false

  const setScope = (showMine: boolean) => {
    const where = withoutPublisher(query.where ?? {})
    if (showMine) where.and = [...(where.and ?? []), { publisher: { equals: user.id } }]
    void refineListData({ page: 1, where: Object.keys(where).length ? where : undefined })
  }

  return (
    <div
      className={`gutter--left gutter--right ${styles.scope}`}
      role="group"
      aria-label="Заявки на участь"
    >
      <button
        type="button"
        aria-pressed={mine}
        onClick={() => setScope(true)}
      >
        Мої
      </button>
      <button
        type="button"
        aria-pressed={!mine}
        onClick={() => setScope(false)}
      >
        Усі
      </button>
    </div>
  )
}
