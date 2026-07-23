'use client'

import { HelpCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { ProgramDetails } from './components/ProgramDetails/ProgramDetails'
import { specialtyIcons } from './constants'
import {
  Badge,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from '@/components/ui'
import {
  type EducationLevel,
  educationLevelLabels,
} from '@/payload/collections/EducationalPrograms/constants'

import type { CatalogEnrichedSpecialtySource } from '../../_types'

interface SpecialtyCardProps {
  specialty: CatalogEnrichedSpecialtySource
}

export const SpecialtyCard = ({ specialty }: SpecialtyCardProps) => {
  const programs = specialty.educationalPrograms?.docs ?? []
  const defaultProgram = programs[0]

  const [activeEducationLevel, setActiveEducationLevel] = useState(defaultProgram?.educationLevel)

  const activeProgram = programs.find((program) => program.educationLevel === activeEducationLevel)

  const Icon = specialtyIcons[specialty.code] ?? HelpCircleIcon

  return (
    <article className="border-border bg-card flex h-full flex-col rounded-xl border p-5 md:p-6">
      <header>
        <div className="mb-1 flex items-center gap-3">
          <Icon
            aria-hidden="true"
            className="text-accent-violet size-4"
          />
          <Typography
            as="span"
            variant="label"
            className="font-jetbrains text-accent-violet"
          >
            {specialty.code}
          </Typography>
          <Separator orientation="vertical" />
          <Typography
            as="span"
            variant="caption"
            className="font-jetbrains text-muted-foreground"
          >
            {specialty.abbreviation}
          </Typography>
          {!!specialty.legacyCode && (
            <>
              <Separator orientation="vertical" />
              <Typography
                as="span"
                variant="caption"
                className="font-jetbrains text-muted-foreground"
              >
                старий код {specialty.legacyCode}
              </Typography>
            </>
          )}
        </div>

        <Typography
          as="h3"
          variant="title-lg"
          render={
            activeProgram && (
              <Link
                href={`/educational-programs/${activeProgram.slug}`}
                aria-label={`Детальніше про програму «${activeProgram.title}»`}
              />
            )
          }
          className="hover:text-accent-violet underline underline-offset-3 transition-colors"
        >
          {specialty.title}
        </Typography>
        <Typography
          as="p"
          variant="body-sm"
          className="text-muted-foreground mt-2 line-clamp-2 max-w-2xl"
        >
          {specialty.description}
        </Typography>

        {!!specialty.tags?.length && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {specialty.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag.id}
                variant="ghost"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <Separator className="my-5" />

      <div className="flex flex-1 flex-col">
        {!defaultProgram ? (
          <Typography
            as="p"
            variant="body-sm"
            className="text-muted-foreground"
          >
            Освітні програми уточнюються.
          </Typography>
        ) : (
          <Tabs
            defaultValue={defaultProgram}
            onValueChange={(value) => setActiveEducationLevel(value as EducationLevel)}
            className="gap-0"
          >
            <TabsList
              variant="line"
              aria-label={`Рівень освіти: ${specialty.title}`}
            >
              {programs.map((program) => (
                <TabsTrigger
                  key={program.id}
                  value={program.educationLevel}
                >
                  {educationLevelLabels[program.educationLevel]}
                </TabsTrigger>
              ))}
            </TabsList>

            {programs.map((program) => (
              <TabsContent
                key={program.id}
                value={program.educationLevel}
                className="m-0 divide-y"
              >
                <section key={program.id}>
                  <ProgramDetails program={program} />
                </section>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </article>
  )
}
