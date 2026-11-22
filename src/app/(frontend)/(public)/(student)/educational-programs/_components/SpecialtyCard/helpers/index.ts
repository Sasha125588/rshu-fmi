export const formatScore = (value?: number | null) =>
  !value ? '—' : value.toLocaleString('uk-UA', { minimumFractionDigits: 2 })
