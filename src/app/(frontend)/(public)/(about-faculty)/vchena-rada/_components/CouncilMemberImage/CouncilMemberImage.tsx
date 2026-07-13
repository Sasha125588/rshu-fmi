import { UserIcon } from 'lucide-react'
import Image, { type ImageProps } from 'next/image'

import { cn } from '@/lib/utils'

import type { AcademicCouncilMember } from '@/payload-types'

interface CouncilMemberImageProps {
  name: string
  photo: AcademicCouncilMember['photo']
  photoUrl: AcademicCouncilMember['photoUrl']
}

export const CouncilMemberImage = ({
  name,
  photo,
  photoUrl,
  className,
  ...props
}: CouncilMemberImageProps & Omit<ImageProps, 'src' | 'alt'>) => {
  const media = photo && typeof photo === 'object' ? photo : null
  const image = media?.sizes?.card

  const blurDataURL = media?.blurDataURL ?? undefined

  const rawSrc = image?.url ?? media?.url ?? photoUrl
  const src =
    rawSrc && media?.updatedAt
      ? `${rawSrc}${rawSrc.includes('?') ? '&' : '?'}v=${encodeURIComponent(media.updatedAt)}`
      : rawSrc

  if (!src)
    return (
      <div
        className={cn(
          'bg-muted text-muted-foreground mt-6 flex aspect-square w-full flex-col items-center justify-center object-cover select-none',
          className
        )}
      >
        <UserIcon className="h-12 w-12 stroke-[1.5] opacity-60" />
        <span className="text-muted-foreground/80 mt-2 text-xs font-medium">Немає фото</span>
      </div>
    )

  return (
    <Image
      src={src}
      alt={media?.alt || `Фото: ${name}`}
      width={image?.width || media?.width || 768}
      height={image?.height || media?.height || 768}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      className={cn('mt-6 aspect-square w-full object-cover', className)}
      style={{ objectPosition: `${media?.focalX}% ${media?.focalY}%` }}
      {...props}
    />
  )
}
