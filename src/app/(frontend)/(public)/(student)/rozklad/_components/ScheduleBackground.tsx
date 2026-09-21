'use client'

import { useLayoutEffect, useRef } from 'react'

import { useTheme } from '@/frontend_contexts/theme'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'

const VERTEX_SHADER = `
attribute vec2 position;

uniform vec2 viewport;
uniform vec3 plateCenter;
uniform vec2 plateSize;
uniform vec3 plateRotation;

varying vec2 plateUv;
varying float surfaceLight;

mat3 rotateX(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat3(
    1.0, 0.0, 0.0,
    0.0, cosine, -sine,
    0.0, sine, cosine
  );
}

mat3 rotateY(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat3(
    cosine, 0.0, sine,
    0.0, 1.0, 0.0,
    -sine, 0.0, cosine
  );
}

mat3 rotateZ(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat3(
    cosine, -sine, 0.0,
    sine, cosine, 0.0,
    0.0, 0.0, 1.0
  );
}

void main() {
  mat3 rotation = rotateZ(plateRotation.z) * rotateY(plateRotation.y) * rotateX(plateRotation.x);
  vec3 localPosition = vec3(position * plateSize * 0.5, 0.0);
  vec3 worldPosition = rotation * localPosition + plateCenter;
  vec3 normal = rotation * vec3(0.0, 0.0, 1.0);

  float perspective = 2.7 / (2.7 - worldPosition.z);
  float viewportAspect = viewport.x / viewport.y;
  vec2 clipPosition = worldPosition.xy * perspective;
  clipPosition.x /= viewportAspect;

  plateUv = position * 0.5 + 0.5;
  surfaceLight = 0.5 + 0.5 * dot(normalize(normal), normalize(vec3(-0.42, 0.65, 0.8)));
  gl_Position = vec4(clipPosition, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision mediump float;

uniform sampler2D labelAtlas;
uniform float labelIndex;
uniform float plateAspect;
uniform float accentStrength;
uniform vec2 burnCenter;
uniform float burnAmount;
uniform float heat;
uniform float darkMode;
uniform float time;
uniform vec3 accentColor;

varying vec2 plateUv;
varying float surfaceLight;

float roundedBoxDistance(vec2 point, vec2 bounds, float radius) {
  vec2 delta = abs(point) - bounds + radius;
  return min(max(delta.x, delta.y), 0.0) + length(max(delta, 0.0)) - radius;
}

float noise(vec2 coordinate) {
  return fract(sin(dot(coordinate, vec2(12.9898, 78.233))) * 43758.5453);
}

float bayer2(vec2 coordinate) {
  vec2 cell = mod(floor(coordinate), 2.0);
  if (cell.y < 0.5) return mix(0.0, 2.0, cell.x);
  return mix(3.0, 1.0, cell.x);
}

float bayer4(vec2 coordinate) {
  float finePattern = bayer2(mod(floor(coordinate), 2.0));
  float coarsePattern = bayer2(floor(coordinate * 0.5));
  return (finePattern * 4.0 + coarsePattern + 0.5) / 16.0;
}

void main() {
  vec2 local = (plateUv - 0.5) * vec2(plateAspect, 1.0);
  float distanceToEdge = roundedBoxDistance(
    local,
    vec2(plateAspect * 0.5 - 0.025, 0.475),
    0.11
  );
  float fill = 1.0 - smoothstep(-0.008, 0.012, distanceToEdge);

  if (fill < 0.01) discard;

  float rim = 1.0 - smoothstep(0.0, 0.032, abs(distanceToEdge));
  float topSheen = pow(1.0 - plateUv.y, 5.0) * 0.2;
  float frost = noise(gl_FragCoord.xy * 0.42 + time * 0.15) * 0.018;
  float labelColumn = mod(labelIndex, 4.0);
  float labelRow = 2.0 - floor(labelIndex / 4.0);
  vec2 labelUv = vec2(
    (plateUv.x + labelColumn) / 4.0,
    (plateUv.y + labelRow) / 3.0
  );
  float label = texture2D(labelAtlas, labelUv).a;

  vec2 burnDelta = (plateUv - burnCenter) * vec2(plateAspect, 1.0);
  float burnDistance = length(burnDelta);
  float burnNoise = (noise(floor(gl_FragCoord.xy / 3.0) + labelIndex * 17.0) - 0.5) * 0.14;
  float burnRadius = burnAmount * burnAmount * (plateAspect * 0.9 + 0.7);
  float burnEdge = burnDistance - burnRadius + burnNoise;
  float burnCoverage = (1.0 - smoothstep(-0.06, 0.12, burnEdge)) *
    smoothstep(0.015, 0.12, burnAmount);
  float removed = step(bayer4(gl_FragCoord.xy / 2.0), burnCoverage);
  float hotEdge = (1.0 - smoothstep(0.012, 0.075, abs(burnEdge))) *
    smoothstep(0.02, 0.16, burnAmount);
  float heatSpot = exp(-burnDistance * 5.5) * heat;
  float emberNoise = noise(floor(gl_FragCoord.xy / 2.0) + floor(time * 13.0));
  float ember = step(0.91, emberNoise) *
    smoothstep(-0.28, -0.07, burnEdge) *
    (1.0 - smoothstep(0.0, 0.1, burnEdge));

  vec3 neutralGlass = mix(vec3(0.48, 0.52, 0.62), vec3(0.34, 0.37, 0.46), darkMode);
  vec3 glassColor = mix(neutralGlass, accentColor, accentStrength * 0.34);
  glassColor *= 0.8 + surfaceLight * 0.3;
  glassColor += accentColor * (rim * (0.08 + accentStrength * 0.11));
  glassColor += vec3(topSheen + frost);

  vec3 hotColor = mix(vec3(1.0, 0.38, 0.08), accentColor, 0.35);
  glassColor = mix(glassColor, min(hotColor * 1.35, vec3(1.0)), clamp(heatSpot + hotEdge, 0.0, 1.0));

  vec3 labelColor = mix(vec3(0.22, 0.24, 0.3), vec3(0.9, 0.91, 0.96), darkMode);
  glassColor = mix(glassColor, labelColor, label * 0.95);

  float glassAlpha = mix(0.38, 0.42, darkMode);
  float surfaceAlpha = (glassAlpha + rim * 0.36 + label * 0.82 + accentStrength * 0.1) *
    (1.0 - removed);
  float fireAlpha = hotEdge * 0.84 + heatSpot * 0.24 + ember * burnAmount * 0.72;
  float alpha = fill * max(surfaceAlpha, fireAlpha);
  gl_FragColor = vec4(glassColor, alpha);
}
`

const PLATE_CONTENT = [
  { subject: 'Математичний аналіз', meta: 'ПН · 08:00' },
  { subject: 'Нейронні мережі', meta: 'АУД · 302' },
  { subject: 'Загальна психологія', meta: 'ВТ · 10:25' },
  { subject: 'Кросплатформне програмування', meta: 'ONLINE' },
  { subject: 'Дискретний аналіз', meta: 'СР · 12:10' },
  { subject: 'Українська мова', meta: 'КОРПУС · Б' },
  { subject: 'Операційні системи', meta: 'ПТ · 14:15' },
  { subject: '3D-анімація', meta: 'ПАРА · 04' },
  { subject: 'Іноземна мова', meta: '16:00' },
] as const

const FALLBACK_PLATE_CLASSES = [
  'left-[1%] top-[13%] -rotate-3',
  'left-[36%] top-[11%] rotate-2',
  'right-[1%] top-[16%] rotate-3',
  'left-[8%] top-[36%] rotate-2',
  'right-[18%] top-[37%] -rotate-2',
  'left-[1%] top-[59%] rotate-3',
  'left-[36%] top-[58%] -rotate-2',
  'right-[1%] top-[57%] rotate-2',
  'left-[13%] top-[81%] -rotate-2',
  'right-[18%] top-[79%] rotate-3',
] as const

const SCATTERED_PLATES = [
  [-0.64, 0.56, -0.32, 0.86, 0.22, -0.16, 0.24, -0.16],
  [0.18, 0.66, 0.16, 0.7, 0.2, 0.12, -0.3, 0.08],
  [0.69, 0.3, -0.14, 0.82, 0.23, -0.1, 0.32, 0.16],
  [-0.25, 0.12, 0.3, 0.72, 0.2, 0.14, -0.2, -0.09],
  [0.43, -0.05, -0.38, 0.93, 0.24, -0.08, 0.28, -0.04],
  [-0.67, -0.22, 0.02, 0.74, 0.21, 0.1, -0.22, 0.12],
  [0.02, -0.41, 0.24, 0.88, 0.23, -0.12, 0.24, -0.1],
  [0.72, -0.55, -0.22, 0.68, 0.2, 0.08, -0.3, 0.1],
  [-0.42, -0.67, -0.26, 0.79, 0.21, -0.08, 0.2, 0.04],
] as const

const ORDERED_PLATES = [
  [-1.25, 0.58, -0.1, 0.72, 0.2],
  [-0.08, 0.62, 0.02, 0.62, 0.2],
  [1.2, 0.52, -0.16, 0.58, 0.2],
  [-0.88, 0.18, 0.08, 0.68, 0.2],
  [0.68, 0.2, -0.05, 0.78, 0.2],
  [-1.2, -0.23, 0.0, 0.62, 0.2],
  [0.05, -0.2, 0.12, 0.72, 0.2],
  [1.25, -0.2, -0.12, 0.58, 0.2],
  [-0.65, -0.6, -0.07, 0.76, 0.2],
] as const

const LIGHT_ACCENT = [0.25, 0.34, 0.4] as const
const DARK_ACCENT = [0.48, 0.58, 0.64] as const
const MAX_RENDER_PIXELS = 2_000_000

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum)

const mix = (from: number, to: number, amount: number) => from + (to - from) * amount

const smoothStep = (from: number, to: number, value: number) => {
  const normalized = clamp((value - from) / (to - from), 0, 1)
  return normalized * normalized * (3 - 2 * normalized)
}

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Schedule sculpture shader compilation failed:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

const createLabelTexture = (gl: WebGLRenderingContext) => {
  const atlas = document.createElement('canvas')
  const cellWidth = 480
  const cellHeight = 112
  const atlasColumns = 4
  atlas.width = cellWidth * atlasColumns
  atlas.height = cellHeight * Math.ceil(PLATE_CONTENT.length / atlasColumns)

  const context = atlas.getContext('2d')
  const texture = gl.createTexture()
  if (!context || !texture) return null

  context.clearRect(0, 0, atlas.width, atlas.height)
  context.fillStyle = '#ffffff'
  context.textBaseline = 'middle'

  const fitText = (value: string, maximumWidth: number) => {
    if (context.measureText(value).width <= maximumWidth) return value

    let shortened = value
    while (shortened.length > 1 && context.measureText(`${shortened}…`).width > maximumWidth)
      shortened = shortened.slice(0, -1)

    return `${shortened.trimEnd()}…`
  }

  PLATE_CONTENT.forEach(({ subject, meta }, index) => {
    const left = (index % atlasColumns) * cellWidth
    const top = Math.floor(index / atlasColumns) * cellHeight
    context.font = '650 38px ui-sans-serif, system-ui, sans-serif'
    context.globalAlpha = 0.96
    context.fillText(fitText(subject, cellWidth - 82), left + 28, top + 39)
    context.font = '550 20px ui-monospace, SFMono-Regular, Menlo, monospace'
    context.globalAlpha = 0.68
    context.fillText(meta, left + 28, top + 79)
    context.globalAlpha = 0.46
    context.fillRect(left + cellWidth - 44, top + 28, 12, 12)
  })

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return texture
}

export function ScheduleSculpture() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fallbackRef = useRef<HTMLDivElement>(null)
  const { value: theme } = useTheme()
  const isDark = theme === 'dark'
  const showBackground = useMediaQuery('(min-width: 700px)')

  useLayoutEffect(() => {
    if (!showBackground) return

    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
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
    const labelTexture = createLabelTexture(gl)

    if (!vertexShader || !fragmentShader || !program || !buffer || !labelTexture) {
      if (vertexShader) gl.deleteShader(vertexShader)
      if (fragmentShader) gl.deleteShader(fragmentShader)
      if (program) gl.deleteProgram(program)
      if (buffer) gl.deleteBuffer(buffer)
      if (labelTexture) gl.deleteTexture(labelTexture)
      return
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Schedule sculpture shader linking failed:', gl.getProgramInfoLog(program))
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
      gl.deleteTexture(labelTexture)
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
      viewport: gl.getUniformLocation(program, 'viewport'),
      plateCenter: gl.getUniformLocation(program, 'plateCenter'),
      plateSize: gl.getUniformLocation(program, 'plateSize'),
      plateRotation: gl.getUniformLocation(program, 'plateRotation'),
      plateAspect: gl.getUniformLocation(program, 'plateAspect'),
      labelIndex: gl.getUniformLocation(program, 'labelIndex'),
      labelAtlas: gl.getUniformLocation(program, 'labelAtlas'),
      accentStrength: gl.getUniformLocation(program, 'accentStrength'),
      burnCenter: gl.getUniformLocation(program, 'burnCenter'),
      burnAmount: gl.getUniformLocation(program, 'burnAmount'),
      heat: gl.getUniformLocation(program, 'heat'),
      accentColor: gl.getUniformLocation(program, 'accentColor'),
      darkMode: gl.getUniformLocation(program, 'darkMode'),
      time: gl.getUniformLocation(program, 'time'),
    }
    const accentColor = isDark ? DARK_ACCENT : LIGHT_ACCENT
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const pointerTarget = { x: 0, y: 0 }
    const pointerCurrent = { x: 0, y: 0 }
    const burnStates = SCATTERED_PLATES.map(() => ({
      amount: 0,
      heat: 0,
      centerX: 0.5,
      centerY: 0.5,
      ignited: false,
      reforming: false,
      destroyedUntil: 0,
      armed: true,
    }))
    const startedAt = performance.now()
    let animationFrame = 0
    let isVisible = true
    let isPointerInside = false
    let previousElapsed = 0

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, labelTexture)
    gl.uniform1i(uniforms.labelAtlas, 0)

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const preferredPixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const preferredPixelCount =
        bounds.width * preferredPixelRatio * bounds.height * preferredPixelRatio
      const resolutionScale = Math.min(1, Math.sqrt(MAX_RENDER_PIXELS / preferredPixelCount))
      const pixelRatio = preferredPixelRatio * resolutionScale
      const width = Math.max(1, Math.floor(bounds.width * pixelRatio))
      const height = Math.max(1, Math.floor(bounds.height * pixelRatio))

      if (canvas.width === width && canvas.height === height) return
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }

    const draw = (elapsed: number) => {
      resize()
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uniforms.viewport, canvas.width, canvas.height)
      gl.uniform1f(uniforms.darkMode, isDark ? 1 : 0)
      gl.uniform1f(uniforms.time, elapsed)
      gl.uniform3f(uniforms.accentColor, accentColor[0], accentColor[1], accentColor[2])

      const alignment = 0.86
      const drift = 1 - alignment
      const layoutSpread = clamp(canvas.width / canvas.height / 2.1, 0.72, 1.12)
      const frameDelta = clamp(elapsed - previousElapsed, 0, 0.05)
      previousElapsed = elapsed

      const plates = SCATTERED_PLATES.map((scattered, index) => {
        const ordered = ORDERED_PLATES[index]
        const wave = elapsed * 0.42 + index * 1.17
        const baseX = mix(scattered[0], ordered[0], alignment) * layoutSpread
        const baseY = mix(scattered[1], ordered[1], alignment)
        const pointerDistance = Math.hypot(baseX - pointerCurrent.x, baseY - pointerCurrent.y)
        const pointerForce = Math.max(0, 1 - pointerDistance / 0.72)
        const centerX =
          baseX + Math.sin(wave) * 0.045 * drift - pointerCurrent.x * pointerForce * 0.04
        const centerY =
          baseY + Math.cos(wave * 0.83) * 0.04 * drift - pointerCurrent.y * pointerForce * 0.032
        const centerZ = mix(scattered[2], ordered[2], alignment) + pointerForce * 0.12
        const visibleSubjectLength = Math.min(PLATE_CONTENT[index].subject.length, 22)
        const contentWidth = clamp(0.5 + visibleSubjectLength * 0.038, 0.82, 1.26)
        const width = Math.max(mix(scattered[3], ordered[3], alignment) * 1.12, contentWidth)
        const height = mix(scattered[4], ordered[4], alignment) * 1.28

        return {
          index,
          centerX,
          centerY,
          centerZ,
          width,
          height,
          rotationX: scattered[5] * drift + Math.sin(wave * 0.71) * 0.035,
          rotationY:
            scattered[6] * drift +
            Math.cos(wave * 0.64) * 0.06 +
            pointerForce * pointerCurrent.x * 0.045,
          rotationZ: scattered[7] * drift + Math.sin(wave * 0.52) * 0.025,
        }
      })

      let hoveredIndex = -1
      let hoveredScore = Number.POSITIVE_INFINITY

      if (isPointerInside && !coarsePointer && !reducedMotion) {
        for (const plate of plates) {
          const burnState = burnStates[plate.index]
          if (burnState.destroyedUntil > elapsed || burnState.reforming) continue

          const horizontalDistance = (pointerCurrent.x - plate.centerX) / (plate.width * 0.56)
          const verticalDistance = (pointerCurrent.y - plate.centerY) / (plate.height * 0.72)
          const score = horizontalDistance ** 2 + verticalDistance ** 2 - plate.centerZ * 0.12

          if (score < 1 && score < hoveredScore) {
            hoveredIndex = plate.index
            hoveredScore = score
          }
        }
      }

      for (const plate of plates) {
        const burnState = burnStates[plate.index]
        const isHovered = plate.index === hoveredIndex
        const pointerIsOverPlate =
          isPointerInside &&
          Math.abs((pointerCurrent.x - plate.centerX) / (plate.width * 0.56)) < 1 &&
          Math.abs((pointerCurrent.y - plate.centerY) / (plate.height * 0.72)) < 1

        if (!pointerIsOverPlate) burnState.armed = true

        if (burnState.destroyedUntil > elapsed) {
          burnState.amount = 1
          burnState.heat = 0
          continue
        }

        if (burnState.destroyedUntil > 0) {
          burnState.destroyedUntil = 0
          burnState.reforming = true
          burnState.heat = 1
        }

        if (burnState.reforming) {
          burnState.amount = clamp(burnState.amount - frameDelta * 1.05, 0, 1)
          burnState.heat = Math.sin((1 - burnState.amount) * Math.PI) * 0.72

          if (burnState.amount === 0) {
            burnState.reforming = false
            burnState.heat = 0
          }

          continue
        }

        if (isHovered && burnState.armed) {
          const localX = clamp((pointerCurrent.x - plate.centerX) / plate.width + 0.5, 0.12, 0.88)
          const localY = clamp((pointerCurrent.y - plate.centerY) / plate.height + 0.5, 0.18, 0.82)
          const centerBlend = burnState.ignited ? 0.035 : 0.32

          burnState.centerX = mix(burnState.centerX, localX, centerBlend)
          burnState.centerY = mix(burnState.centerY, localY, centerBlend)
          burnState.heat = clamp(burnState.heat + frameDelta * 5.6, 0, 1)
          if (burnState.heat > 0.48) burnState.ignited = true
        } else {
          burnState.heat = clamp(burnState.heat - frameDelta * 2.2, 0, 1)
        }

        if (burnState.ignited) {
          burnState.amount = clamp(
            burnState.amount + frameDelta * (0.86 + burnState.heat * 0.34),
            0,
            1
          )
          burnState.heat = Math.max(burnState.heat, 0.72)

          if (burnState.amount === 1) {
            burnState.ignited = false
            burnState.armed = false
            burnState.heat = 0
            burnState.destroyedUntil = elapsed + 1.25 + (plate.index % 3) * 0.16
          }
        }
      }

      const demoCycle = elapsed % 10
      const demoIndex = Math.floor(elapsed / 10) % PLATE_CONTENT.length
      const demoBurn = coarsePointer
        ? smoothStep(0.8, 2.1, demoCycle) * (1 - smoothStep(4.4, 6.1, demoCycle))
        : 0
      const demoHeat = coarsePointer
        ? smoothStep(0.45, 1.35, demoCycle) * (1 - smoothStep(6.1, 8.0, demoCycle))
        : 0

      const renderedPlates = plates.map((plate) => {
        const burnState = burnStates[plate.index]
        const isDemoPlate = coarsePointer && plate.index === demoIndex && !reducedMotion
        const burnAmount = Math.max(burnState.amount, isDemoPlate ? demoBurn : 0)
        const heat = Math.max(burnState.heat, isDemoPlate ? demoHeat : 0)
        const agitation = burnState.ignited ? smoothStep(0.08, 0.72, burnAmount) : 0

        return {
          ...plate,
          centerY: plate.centerY + Math.sin(elapsed * 19 + plate.index) * agitation * 0.014,
          centerZ: plate.centerZ + heat * 0.1,
          rotationY:
            plate.rotationY + Math.cos(elapsed * 15.5 + plate.index * 0.7) * agitation * 0.055,
          rotationZ: plate.rotationZ + Math.sin(elapsed * 18 + plate.index) * agitation * 0.045,
          burnAmount,
          heat,
          burnCenterX: isDemoPlate ? 0.42 + (plate.index % 3) * 0.08 : burnState.centerX,
          burnCenterY: isDemoPlate ? 0.48 : burnState.centerY,
          accentStrength: 0.22 + heat * 0.55 + burnAmount * 0.18,
        }
      })

      renderedPlates.sort((first, second) => first.centerZ - second.centerZ)

      for (const plate of renderedPlates) {
        gl.uniform3f(uniforms.plateCenter, plate.centerX, plate.centerY, plate.centerZ)
        gl.uniform2f(uniforms.plateSize, plate.width, plate.height)
        gl.uniform3f(uniforms.plateRotation, plate.rotationX, plate.rotationY, plate.rotationZ)
        gl.uniform1f(uniforms.plateAspect, plate.width / plate.height)
        gl.uniform1f(uniforms.labelIndex, plate.index)
        gl.uniform1f(uniforms.accentStrength, plate.accentStrength)
        gl.uniform2f(uniforms.burnCenter, plate.burnCenterX, plate.burnCenterY)
        gl.uniform1f(uniforms.burnAmount, plate.burnAmount)
        gl.uniform1f(uniforms.heat, plate.heat)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }

      fallbackRef.current?.classList.add('opacity-0')
    }

    const render = (now: number) => {
      if (!isVisible || reducedMotion) {
        animationFrame = 0
        return
      }

      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.14
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.14
      draw((now - startedAt) * 0.001)
      animationFrame = requestAnimationFrame(render)
    }

    const updatePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      const isOutside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom

      if (isOutside) {
        isPointerInside = false
        pointerTarget.x = 0
        pointerTarget.y = 0
        return
      }

      isPointerInside = true
      pointerTarget.x =
        ((event.clientX - bounds.left) / bounds.width - 0.5) * 2 * (bounds.width / bounds.height)
      pointerTarget.y = (0.5 - (event.clientY - bounds.top) / bounds.height) * 2
    }

    const resizeObserver = new ResizeObserver(() => draw((performance.now() - startedAt) * 0.001))
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false

        if (!isVisible && animationFrame) {
          cancelAnimationFrame(animationFrame)
          animationFrame = 0
        }

        if (isVisible && !reducedMotion && !animationFrame)
          animationFrame = requestAnimationFrame(render)
      },
      { threshold: 0.05 }
    )

    draw(reducedMotion ? 8.4 : 0)
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    window.addEventListener('pointermove', updatePointer, { passive: true })
    if (!reducedMotion) animationFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', updatePointer)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
      gl.deleteTexture(labelTexture)
    }
  }, [isDark, showBackground])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-full overflow-hidden min-[700px]:block sm:right-[-4%] sm:w-[72%] lg:right-[-6%] lg:w-[76%]"
    >
      <div
        ref={fallbackRef}
        className="absolute inset-0 transition-opacity duration-150"
      >
        {PLATE_CONTENT.map(({ subject, meta }, index) => (
          <span
            key={subject}
            style={{
              width: `min(${Math.min(235, Math.max(170, subject.length * 9 + 50))}px, 48vw)`,
            }}
            className={`${FALLBACK_PLATE_CLASSES[index]} absolute flex h-14 flex-col justify-center rounded-lg border border-slate-600/25 bg-slate-500/8 px-3 whitespace-nowrap text-slate-950/70 shadow-sm backdrop-blur-sm dark:border-slate-300/25 dark:bg-slate-300/8 dark:text-slate-50/80`}
          >
            <span className="w-full truncate text-sm font-semibold">{subject}</span>
            <span className="mt-1 font-mono text-[10px] tracking-[0.08em] opacity-70">{meta}</span>
          </span>
        ))}
      </div>
      <canvas
        ref={canvasRef}
        className="block size-full"
      />
      <div className="from-background via-background/65 sm:via-background/15 absolute inset-0 bg-linear-to-r to-transparent" />
    </div>
  )
}
