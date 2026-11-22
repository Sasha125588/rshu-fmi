'use client'

import { useLayoutEffect, useRef } from 'react'

import { useTheme } from '@/frontend_contexts/theme'

interface Point {
  x: number
  y: number
}

interface TracePoint extends Point {
  createdAt: number
}

interface DriverGeometry {
  elbow: Point
  pivot: Point
  tip: Point
}

interface SceneLayout {
  amplitude: Point
  bendDirections: readonly [-1 | 1, -1 | 1, -1 | 1]
  crankRadii: readonly [number, number, number]
  focus: Point
  isMobile: boolean
  pivots: readonly [Point, Point, Point]
  pointerPullRadius: number
  traceLifetime: number
}

interface SceneColors {
  accent: readonly [number, number, number]
  background: readonly [number, number, number]
  foreground: readonly [number, number, number]
  muted: readonly [number, number, number]
}

const DRIVER_PERIODS = [19.2, 21.7, 23.3] as const
const DRIVER_PHASES = [0.4, 2.2, 4.5] as const
const DRIVER_BASE_ANGLES = [1.02, 2.76, -1.92] as const
const DRIVER_SWEEPS = [0.38, 0.27, 0.32] as const
const MAX_PIXEL_RATIO = 2
const POINTER_DAMPING_RATIO = 0.82
const POINTER_FREQUENCY = 8
const TRACE_BUCKETS = 12

const LIGHT_ACCENT_FALLBACK = [0.36, 0.29, 0.84] as const
const DARK_ACCENT_FALLBACK = [0.7, 0.64, 1] as const
const LIGHT_BACKGROUND_FALLBACK = [1, 1, 1] as const
const DARK_BACKGROUND_FALLBACK = [0.055, 0.05, 0.075] as const
const LIGHT_FOREGROUND_FALLBACK = [0.11, 0.1, 0.15] as const
const DARK_FOREGROUND_FALLBACK = [0.93, 0.92, 0.97] as const
const LIGHT_MUTED_FALLBACK = [0.41, 0.39, 0.47] as const
const DARK_MUTED_FALLBACK = [0.62, 0.6, 0.68] as const

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value))

const lerpPoint = (start: Point, end: Point, amount: number): Point => ({
  x: start.x + (end.x - start.x) * amount,
  y: start.y + (end.y - start.y) * amount,
})

const getDistance = (start: Point, end: Point) => Math.hypot(end.x - start.x, end.y - start.y)

const getCssColor = (
  variableName: string,
  fallback: readonly [number, number, number]
): readonly [number, number, number] => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
  if (!value) return fallback

  const colorCanvas = document.createElement('canvas')
  colorCanvas.width = 1
  colorCanvas.height = 1
  const context = colorCanvas.getContext('2d', { willReadFrequently: true })
  if (!context) return fallback

  context.fillStyle = '#010203'
  context.fillStyle = value
  if (context.fillStyle === '#010203') return fallback

  context.fillRect(0, 0, 1, 1)
  const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data

  return alpha === 0 ? fallback : [red / 255, green / 255, blue / 255]
}

const rgba = (color: readonly [number, number, number], alpha: number) =>
  `rgba(${Math.round(color[0] * 255)}, ${Math.round(color[1] * 255)}, ${Math.round(
    color[2] * 255
  )}, ${alpha})`

const getSceneLayout = (width: number, height: number): SceneLayout => {
  const isMobile = width < 768

  if (isMobile) {
    return {
      amplitude: {
        x: width * 0.18,
        y: height * 0.13,
      },
      bendDirections: [-1, 1, -1],
      crankRadii: [height * 0.13, height * 0.15, height * 0.14],
      focus: {
        x: width * 0.77,
        y: height * 0.74,
      },
      isMobile,
      pivots: [
        { x: width * 0.58, y: -height * 0.13 },
        { x: width * 1.12, y: height * 0.56 },
        { x: width * 0.87, y: height * 1.14 },
      ],
      pointerPullRadius: width * 0.42,
      traceLifetime: 9,
    }
  }

  return {
    amplitude: {
      x: Math.min(width * 0.105, height * 0.34),
      y: height * 0.23,
    },
    bendDirections: [-1, 1, -1],
    crankRadii: [height * 0.15, height * 0.17, height * 0.16],
    focus: {
      x: width * 0.8,
      y: height * 0.56,
    },
    isMobile,
    pivots: [
      { x: width * 0.62, y: -height * 0.04 },
      { x: width * 1.015, y: height * 0.2 },
      { x: width * 0.91, y: height * 1.04 },
    ],
    pointerPullRadius: Math.min(width * 0.3, height * 1.15),
    traceLifetime: 12,
  }
}

const getDriverPhases = (elapsed: number) =>
  DRIVER_PERIODS.map(
    (period, index) => (elapsed / period) * Math.PI * 2 + DRIVER_PHASES[index]
  ) as [number, number, number]

const getAutonomousStylus = (elapsed: number, layout: SceneLayout): Point => {
  const [phaseOne, phaseTwo, phaseThree] = getDriverPhases(elapsed)
  const xSignal =
    Math.sin(phaseOne) * 0.48 +
    Math.sin(phaseTwo + Math.sin(phaseThree) * 0.22) * 0.31 +
    Math.cos(phaseThree * 1.83) * 0.21
  const ySignal =
    Math.cos(phaseOne * 1.47) * 0.29 +
    Math.sin(phaseTwo * 1.29 + 0.65) * 0.39 +
    Math.sin(phaseThree + Math.sin(phaseOne) * 0.3) * 0.32

  return {
    x: layout.focus.x + layout.amplitude.x * xSignal,
    y: layout.focus.y + layout.amplitude.y * ySignal,
  }
}

const getDriverGeometry = (
  elapsed: number,
  attachment: Point,
  layout: SceneLayout
): [DriverGeometry, DriverGeometry, DriverGeometry] => {
  const phases = getDriverPhases(elapsed)

  return layout.pivots.map((pivot, index) => {
    const crankAngle = DRIVER_BASE_ANGLES[index] + DRIVER_SWEEPS[index] * Math.sin(phases[index])
    const tip = {
      x: pivot.x + Math.cos(crankAngle) * layout.crankRadii[index],
      y: pivot.y + Math.sin(crankAngle) * layout.crankRadii[index],
    }
    const distance = getDistance(tip, attachment)
    const direction = {
      x: (attachment.x - tip.x) / Math.max(distance, 1),
      y: (attachment.y - tip.y) / Math.max(distance, 1),
    }
    const normal = { x: -direction.y, y: direction.x }
    const bend =
      layout.bendDirections[index] * clamp(distance * (layout.isMobile ? 0.09 : 0.13), 18, 62)
    const elbowBase = lerpPoint(tip, attachment, layout.isMobile ? 0.55 : 0.48)

    return {
      elbow: {
        x: elbowBase.x + normal.x * bend,
        y: elbowBase.y + normal.y * bend,
      },
      pivot,
      tip,
    }
  }) as [DriverGeometry, DriverGeometry, DriverGeometry]
}

const drawLine = (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  strokeStyle: string,
  lineWidth: number
) => {
  context.beginPath()
  context.moveTo(start.x, start.y)
  context.lineTo(end.x, end.y)
  context.strokeStyle = strokeStyle
  context.lineWidth = lineWidth
  context.stroke()
}

const drawDoubleStrut = (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  color: readonly [number, number, number],
  alpha: number,
  compact: boolean
) => {
  const distance = getDistance(start, end)
  if (distance < 1) return

  const normal = {
    x: (-(end.y - start.y) / distance) * (compact ? 1.6 : 2.2),
    y: ((end.x - start.x) / distance) * (compact ? 1.6 : 2.2),
  }
  const strokeStyle = rgba(color, alpha)

  drawLine(
    context,
    { x: start.x + normal.x, y: start.y + normal.y },
    { x: end.x + normal.x, y: end.y + normal.y },
    strokeStyle,
    0.9
  )
  drawLine(
    context,
    { x: start.x - normal.x, y: start.y - normal.y },
    { x: end.x - normal.x, y: end.y - normal.y },
    strokeStyle,
    0.9
  )

  const sleeve = lerpPoint(start, end, 0.68)
  const angle = Math.atan2(end.y - start.y, end.x - start.x)
  context.save()
  context.translate(sleeve.x, sleeve.y)
  context.rotate(angle)
  context.strokeStyle = rgba(color, alpha * 1.35)
  context.lineWidth = 0.9
  context.strokeRect(compact ? -5 : -7, compact ? -3 : -4, compact ? 10 : 14, compact ? 6 : 8)
  context.restore()
}

const drawJoint = (
  context: CanvasRenderingContext2D,
  point: Point,
  radius: number,
  colors: SceneColors,
  alpha: number
) => {
  context.beginPath()
  context.arc(point.x, point.y, radius, 0, Math.PI * 2)
  context.fillStyle = rgba(colors.background, 0.96)
  context.fill()
  context.strokeStyle = rgba(colors.foreground, alpha)
  context.lineWidth = 1.1
  context.stroke()
}

const drawTrail = (
  context: CanvasRenderingContext2D,
  trail: TracePoint[],
  now: number,
  lifetime: number,
  accentColor: readonly [number, number, number],
  isDark: boolean
) => {
  if (trail.length < 2) return

  for (let bucket = TRACE_BUCKETS - 1; bucket >= 0; bucket -= 1) {
    const minimumAge = bucket / TRACE_BUCKETS
    const maximumAge = (bucket + 1) / TRACE_BUCKETS
    const freshness = 1 - (minimumAge + maximumAge) * 0.5

    context.beginPath()
    let hasSegment = false

    for (let index = 1; index < trail.length; index += 1) {
      const point = trail[index]
      const previousPoint = trail[index - 1]
      const normalizedAge = (now - point.createdAt) / (lifetime * 1000)

      if (normalizedAge < minimumAge || normalizedAge >= maximumAge) continue

      context.moveTo(previousPoint.x, previousPoint.y)
      context.lineTo(point.x, point.y)
      hasSegment = true
    }

    if (!hasSegment) continue

    const alpha = (isDark ? 0.86 : 0.92) * clamp(freshness, 0, 1) ** 1.55
    context.strokeStyle = rgba(accentColor, alpha)
    context.lineWidth = 0.85 + freshness * 0.8
    context.stroke()
  }
}

const drawMechanism = ({
  colors,
  context,
  elapsed,
  isDark,
  layout,
  stylus,
  tangent,
}: {
  colors: SceneColors
  context: CanvasRenderingContext2D
  elapsed: number
  isDark: boolean
  layout: SceneLayout
  stylus: Point
  tangent: Point
}) => {
  const tangentLength = Math.max(1, Math.hypot(tangent.x, tangent.y))
  const direction = {
    x: tangent.x / tangentLength,
    y: tangent.y / tangentLength,
  }
  const collar = {
    x: stylus.x - direction.x * (layout.isMobile ? 6 : 8),
    y: stylus.y - direction.y * (layout.isMobile ? 6 : 8),
  }
  const drivers = getDriverGeometry(elapsed, collar, layout)
  const structuralAlpha = isDark ? 0.31 : 0.23
  const rodAlpha = isDark ? 0.42 : 0.32

  drivers.forEach((driver) => {
    if (!layout.isMobile) {
      drawLine(context, driver.pivot, driver.tip, rgba(colors.foreground, structuralAlpha), 1.15)
      drawJoint(context, driver.pivot, 8, colors, isDark ? 0.58 : 0.48)
      drawJoint(context, driver.tip, 4.8, colors, isDark ? 0.5 : 0.4)
    }

    drawDoubleStrut(
      context,
      driver.tip,
      driver.elbow,
      colors.muted,
      structuralAlpha,
      layout.isMobile
    )
    drawLine(
      context,
      driver.elbow,
      collar,
      rgba(colors.foreground, rodAlpha),
      layout.isMobile ? 0.9 : 1
    )
    drawJoint(context, driver.elbow, layout.isMobile ? 4.2 : 5.2, colors, rodAlpha)
  })

  drawJoint(context, collar, layout.isMobile ? 4.3 : 5.2, colors, isDark ? 0.62 : 0.52)
  drawLine(context, collar, stylus, rgba(colors.foreground, isDark ? 0.72 : 0.62), 1.15)
  context.beginPath()
  context.arc(stylus.x, stylus.y, layout.isMobile ? 1.9 : 2.2, 0, Math.PI * 2)
  context.fillStyle = rgba(colors.accent, isDark ? 0.9 : 0.96)
  context.fill()
}

const TrajectoryMachineFallback = () => (
  <>
    <svg
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      className="hidden size-full md:block"
    >
      <g className="fill-none stroke-[var(--accent-violet)]">
        <path
          d="M760 310C790 210 900 185 1015 230C1100 270 1070 370 985 380"
          strokeWidth="0.95"
          opacity="0.12"
        />
        <path
          d="M985 380C880 392 835 315 872 246C914 170 1032 170 1058 252"
          strokeWidth="1.25"
          opacity="0.38"
        />
        <path
          d="M1058 252C1080 325 984 348 930 318C900 300 922 281 955 275"
          strokeWidth="1.65"
          opacity="0.9"
        />
      </g>

      <g
        className="stroke-foreground fill-none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g opacity="0.24">
          <path d="M740-12L774 67M1210 96L1130 151M1092 495L1035 410" />
          <path d="M771.9 68.4L830.9 155.4M776.1 65.6L835.1 152.6" />
          <path d="M1128.3 149.2L1059.3 209.2M1131.7 152.8L1062.7 212.8" />
          <path d="M1033.2 411.2L910.2 378.2M1036.8 408.8L913.8 375.8" />
        </g>
        <g
          opacity="0.38"
          strokeWidth="1"
        >
          <path d="M833 154L955 275M1061 211L955 275M912 377L955 275" />
        </g>
        <g className="fill-background">
          <circle
            cx="740"
            cy="-12"
            r="9"
          />
          <circle
            cx="1210"
            cy="96"
            r="9"
          />
          <circle
            cx="1092"
            cy="495"
            r="9"
          />
          <circle
            cx="774"
            cy="67"
            r="5"
          />
          <circle
            cx="1130"
            cy="151"
            r="5"
          />
          <circle
            cx="1035"
            cy="410"
            r="5"
          />
          <circle
            cx="833"
            cy="154"
            r="5"
          />
          <circle
            cx="1061"
            cy="211"
            r="5"
          />
          <circle
            cx="912"
            cy="377"
            r="5"
          />
          <circle
            cx="947"
            cy="282"
            r="5"
          />
        </g>
      </g>
      <path
        d="M947 282L955 275"
        className="stroke-foreground"
        strokeWidth="1.2"
      />
      <circle
        cx="955"
        cy="275"
        r="2.2"
        className="fill-[var(--accent-violet)]"
      />
    </svg>

    <svg
      viewBox="0 0 390 420"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      className="block size-full md:hidden"
    >
      <g className="fill-none stroke-[var(--accent-violet)]">
        <path
          d="M188 361C166 301 218 238 292 246C355 253 376 319 338 357"
          strokeWidth="0.95"
          opacity="0.12"
        />
        <path
          d="M338 357C292 398 220 382 216 326C212 279 264 265 316 282"
          strokeWidth="1.25"
          opacity="0.38"
        />
        <path
          d="M316 282C352 304 330 335 300 305"
          strokeWidth="1.65"
          opacity="0.9"
        />
      </g>
      <g
        className="stroke-foreground fill-none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g opacity="0.22">
          <path d="M211 166L255 226M408 239L351 272M344 433L326 355" />
          <path d="M253.4 227.2L294.4 302.2M256.6 224.8L297.6 299.8" />
          <path d="M349.5 270.4L296.5 301.4M352.5 273.6L299.5 304.6" />
          <path d="M324.4 354.5L296.4 303.5M327.6 355.5L299.6 304.5" />
        </g>
        <g className="fill-background">
          <circle
            cx="255"
            cy="226"
            r="4.5"
          />
          <circle
            cx="351"
            cy="272"
            r="4.5"
          />
          <circle
            cx="326"
            cy="355"
            r="4.5"
          />
          <circle
            cx="294"
            cy="302"
            r="4.5"
          />
        </g>
      </g>
      <path
        d="M294 302L300 305"
        className="stroke-foreground"
        strokeWidth="1.1"
      />
      <circle
        cx="300"
        cy="305"
        r="2"
        className="fill-[var(--accent-violet)]"
      />
    </svg>
  </>
)

export const TrajectoryMachine = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fallbackRef = useRef<HTMLDivElement>(null)
  const { value: theme } = useTheme()
  const isDark = theme === 'dark'

  useLayoutEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const fallback = fallbackRef.current
    if (!container || !canvas) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    const colors: SceneColors = {
      accent: getCssColor('--accent-violet', isDark ? DARK_ACCENT_FALLBACK : LIGHT_ACCENT_FALLBACK),
      background: getCssColor(
        '--background',
        isDark ? DARK_BACKGROUND_FALLBACK : LIGHT_BACKGROUND_FALLBACK
      ),
      foreground: getCssColor(
        '--foreground',
        isDark ? DARK_FOREGROUND_FALLBACK : LIGHT_FOREGROUND_FALLBACK
      ),
      muted: getCssColor('--muted-foreground', isDark ? DARK_MUTED_FALLBACK : LIGHT_MUTED_FALLBACK),
    }
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const pointer = { x: 0, y: 0, active: 0, targetActive: 0 }
    const pointerOffset = { x: 0, y: 0 }
    const pointerVelocity = { x: 0, y: 0 }
    const trail: TracePoint[] = []
    let animationFrame = 0
    let canvasHeight = 1
    let canvasWidth = 1
    let hasDrawn = false
    let isContextLost = false
    let isDocumentVisible = !document.hidden
    let isInViewport = true
    let layout = getSceneLayout(1, 1)
    let pixelRatio = 1
    let previousFrame = 0
    let sceneTime = 0
    let stylus = { ...layout.focus }

    const showFallback = () => fallback?.classList.remove('opacity-0')
    const hideFallback = () => fallback?.classList.add('opacity-0')

    const prefillTrail = (now: number) => {
      trail.length = 0
      const sampleCount = Math.ceil(layout.traceLifetime * 60)

      for (let index = 0; index <= sampleCount; index += 1) {
        const age = layout.traceLifetime * (1 - index / sampleCount)
        const point = getAutonomousStylus(sceneTime - age, layout)
        trail.push({ ...point, createdAt: now - age * 1000 })
      }

      const finalPoint = trail.at(-1)
      stylus = finalPoint ? { x: finalPoint.x, y: finalPoint.y } : { ...layout.focus }
      pointerOffset.x = 0
      pointerOffset.y = 0
      pointerVelocity.x = 0
      pointerVelocity.y = 0
    }

    const resize = (force = false) => {
      const bounds = container.getBoundingClientRect()
      const width = Math.max(1, Math.floor(bounds.width))
      const height = Math.max(1, Math.floor(bounds.height))
      const nextPixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
      const nextWidth = Math.max(1, Math.floor(width * nextPixelRatio))
      const nextHeight = Math.max(1, Math.floor(height * nextPixelRatio))
      const didResize =
        canvas.width !== nextWidth ||
        canvas.height !== nextHeight ||
        canvasWidth !== width ||
        canvasHeight !== height ||
        pixelRatio !== nextPixelRatio

      if (!didResize && !force) return false

      if (canvas.width !== nextWidth) canvas.width = nextWidth
      if (canvas.height !== nextHeight) canvas.height = nextHeight
      canvasWidth = width
      canvasHeight = height
      pixelRatio = nextPixelRatio
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      layout = getSceneLayout(width, height)
      prefillTrail(performance.now())
      return true
    }

    const draw = (now: number) => {
      context.clearRect(0, 0, canvasWidth, canvasHeight)
      context.lineCap = 'round'
      context.lineJoin = 'round'

      drawTrail(context, trail, now, layout.traceLifetime, colors.accent, isDark)
      const previousPoint = trail.at(-2) ?? stylus
      drawMechanism({
        colors,
        context,
        elapsed: sceneTime,
        isDark,
        layout,
        stylus,
        tangent: {
          x: stylus.x - previousPoint.x,
          y: stylus.y - previousPoint.y,
        },
      })

      if (!hasDrawn) {
        hasDrawn = true
        hideFallback()
      }
    }

    const updatePointerSpring = (deltaTime: number, elapsed: number) => {
      const autonomousStylus = getAutonomousStylus(elapsed, layout)
      pointer.active += (pointer.targetActive - pointer.active) * (1 - Math.exp(-deltaTime * 11))

      const delta = {
        x: pointer.x - autonomousStylus.x,
        y: pointer.y - autonomousStylus.y,
      }
      const distance = Math.hypot(delta.x, delta.y)
      const proximity = clamp(1 - distance / Math.max(layout.pointerPullRadius, 1), 0, 1)
      const easedProximity = proximity * proximity * (3 - 2 * proximity)
      const maximumPull = layout.isMobile ? 16 : 28
      const pullScale = pointer.active * easedProximity * 0.12
      const targetOffset = {
        x: clamp(delta.x * pullScale, -maximumPull, maximumPull),
        y: clamp(delta.y * pullScale, -maximumPull, maximumPull),
      }
      const angularFrequencySquared = POINTER_FREQUENCY * POINTER_FREQUENCY
      const damping = 2 * POINTER_DAMPING_RATIO * POINTER_FREQUENCY

      pointerVelocity.x +=
        (angularFrequencySquared * (targetOffset.x - pointerOffset.x) -
          damping * pointerVelocity.x) *
        deltaTime
      pointerVelocity.y +=
        (angularFrequencySquared * (targetOffset.y - pointerOffset.y) -
          damping * pointerVelocity.y) *
        deltaTime
      pointerOffset.x += pointerVelocity.x * deltaTime
      pointerOffset.y += pointerVelocity.y * deltaTime

      stylus = {
        x: autonomousStylus.x + pointerOffset.x,
        y: autonomousStylus.y + pointerOffset.y,
      }
    }

    const shouldAnimate = () =>
      isInViewport && isDocumentVisible && !reducedMotionQuery.matches && !isContextLost

    const render = (now: number) => {
      animationFrame = 0
      if (!shouldAnimate()) return

      if (!previousFrame) previousFrame = now
      const deltaTime = Math.min((now - previousFrame) / 1000, 0.05)
      previousFrame = now
      const simulationSteps = Math.max(1, Math.ceil(deltaTime / (1 / 120)))
      const simulationDelta = deltaTime / simulationSteps

      for (let index = 0; index < simulationSteps; index += 1) {
        sceneTime += simulationDelta
        updatePointerSpring(simulationDelta, sceneTime)
      }

      trail.push({ ...stylus, createdAt: now })
      const oldestAllowedPoint = now - layout.traceLifetime * 1000
      while (trail[0] && trail[0].createdAt < oldestAllowedPoint) trail.shift()

      draw(now)
      animationFrame = requestAnimationFrame(render)
    }

    const startAnimation = () => {
      if (!shouldAnimate() || animationFrame) return
      previousFrame = 0
      animationFrame = requestAnimationFrame(render)
    }

    const stopAnimation = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      animationFrame = 0
      previousFrame = 0
    }

    const syncAnimation = () => {
      if (shouldAnimate()) startAnimation()
      else stopAnimation()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointerQuery.matches || event.pointerType === 'touch') return

      const bounds = container.getBoundingClientRect()
      const isOutside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom

      if (isOutside) {
        pointer.targetActive = 0
        return
      }

      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.targetActive = 1
    }

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden
      syncAnimation()
    }

    const onReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        stopAnimation()
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        hasDrawn = false
        showFallback()
        return
      }

      resize()
      draw(performance.now())
      syncAnimation()
    }

    const onContextLost = (event: Event) => {
      event.preventDefault()
      isContextLost = true
      stopAnimation()
      hasDrawn = false
      showFallback()
    }

    const onContextRestored = () => {
      isContextLost = false
      resize(true)
      if (!reducedMotionQuery.matches) draw(performance.now())
      syncAnimation()
    }

    const resizeObserver = new ResizeObserver(() => {
      const didResize = resize()
      if (didResize && !reducedMotionQuery.matches && !isContextLost) draw(performance.now())
    })
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry?.isIntersecting ?? false
        syncAnimation()
      },
      { threshold: 0.05 }
    )

    resize()
    resizeObserver.observe(container)
    intersectionObserver.observe(container)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotionQuery.addEventListener('change', onReducedMotionChange)
    canvas.addEventListener('contextlost', onContextLost)
    canvas.addEventListener('contextrestored', onContextRestored)

    if (!reducedMotionQuery.matches) {
      draw(performance.now())
      startAnimation()
    }

    return () => {
      stopAnimation()
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange)
      canvas.removeEventListener('contextlost', onContextLost)
      canvas.removeEventListener('contextrestored', onContextRestored)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      showFallback()
    }
  }, [isDark])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        ref={fallbackRef}
        className="absolute inset-0 transition-opacity duration-200"
      >
        <TrajectoryMachineFallback />
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block size-full"
      />
      <div className="from-background via-background/96 absolute inset-0 bg-linear-to-b via-45% to-transparent md:bg-linear-to-r md:via-45%" />
    </div>
  )
}
