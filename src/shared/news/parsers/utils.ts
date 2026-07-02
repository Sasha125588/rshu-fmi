export const normalizeText = (value: string) => value.replace(/\s+/g, ' ').trim()

export const resolveUrl = (value: string | undefined, origin: string) => {
  if (!value) return undefined

  try {
    return new URL(value, origin).href
  } catch {
    return undefined
  }
}

export const normalizePublishedAt = (value: string | undefined) => {
  if (!value) return undefined

  const datePart = value.match(/^\d{4}-\d{2}-\d{2}/)?.[0]
  return datePart
}
