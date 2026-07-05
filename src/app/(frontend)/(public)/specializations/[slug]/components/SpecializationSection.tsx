import type { ReactNode } from 'react'

type SpecializationSectionProps = {
  eyebrow: string
  title: string
  children: ReactNode
}

export const SpecializationSection = ({ eyebrow, title, children }: SpecializationSectionProps) => (
  <section className="border-border/60 grid gap-6 border-t py-10 md:grid-cols-[260px_1fr] md:py-14">
    <div>
      <p className="text-green-primary font-mono text-xs tracking-[0.24em] uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-balance md:text-3xl">{title}</h2>
    </div>
    <div>{children}</div>
  </section>
)
