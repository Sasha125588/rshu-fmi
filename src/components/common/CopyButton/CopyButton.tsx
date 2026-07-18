'use client'

import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { CheckIcon, CopyIcon } from 'lucide-react'

import { Button } from '@/components/ui'
import { useCopy } from '@/shared/hooks'

import type { buttonVariants } from '@/components/ui'
import type { VariantProps } from 'class-variance-authority'

interface CopyButtonProps {
  text: string
  label: string
  copiedLabel: string
}

export const CopyButton = ({
  text,
  label,
  copiedLabel,
  ...props
}: CopyButtonProps & ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) => {
  const { copied, copy } = useCopy()

  const handleCopy = () => copy(text)

  const Icon = copied ? CheckIcon : CopyIcon
  const labelText = copied ? copiedLabel : label

  return (
    <Button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      disabled={copied}
      {...props}
    >
      <Icon
        aria-hidden="true"
        data-icon="inline-start"
      />
      {labelText}
    </Button>
  )
}
