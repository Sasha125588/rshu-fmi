const currencyFormatter = new Intl.NumberFormat('uk-UA', {
  currency: 'UAH',
  maximumFractionDigits: 0,
  style: 'currency',
})

export const formatCurrency = (value: number) => currencyFormatter.format(value)
