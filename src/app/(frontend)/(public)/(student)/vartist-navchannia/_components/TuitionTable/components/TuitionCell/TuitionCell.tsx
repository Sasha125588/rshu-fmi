import { formatCurrency } from '@/shared/helpers'

import type { TuitionCell as TuitionCellType } from '../../../../_types'

interface TuitionCellProps {
  cell: TuitionCellType
}

export const TuitionCell = ({ cell }: TuitionCellProps) => {
  if (!cell.programForm)
    return <span className="text-muted-foreground text-sm">Форма не передбачена</span>

  if (!cell.rate)
    return <span className="text-muted-foreground text-sm">Тариф не опубліковано</span>

  if (cell.rate.availability === 'unavailable')
    return <span className="text-muted-foreground text-sm">Набір не здійснюється</span>

  if (cell.rate.availability === 'to-be-announced' || cell.rate.amountPerYear === null)
    return <span className="text-muted-foreground text-sm">Вартість уточнюється</span>

  return (
    <div>
      <p className="font-jetbrains text-lg font-semibold tracking-tight tabular-nums">
        {formatCurrency(cell.rate.amountPerYear)}
      </p>
      <p className="text-muted-foreground mt-1 text-xs leading-5">
        {cell.rate.totalAmount === null
          ? 'Повна сума не вказана'
          : `${formatCurrency(cell.rate.totalAmount)} за весь період`}
      </p>
      <p className="text-muted-foreground text-xs leading-5">{cell.programForm.durationLabel}</p>
      {!!cell.rate.note && (
        <p className="text-muted-foreground mt-2 text-xs leading-5">{cell.rate.note}</p>
      )}
    </div>
  )
}
