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
uniform float pointerActive;
uniform float time;
uniform float scrollProgress;
uniform float sceneContrast;
uniform vec3 backgroundColor;
uniform vec3 inkColor;
uniform vec3 accentColor;

const float CORRIDOR_HALF_WIDTH = 2.35;
const float CORRIDOR_HALF_HEIGHT = 1.45;
const float ROOM_108_Z = 8.65;

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(41.173, 289.31))) * 43758.5453);
}

float rectangle(vec2 point, vec2 center, vec2 halfSize) {
  vec2 distanceToEdge = abs(point - center) - halfSize;
  return 1.0 - step(0.0, max(distanceToEdge.x, distanceToEdge.y));
}

float doorInterior(vec3 point, float centerZ, float halfWidth) {
  float horizontal = 1.0 - step(halfWidth, abs(point.z - centerZ));
  float vertical = step(-1.43, point.y) * (1.0 - step(0.72, point.y));
  return horizontal * vertical;
}

float doorFrame(vec3 point, float centerZ, float halfWidth) {
  float outer = doorInterior(point, centerZ, halfWidth + 0.075);
  float inner = doorInterior(point, centerZ, halfWidth);
  float header = step(0.72, point.y) * (1.0 - step(0.82, point.y));
  header *= 1.0 - step(halfWidth + 0.075, abs(point.z - centerZ));
  return max(outer - inner, header);
}

float sevenSegmentDigit(vec2 point, float digit) {
  float top = rectangle(point, vec2(0.0, 0.43), vec2(0.22, 0.038));
  float middle = rectangle(point, vec2(0.0, 0.0), vec2(0.22, 0.038));
  float bottom = rectangle(point, vec2(0.0, -0.43), vec2(0.22, 0.038));
  float upperLeft = rectangle(point, vec2(-0.22, 0.215), vec2(0.038, 0.215));
  float upperRight = rectangle(point, vec2(0.22, 0.215), vec2(0.038, 0.215));
  float lowerLeft = rectangle(point, vec2(-0.22, -0.215), vec2(0.038, 0.215));
  float lowerRight = rectangle(point, vec2(0.22, -0.215), vec2(0.038, 0.215));

  if (digit < 0.5) {
    return max(max(top, bottom), max(max(upperLeft, upperRight), max(lowerLeft, lowerRight)));
  }

  if (digit < 1.5) return max(upperRight, lowerRight);

  return max(max(max(top, middle), bottom), max(max(upperLeft, upperRight), max(lowerLeft, lowerRight)));
}

float roomNumber108(vec3 point) {
  vec2 plaquePoint = vec2(-(point.z - ROOM_108_Z) / 0.59, (point.y - 1.01) / 0.25);
  float plaque = rectangle(plaquePoint, vec2(0.0), vec2(1.0, 0.72));
  float one = sevenSegmentDigit(vec2((plaquePoint.x + 0.58) / 0.62, plaquePoint.y), 1.0);
  float zero = sevenSegmentDigit(vec2(plaquePoint.x / 0.62, plaquePoint.y), 0.0);
  float eight = sevenSegmentDigit(vec2((plaquePoint.x - 0.58) / 0.62, plaquePoint.y), 8.0);
  return max(max(one, zero), eight) * plaque;
}

vec3 rotateView(vec3 ray, float yaw, float pitch) {
  float yawCosine = cos(yaw);
  float yawSine = sin(yaw);
  ray.xz = mat2(yawCosine, -yawSine, yawSine, yawCosine) * ray.xz;

  float pitchCosine = cos(pitch);
  float pitchSine = sin(pitch);
  ray.yz = mat2(pitchCosine, -pitchSine, pitchSine, pitchCosine) * ray.yz;
  return ray;
}

void main() {
  vec2 screenUv = gl_FragCoord.xy / resolution;
  vec2 point = (screenUv - 0.5) * 2.0;
  point.x *= resolution.x / max(resolution.y, 1.0);

  vec2 normalizedPointer = pointerPosition / max(resolution, vec2(1.0));
  vec2 pointerOffset = (normalizedPointer - 0.5) * vec2(1.0, -1.0);
  float idleYaw = sin(time * 0.13) * 0.018;
  float idlePitch = sin(time * 0.09 + 1.4) * 0.008;
  float yaw = idleYaw + pointerOffset.x * pointerActive * 0.15 + scrollProgress * 0.055;
  float pitch = idlePitch + pointerOffset.y * -pointerActive * 0.075;

  vec3 ray = normalize(vec3(point.x * 0.58, point.y * 0.52 - 0.025, 1.45));
  ray = rotateView(ray, yaw, pitch);

  vec3 camera = vec3(-0.28 + scrollProgress * 0.48, 0.0, scrollProgress * 4.85);
  float nearestDistance = 1000.0;
  float surface = -1.0;
  vec3 hitPoint = vec3(0.0);

  if (ray.x > 0.0001) {
    float distanceToRightWall = (CORRIDOR_HALF_WIDTH - camera.x) / ray.x;
    vec3 candidate = camera + ray * distanceToRightWall;
    if (
      distanceToRightWall > 0.0 &&
      abs(candidate.y) <= CORRIDOR_HALF_HEIGHT &&
      distanceToRightWall < nearestDistance
    ) {
      nearestDistance = distanceToRightWall;
      surface = 1.0;
      hitPoint = candidate;
    }
  }

  if (ray.x < -0.0001) {
    float distanceToLeftWall = (-CORRIDOR_HALF_WIDTH - camera.x) / ray.x;
    vec3 candidate = camera + ray * distanceToLeftWall;
    if (
      distanceToLeftWall > 0.0 &&
      abs(candidate.y) <= CORRIDOR_HALF_HEIGHT &&
      distanceToLeftWall < nearestDistance
    ) {
      nearestDistance = distanceToLeftWall;
      surface = 2.0;
      hitPoint = candidate;
    }
  }

  if (ray.y < -0.0001) {
    float distanceToFloor = (-CORRIDOR_HALF_HEIGHT - camera.y) / ray.y;
    vec3 candidate = camera + ray * distanceToFloor;
    if (
      distanceToFloor > 0.0 &&
      abs(candidate.x) <= CORRIDOR_HALF_WIDTH &&
      distanceToFloor < nearestDistance
    ) {
      nearestDistance = distanceToFloor;
      surface = 3.0;
      hitPoint = candidate;
    }
  }

  if (ray.y > 0.0001) {
    float distanceToCeiling = (CORRIDOR_HALF_HEIGHT - camera.y) / ray.y;
    vec3 candidate = camera + ray * distanceToCeiling;
    if (
      distanceToCeiling > 0.0 &&
      abs(candidate.x) <= CORRIDOR_HALF_WIDTH &&
      distanceToCeiling < nearestDistance
    ) {
      nearestDistance = distanceToCeiling;
      surface = 4.0;
      hitPoint = candidate;
    }
  }

  float farWallZ = 34.0 + sin(time * 0.1) * 1.4;
  if (ray.z > 0.0001) {
    float distanceToFarWall = (farWallZ - camera.z) / ray.z;
    vec3 candidate = camera + ray * distanceToFarWall;
    if (
      distanceToFarWall > 0.0 &&
      abs(candidate.x) <= CORRIDOR_HALF_WIDTH &&
      abs(candidate.y) <= CORRIDOR_HALF_HEIGHT &&
      distanceToFarWall < nearestDistance
    ) {
      nearestDistance = distanceToFarWall;
      surface = 5.0;
      hitPoint = candidate;
    }
  }

  vec3 color = backgroundColor;

  if (surface > 0.0) {
    float surfaceTone = 0.022;
    if (surface < 1.5) surfaceTone = 0.068;
    else if (surface < 2.5) surfaceTone = 0.048;
    else if (surface < 3.5) surfaceTone = 0.083;
    else if (surface < 4.5) surfaceTone = 0.032;

    color = mix(backgroundColor, inkColor, surfaceTone * sceneContrast);

    float wallLine = 0.0;
    if (surface < 2.5) {
      float horizontalBand = 1.0 - smoothstep(0.0, 0.012, abs(hitPoint.y - 0.83));
      wallLine += horizontalBand * 0.055;
    }

    if (surface > 2.5 && surface < 4.5) {
      float centerSeam = 1.0 - smoothstep(0.0, 0.018, abs(hitPoint.x));
      wallLine += centerSeam * 0.035;
    }

    color = mix(color, inkColor, wallLine * sceneContrast);

    float movingOffset = sin(time * 0.11) * 0.23;
    float genericDoor = 0.0;
    float genericFrame = 0.0;

    if (surface < 1.5) {
      genericDoor = max(
        doorInterior(hitPoint, 14.2 + movingOffset, 0.76),
        doorInterior(hitPoint, 21.0 - movingOffset * 0.7, 0.76)
      );
      genericFrame = max(
        doorFrame(hitPoint, 14.2 + movingOffset, 0.76),
        doorFrame(hitPoint, 21.0 - movingOffset * 0.7, 0.76)
      );
    } else if (surface < 2.5) {
      genericDoor = max(
        max(doorInterior(hitPoint, 4.4 - movingOffset, 0.78), doorInterior(hitPoint, 10.9 + movingOffset, 0.78)),
        doorInterior(hitPoint, 18.0 - movingOffset * 0.6, 0.78)
      );
      genericFrame = max(
        max(doorFrame(hitPoint, 4.4 - movingOffset, 0.78), doorFrame(hitPoint, 10.9 + movingOffset, 0.78)),
        doorFrame(hitPoint, 18.0 - movingOffset * 0.6, 0.78)
      );
    }

    color = mix(color, inkColor, genericDoor * 0.085 * sceneContrast);
    color = mix(color, inkColor, genericFrame * 0.16 * sceneContrast);

    float cycle = mod(time, 13.0);
    float opening = smoothstep(8.8, 9.8, cycle) * (1.0 - smoothstep(11.0, 12.2, cycle));

    if (surface < 1.5) {
      float specialDoor = doorInterior(hitPoint, ROOM_108_Z, 0.82);
      float specialFrame = doorFrame(hitPoint, ROOM_108_Z, 0.82);
      float localDoorZ = hitPoint.z - ROOM_108_Z;
      float openingEdge = -0.77 + opening * 0.62;
      float openingGap = specialDoor * (1.0 - step(openingEdge, localDoorZ));
      float plaque = rectangle(
        vec2(-(hitPoint.z - ROOM_108_Z) / 0.59, (hitPoint.y - 1.01) / 0.25),
        vec2(0.0),
        vec2(1.08, 0.79)
      );
      float number = roomNumber108(hitPoint);

      color = mix(color, inkColor, specialDoor * 0.12 * sceneContrast);
      color = mix(color, accentColor, specialDoor * 0.055 + specialFrame * 0.34);
      color = mix(color, accentColor, openingGap * (0.62 + opening * 0.28));
      color = mix(color, inkColor, plaque * 0.2 * sceneContrast);
      color = mix(color, accentColor, number * 0.92);
    }

    if (surface > 2.5) {
      float spillDistance = length(vec2(hitPoint.x - CORRIDOR_HALF_WIDTH, hitPoint.z - ROOM_108_Z));
      float lightSpill = exp(-spillDistance * 0.9) * (0.055 + opening * 0.2);
      color = mix(color, accentColor, lightSpill);
    }

    float distanceFromCamera = max(hitPoint.z - camera.z, 0.0);
    float fog = smoothstep(15.0, 34.0, distanceFromCamera);
    color = mix(color, backgroundColor, fog * 0.72);
  }

  float grain = hash(floor(gl_FragCoord.xy / 2.0) + floor(time * 1.5));
  color += (grain - 0.5) * 0.008 * sceneContrast;

  float leftTextMask = smoothstep(0.12, 0.58, screenUv.x);
  color = mix(backgroundColor, color, leftTextMask);

  float edgeMask = smoothstep(0.0, 0.09, screenUv.y) * (1.0 - smoothstep(0.92, 1.0, screenUv.y));
  color = mix(backgroundColor, color, 0.68 + edgeMask * 0.32);

  gl_FragColor = vec4(color, 1.0);
}
`

const LIGHT_BACKGROUND_FALLBACK = [1, 1, 1] as const
const DARK_BACKGROUND_FALLBACK = [0.145, 0.145, 0.145] as const
const LIGHT_INK_FALLBACK = [0.145, 0.145, 0.145] as const
const DARK_INK_FALLBACK = [0.985, 0.985, 0.985] as const
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
    console.error('Contacts corridor shader compilation failed:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

const CorridorFallback = () => (
  <svg
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    className="text-foreground size-full"
  >
    <rect
      width="1600"
      height="900"
      className="fill-background"
    />
    <path
      d="M780 410 1600 80V820L780 490Z"
      className="fill-foreground/[0.045]"
    />
    <path
      d="M780 410 0 80H1600Z"
      className="fill-foreground/[0.025]"
    />
    <path
      d="M780 490 0 820H1600Z"
      className="fill-foreground/[0.065]"
    />
    <path
      d="M780 410 0 80V820L780 490Z"
      className="fill-foreground/[0.035]"
    />
    <g className="stroke-foreground/10 fill-foreground/[0.035]">
      <path d="M1080 289 1298 201V680L1080 598Z" />
      <path d="M1370 171 1535 104V768L1370 706Z" />
      <path d="M508 297 338 226V655L508 590Z" />
    </g>
    <path
      d="M1070 278 1312 180V692L1070 604Z"
      className="stroke-accent-violet/55 fill-accent-violet/[0.055]"
      strokeWidth="3"
    />
    <path
      d="M1090 302 1278 226V336L1090 393Z"
      className="fill-accent-violet/12"
    />
    <text
      x="1178"
      y="330"
      textAnchor="middle"
      className="fill-accent-violet font-jetbrains text-[34px] font-bold"
    >
      108
    </text>
  </svg>
)

export const InfiniteCorridorCanvas = () => {
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
      antialias: true,
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
      console.error('Contacts corridor shader linking failed:', gl.getProgramInfoLog(program))
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
      scrollProgress: gl.getUniformLocation(program, 'scrollProgress'),
      sceneContrast: gl.getUniformLocation(program, 'sceneContrast'),
      backgroundColor: gl.getUniformLocation(program, 'backgroundColor'),
      inkColor: gl.getUniformLocation(program, 'inkColor'),
      accentColor: gl.getUniformLocation(program, 'accentColor'),
    }

    const backgroundColor = getCssColor(
      '--background',
      isDark ? DARK_BACKGROUND_FALLBACK : LIGHT_BACKGROUND_FALLBACK
    )
    const inkColor = getCssColor('--foreground', isDark ? DARK_INK_FALLBACK : LIGHT_INK_FALLBACK)
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
    const scroll = { value: 0, target: 0 }
    let frame = 0
    let isVisible = true
    let isDocumentVisible = !document.hidden
    let hasSized = false

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = 2
      const width = Math.max(1, Math.floor(bounds.width * pixelRatio))
      const height = Math.max(1, Math.floor(bounds.height * pixelRatio))

      if (canvas.width === width && canvas.height === height) return

      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)

      if (!hasSized) {
        pointer.x = width * 0.5
        pointer.y = height * 0.5
        pointer.targetX = pointer.x
        pointer.targetY = pointer.y
        hasSized = true
      }
    }

    const updateScrollTarget = () => {
      const bounds = container.getBoundingClientRect()
      scroll.target = Math.min(1, Math.max(0, -bounds.top / Math.max(bounds.height * 0.72, 1)))
    }

    const draw = (elapsed: number) => {
      resize()
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform2f(uniforms.pointerPosition, pointer.x, pointer.y)
      gl.uniform1f(uniforms.pointerActive, pointer.activity)
      gl.uniform1f(uniforms.time, elapsed)
      gl.uniform1f(uniforms.scrollProgress, shouldReduceMotion ? 0.16 : scroll.value)
      gl.uniform1f(uniforms.sceneContrast, isDark ? 1 : 1.3)
      gl.uniform3f(
        uniforms.backgroundColor,
        backgroundColor[0],
        backgroundColor[1],
        backgroundColor[2]
      )
      gl.uniform3f(uniforms.inkColor, inkColor[0], inkColor[1], inkColor[2])
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
      pointer.activity += (pointer.targetActivity - pointer.activity) * 0.075
      scroll.value += (scroll.target - scroll.value) * 0.08
      draw((now - startedAt) * 0.001)
      frame = requestAnimationFrame(render)
    }

    const requestDraw = () => {
      if (shouldReduceMotion) draw(0)
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

    const resizeObserver = new ResizeObserver(() => {
      resize()
      requestDraw()
    })
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
    updateScrollTarget()
    scroll.value = scroll.target
    draw(0)
    resizeObserver.observe(canvas)
    intersectionObserver.observe(container)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', updateScrollTarget, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    requestDraw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', updateScrollTarget)
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
        <CorridorFallback />
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block size-full"
      />
    </div>
  )
}
