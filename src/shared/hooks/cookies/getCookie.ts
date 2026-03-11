import { getCookies } from './getCookies'

export const getCookie = (key: string): string | undefined => {
  const cookies = getCookies()
  return cookies[key]
}
