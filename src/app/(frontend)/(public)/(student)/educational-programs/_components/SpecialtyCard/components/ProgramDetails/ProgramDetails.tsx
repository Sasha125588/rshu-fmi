import { ArrowUpRightIcon } from 'lucide-react'

import { formatScore } from '../../helpers'
import { formatPlaces, formatTuition } from './helpers'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { studyFormLabels } from '@/payload/collections/EducationalPrograms/constants'

import type { CatalogEnrichedEducationalProgramSource } from '../../../../_types'

interface StudyFactProps {
  label: string
  value: string
}

const StudyFact = ({ label, value }: StudyFactProps) => (
  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-t py-2.5">
    <dt className="text-muted-foreground text-xs">{label}</dt>
    <dd className="font-jetbrains text-right text-xs font-semibold">{value}</dd>
  </div>
)

interface ProgramDetailsProps {
  program: CatalogEnrichedEducationalProgramSource
}

export const ProgramDetails = ({ program }: ProgramDetailsProps) => {
  if (!program.studyForms.length) {
    return (
      <Typography
        as="p"
        variant="body-sm"
        className="text-muted-foreground border-y py-5"
      >
        Умови навчання уточнюються.
      </Typography>
    )
  }

  return (
    <div className={cn('mt-4 border-y', program.studyForms.length > 1 && 'grid md:grid-cols-2')}>
      {program.studyForms.map((studyForm, index) => (
        <section
          key={studyForm.form}
          aria-label={`${studyFormLabels[studyForm.form]} форма`}
          className={cn(
            'py-5',
            index > 0 && 'border-t pt-5 md:border-t-0 md:border-l md:pt-5 md:pl-5',
            program.studyForms.length > 1 && !(index > 0) && 'md:pr-5'
          )}
        >
          <Typography
            as="h5"
            variant="label"
          >
            {studyFormLabels[studyForm.form]}
          </Typography>

          <dl className="mt-3">
            <StudyFact
              label="Термін"
              value={studyForm.durationLabel
                .replace(/роки|років|рік/gi, 'р.')
                .replace(/місяців|місяці|місяць/gi, 'міс.')}
            />
            <StudyFact
              label="За рік"
              value={formatTuition(studyForm.tuition)}
            />
            <StudyFact
              label="Ліцензійний обсяг"
              value={formatPlaces(studyForm.admission?.licensedCapacity)}
            />
            <StudyFact
              label="Держзамовлення"
              value={formatPlaces(studyForm.admission?.maxStateOrder)}
            />
          </dl>

          <section
            aria-label="Статистика вступу попереднього року"
            className="border-t pt-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Typography
                as="p"
                variant="caption"
                className="text-muted-foreground"
              >
                Середній бал (вступ {studyForm.admission?.statisticsYear ?? 'попереднього року'})
              </Typography>

              {studyForm.admission?.statisticsUrl && (
                <a
                  href={studyForm.admission.statisticsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-violet inline-flex items-center gap-1 text-xs font-medium underline-offset-4 hover:underline"
                >
                  Детальніше
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    className="size-3.5"
                  />
                </a>
              )}
            </div>

            <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <div className="flex items-baseline gap-1.5">
                <dt className="text-muted-foreground text-xs">Бюджет</dt>
                <dd className="font-jetbrains text-xs font-semibold">
                  {formatScore(studyForm.admission?.averageBudgetScore)}
                </dd>
              </div>
              <div className="flex items-baseline gap-1.5">
                <dt className="text-muted-foreground text-xs">Контракт</dt>
                <dd className="font-jetbrains text-xs font-semibold">
                  {formatScore(studyForm.admission?.averageContractScore)}
                </dd>
              </div>
            </dl>
          </section>
        </section>
      ))}
    </div>
  )
}
