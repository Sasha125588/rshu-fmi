import { useState } from 'react'

export type OperatingSystem = 'android' | 'ios' | 'linux' | 'macos' | 'undetermined' | 'windows'

export const getOperatingSystem = (): OperatingSystem => {
  if (typeof window === 'undefined') return 'undetermined'

  const { userAgent } = window.navigator

  if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent)) return 'macos'
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios'
  if (/Win32|Win64|Windows|WinCE/i.test(userAgent)) return 'windows'
  if (/Android/i.test(userAgent)) return 'android'
  if (/Linux/i.test(userAgent)) return 'linux'

  return 'undetermined'
}

export const useOperatingSystem = () => {
  const [osOperatingSystem] = useState<OperatingSystem>(getOperatingSystem())
  return osOperatingSystem
}
