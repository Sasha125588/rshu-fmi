import type { Variants } from 'motion/react'

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const cardHover = {
  y: -4,
  scale: 1.01,
  transition: { duration: 0.2, ease: 'easeOut' },
}
