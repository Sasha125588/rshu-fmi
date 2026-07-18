export const slugifyProgramValue = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[ʼ’'`]/g, '')
    .split('')
    .map((char) => ukrainianTransliterationMap[char] ?? char)
    .join('')
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const ukrainianTransliterationMap: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'h',
  ґ: 'g',
  д: 'd',
  е: 'e',
  є: 'ie',
  ж: 'zh',
  з: 'z',
  и: 'y',
  і: 'i',
  ї: 'i',
  й: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ь: '',
  ю: 'iu',
  я: 'ia',
}

export const getRelationId = <Target extends { id: number | string }>(
  value?: Target | Target['id'] | null | undefined
) => {
  if (!value) return undefined

  return typeof value === 'object' ? value.id : value
}
