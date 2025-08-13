export const formatCurrency = (value: number | string) => {
	if (typeof value === 'string') return value
	return value.toLocaleString('uk-UA')
}
