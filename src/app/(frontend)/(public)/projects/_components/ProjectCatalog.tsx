'use client'

import { MinusCircleIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { debounce, parseAsBoolean, parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs'

import { filterProjects } from '../_helpers/catalog'
import { ProjectCard } from './ProjectCard'
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  buttonVariants,
} from '@/components/ui'
import { PROJECT_CATEGORIES } from '@/payload/collections/Projects/constants'

import type { toProjectCard } from '../_helpers'
import type { ProjectCategory } from '@/payload/collections/Projects/constants'

const categoryValues = ['', ...PROJECT_CATEGORIES.map(({ value }) => value)] as const
const parsers = {
  q: parseAsString.withDefault(''),
  category: parseAsStringLiteral(categoryValues).withDefault(''),
  open: parseAsBoolean.withDefault(false),
}

export const ProjectCatalog = ({ projects }: { projects: ReturnType<typeof toProjectCard>[] }) => {
  const [filters, setFilters] = useQueryStates(parsers)
  const filteredProjects = filterProjects(projects, filters)
  const onlyOpen = filters.open && !filters.q.trim() && !filters.category

  const reset = () => setFilters(null)

  return (
    <section
      aria-label="Каталог проєктів"
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-4 border-y py-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <InputGroup className="sm:max-w-sm">
            <InputGroupAddon>
              <SearchIcon aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              aria-label="Назва чи технологія"
              placeholder="Назва чи технологія"
              value={filters.q}
              maxLength={100}
              onChange={(event) =>
                setFilters(
                  { q: event.currentTarget.value },
                  event.currentTarget.value ? { limitUrlUpdates: debounce(250) } : undefined
                )
              }
            />
          </InputGroup>
          <label className="flex min-h-9 w-fit items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              className="accent-foreground size-4"
              checked={filters.open}
              onChange={(event) => void setFilters({ open: event.currentTarget.checked })}
            />
            Лише відкритий набір
          </label>
        </div>
        <div
          role="group"
          aria-label="Категорія проєкту"
          className="flex flex-wrap gap-2"
        >
          {[{ value: '' as const, label: 'Усі' }, ...PROJECT_CATEGORIES].map(({ value, label }) => (
            <Button
              type="button"
              key={value}
              size="sm"
              variant={filters.category === value ? 'secondary' : 'outline'}
              aria-pressed={filters.category === value}
              onClick={() => setFilters({ category: value as ProjectCategory | '' })}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <p
        className="text-muted-foreground text-sm"
        role="status"
      >
        Знайдено: {filteredProjects.length}
      </p>
      {filteredProjects.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              {...project}
              prefetchOnIntent
            />
          ))}
        </div>
      ) : (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MinusCircleIcon aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>
              {!projects.length
                ? 'Поки немає опублікованих проєктів'
                : onlyOpen
                  ? 'Зараз немає відкритого набору'
                  : 'Немає проєктів за цими фільтрами'}
            </EmptyTitle>
            <EmptyDescription>
              {!projects.length
                ? 'Можеш запропонувати ідею й розповісти, кого шукаєш.'
                : 'Зміни умови пошуку або переглянь усі проєкти.'}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            {!projects.length ? (
              <Link
                href="/projects/propose"
                className={buttonVariants({ variant: 'lavender' })}
              >
                Запропонувати проєкт
              </Link>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={reset}
              >
                {onlyOpen ? 'Показати всі проєкти' : 'Скинути фільтри'}
              </Button>
            )}
          </EmptyContent>
        </Empty>
      )}
    </section>
  )
}
