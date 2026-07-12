'use client'

import { ArrowUpRightIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'

import { DepartmentsOrbitCanvas, getDepartmentOrbit } from './DepartmentsOrbitCanvas'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'

import type { Department } from '@/payload-types'

type CardPlacement = 'above' | 'below' | 'left' | 'right'

const cardPlacementClasses: Record<CardPlacement, string> = {
  above: 'bottom-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2',
  below: 'top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2',
  left: 'top-1/2 right-[calc(100%+0.75rem)] -translate-y-1/2',
  right: 'top-1/2 left-[calc(100%+0.75rem)] -translate-y-1/2',
}

export type DepartmentViewModel = Omit<Department, 'generateSlug' | 'updatedAt' | 'createdAt'>

interface DepartmentsExperienceProps {
  departments: DepartmentViewModel[]
}

export const DepartmentsExperience = ({ departments }: DepartmentsExperienceProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const sceneRef = useRef<HTMLDivElement>(null)
  const bodyRefs = useRef<Array<HTMLDivElement | null>>([])

  const bodyPositionsRef = useRef<Array<{ x: number; y: number }>>([])

  const activeIndexRef = useRef<number | null>(activeIndex)
  const hoveredIndexRef = useRef<number | null>(null)
  const focusedIndexRef = useRef<number | null>(null)
  const touchWasSelectedRef = useRef(false)

  const getCardPlacement = (index: number) => {
    const scene = sceneRef.current
    const position = bodyPositionsRef.current[index]
    if (!scene || !position) return 'above'

    const bounds = scene.getBoundingClientRect()
    if (position.x < bounds.width * 0.34) return 'right'
    if (position.x > bounds.width * 0.66) return 'left'
    return position.y < bounds.height * 0.5 ? 'below' : 'above'
  }

  const activateDepartment = (index: number) => {
    activeIndexRef.current = index
    setActiveIndex(index)
  }

  const deactivateDepartment = (index: number) => {
    if (hoveredIndexRef.current === index || focusedIndexRef.current === index) return
    if (activeIndexRef.current !== index) return

    activeIndexRef.current = null
    setActiveIndex(null)
  }

  useLayoutEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const angles = departments.map(
      (department, index) => getDepartmentOrbit(department.slug, index, departments.length).phase
    )
    let frame = 0
    let lastFrameAt = performance.now()
    let isDocumentVisible = !document.hidden

    const positionBodies = (now: number, animate: boolean) => {
      const bounds = scene.getBoundingClientRect()
      const scale = Math.min(bounds.width, bounds.height)
      const elapsed = Math.min((now - lastFrameAt) * 0.001, 0.05)
      lastFrameAt = now

      departments.forEach((department, index) => {
        const body = bodyRefs.current[index]
        if (!body) return

        const orbit = getDepartmentOrbit(department.slug, index, departments.length)
        if (animate) {
          const speedFactor = activeIndexRef.current === index ? 0.1 : 1
          angles[index] += orbit.speed * elapsed * speedFactor
        }

        const x = bounds.width * 0.5 + Math.cos(angles[index]) * orbit.radius * scale
        const y = bounds.height * 0.5 - Math.sin(angles[index]) * orbit.radius * scale * 0.72
        bodyPositionsRef.current[index] = { x, y }
        body.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
        body.style.opacity = '1'
      })
    }

    const shouldAnimate = () => isDocumentVisible

    const render = (now: number) => {
      if (!shouldAnimate()) {
        frame = 0
        return
      }

      positionBodies(now, true)
      frame = requestAnimationFrame(render)
    }

    const syncAnimation = () => {
      if (shouldAnimate() && !frame) {
        lastFrameAt = performance.now()
        frame = requestAnimationFrame(render)
      }
      if (!shouldAnimate() && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden

      syncAnimation()
    }

    const intersectionObserver = new IntersectionObserver(syncAnimation, { threshold: 0.05 })

    intersectionObserver.observe(scene)
    document.removeEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(frame)
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [departments])

  return (
    <section
      aria-label="Інтерактивна орбітальна система кафедр"
      className="border-b"
    >
      <div
        ref={sceneRef}
        className="relative isolate h-[34rem] overflow-hidden md:h-[40rem] lg:h-[min(46rem,78svh)]"
      >
        <DepartmentsOrbitCanvas
          departments={departments}
          activeIndex={activeIndex}
        />

        <div
          aria-hidden="true"
          className="border-accent-violet/20 bg-background/70 font-jetbrains text-accent-violet pointer-events-none absolute top-1/2 left-1/2 z-10 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-semibold tracking-[0.14em] shadow-[0_0_5rem_var(--accent-violet)] backdrop-blur-sm md:size-24"
        >
          ФМІ
        </div>

        {departments.map((department, index) => {
          const isActive = activeIndex === index
          const descriptionId = `department-orbit-description-${department.slug}`

          return (
            <div
              key={department.id}
              ref={(node) => {
                bodyRefs.current[index] = node
              }}
              className={cn(
                'absolute top-0 left-0 opacity-0 transition-opacity duration-300',
                isActive ? 'z-30' : 'z-20'
              )}
            >
              <p
                id={descriptionId}
                className="sr-only"
              >
                {department.name}. {department.description}
              </p>

              <motion.a
                href={department.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${department.shortName}: ${department.name}`}
                aria-describedby={descriptionId}
                data-active={isActive || undefined}
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                onHoverStart={() => {
                  hoveredIndexRef.current = index
                  activateDepartment(index)
                }}
                onHoverEnd={() => {
                  hoveredIndexRef.current = null
                  deactivateDepartment(index)
                }}
                onFocus={() => {
                  focusedIndexRef.current = index
                  activateDepartment(index)
                }}
                onBlur={() => {
                  focusedIndexRef.current = null
                  deactivateDepartment(index)
                }}
                onPointerDown={(event) => {
                  if (event.pointerType === 'mouse') return
                  touchWasSelectedRef.current = activeIndexRef.current === index
                  activateDepartment(index)
                }}
                onClick={(event) => {
                  if (event.detail === 0) return
                  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
                  if (!hasHover && !touchWasSelectedRef.current) event.preventDefault()
                }}
                className="group relative block rounded-full outline-none"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'bg-accent-violet/15 absolute inset-0 rounded-full blur-xl transition-[transform,opacity] duration-300',
                    isActive ? 'scale-150 opacity-100' : 'scale-75 opacity-0 group-hover:opacity-70'
                  )}
                />
                <span
                  className={cn(
                    'bg-background/88 relative flex size-16 flex-col items-center justify-center rounded-full border text-center shadow-lg backdrop-blur-md transition-[border-color,box-shadow] duration-300 md:size-20',
                    isActive
                      ? 'border-accent-violet shadow-[0_0_2.5rem_color-mix(in_oklch,var(--accent-violet)_36%,transparent)]'
                      : 'border-border group-hover:border-accent-violet/60 group-focus-visible:border-accent-violet group-focus-visible:ring-ring group-focus-visible:ring-2'
                  )}
                >
                  <span className="font-jetbrains text-foreground mt-1 max-w-[5.25rem] text-xs font-bold tracking-tight md:text-sm">
                    {department.shortName}
                  </span>
                </span>
              </motion.a>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key={department.id}
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.94, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 4 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className={cn(
                      'bg-background/95 pointer-events-none absolute w-[min(20rem,calc(100vw-7rem))] rounded-xl border p-4 shadow-2xl backdrop-blur-xl md:w-120 md:p-5',
                      cardPlacementClasses[getCardPlacement(index)]
                    )}
                  >
                    <Typography
                      as="p"
                      variant="caption"
                      className="font-jetbrains text-accent-violet"
                    >
                      {department.shortName}
                    </Typography>
                    <Typography
                      as="p"
                      variant="title-sm"
                      className="mt-3"
                    >
                      {department.name}
                    </Typography>
                    <Typography
                      as="p"
                      variant="body-sm"
                      className="text-muted-foreground mt-3 leading-6"
                    >
                      {department.description}
                    </Typography>
                    <Typography
                      as="p"
                      variant="caption"
                      className="font-jetbrains text-muted-foreground mt-4 flex items-center gap-1.5"
                    >
                      Натисніть, щоб відкрити сайт
                      <ArrowUpRightIcon
                        aria-hidden="true"
                        size={14}
                      />
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
