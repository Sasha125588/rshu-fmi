const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

export const buildHighlightedHtml = (value: string, query: string) => {
  if (!query) return escapeHtml(value)

  const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  const splitRegex = new RegExp(`(${escapedQuery})`, 'gi')
  const exactRegex = new RegExp(`^${escapedQuery}$`, 'i')

  return value
    .split(splitRegex)
    .map((part) =>
      exactRegex.test(part)
        ? `<span style="color: var(--highlight-color); background: var(--highlight-bg);">${escapeHtml(part)}</span>`
        : escapeHtml(part)
    )
    .join('')
}
