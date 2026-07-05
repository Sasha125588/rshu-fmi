'use client'

import { ArrowRightIcon, UsersIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

import { fadeUpVariant, staggerContainer } from '../shared/animations'
import { ScrollReveal } from '../shared/ScrollReveal'
import { ABOUT_ACCORDION_ITEMS } from './constants/data'
import { Badge } from '@/components/ui/badge'

const STATS = [
  { value: '90+', label: 'Років досвіду' },
  { value: '6', label: 'Спеціальностей' },
  { value: '1000+', label: 'Випускників' },
  { value: '50+', label: 'Викладачів' },
]

export const AboutUs = () => (
  <section id="about">
    <ScrollReveal>
      <div className="mb-12 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <UsersIcon
            className="text-green-primary"
            size={20}
          />
          <Badge
            className="border-green-primary/20 text-green-primary border text-sm font-normal"
            variant="outline"
          >
            Про нас
          </Badge>
        </div>
        <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
          Факультет майбутнього для сучасного світу
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
          Поєднуємо багаторічні традиції математичної школи з інноваційними підходами до викладання
          IT-дисциплін. Готуємо фахівців, здатних вирішувати складні завдання цифрового світу.
        </p>
      </div>
    </ScrollReveal>

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {ABOUT_ACCORDION_ITEMS.map(({ value, title, content, Icon }) => (
        <motion.div
          key={value}
          variants={fadeUpVariant}
          className="border-border/50 bg-card/30 rounded-xl border p-6 backdrop-blur-sm"
        >
          <Icon className="text-green-primary mb-3 size-6" />
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground mt-2 text-sm">{content}</p>
        </motion.div>
      ))}
    </motion.div>

    <ScrollReveal delay={0.2}>
      <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="text-center"
          >
            <div className="text-green-primary text-3xl font-bold md:text-4xl">{stat.value}</div>
            <div className="text-muted-foreground mt-1 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </ScrollReveal>

    <ScrollReveal
      delay={0.3}
      className="mt-10 flex justify-center"
    >
      <Link
        href="/history"
        className="group text-green-primary hover:bg-green-primary/10 border-green-primary/20 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-200"
      >
        Детальніше про історію
        <ArrowRightIcon
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </ScrollReveal>
  </section>
)
