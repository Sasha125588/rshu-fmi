'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ExternalNewsCoverProps {
  src: string
  featured: boolean
}

export const ExternalNewsCover = ({ src, featured }: ExternalNewsCoverProps) => {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <Image
      src={src}
      alt=""
      unoptimized
      fill
      loading="lazy"
      sizes={
        featured
          ? '(max-width: 767px) calc(100vw - 4rem), 38vw'
          : '(max-width: 767px) calc(100vw - 4rem), 220px'
      }
      onError={() => setFailed(true)}
      className="object-cover transition-transform duration-500 group-hover/news-card:scale-[1.03]"
    />
  )
}
