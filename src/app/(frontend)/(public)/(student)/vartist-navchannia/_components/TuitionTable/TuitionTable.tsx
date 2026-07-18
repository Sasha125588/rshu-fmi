import { GraduationCapIcon } from 'lucide-react'

import { TuitionCell } from './components/TuitionCell/TuitionCell'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui'

import type { TuitionProgramRow } from '../../_types'

interface TuitionTableProps {
  rows: TuitionProgramRow[]
}

export const TuitionTable = ({ rows }: TuitionTableProps) => {
  if (!rows.length)
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <GraduationCapIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>Освітні програми ще не опубліковано</EmptyTitle>
          <EmptyDescription>
            Інформація для цього освітнього рівня з’явиться після публікації програм.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )

  return (
    <div className="overflow-x-auto border-y">
      <table className="w-full min-w-[920px] table-fixed border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-muted-foreground w-[44%] px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase">
              Освітня програма
            </th>
            <th className="text-muted-foreground w-[28%] border-l px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase">
              Денна форма
            </th>
            <th className="text-muted-foreground w-[28%] border-l px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase">
              Заочна форма
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b last:border-b-0"
            >
              <th
                scope="row"
                className="px-5 py-6 text-left align-top font-normal"
              >
                <span className="font-jetbrains text-accent-violet text-xs font-medium tracking-[0.08em]">
                  {row.code}
                </span>
                <span className="mt-2 block max-w-lg text-base leading-6 font-semibold">
                  {row.title}
                </span>
              </th>
              <td className="border-l px-5 py-6 align-top">
                <TuitionCell cell={row.cells['full-time']} />
              </td>
              <td className="border-l px-5 py-6 align-top">
                <TuitionCell cell={row.cells['part-time']} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
