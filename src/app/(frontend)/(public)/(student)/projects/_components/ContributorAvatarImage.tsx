'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ContributorAvatarImageProps {
  fallbackSrc: string
  githubAvatarUrl?: string | null
}

export const ContributorAvatarImage = ({
  fallbackSrc,
  githubAvatarUrl,
}: ContributorAvatarImageProps) => {
  const [failedUrl, setFailedUrl] = useState<string>()
  const remoteSrc = githubAvatarUrl !== failedUrl ? githubAvatarUrl : undefined

  return (
    <Image
      src={remoteSrc || fallbackSrc}
      alt=""
      fill
      sizes="(min-width: 640px) 52px, 44px"
      className="rounded-full object-cover"
      onError={remoteSrc ? () => setFailedUrl(remoteSrc) : undefined}
    />
  )
}
