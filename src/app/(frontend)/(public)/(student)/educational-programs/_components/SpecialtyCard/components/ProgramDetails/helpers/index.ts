import { formatCurrency } from '@/shared/helpers'

import type { CatalogTuitionRateSource } from '../../../../../_types'

export const formatPlaces = (value?: number | null) =>
  !value ? 'Уточнюється' : `${value.toLocaleString('uk-UA')} місць`

export const formatTuition = (tuition?: CatalogTuitionRateSource | null) => {
  if (!tuition) return 'Дані не вказані'

  switch (tuition.availability) {
    case 'available':
      return !tuition.amountPerYear ? 'Дані не вказані' : formatCurrency(tuition.amountPerYear)
    case 'to-be-announced':
      return 'Уточнюється'
    case 'unavailable':
      return 'Набір не здійснюється'
  }
}
