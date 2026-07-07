import { useRender } from '@base-ui/react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import type { VariantProps } from 'class-variance-authority'

const typographyVariants = cva('', {
  variants: {
    variant: {
      display:
        'text-5xl font-bold leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl xl:text-8xl',

      'heading-2xl': 'font-jetbrains text-5xl tracking-tighter text-balance md:text-7xl',
      'heading-xl':
        'font-jetbrains text-5xl leading-tight font-bold tracking-tight text-balance md:text-7xl',
      'heading-lg': 'text-3xl font-semibold tracking-tight text-balance md:text-4xl',
      'heading-md': 'text-2xl font-semibold tracking-tight text-balance md:text-3xl',

      'title-lg': 'text-xl leading-snug font-semibold tracking-tight text-balance md:text-2xl',
      'title-md': 'text-xl leading-tight font-semibold tracking-tight text-balance',
      'title-sm': 'text-lg leading-snug font-semibold tracking-tight text-balance',

      'body-lg': 'text-lg leading-7 font-medium md:text-xl',
      'body-md': 'text-base leading-6',
      'body-sm': 'text-sm leading-5',

      label: 'text-sm leading-5 font-semibold',
      link: 'text-sm leading-5 font-medium',
      caption: 'text-xs leading-4',
      overline: 'font-jetbrains text-xs font-medium tracking-[0.18em] uppercase',
    },
  },
  defaultVariants: {
    variant: 'body-md',
  },
})

export type TypographyTag =
  | 'a'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'small'
  | 'time'
  | 'code'
  | 'blockquote'

type TypographyProps<Tag extends TypographyTag> = useRender.ComponentProps<Tag> &
  VariantProps<typeof typographyVariants> & {
    as?: Tag
  }

const Typography = <Tag extends TypographyTag>({
  as = 'div' as Tag,
  className,
  render,
  variant = 'body-md',
  ...props
}: TypographyProps<Tag>) => {
  const internalProps = {
    className: cn(typographyVariants({ variant, className })),
    'data-slot': 'typography',
    'data-variant': variant,
    ...props,
  }

  return useRender({
    defaultTagName: as,
    render,
    props: internalProps,
  })
}

export { Typography, typographyVariants }
