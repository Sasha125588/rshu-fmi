'use client'

import { useLayoutEffect, useRef } from 'react'

import { useTheme } from '@/frontend_contexts/theme'

const VERTEX_SHADER = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform vec3 accentColor;

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(41.173, 289.31))) * 43758.5453);
}

void main() {
  float cellSize = 6.0;
  vec2 cell = floor(gl_FragCoord.xy / cellSize);
  vec2 dimensions = resolution / cellSize;
  vec2 center = dimensions * vec2(0.76, 0.51);
  vec2 point = (cell - center) / dimensions.y;
  float evolution = time * 0.8;
  float mutationFrame = floor(time * 1.8);
  float radius = length(point);
  float angle = atan(point.y, point.x);

  float rings = sin(radius * 48.0 - evolution * 1.45);
  float branches = sin(angle * 7.0 + evolution * 0.72) * 0.52;
  float drift = sin(point.x * 27.0 - point.y * 18.0 + evolution * 0.9) * 0.28;
  float rule = rings + branches + drift;
  float boundary = 1.0 - smoothstep(0.1, 0.4, radius);
  float mutation = hash(cell + vec2(mutationFrame * 3.1, mutationFrame * 1.7));
  float active = step(0.16 + mutation * 0.35, rule) * boundary;
  float core = step(radius, 0.09) * step(0.58, hash(cell + mutationFrame));

  float rightMask = smoothstep(0.38, 0.66, cell.x / dimensions.x);
  float alpha = (active * 0.25 + core * 0.18) * rightMask;
  gl_FragColor = vec4(accentColor, alpha);
}
`

const LIGHT_ACCENT_FALLBACK = [0.34, 0.16, 0.62] as const
const DARK_ACCENT_FALLBACK = [0.75, 0.62, 0.95] as const

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }

  return shader
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

export const NormatyvniDokumentyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { value: theme } = useTheme()
  const isDark = theme === 'dark'

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
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
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
      return
    }

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
      time: gl.getUniformLocation(program, 'time'),
      accentColor: gl.getUniformLocation(program, 'accentColor'),
    }
    const accentColor = getCssColor(
      '--accent-violet',
      isDark ? DARK_ACCENT_FALLBACK : LIGHT_ACCENT_FALLBACK
    )
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startedAt = performance.now()
    let frame = 0
    let isVisible = true

    const draw = (elapsed: number) => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = Math.max(1, Math.floor(bounds.width * pixelRatio))
      const height = Math.max(1, Math.floor(bounds.height * pixelRatio))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform1f(uniforms.time, elapsed)
      gl.uniform3f(uniforms.accentColor, accentColor[0], accentColor[1], accentColor[2])
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    const render = (now: number) => {
      if (!isVisible || prefersReducedMotion) {
        frame = 0
        return
      }

      draw((now - startedAt) * 0.001)
      frame = requestAnimationFrame(render)
    }

    const resizeObserver = new ResizeObserver(() => draw((performance.now() - startedAt) * 0.001))
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false
        if (isVisible && !prefersReducedMotion && !frame) frame = requestAnimationFrame(render)
        if (!isVisible && frame) {
          cancelAnimationFrame(frame)
          frame = 0
        }
      },
      { threshold: 0.05 }
    )

    draw(0)
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    if (!prefersReducedMotion) frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
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
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block size-full"
      />
      <div className="from-background via-background/70 absolute inset-0 bg-linear-to-r to-transparent" />
    </div>
  )
}
