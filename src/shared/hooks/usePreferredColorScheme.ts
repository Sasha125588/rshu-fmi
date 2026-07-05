import { useMediaQuery } from './useMediaQuery'

/** The use preferred color scheme return type */
export type UsePreferredColorSchemeReturn = 'dark' | 'light' | 'no-preference'

export const usePreferredColorScheme = (): UsePreferredColorSchemeReturn => {
  const isLight = useMediaQuery('(prefers-color-scheme: light)')
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')

  if (isLight) return 'light'
  if (isDark) return 'dark'
  return 'no-preference'
}
