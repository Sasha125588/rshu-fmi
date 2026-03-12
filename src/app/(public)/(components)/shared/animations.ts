import type { Variants } from 'motion/react'

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
} as unknown as Variants

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as unknown as Variants

export const cardHover = {
  y: -4,
  scale: 1.01,
  transition: { duration: 0.2, ease: 'easeOut' },
}
