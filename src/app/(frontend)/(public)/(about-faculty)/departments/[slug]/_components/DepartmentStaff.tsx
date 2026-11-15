'use client'

import { CalendarDaysIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useQueryStates } from 'nuqs'

import { STAFF_ROLES, STAFF_ROLE_KEYS, STAFF_SEARCH_PARAMS } from '../_constants'
import { buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'

import type { StaffMember } from '../_types'
import type { Department } from '@/payload-types'

interface DepartmentStaffProps {
  staff: StaffMember[]
  leadership: Department['leadership']
}

const percentageFormatter = new Intl.NumberFormat('uk-UA', {
  style: 'percent',
  maximumFractionDigits: 0,
})

const formatLeadershipName = (name: string) => {
  const [surname, ...givenNames] = name.trim().split(/\s+/)
  return [surname, ...givenNames.map((part) => `${part[0]}.`)].join(' ')
}

const firstYear = (period: string) => Number(period.match(/\b\d{4}\b/)?.[0] ?? Infinity)

export const DepartmentStaff = ({ staff, leadership }: DepartmentStaffProps) => {
  const [{ query, role }, setFilters] = useQueryStates(STAFF_SEARCH_PARAMS)
  const search = query.trim().toLocaleLowerCase('uk-UA')

  const groups = STAFF_ROLE_KEYS.map((key) => ({
    key,
    ...STAFF_ROLES[key],
    count: staff.filter((person) => person.role === key).length,
  })).filter(({ count }) => count > 0)

  const filters = [{ key: null, group: 'Усі', count: staff.length }, ...groups]

  const visible = staff.filter(
    (person) =>
      (!role || person.role === role) && person.name.toLocaleLowerCase('uk-UA').includes(search)
  )

  const leadershipHistory = leadership?.toSorted(
    (a, b) => firstYear(a.period) - firstYear(b.period)
  )

  const currentHead = staff.find((person) => person.isHead)?.name.trim()

  return (
    <section
      aria-labelledby="department-staff"
      className="min-w-0"
    >
      <div className="mb-4 flex items-baseline gap-3">
        <h2
          id="department-staff"
          className="text-lg font-bold"
        >
          Склад кафедри
        </h2>
        <span
          role="status"
          className="font-jetbrains text-muted-foreground text-xs"
        >
          {visible.length} з {staff.length}
        </span>
      </div>
      <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
        <label className="bg-card-new text-muted-foreground focus-within:border-ring flex h-9 w-full items-center gap-2 rounded-[10px] border px-3 sm:w-[235px]">
          <SearchIcon
            aria-hidden="true"
            className="size-4 shrink-0"
          />
          <span className="sr-only">Пошук за прізвищем</span>
          <input
            type="search"
            placeholder="Пошук за прізвищем"
            value={query}
            onChange={(event) => setFilters({ query: event.target.value })}
            className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
        <div
          role="group"
          aria-label="Фільтр за посадою"
          className="flex flex-wrap gap-1.5"
        >
          {filters.map(({ key, group, count }) => (
            <button
              key={key ?? 'all'}
              type="button"
              aria-pressed={role === key}
              onClick={() => setFilters({ role: key })}
              className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background inline-flex h-[30px] items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold whitespace-nowrap focus-visible:ring-2"
            >
              {group}
              <span className="font-jetbrains text-[11px] font-medium opacity-70">{count}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,2.3fr)_minmax(17rem,1fr)]">
        <div className="bg-card-new min-w-0 overflow-hidden rounded-xl border">
          {visible.length > 0 ? (
            <table className="w-full table-fixed text-left text-sm">
              <thead className="text-muted-foreground bg-muted/50 border-b text-xs">
                <tr>
                  <th
                    scope="col"
                    className="w-3/5 px-3 py-2 font-medium"
                  >
                    Працівник
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 font-medium"
                  >
                    Посада
                  </th>
                  <th
                    scope="col"
                    className="w-11"
                  >
                    <span className="sr-only">Розклад</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((person) => {
                  const position = STAFF_ROLES[person.role]
                  const initials = person.name
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join('')
                  return (
                    <tr
                      key={person.id ?? person.name}
                      className="hover:bg-muted/45 not-last:border-b"
                    >
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className={cn(
                              'bg-muted font-jetbrains hidden size-8 shrink-0 place-items-center rounded-full text-[0.625rem] sm:grid',
                              person.isHead && 'bg-accent-violet/15 text-accent-violet'
                            )}
                          >
                            {initials}
                          </span>
                          <div className="min-w-0 wrap-break-word">
                            <p className="font-bold">{person.name}</p>
                            {(person.isHead || person.note) && (
                              <p className="text-muted-foreground text-xs">
                                {[person.isHead ? 'Завідує кафедрою' : null, person.note]
                                  .filter(Boolean)
                                  .join(' · ')}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-muted-foreground px-2 py-3 text-xs">
                        <span
                          aria-hidden="true"
                          className={cn(
                            'mr-1.5 inline-block size-1.5 rounded-full',
                            position.color
                          )}
                        />
                        {position.label}
                      </td>
                      <td className="pr-2">
                        {person.scheduleHref && (
                          <Link
                            href={person.scheduleHref}
                            className={buttonVariants({ variant: 'ghost', size: 'icon-sm' })}
                            aria-label={`Розклад · ${person.name}`}
                          >
                            <CalendarDaysIcon aria-hidden="true" />
                          </Link>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-muted-foreground px-4 py-7 text-sm">Нікого не знайдено.</p>
          )}
        </div>
        <div className="bg-card-new min-w-0 overflow-hidden rounded-[14px] border">
          <h3 className="border-b px-3.5 py-3 text-sm font-extrabold">Структура складу</h3>
          <div className="p-3.5">
            <div
              aria-hidden="true"
              className="mb-3.5 flex h-3 gap-[3px]"
            >
              {groups.map(({ key, group, color, count }) => (
                <span
                  key={key}
                  title={`${group}: ${count}`}
                  className={cn(
                    'min-w-1.5 rounded-[4px] transition-opacity motion-reduce:transition-none',
                    color,
                    role && key !== role && 'opacity-25'
                  )}
                  style={{ flexGrow: count, flexBasis: 0 }}
                />
              ))}
            </div>
            <ul>
              {groups.map(({ key, group, count, color }) => (
                <li key={key}>
                  <button
                    type="button"
                    aria-pressed={role === key}
                    onClick={() => setFilters({ role: role === key ? null : key })}
                    className="hover:bg-muted aria-pressed:bg-muted grid w-full grid-cols-[0.625rem_minmax(0,1fr)_2ch_2.75rem] items-center gap-2.5 rounded-sm px-2 py-[7px] text-left text-sm leading-5"
                  >
                    <span
                      aria-hidden="true"
                      className={cn('size-2 rounded-[3px]', color)}
                    />
                    <span>{group}</span>
                    <span className="font-jetbrains text-right text-[13px] font-bold tabular-nums">
                      {count}
                    </span>
                    <span className="font-jetbrains text-muted-foreground text-right text-xs font-medium tabular-nums">
                      {percentageFormatter.format(count / staff.length)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {!!leadershipHistory?.length && (
            <div className="border-t px-3.5 pt-4 pb-3.5">
              <h4 className="text-muted-foreground mb-1.5 text-xs font-bold">Завідувачі</h4>
              <ul>
                {leadershipHistory.map(({ id, name, period }) => (
                  <li
                    key={id ?? `${name}-${period}`}
                    className="grid grid-cols-[minmax(0,1fr)_fit-content(63%)] items-baseline gap-3 py-1.5 text-sm leading-5"
                  >
                    <div className="min-w-0 font-bold">
                      <span
                        aria-hidden="true"
                        title={name}
                      >
                        {formatLeadershipName(name)}
                      </span>
                      <span className="sr-only">{name}</span>
                      {name.trim() === currentHead && (
                        <>
                          <span
                            aria-hidden="true"
                            title="Завідує кафедрою"
                            className="bg-green-primary-foreground ml-2 inline-block size-1.5 rounded-full align-middle"
                          />
                          <span className="sr-only"> (завідує кафедрою)</span>
                        </>
                      )}
                    </div>
                    <span className="font-jetbrains text-muted-foreground text-right text-xs font-medium">
                      {period}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
