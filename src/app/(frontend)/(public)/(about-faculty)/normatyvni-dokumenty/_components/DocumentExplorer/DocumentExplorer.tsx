'use client'

import { RotateCcwIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { useMemo } from 'react'

import { DocumentCard } from './components/DocumentCard/DocumentCard'
import { SearchInput } from './components/SearchInput/SearchInput'
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui'
import { cn } from '@/lib/utils'

import type { CatalogDocument, DocumentCategory } from './types'

const normalize = (value: string) =>
  value
    .toLocaleLowerCase('uk-UA')
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')

const DEFAULT_CATEGORY: DocumentCategory = {
  slug: 'all',
  sortOrder: 0,
  title: 'Усі категорії',
}

interface DocumentExplorerProps {
  documents: CatalogDocument[]
}

export const DocumentExplorer = ({ documents }: DocumentExplorerProps) => {
  const [query, setQuery] = useQueryState('q', {
    defaultValue: '',
  })
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsStringLiteral(['faculty', 'university', 'all']).withDefault('all')
  )
  const [category, setCategory] = useQueryState('category', { defaultValue: 'all' })

  const categories = [
    DEFAULT_CATEGORY,
    ...Array.from(new Map(documents.map((doc) => [doc.category.slug, doc.category])).values()).sort(
      (a, b) => a.sortOrder - b.sortOrder
    ),
  ]

  const filteredDocuments = useMemo(
    () =>
      documents.filter((doc) => {
        if (tab !== 'all' && doc.source !== tab) return false
        if (category !== 'all' && doc.category.slug !== category) return false

        return normalize(doc.title).includes(normalize(query))
      }),
    [documents, tab, category, query]
  )

  const resetFilters = () => {
    setQuery('')
    setCategory('all')
    setTab('all')
  }

  return (
    <section
      id="documents"
      aria-label="Каталог нормативних документів"
      className="px-4 py-8 md:px-12 md:py-12"
    >
      <Tabs
        value={tab}
        onValueChange={(tab) => setTab(tab)}
        className="gap-0"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b py-3">
          <SearchInput
            value={query}
            onChange={setQuery}
          />

          <TabsList
            variant="default"
            aria-label="Джерело документів"
            className=" justify-start rounded-none border-0 bg-transparent p-0"
          >
            <TabsTrigger
              className="border-border data-active:border-accent-violet data-active:bg-card-new/50 data-active:text-foreground mr-2 h-10 flex-none rounded-lg border bg-transparent px-4"
              value="all"
            >
              Усі
            </TabsTrigger>
            <TabsTrigger
              className="border-border data-active:border-accent-violet data-active:bg-card-new/50 data-active:text-foreground mr-2 h-10 flex-none rounded-lg border bg-transparent px-4"
              value="faculty"
            >
              Факультет
            </TabsTrigger>
            <TabsTrigger
              className="border-border data-active:border-accent-violet data-active:bg-card-new/50 data-active:text-foreground mr-2 h-10 flex-none rounded-lg border bg-transparent px-4"
              value="university"
            >
              Університет
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex flex-wrap items-center gap-x-1 gap-y-1 border-b py-3">
          {categories.map((item) => (
            <Button
              key={item.slug}
              variant="ghost"
              aria-pressed={category === item.slug}
              onClick={() => setCategory(item.slug)}
              className={cn(
                'rounded-md px-2 py-1.5 text-sm font-semibold transition-colors',
                category === item.slug
                  ? 'bg-accent-violet/10 text-accent-violet hover:bg-accent-violet/10! hover:text-accent-violet'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.title}
            </Button>
          ))}
        </div>

        <TabsContent value={tab}>
          <div className="pt-5">
            <div className="flex items-center justify-between pb-5">
              <p className="text-muted-foreground text-sm font-medium">Результати пошуку</p>
              <p className="text-muted-foreground text-sm font-medium">
                {filteredDocuments.length} документів
              </p>
            </div>

            {filteredDocuments.length ? (
              <div className="grid min-h-[186px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredDocuments.map((document, index) => (
                  <DocumentCard
                    key={document.id}
                    query={query}
                    document={document}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <Empty className="py-[27px]">
                  <EmptyHeader>
                    <EmptyTitle className="font-semibold">Нічого не знайдено</EmptyTitle>
                    <EmptyDescription className="max-w-sm leading-6">
                      Спробуйте інший запит або скиньте фільтри, щоб побачити весь каталог.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button
                      onClick={resetFilters}
                      variant="secondary"
                      size="sm"
                    >
                      <RotateCcwIcon className="size-4" />
                      Очистити фільтри
                    </Button>
                  </EmptyContent>
                </Empty>
              </motion.div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
