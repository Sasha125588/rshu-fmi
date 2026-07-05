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
precision highp float;

uniform vec2 resolution;
uniform vec2 pointerPosition;
uniform float time;
uniform vec3 signalColor;
uniform float signalOpacity;

float hash(float value) {
  return fract(sin(value) * 43758.5453123);
}

float stream(vec2 point, vec2 pointer, float lane, float speed, float seed, float spacing) {
  float pointerDistance = length(point - pointer);
  float pointerInfluence = exp(-pointerDistance * pointerDistance * 34.0);
  float pointerDirection = sign(lane - pointer.y);

  float wave = lane;
  wave += sin(point.x * 4.2 + seed + time * 0.16) * 0.018;
  wave += sin(point.x * 9.0 + seed * 1.7 - time * 0.1) * 0.006;
  wave += pointerDirection * pointerInfluence * 0.04;

  float flowPosition = point.x + time * speed + seed;
  float packetId = floor(flowPosition / spacing);
  float localX = mod(flowPosition, spacing) - spacing * 0.5;
  float activity = step(0.43, hash(packetId + seed * 91.0));
  float intensity = mix(0.38, 1.0, hash(packetId * 1.91 + seed * 47.0));
  float packetWidth = mix(0.004, 0.011, hash(packetId * 2.13 + seed * 19.0));
  float packetHeight = mix(0.003, 0.007, hash(packetId * 3.17 + seed * 13.0));

  vec2 packetDistance = vec2(abs(localX) - packetWidth, abs(point.y - wave) - packetHeight);
  float packet = 1.0 - smoothstep(0.0, 0.0015, max(packetDistance.x, packetDistance.y));
  float guide = (1.0 - smoothstep(0.0, 0.0012, abs(point.y - wave))) * 0.055;

  return packet * activity * intensity + guide;
}

void main() {
  vec2 screenUv = gl_FragCoord.xy / resolution;
  vec2 point = (gl_FragCoord.xy - resolution * 0.5) / resolution.y;
  vec2 pointer = (pointerPosition - resolution * 0.5) / resolution.y;

  float signal = 0.0;
  signal += stream(point, pointer, -0.34, 0.044, 0.11, 0.054);
  signal += stream(point, pointer, -0.23, 0.052, 0.27, 0.061);
  signal += stream(point, pointer, -0.12, 0.039, 0.43, 0.049);
  signal += stream(point, pointer,  0.00, 0.058, 0.59, 0.057);
  signal += stream(point, pointer,  0.12, 0.047, 0.71, 0.052);
  signal += stream(point, pointer,  0.23, 0.055, 0.83, 0.063);
  signal += stream(point, pointer,  0.34, 0.042, 0.97, 0.05);

  float horizontalMask = smoothstep(0.26, 0.57, screenUv.x);
  float verticalMask = smoothstep(0.02, 0.16, screenUv.y);
  verticalMask *= 1.0 - smoothstep(0.84, 0.98, screenUv.y);

  float alpha = min(signal * 1.1, 1.0) * signalOpacity * horizontalMask * verticalMask;
  gl_FragColor = vec4(signalColor, alpha);
}
`

const ANIMATION_DELAY_MS = 300
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

  if (alpha === 0) return fallback

  return [red / 255, green / 255, blue / 255]
}

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('News background shader compilation failed:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

export const NewsHeaderBackground = () => {
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
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    })
    if (!gl) return

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader)
      if (fragmentShader) gl.deleteShader(fragmentShader)
      return
    }

    const program = gl.createProgram()
    const buffer = gl.createBuffer()

    if (!program || !buffer) {
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      if (program) gl.deleteProgram(program)
      if (buffer) gl.deleteBuffer(buffer)
      return
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('News background shader linking failed:', gl.getProgramInfoLog(program))
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

    const positionLocation = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'resolution'),
      pointerPosition: gl.getUniformLocation(program, 'pointerPosition'),
      time: gl.getUniformLocation(program, 'time'),
      signalColor: gl.getUniformLocation(program, 'signalColor'),
      signalOpacity: gl.getUniformLocation(program, 'signalOpacity'),
    }

    const pointer = { x: -10000, y: -10000 }
    const signalColor = getCssColor(
      '--accent-violet',
      isDark ? DARK_ACCENT_FALLBACK : LIGHT_ACCENT_FALLBACK
    )
    const signalOpacity = isDark ? 1 : 1
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animationStartedAt = performance.now()
    let animationFrame = 0
    let animationDelay = 0
    let isAnimationReady = false
    let isVisible = true

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(1, Math.floor(rect.width))
      const height = Math.max(1, Math.floor(rect.height))

      if (canvas.width === width && canvas.height === height) return

      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }

    const drawFrame = (elapsedSeconds: number) => {
      resize()
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform2f(uniforms.pointerPosition, pointer.x, pointer.y)
      gl.uniform1f(uniforms.time, elapsedSeconds)
      gl.uniform3f(uniforms.signalColor, signalColor[0], signalColor[1], signalColor[2])
      gl.uniform1f(uniforms.signalOpacity, signalOpacity)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    const render = (now: number) => {
      if (!isVisible || prefersReducedMotion) {
        animationFrame = 0
        return
      }

      drawFrame((now - animationStartedAt) * 0.001)
      animationFrame = requestAnimationFrame(render)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const isOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom

      if (isOutside) {
        pointer.x = -10000
        pointer.y = -10000
        return
      }

      pointer.x = event.clientX - rect.left
      pointer.y = rect.bottom - event.clientY
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      drawFrame((performance.now() - animationStartedAt) * 0.001)
    })
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting

        if (!isVisible && animationFrame) {
          cancelAnimationFrame(animationFrame)
          animationFrame = 0
        }

        if (isVisible && isAnimationReady && !prefersReducedMotion && !animationFrame) {
          animationFrame = requestAnimationFrame(render)
        }
      },
      { threshold: 0.05 }
    )
    intersectionObserver.observe(canvas)

    window.addEventListener('pointermove', onPointerMove)
    drawFrame(0)

    if (!prefersReducedMotion) {
      animationDelay = window.setTimeout(() => {
        isAnimationReady = true
        if (isVisible && !animationFrame) animationFrame = requestAnimationFrame(render)
      }, ANIMATION_DELAY_MS)
    }

    return () => {
      cancelAnimationFrame(animationFrame)
      window.clearTimeout(animationDelay)
      window.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [isDark])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block size-full"
      />
      <div className="from-background via-background/65 absolute inset-0 bg-linear-to-r via-20% to-transparent" />
    </div>
  )
}
