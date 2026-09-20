export const getRelationId = <Target extends { id: number | string }>(
  value?: Target | Target['id'] | null | undefined
): Target['id'] | undefined => {
  if (!value) return undefined

  return typeof value === 'object' ? value.id : value
}
