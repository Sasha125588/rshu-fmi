'use client'

import { useLayoutEffect, useRef } from 'react'

import { useTheme } from '@/frontend_contexts/theme'
import { cn } from '@/lib/utils'

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
uniform float sceneContrast;
uniform vec3 backgroundColor;
uniform vec3 mutedColor;
uniform vec3 accentColor;

const float PI = 3.14159265359;

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(41.173, 289.31))) * 43758.5453);
}

float segmentDistance(vec2 point, vec2 start, vec2 end) {
  vec2 segment = end - start;
  float projection = clamp(
    dot(point - start, segment) / max(dot(segment, segment), 0.00001),
    0.0,
    1.0
  );
  return length(point - (start + segment * projection));
}

void main() {
  vec2 screenUv = gl_FragCoord.xy / max(resolution, vec2(1.0));
  float aspect = resolution.x / max(resolution.y, 1.0);
  vec2 point = (screenUv - 0.5) * vec2(aspect, 1.0) * 2.0;
  vec2 pointer = (pointerPosition / max(resolution, vec2(1.0)) - 0.5) *
    vec2(aspect, 1.0) * 2.0;

  float gridScale = 12.0;
  vec2 gridPoint = point * gridScale;
  vec2 baseCell = floor(gridPoint);
  float mutedWeight = 0.0;
  float accentWeight = 0.0;

  for (int offsetY = -1; offsetY <= 1; offsetY++) {
    for (int offsetX = -1; offsetX <= 1; offsetX++) {
      vec2 cell = baseCell + vec2(float(offsetX), float(offsetY));
      float seed = hash(cell);
      float secondarySeed = hash(cell + vec2(19.7, 43.1));
      vec2 jitter = vec2(hash(cell + 7.3), hash(cell + 23.9)) - 0.5;
      vec2 center = (cell + 0.5 + jitter * 0.62) / gridScale;

      float broadFlow = sin(center.y * 2.35 - time * 0.13);
      broadFlow += cos(center.x * 1.42 + center.y * 0.72 + time * 0.09) * 0.82;
      broadFlow += sin((center.x - center.y) * 1.18 - time * 0.065) * 0.54;
      float flowAngle = broadFlow * 1.08 + sin(time * 0.075) * 0.34;
      vec2 direction = vec2(cos(flowAngle), sin(flowAngle));
      vec2 normal = vec2(-direction.y, direction.x);

      float drift = sin(time * (0.21 + seed * 0.08) + seed * PI * 2.0);
      center += direction * drift * 0.024;
      center += normal * sin(time * 0.12 + secondarySeed * PI * 2.0) * 0.012;

      vec2 pointerDelta = center - pointer;
      float pointerDistance = length(pointerDelta);
      float pointerInfluence = exp(-pointerDistance * pointerDistance * 15.0) * pointerActive;
      vec2 pointerDirection = pointerDelta / max(pointerDistance, 0.001);
      direction = normalize(mix(direction, pointerDirection, pointerInfluence * 0.72));
      center += pointerDirection * pointerInfluence * 0.045;

      float streamOne = 0.5 + 0.5 * sin(
        center.x * 2.1 + sin(center.y * 2.5 - time * 0.14) * 1.3 + time * 0.1
      );
      float streamTwo = 0.5 + 0.5 * cos(
        center.y * 3.0 - center.x * 0.72 + time * 0.085
      );
      float density = mix(streamOne, streamTwo, 0.34);
      float occupancyThreshold = mix(0.68, 0.18, density);
      float occupied = step(occupancyThreshold, seed);

      float strokeLength = mix(0.026, 0.068, secondarySeed) * (0.88 + density * 0.28);
      float strokeWidth = mix(0.0018, 0.0031, hash(cell + 71.2));
      float distanceToStroke = segmentDistance(
        point,
        center - direction * strokeLength,
        center + direction * strokeLength
      );
      float stroke = 1.0 - smoothstep(strokeWidth, strokeWidth + 0.0035, distanceToStroke);
      stroke *= occupied;

      float synchronization = 0.5 + 0.5 * sin(
        center.x * 1.55 - center.y * 2.2 + time * 0.22 + broadFlow * 0.35
      );
      float synchronizationPulse = 0.5 + 0.5 * sin(time * 0.31);
      float accent = smoothstep(0.76, 0.97, synchronization) *
        mix(0.38, 1.0, synchronizationPulse);

      mutedWeight += stroke * mix(0.24, 0.1, accent);
      accentWeight += stroke * accent * 0.72;
    }
  }

  float pointerVoid = smoothstep(0.045, 0.19, length(point - pointer));
  float pointerMask = mix(1.0, pointerVoid, pointerActive);
  mutedWeight *= pointerMask;
  accentWeight *= pointerMask;

  float horizontalMask = smoothstep(0.24, 0.54, screenUv.x);
  float verticalMask = smoothstep(0.025, 0.14, screenUv.y) *
    (1.0 - smoothstep(0.88, 0.99, screenUv.y));
  float sceneMask = horizontalMask * verticalMask;

  float totalWeight = min((mutedWeight + accentWeight) * sceneContrast, 0.9) * sceneMask;
  vec3 strokeColor = mix(
    mutedColor,
    accentColor,
    accentWeight / max(mutedWeight + accentWeight, 0.0001)
  );
  vec3 color = mix(backgroundColor, strokeColor, totalWeight);

  float grain = hash(floor(gl_FragCoord.xy / 2.0) + floor(time * 0.7));
  color += (grain - 0.5) * 0.005 * sceneMask;

  gl_FragColor = vec4(color, 1.0);
}
`

const LIGHT_BACKGROUND_FALLBACK = [1, 1, 1] as const
const DARK_BACKGROUND_FALLBACK = [0.02, 0.02, 0.025] as const
const LIGHT_MUTED_FALLBACK = [0.42, 0.42, 0.45] as const
const DARK_MUTED_FALLBACK = [0.72, 0.72, 0.76] as const
const LIGHT_ACCENT_FALLBACK = [0.36, 0.29, 0.84] as const
const DARK_ACCENT_FALLBACK = [0.66, 0.62, 1] as const

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
    console.error('Council collective-motion shader failed:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

const CollectiveMotionFallback = () => {
  const strokes = Array.from({ length: 84 }, (_, index) => {
    const column = index % 12
    const row = Math.floor(index / 12)
    const x = 650 + column * 76 + Math.sin(index * 1.17) * 24
    const y = 128 + row * 104 + Math.cos(index * 0.83) * 27
    const rotation = -26 + Math.sin(row * 0.9 + column * 0.47) * 42
    const length = 28 + ((index * 17) % 42)

    return { index, x, y, rotation, length }
  })

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
    >
      <rect
        width="1600"
        height="900"
        className="fill-background"
      />
      {strokes.map((stroke) => (
        <line
          key={stroke.index}
          x1={-stroke.length / 2}
          x2={stroke.length / 2}
          transform={`translate(${stroke.x} ${stroke.y}) rotate(${stroke.rotation})`}
          className={cn(
            'stroke-muted-foreground/28',
            stroke.index % 9 === 0 && 'stroke-accent-violet/65'
          )}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

export const CollectiveMotionCanvas = () => {
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

    const gl = canvas.getContext('webgl', {
      alpha: false,
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
      console.error(
        'Council collective-motion shader linking failed:',
        gl.getProgramInfoLog(program)
      )
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
      sceneContrast: gl.getUniformLocation(program, 'sceneContrast'),
      backgroundColor: gl.getUniformLocation(program, 'backgroundColor'),
      mutedColor: gl.getUniformLocation(program, 'mutedColor'),
      accentColor: gl.getUniformLocation(program, 'accentColor'),
    }

    const backgroundColor = getCssColor(
      '--background',
      isDark ? DARK_BACKGROUND_FALLBACK : LIGHT_BACKGROUND_FALLBACK
    )
    const mutedColor = getCssColor(
      '--muted-foreground',
      isDark ? DARK_MUTED_FALLBACK : LIGHT_MUTED_FALLBACK
    )
    const accentColor = getCssColor(
      '--accent-violet',
      isDark ? DARK_ACCENT_FALLBACK : LIGHT_ACCENT_FALLBACK
    )
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
    let hasSized = false

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25)
      const width = Math.max(1, Math.floor(bounds.width * pixelRatio))
      const height = Math.max(1, Math.floor(bounds.height * pixelRatio))

      if (canvas.width === width && canvas.height === height) return

      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)

      if (!hasSized) {
        pointer.x = width * 0.72
        pointer.y = height * 0.5
        pointer.targetX = pointer.x
        pointer.targetY = pointer.y
        hasSized = true
      }
    }

    const draw = (now: number) => {
      resize()
      const elapsed = shouldReduceMotion ? 8 : (now - startedAt) * 0.001

      gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform2f(uniforms.pointerPosition, pointer.x, pointer.y)
      gl.uniform1f(uniforms.pointerActive, pointer.activity)
      gl.uniform1f(uniforms.time, elapsed)
      gl.uniform1f(uniforms.sceneContrast, isDark ? 1 : 1.28)
      gl.uniform3f(
        uniforms.backgroundColor,
        backgroundColor[0],
        backgroundColor[1],
        backgroundColor[2]
      )
      gl.uniform3f(uniforms.mutedColor, mutedColor[0], mutedColor[1], mutedColor[2])
      gl.uniform3f(uniforms.accentColor, accentColor[0], accentColor[1], accentColor[2])
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    const shouldAnimate = () => isVisible && isDocumentVisible && !shouldReduceMotion

    const render = (now: number) => {
      if (!shouldAnimate()) {
        frame = 0
        return
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.085
      pointer.y += (pointer.targetY - pointer.y) * 0.085
      pointer.activity += (pointer.targetActivity - pointer.activity) * 0.07
      draw(now)
      frame = requestAnimationFrame(render)
    }

    const requestDraw = () => {
      if (shouldReduceMotion) draw(performance.now())
      else if (shouldAnimate() && !frame) frame = requestAnimationFrame(render)
    }

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
      requestDraw()
      if (!shouldAnimate() && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    const resizeObserver = new ResizeObserver(() => draw(performance.now()))
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false
        requestDraw()
        if (!shouldAnimate() && frame) {
          cancelAnimationFrame(frame)
          frame = 0
        }
      },
      { threshold: 0.02 }
    )

    resize()
    draw(performance.now())
    resizeObserver.observe(canvas)
    intersectionObserver.observe(container)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    requestDraw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
    }
  }, [isDark])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <div
        ref={fallbackRef}
        className="absolute inset-0 transition-opacity duration-300"
      >
        <CollectiveMotionFallback />
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block size-full"
      />
    </div>
  )
}
