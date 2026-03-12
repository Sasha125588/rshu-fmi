'use client'

import { ArrowUpRight, GraduationCapIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { fadeUpVariant, staggerContainer } from '../shared/animations'
import { ScrollReveal } from '../shared/ScrollReveal'
import { SpecializationVisual } from './components/SpecializationVisual'
import { SPECIALIZATIONS_DATA } from './constants/data'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/shared/helpers'

import type { Route } from 'next'

export const Specializations = () => {
  const [activeId, setActiveId] = useState(SPECIALIZATIONS_DATA[0].id)
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-30% 0px -50% 0px' }
    )

    for (const ref of sectionRefs.current.values()) {
      observer.observe(ref)
    }

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    sectionRefs.current.get(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section id="specializations">
      <ScrollReveal>
        <div className="mb-16 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <GraduationCapIcon className="text-green-primary h-5 w-5" />
            <Badge
              className="border-green-primary/20 text-green-primary text-sm font-normal"
              variant="outline"
            >
              Спеціальності
            </Badge>
          </div>
          <h2 className="mb-4 text-3xl font-semibold">Обирайте напрямок свого майбутнього</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Наші освітні програми поєднують фундаментальні знання з практичними навичками,
            необхідними для успішної кар&apos;єри в IT та освіті.
          </p>
        </div>
      </ScrollReveal>

      <div className="flex gap-8 lg:gap-12">
        {/* Sidebar — desktop only */}
        <nav className="hidden shrink-0 lg:block lg:w-[180px]">
          <div className="sticky top-[30vh]">
            <ul className="space-y-3">
              {SPECIALIZATIONS_DATA.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200',
                        activeId === item.id
                          ? 'text-green-primary bg-green-primary/10 font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{item.shortTitle}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="min-w-0 flex-1 space-y-20 lg:space-y-28"
        >
          {SPECIALIZATIONS_DATA.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                id={item.id}
                ref={(el) => {
                  if (el) sectionRefs.current.set(item.id, el)
                }}
                variants={fadeUpVariant}
                className="scroll-mt-32"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                  {/* Text content */}
                  <div className="flex-1">
                    <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-medium tracking-widest uppercase">
                      <Icon className="size-4" />
                      {item.shortTitle}
                    </div>
                    <h3 className="mb-4 text-3xl font-bold md:text-4xl">{item.title}</h3>
                    <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mb-6 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className="border-green-primary/40 text-green-primary font-semibold"
                      >
                        {item.date}
                      </Badge>
                      {item.tags.map((tag) => (
                        <Badge
                          variant="outline"
                          key={tag}
                          className="bg-accent/50 text-muted-foreground border-none text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link
                      href={`/#specializations/${item.title}` as Route}
                      className="text-green-primary group/link inline-flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                      Дізнатися більше
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </Link>
                  </div>

                  {/* Visual — desktop only */}
                  <div className="hidden flex-1 lg:block">
                    <SpecializationVisual id={item.id} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
