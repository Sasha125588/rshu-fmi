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
uniform float interactionStrength;
uniform float time;
uniform vec3 accentColor;
uniform vec3 inkColor;
uniform float sceneOpacity;

float formDistance(vec2 point, float elapsed) {
  point.x += sin(point.y * 4.1 + elapsed * 0.24) * 0.025;
  point.y += cos(point.x * 3.4 - elapsed * 0.19) * 0.014;

  float angle = atan(point.y, point.x);
  float radius = 0.315;
  radius += sin(angle * 3.0 + elapsed * 0.21) * 0.032;
  radius += sin(angle * 5.0 - elapsed * 0.17) * 0.017;
  radius += cos(angle * 8.0 + elapsed * 0.11) * 0.009;

  return length(point * vec2(0.88, 1.05)) - radius;
}

vec2 formNormal(vec2 point, float elapsed) {
  float epsilon = 0.0025;
  float center = formDistance(point, elapsed);

  return normalize(vec2(
    formDistance(point + vec2(epsilon, 0.0), elapsed) - center,
    formDistance(point + vec2(0.0, epsilon), elapsed) - center
  ));
}

float narrowBand(float value, float width) {
  return 1.0 - smoothstep(0.0, width, abs(value));
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;

  vec2 point = (gl_FragCoord.xy - resolution * vec2(0.79, 0.5)) / resolution.y;
  vec2 pointerPoint = (pointerPosition - resolution * vec2(0.79, 0.5)) / resolution.y;
  vec2 pull =
    clamp(pointerPoint, vec2(-0.42), vec2(0.42)) * 0.09 * interactionStrength;
  point -= pull;

  float distanceToForm = formDistance(point, time);
  vec2 normal = formNormal(point, time);
  float inside = smoothstep(0.01, -0.008, distanceToForm);
  float contour = exp(-abs(distanceToForm) * 78.0);

  float pointerField =
    exp(-dot(point - pointerPoint, point - pointerPoint) * 15.0) * interactionStrength;
  vec2 pointerDirection = normalize(point - pointerPoint + vec2(0.001));
  vec2 refractedPoint = point + normal * 0.065;
  refractedPoint += pointerDirection * pointerField * 0.065;
  refractedPoint.x += sin(refractedPoint.y * 7.0 + time * 0.18) * 0.018;

  float ribbonOne = narrowBand(
    sin(refractedPoint.x * 11.0 + sin(refractedPoint.y * 7.0 - time * 0.22) * 2.1),
    0.075
  );
  float ribbonTwo = narrowBand(
    sin(refractedPoint.y * 13.0 - refractedPoint.x * 5.0 + time * 0.16),
    0.052
  );
  float ribbonThree = narrowBand(
    sin((refractedPoint.x + refractedPoint.y) * 9.0 - time * 0.12),
    0.038
  );
  float caustics = (ribbonOne * 0.78 + ribbonTwo * 0.48 + ribbonThree * 0.32) * inside;

  vec2 automaticLight = normalize(vec2(cos(time * 0.15), sin(time * 0.12) * 0.8));
  vec2 cursorLight = normalize(pointerPoint + vec2(0.001));
  vec2 lightDirection = normalize(mix(automaticLight, cursorLight, interactionStrength));
  float rimLight = max(0.0, dot(normal, lightDirection)) * contour;
  float darkRim = max(0.0, dot(normal, -lightDirection)) * contour;

  float innerGlow = exp(-abs(distanceToForm + 0.045) * 34.0) * inside;
  float glassFace = inside * 0.022;
  float halo = exp(-abs(distanceToForm) * 18.0) * (1.0 - inside) * 0.08;
  float alpha = glassFace;
  alpha += caustics * (0.15 + pointerField * 0.1);
  alpha += rimLight * 0.3 + darkRim * 0.14 + innerGlow * 0.055 + halo;
  alpha = min(alpha, 0.68) * sceneOpacity;

  float accentMix = clamp(caustics + rimLight * 0.85 + pointerField * 0.16, 0.0, 1.0);
  vec3 color = mix(inkColor, accentColor, accentMix);

  float leftFade = smoothstep(0.39, 0.66, uv.x);
  float verticalFade = smoothstep(0.02, 0.13, uv.y);
  verticalFade *= 1.0 - smoothstep(0.87, 0.99, uv.y);
  alpha *= leftFade * verticalFade;

  gl_FragColor = vec4(color, alpha);
}
`

const LIGHT_ACCENT_FALLBACK = [0.36, 0.29, 0.84] as const
const DARK_ACCENT_FALLBACK = [0.7, 0.64, 1] as const
const LIGHT_INK_FALLBACK = [0.11, 0.1, 0.15] as const
const DARK_INK_FALLBACK = [0.93, 0.92, 0.97] as const

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Tuition refractive form shader compilation failed:', gl.getShaderInfoLog(shader))
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

export const RefractiveFormCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fallbackRef = useRef<HTMLDivElement>(null)
  const { value: theme } = useTheme()
  const isDark = theme === 'dark'

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
      console.error('Tuition refractive form shader linking failed:', gl.getProgramInfoLog(program))
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
      accentColor: gl.getUniformLocation(program, 'accentColor'),
      inkColor: gl.getUniformLocation(program, 'inkColor'),
      interactionStrength: gl.getUniformLocation(program, 'interactionStrength'),
      pointerPosition: gl.getUniformLocation(program, 'pointerPosition'),
      resolution: gl.getUniformLocation(program, 'resolution'),
      sceneOpacity: gl.getUniformLocation(program, 'sceneOpacity'),
      time: gl.getUniformLocation(program, 'time'),
    }
    const accentColor = getCssColor(
      '--accent-violet',
      isDark ? DARK_ACCENT_FALLBACK : LIGHT_ACCENT_FALLBACK
    )
    const inkColor = getCssColor('--foreground', isDark ? DARK_INK_FALLBACK : LIGHT_INK_FALLBACK)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0, y: 0 }
    const pointerTarget = { x: 0, y: 0 }
    const pointerVelocity = { x: 0, y: 0 }
    const startedAt = performance.now()
    let animationFrame = 0
    let interactionStrength = 0
    let interactionTarget = 0
    let interactionVelocity = 0
    let isInViewport = true
    let isDocumentVisible = !document.hidden
    let isSized = false

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = Math.max(1, Math.floor(bounds.width * pixelRatio))
      const height = Math.max(1, Math.floor(bounds.height * pixelRatio))

      if (canvas.width === width && canvas.height === height) return

      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)

      if (!isSized) {
        pointer.x = width * 0.79
        pointer.y = height * 0.5
        pointerTarget.x = pointer.x
        pointerTarget.y = pointer.y
        isSized = true
      } else if (interactionTarget === 0) {
        pointerTarget.x = width * 0.79
        pointerTarget.y = height * 0.5
      }
    }

    const draw = (elapsed: number) => {
      resize()

      pointerVelocity.x += (pointerTarget.x - pointer.x) * 0.035
      pointerVelocity.y += (pointerTarget.y - pointer.y) * 0.035
      pointerVelocity.x *= 0.82
      pointerVelocity.y *= 0.82
      pointer.x += pointerVelocity.x
      pointer.y += pointerVelocity.y

      interactionVelocity += (interactionTarget - interactionStrength) * 0.03
      interactionVelocity *= 0.8
      interactionStrength += interactionVelocity

      if (
        interactionTarget === 0 &&
        Math.abs(interactionStrength) < 0.001 &&
        Math.abs(interactionVelocity) < 0.001
      ) {
        interactionStrength = 0
        interactionVelocity = 0
      }

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform2f(uniforms.pointerPosition, pointer.x, pointer.y)
      gl.uniform1f(uniforms.interactionStrength, Math.min(1, Math.max(0, interactionStrength)))
      gl.uniform1f(uniforms.time, elapsed)
      gl.uniform3f(uniforms.accentColor, accentColor[0], accentColor[1], accentColor[2])
      gl.uniform3f(uniforms.inkColor, inkColor[0], inkColor[1], inkColor[2])
      gl.uniform1f(uniforms.sceneOpacity, isDark ? 0.92 : 0.78)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      if (fallback) fallback.style.opacity = '0'
    }

    const render = (now: number) => {
      if (!isInViewport || !isDocumentVisible || reducedMotion) {
        animationFrame = 0
        return
      }

      draw((now - startedAt) * 0.001)
      animationFrame = requestAnimationFrame(render)
    }

    const startAnimation = () => {
      if (isInViewport && isDocumentVisible && !reducedMotion && !animationFrame) {
        animationFrame = requestAnimationFrame(render)
      }
    }

    const stopAnimation = () => {
      if (!animationFrame) return
      cancelAnimationFrame(animationFrame)
      animationFrame = 0
    }

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      const isOutside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom

      if (isOutside) {
        pointerTarget.x = canvas.width * 0.79
        pointerTarget.y = canvas.height * 0.5
        interactionTarget = 0
      } else {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
        const targetX = (event.clientX - bounds.left) * pixelRatio
        const targetY = (bounds.bottom - event.clientY) * pixelRatio

        pointerTarget.x = targetX
        pointerTarget.y = targetY
        interactionTarget = 1
      }

      if (reducedMotion) draw(0)
    }

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden
      if (isDocumentVisible) startAnimation()
      else stopAnimation()
    }

    const onContextLost = (event: Event) => {
      event.preventDefault()
      stopAnimation()
      if (fallback) fallback.style.opacity = '1'
    }

    const resizeObserver = new ResizeObserver(() => draw((performance.now() - startedAt) * 0.001))
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry?.isIntersecting ?? false
        if (isInViewport) startAnimation()
        else stopAnimation()
      },
      { threshold: 0.05 }
    )

    canvas.addEventListener('webglcontextlost', onContextLost)
    window.addEventListener('pointermove', onPointerMove)
    document.addEventListener('visibilitychange', onVisibilityChange)
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    draw(0)
    startAnimation()

    return () => {
      stopAnimation()
      canvas.removeEventListener('webglcontextlost', onContextLost)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
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
      <div
        ref={fallbackRef}
        className="text-accent-violet absolute inset-0 transition-opacity duration-200"
      >
        <svg
          viewBox="0 0 1200 480"
          preserveAspectRatio="xMidYMid slice"
          className="size-full opacity-20"
        >
          <defs>
            <radialGradient id="tuition-form-fallback">
              <stop
                offset="0"
                stopColor="currentColor"
                stopOpacity="0.22"
              />
              <stop
                offset="0.68"
                stopColor="currentColor"
                stopOpacity="0.06"
              />
              <stop
                offset="1"
                stopColor="currentColor"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>
          <path
            fill="url(#tuition-form-fallback)"
            stroke="currentColor"
            strokeOpacity="0.35"
            d="M1009 61c89 31 131 130 99 220-32 91-138 160-236 126-99-34-171-142-127-238 43-95 169-141 264-108Z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.22"
            d="M783 143c92 72 165 117 304 86M753 269c112-31 232-8 321 70"
          />
        </svg>
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block size-full"
      />
      <div className="from-background via-background/76 absolute inset-0 bg-linear-to-r via-30% to-transparent" />
    </div>
  )
}
