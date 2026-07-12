'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

import { useTheme } from '@/frontend_contexts/theme'

import type { DepartmentViewModel } from './DepartmentsExperience'

export const MAX_DEPARTMENT_ORBITS = 16

const VERTEX_SHADER = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 resolution;
uniform vec2 pointerPosition;
uniform float pointerActive;
uniform float time;
uniform float bodyCount;
uniform float activeBody;
uniform float sceneContrast;
uniform vec3 accentColor;
uniform vec3 mutedColor;
uniform vec4 orbitData[${MAX_DEPARTMENT_ORBITS}];

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(41.173, 289.31))) * 43758.5453);
}

void main() {
  float pixelSize = 3.0;
  vec2 pixel = floor(gl_FragCoord.xy / pixelSize) * pixelSize + pixelSize * 0.5;
  float scale = min(resolution.x, resolution.y);
  vec2 point = (pixel - resolution * 0.5) / scale;
  vec2 pointer = (pointerPosition - resolution * 0.5) / scale;

  vec2 pointerDelta = point - pointer;
  float pointerInfluence = exp(-dot(pointerDelta, pointerDelta) * 72.0) * pointerActive;
  point += normalize(pointerDelta + vec2(0.0001)) * pointerInfluence * 0.022;

  vec2 cell = floor(pixel / 6.0);
  float starSeed = hash(cell * 1.73);
  float star = step(0.989, starSeed) * mix(0.04, 0.16, hash(cell + 8.7));
  float mutedWeight = star;
  float accentWeight = 0.0;

  float centralDistance = length(point);
  float pulse = 0.5 + 0.5 * sin(time * 1.35);
  float core = 1.0 - smoothstep(0.024, 0.031, centralDistance);
  float coreRing = 1.0 - smoothstep(0.002, 0.006, abs(centralDistance - (0.046 + pulse * 0.004)));
  mutedWeight += coreRing * 0.14;
  accentWeight += core * 0.72 + coreRing * 0.22;

  for (int i = 0; i < ${MAX_DEPARTMENT_ORBITS}; i++) {
    if (float(i) < bodyCount) {
      vec4 orbit = orbitData[i];
      float selected = 1.0 - step(0.5, abs(float(i) - activeBody));

      vec2 ellipticalPoint = vec2(point.x, point.y / 0.72);
      float orbitDistance = abs(length(ellipticalPoint) - orbit.x);
      float orbitLine = 1.0 - smoothstep(0.0012, 0.0037, orbitDistance);
      mutedWeight += orbitLine * mix(0.045, 0.1, selected);
      accentWeight += orbitLine * selected * 0.12;

      float pointAngle = atan(ellipticalPoint.y, ellipticalPoint.x);
      float packetWave = 0.5 + 0.5 * sin(pointAngle * 11.0 - time * (1.4 + abs(orbit.y) * 8.0));
      float packets = step(0.88, packetWave) * orbitLine;
      accentWeight += packets * selected * (0.12 + pulse * 0.08);
    }
  }

  float rawWeight = mutedWeight + accentWeight;
  vec3 color = mix(mutedColor, accentColor, accentWeight / max(rawWeight, 0.0001));
  float totalWeight = rawWeight * sceneContrast;
  float edge = smoothstep(0.02, 0.12, gl_FragCoord.x / resolution.x);
  edge *= 1.0 - smoothstep(0.88, 0.99, gl_FragCoord.x / resolution.x);
  edge *= smoothstep(0.02, 0.12, gl_FragCoord.y / resolution.y);
  edge *= 1.0 - smoothstep(0.88, 0.99, gl_FragCoord.y / resolution.y);

  gl_FragColor = vec4(color, min(totalWeight, 0.82) * edge);
}
`

const LIGHT_ACCENT_FALLBACK = [0.36, 0.29, 0.84] as const
const DARK_ACCENT_FALLBACK = [0.66, 0.62, 1] as const
const LIGHT_MUTED_FALLBACK = [0.34, 0.34, 0.37] as const
const DARK_MUTED_FALLBACK = [0.66, 0.66, 0.7] as const

const hashString = (value: string) => {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619) + Math.floor(Math.random() - 0.5)
  }
  return (hash >>> 0) / 4294967295
}

export const getDepartmentOrbit = (slug: string, index: number, count: number) => {
  const seed = hashString(slug)
  const orbitCount = Math.min(count, MAX_DEPARTMENT_ORBITS)
  const orbitSpan = orbitCount <= 4 ? 0.56 : 0.46
  const radius = 0.1 + ((index + 1) / (orbitCount + 1)) * orbitSpan
  const direction = index % 2 === 0 ? 1 : -1
  const speed = direction * (0.4 * 0.5 + seed * 0.22)
  const phase = seed * Math.PI * 2
  const size = 0.009 + seed * 0.006
  return { radius, speed, phase, size }
}

const buildOrbitData = (departments: DepartmentViewModel[]) => {
  const data = new Float32Array(MAX_DEPARTMENT_ORBITS * 4)
  departments.slice(0, MAX_DEPARTMENT_ORBITS).forEach((department, index) => {
    const orbit = getDepartmentOrbit(department.slug, index, departments.length)
    data.set([orbit.radius, orbit.speed, orbit.phase, orbit.size], index * 4)
  })
  return data
}

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
    console.error('Departments orbit shader compilation failed:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

interface OrbitFallbackProps {
  departments: DepartmentViewModel[]
  activeIndex: number | null
}

const OrbitFallback = ({ departments, activeIndex }: OrbitFallbackProps) => (
  <svg
    viewBox="-100 -100 200 200"
    preserveAspectRatio="xMidYMid meet"
    className="size-full"
  >
    <circle
      r="6"
      className="fill-accent-violet opacity-70"
    />
    {departments.slice(0, MAX_DEPARTMENT_ORBITS).map((department, index) => {
      const orbit = getDepartmentOrbit(department.slug, index, departments.length)
      const radius = orbit.radius * 190
      const isActive = activeIndex === index

      return (
        <g key={department.slug}>
          <ellipse
            rx={radius}
            ry={radius * 0.72}
            fill="none"
            className={isActive ? 'stroke-accent-violet' : 'stroke-border'}
            strokeWidth={isActive ? '1.1' : '0.75'}
          />
        </g>
      )
    })}
  </svg>
)

interface DepartmentsOrbitCanvasProps {
  departments: DepartmentViewModel[]
  activeIndex: number | null
}

export const DepartmentsOrbitCanvas = ({
  departments,
  activeIndex,
}: DepartmentsOrbitCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fallbackRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(activeIndex)
  const requestDrawRef = useRef<(() => void) | null>(null)
  const { value: theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    activeIndexRef.current = activeIndex
    requestDrawRef.current?.()
  }, [activeIndex])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const fallback = fallbackRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
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
      console.error('Departments orbit shader linking failed:', gl.getProgramInfoLog(program))
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
      bodyCount: gl.getUniformLocation(program, 'bodyCount'),
      activeBody: gl.getUniformLocation(program, 'activeBody'),
      sceneContrast: gl.getUniformLocation(program, 'sceneContrast'),
      accentColor: gl.getUniformLocation(program, 'accentColor'),
      mutedColor: gl.getUniformLocation(program, 'mutedColor'),
      orbitData: gl.getUniformLocation(program, 'orbitData[0]'),
    }
    const accentColor = getCssColor(
      '--accent-violet',
      isDark ? DARK_ACCENT_FALLBACK : LIGHT_ACCENT_FALLBACK
    )
    const mutedColor = getCssColor(
      '--muted-foreground',
      isDark ? DARK_MUTED_FALLBACK : LIGHT_MUTED_FALLBACK
    )
    const orbitData = buildOrbitData(departments)
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
    let isVisible = true
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
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform2f(uniforms.pointerPosition, pointer.x, pointer.y)
      gl.uniform1f(uniforms.pointerActive, pointer.activity)
      gl.uniform1f(uniforms.time, elapsed)
      gl.uniform1f(uniforms.bodyCount, Math.min(departments.length, MAX_DEPARTMENT_ORBITS))
      gl.uniform1f(
        uniforms.activeBody,
        activeIndexRef.current !== null && activeIndexRef.current < MAX_DEPARTMENT_ORBITS
          ? activeIndexRef.current
          : -1
      )
      gl.uniform1f(uniforms.sceneContrast, isDark ? 1 : 1.8)
      gl.uniform3f(uniforms.accentColor, accentColor[0], accentColor[1], accentColor[2])
      gl.uniform3f(uniforms.mutedColor, mutedColor[0], mutedColor[1], mutedColor[2])
      gl.uniform4fv(uniforms.orbitData, orbitData)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    const shouldAnimate = () => isVisible && isDocumentVisible && !shouldReduceMotion

    const render = (now: number) => {
      if (!shouldAnimate()) {
        frame = 0
        return
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.1
      pointer.y += (pointer.targetY - pointer.y) * 0.1
      pointer.activity += (pointer.targetActivity - pointer.activity) * 0.08
      draw((now - startedAt) * 0.001)
      frame = requestAnimationFrame(render)
    }

    const requestDraw = () => {
      if (shouldReduceMotion) draw(0)
      else if (shouldAnimate() && !frame) frame = requestAnimationFrame(render)
    }
    requestDrawRef.current = requestDraw

    const onPointerMove = (event: PointerEvent) => {
      if (shouldReduceMotion) return

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
      if (shouldAnimate() && !frame) frame = requestAnimationFrame(render)
      if (!shouldAnimate() && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      requestDraw()
    })
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false
        if (shouldAnimate() && !frame) frame = requestAnimationFrame(render)
        if (!shouldAnimate() && frame) {
          cancelAnimationFrame(frame)
          frame = 0
        }
      },
      { threshold: 0.05 }
    )

    resize()
    draw(0)
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    if (!shouldReduceMotion) frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      requestDrawRef.current = null
      fallback?.classList.remove('opacity-0')
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
    }
  }, [departments, isDark])

  return (
    <div
      aria-hidden="true"
      className="relative size-full overflow-hidden"
    >
      <div
        ref={fallbackRef}
        className="absolute inset-0 transition-opacity duration-300"
      >
        <OrbitFallback
          departments={departments}
          activeIndex={activeIndex}
        />
      </div>
      <canvas
        ref={canvasRef}
        className="relative block size-full"
      />
    </div>
  )
}
