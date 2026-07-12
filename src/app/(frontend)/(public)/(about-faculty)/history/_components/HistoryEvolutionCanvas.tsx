'use client'

import { useMotionValueEvent, useReducedMotion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef } from 'react'

import { useTheme } from '@/frontend_contexts/theme'

import type { HistoryEraId } from '../_constants'
import type { MotionValue } from 'motion/react'

const VERTEX_SHADER = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 resolution;
uniform vec2 pointerPosition;
uniform float pointerActive;
uniform float time;
uniform float phase;
uniform float scrollProgress;
uniform float activeNode;
uniform vec3 accentColor;

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(41.173, 289.31))) * 43758.5453);
}

float rectangleMask(vec2 point, vec2 center, vec2 halfSize) {
  vec2 distanceToEdge = abs(point - center) - halfSize;
  return 1.0 - step(0.0, max(distanceToEdge.x, distanceToEdge.y));
}

float segmentDistance(vec2 point, vec2 start, vec2 end) {
  vec2 segment = end - start;
  float projection = clamp(dot(point - start, segment) / max(dot(segment, segment), 0.0001), 0.0, 1.0);
  return length(point - (start + segment * projection));
}

float phiMask(vec2 point) {
  float stem = rectangleMask(point, vec2(0.0), vec2(0.043, 0.43));
  float ellipse = length(vec2(point.x / 0.27, point.y / 0.205));
  float ring = 1.0 - step(0.15, abs(ellipse - 1.0));
  return max(stem, ring);
}

float emMask(vec2 point) {
  float leftStem = rectangleMask(point, vec2(-0.25, 0.0), vec2(0.043, 0.4));
  float rightStem = rectangleMask(point, vec2(0.25, 0.0), vec2(0.043, 0.4));
  float leftDiagonal = 1.0 - step(0.047, segmentDistance(point, vec2(-0.25, 0.38), vec2(0.0, -0.055)));
  float rightDiagonal = 1.0 - step(0.047, segmentDistance(point, vec2(0.0, -0.055), vec2(0.25, 0.38)));
  return max(max(leftStem, rightStem), max(leftDiagonal, rightDiagonal));
}

float iMask(vec2 point) {
  float stem = rectangleMask(point, vec2(0.0), vec2(0.045, 0.4));
  float top = rectangleMask(point, vec2(0.0, 0.375), vec2(0.245, 0.043));
  float bottom = rectangleMask(point, vec2(0.0, -0.375), vec2(0.245, 0.043));
  return max(stem, max(top, bottom));
}

float letterMask(vec2 point, float phaseValue) {
  if (phaseValue < 0.5) return phiMask(point);
  if (phaseValue < 1.5) return emMask(point);
  return iMask(point);
}

float layerSelection(float layerIndex) {
  if (activeNode < -0.5) return 0.0;
  return 1.0 - step(0.5, abs(mod(activeNode, 3.0) - layerIndex));
}

float palimpsestLayer(
  vec2 point,
  vec2 cell,
  vec2 direction,
  float layerIndex,
  float seed,
  float coherence,
  float pointerInfluence,
  float mutationFrame
) {
  float misalignment = mix(0.072, 0.012, coherence);
  vec2 layerOffset = direction * misalignment;
  layerOffset += direction * pointerInfluence * 0.055;

  float mask = letterMask(point + layerOffset, phase);
  float stableNoise = hash(cell + vec2(seed * 17.0, seed * 31.0));
  float changingNoise = hash(cell + vec2(mutationFrame * (1.7 + seed), mutationFrame * (2.3 + seed)));
  float noise = mix(stableNoise, changingNoise, 0.28);
  float strata = 0.5 + 0.5 * sin(cell.x * 0.31 + cell.y * 0.17 + seed * 8.0);
  float selected = layerSelection(layerIndex);
  float erosionThreshold = mix(0.67, 0.37, coherence) + (strata - 0.5) * 0.18 - selected * 0.12;
  float fragment = step(erosionThreshold, noise);

  return mask * fragment * (0.16 + layerIndex * 0.035 + selected * 0.1);
}

void main() {
  float cellSize = 6.0;
  vec2 cell = floor(gl_FragCoord.xy / cellSize);
  vec2 dimensions = max(resolution / cellSize, vec2(1.0));
  vec2 point = (cell - dimensions * 0.5) / dimensions.y;
  vec2 pointer = (pointerPosition / cellSize - dimensions * 0.5) / dimensions.y;

  float mutationFrame = floor(time * 2.4);
  float coherence = smoothstep(0.04, 0.96, scrollProgress);
  vec2 pointerDelta = point - pointer;
  float pointerInfluence = exp(-dot(pointerDelta, pointerDelta) * 34.0) * pointerActive;

  float firstLayer = palimpsestLayer(
    point,
    cell,
    vec2(-0.92, 0.38),
    0.0,
    0.17,
    coherence,
    pointerInfluence,
    mutationFrame
  );
  float secondLayer = palimpsestLayer(
    point,
    cell,
    vec2(0.42, -1.0),
    1.0,
    0.53,
    coherence,
    pointerInfluence,
    mutationFrame
  );
  float thirdLayer = palimpsestLayer(
    point,
    cell,
    vec2(0.88, 0.56),
    2.0,
    0.89,
    coherence,
    pointerInfluence,
    mutationFrame
  );

  vec2 screenUv = gl_FragCoord.xy / resolution;
  float edgeMask = smoothstep(0.03, 0.13, screenUv.x) * (1.0 - smoothstep(0.87, 0.97, screenUv.x));
  edgeMask *= smoothstep(0.03, 0.13, screenUv.y) * (1.0 - smoothstep(0.87, 0.97, screenUv.y));
  float alpha = min(firstLayer + secondLayer + thirdLayer, 0.78) * edgeMask;

  gl_FragColor = vec4(accentColor, alpha);
}
`

const PHASE_VALUES = {
  origins: 0,
  formation: 1,
  today: 2,
} satisfies Record<HistoryEraId, number>

const LIGHT_ACCENT_FALLBACK = [0.36, 0.29, 0.84] as const
const DARK_ACCENT_FALLBACK = [0.66, 0.62, 1] as const
const FRAME_INTERVAL_MS = 1000 / 60

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

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('History palimpsest shader compilation failed:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

const FallbackLetter = ({ phase }: { phase: HistoryEraId }) => {
  if (phase === 'origins') {
    return (
      <>
        <rect
          x="47"
          y="10"
          width="6"
          height="80"
        />
        <ellipse
          cx="50"
          cy="46"
          rx="27"
          ry="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
        />
      </>
    )
  }

  if (phase === 'formation') {
    return (
      <path
        d="M24 88V12L50 54L76 12V88"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
      />
    )
  }

  return (
    <path
      d="M24 14H76M50 14V86M24 86H76"
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
    />
  )
}

const HistoryPalimpsestFallback = ({ phase }: { phase: HistoryEraId }) => (
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className="text-accent-violet size-full"
  >
    {[
      { x: -2, y: 1, opacity: 0.1 },
      { x: 1, y: -2, opacity: 0.14 },
      { x: 2, y: 2, opacity: 0.18 },
    ].map((layer, index) => (
      <g
        key={index}
        transform={`translate(${layer.x} ${layer.y})`}
        fill="currentColor"
        strokeDasharray="5 3"
        opacity={layer.opacity}
      >
        <FallbackLetter phase={phase} />
      </g>
    ))}
  </svg>
)

interface HistoryEvolutionCanvasProps {
  phase: HistoryEraId
  isActive: boolean
  activeNode: number
  scrollProgress: MotionValue<number>
}

export const HistoryEvolutionCanvas = ({
  phase,
  isActive,
  activeNode,
  scrollProgress,
}: HistoryEvolutionCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fallbackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(scrollProgress.get())
  const activeNodeRef = useRef(activeNode)
  const isActiveRef = useRef(isActive)
  const syncAnimationRef = useRef<(() => void) | null>(null)
  const requestDrawRef = useRef<(() => void) | null>(null)
  const shouldReduceMotion = useReducedMotion() === true
  const { value: theme } = useTheme()
  const isDark = theme === 'dark'

  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    progressRef.current = latest
    requestDrawRef.current?.()
  })

  useEffect(() => {
    activeNodeRef.current = activeNode
    requestDrawRef.current?.()
  }, [activeNode])

  useEffect(() => {
    isActiveRef.current = isActive
    syncAnimationRef.current?.()
  }, [isActive])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const fallback = fallbackRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    })
    if (!gl) return

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const program = gl.createProgram()
    const buffer = gl.createBuffer()

    if (!vertexShader || !fragmentShader || !program || !buffer) {
      if (vertexShader) gl.deleteShader(vertexShader)
      if (fragmentShader) gl.deleteShader(fragmentShader)
      if (program) gl.deleteProgram(program)
      if (buffer) gl.deleteBuffer(buffer)
      return
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('History palimpsest shader linking failed:', gl.getProgramInfoLog(program))
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
      return
    }

    fallback?.classList.add('opacity-0')
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'resolution'),
      pointerPosition: gl.getUniformLocation(program, 'pointerPosition'),
      pointerActive: gl.getUniformLocation(program, 'pointerActive'),
      time: gl.getUniformLocation(program, 'time'),
      phase: gl.getUniformLocation(program, 'phase'),
      scrollProgress: gl.getUniformLocation(program, 'scrollProgress'),
      activeNode: gl.getUniformLocation(program, 'activeNode'),
      accentColor: gl.getUniformLocation(program, 'accentColor'),
    }
    const accentColor = getCssColor(
      '--accent-violet',
      isDark ? DARK_ACCENT_FALLBACK : LIGHT_ACCENT_FALLBACK
    )
    const startedAt = performance.now()
    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      activity: 0,
      targetActivity: 0,
    }
    let frame = 0
    let lastDrawAt = 0
    let isInViewport = true
    let isDocumentVisible = !document.hidden

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = Math.max(1, Math.floor(bounds.width * pixelRatio))
      const height = Math.max(1, Math.floor(bounds.height * pixelRatio))

      if (canvas.width === width && canvas.height === height) return

      canvas.width = width
      canvas.height = height
      pointer.x = width * 0.5
      pointer.y = height * 0.5
      pointer.targetX = pointer.x
      pointer.targetY = pointer.y
      gl.viewport(0, 0, width, height)
    }

    const draw = (elapsed: number) => {
      resize()
      const normalizedProgress = Math.min(1, Math.max(0, (progressRef.current - 0.12) / 0.76))

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform2f(uniforms.pointerPosition, pointer.x, pointer.y)
      gl.uniform1f(uniforms.pointerActive, pointer.activity)
      gl.uniform1f(uniforms.time, elapsed)
      gl.uniform1f(uniforms.phase, PHASE_VALUES[phase])
      gl.uniform1f(uniforms.scrollProgress, shouldReduceMotion ? 0.78 : normalizedProgress)
      gl.uniform1f(uniforms.activeNode, activeNodeRef.current)
      gl.uniform3f(uniforms.accentColor, accentColor[0], accentColor[1], accentColor[2])
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    const shouldAnimate = () =>
      isActiveRef.current && isInViewport && isDocumentVisible && !shouldReduceMotion

    const render = (now: number) => {
      if (!shouldAnimate()) {
        frame = 0
        return
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.12
      pointer.y += (pointer.targetY - pointer.y) * 0.12
      pointer.activity += (pointer.targetActivity - pointer.activity) * 0.1

      if (now - lastDrawAt >= FRAME_INTERVAL_MS) {
        draw((now - startedAt) * 0.001)
        lastDrawAt = now
      }

      frame = requestAnimationFrame(render)
    }

    const requestDraw = () => {
      if (!isActiveRef.current || !isInViewport || !isDocumentVisible) return
      if (shouldReduceMotion) draw(0)
      else if (!frame) frame = requestAnimationFrame(render)
    }

    const syncAnimation = () => {
      if (shouldAnimate() && !frame) frame = requestAnimationFrame(render)
      if (!shouldAnimate() && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
      if (isActiveRef.current && shouldReduceMotion) draw(0)
    }

    requestDrawRef.current = requestDraw
    syncAnimationRef.current = syncAnimation

    const onPointerMove = (event: PointerEvent) => {
      if (!isActiveRef.current || shouldReduceMotion) return

      const bounds = canvas.getBoundingClientRect()
      const isOutside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom

      if (isOutside) {
        pointer.targetActivity = 0
        return
      }

      const scaleX = canvas.width / Math.max(bounds.width, 1)
      const scaleY = canvas.height / Math.max(bounds.height, 1)
      pointer.targetX = (event.clientX - bounds.left) * scaleX
      pointer.targetY = (bounds.bottom - event.clientY) * scaleY
      pointer.targetActivity = 1
    }

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden
      syncAnimation()
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      requestDraw()
    })
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry?.isIntersecting ?? false
        syncAnimation()
      },
      { threshold: 0.05 }
    )

    resize()
    draw(0)
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    syncAnimation()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      requestDrawRef.current = null
      syncAnimationRef.current = null
      fallback?.classList.remove('opacity-0')
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
    }
  }, [isDark, phase, shouldReduceMotion])

  return (
    <div
      aria-hidden="true"
      className="relative size-full overflow-hidden"
    >
      <div
        ref={fallbackRef}
        className="absolute inset-0 transition-opacity duration-300"
      >
        <HistoryPalimpsestFallback phase={phase} />
      </div>
      <canvas
        ref={canvasRef}
        className="relative block size-full"
      />
    </div>
  )
}
