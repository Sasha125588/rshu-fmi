import { useState } from 'react'

import { copy } from '../utils/helpers'

export const useCopy = (delay: number = 1000) => {
  const [value, setValue] = useState<string>()
  const [copied, setCopied] = useState<boolean>(false)

  const copyToClipboard = async (text: string) => {
    await copy(text)
    setValue(text)
    setCopied(true)
    setTimeout(setCopied, delay, false)
  }

  return { value, copied, copy: copyToClipboard }
}
