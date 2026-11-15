import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

import { SOCIAL_IMAGE_SIZE } from './config'
import { SITE_URL } from '@/shared/constants/env'

import type { SocialCard } from './config'

const regular = readFile(join(process.cwd(), 'src/shared/og/assets/Manrope-Regular.ttf'))
const semibold = readFile(join(process.cwd(), 'src/shared/og/assets/Manrope-SemiBold.ttf'))
const facultyBackground = readFile(join(process.cwd(), 'public/images/og/background.png')).then(
  (png) => `data:image/png;base64,${png.toString('base64')}`
)
const violet = '#9785ff'

const renderHeadline = (
  text: string,
  highlight: string | undefined,
  wrap: boolean,
  fontSize: number
) => {
  const start = highlight ? text.indexOf(highlight) : -1
  if (start < 0 || !highlight) {
    return <div style={wrap ? { display: 'flex', lineClamp: 6 } : undefined}>{text}</div>
  }

  const before = text.slice(0, start)
  const after = text.slice(start + highlight.length)
  const renderPlainText = (value: string) => {
    // Separate words let Flexbox wrap naturally instead of moving the entire
    // prefix or suffix to a new row. Nonbreaking spaces preserve word spacing.
    const parts = wrap ? (value.match(/\S+\s*|\s+/gu) ?? []) : [value]

    return parts.map((part, index) => (
      <span
        key={index}
        style={{ flexShrink: 0 }}
      >
        {part.replace(/ /g, '\u00A0')}
      </span>
    ))
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        marginLeft: start === 0 ? -12 : 0,
        ...(wrap
          ? {
              width: '100%',
              flexWrap: 'wrap',
              maxHeight: fontSize * 1.15 * 6 + 7,
              overflow: 'hidden',
            }
          : {}),
      }}
    >
      {before && renderPlainText(before)}
      <span
        style={{
          background: violet,
          color: '#09070d',
          padding: '0 12px 7px',
          flexShrink: 0,
          maxWidth: '100%',
        }}
      >
        {highlight}
      </span>
      {after && renderPlainText(after)}
    </div>
  )
}

const loadPhoto = async (photo: NonNullable<SocialCard['photo']>) => {
  try {
    const url = new URL(photo.url, SITE_URL)

    const allowedOrigins = [new URL(SITE_URL).origin, process.env.R2_PUBLIC_URL]
    if (!allowedOrigins.includes(url.origin)) return undefined

    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      redirect: 'error',
    })
    if (!response.ok) return undefined

    // CMS originals are AVIF, which Satori cannot decode. Normalize and crop here,
    // using the editor's focal point, without altering any photographed subjects.
    const image = sharp(Buffer.from(await response.arrayBuffer()), {
      limitInputPixels: 40_000_000,
    }).rotate()

    const { width, height } = await image.metadata()
    if (!width || !height) return undefined

    const ratio = 760 / 630

    const cropWidth = Math.min(width, Math.round(height * ratio))
    const cropHeight = Math.min(height, Math.round(width / ratio))

    const focalX = Math.min(100, Math.max(0, photo.focalX ?? 50)) / 100
    const focalY = Math.min(100, Math.max(0, photo.focalY ?? 50)) / 100

    const left = Math.round(
      Math.max(0, Math.min(width - cropWidth, width * focalX - cropWidth / 2))
    )
    const top = Math.round(
      Math.max(0, Math.min(height - cropHeight, height * focalY - cropHeight / 2))
    )

    const png = await image
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(760, 630)
      .png()
      .toBuffer()

    return `data:image/png;base64,${png.toString('base64')}`
  } catch (error) {
    console.warn(
      'OG photo unavailable; using the faculty artwork.',
      error instanceof Error ? error.message : error
    )

    return undefined
  }
}

export const renderSocialCard = async (card: SocialCard, showHighlight = true) => {
  const [fontRegular, fontSemibold, photo] = await Promise.all([
    regular,
    semibold,
    card.photo ? loadPhoto(card.photo) : undefined,
  ])
  const imageSrc = photo ?? (await facultyBackground)

  const fontSize = card.lines
    ? 76
    : card.title.length > 140
      ? 38
      : card.title.length > 85
        ? 44
        : card.title.length > 55
          ? 52
          : 68

  const highlight = showHighlight ? card.highlight : undefined
  const lines = card.lines

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#000',
        color: '#fff',
        fontFamily: 'Manrope',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        alt=""
        src={imageSrc}
        width={photo ? 760 : 1200}
        height={630}
        style={{ position: 'absolute', right: 0, top: 0 }}
      />
      {photo && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            background:
              'linear-gradient(90deg, #000 0%, #000 30%, rgba(0,0,0,0.94) 39%, rgba(0,0,0,0.48) 57%, rgba(0,0,0,0.08) 80%, rgba(0,0,0,0.08) 100%)',
          }}
        />
      )}
      {photo && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            background: 'linear-gradient(0deg, rgba(0,0,0,0.78), transparent 50%)',
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>ФМІ РДГУ</div>
        <div style={{ fontSize: 20, color: '#bbb8ca', maxWidth: 730 }}>{card.subtitle}</div>
      </div>
      {(photo
        ? [
            [439, 170, 22],
            [461, 192, 13],
            [439, 335, 22],
            [461, 322, 13],
            [1100, 82, 18],
          ]
        : []
      ).map(([left, top, size], index) => (
        <div
          key={index}
          style={{ position: 'absolute', left, top, width: size, height: size, background: violet }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: 56,
          bottom: 94,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: photo ? 800 : 1020,
          fontSize,
          fontWeight: 400,
          letterSpacing: -2,
          lineHeight: 1.15,
        }}
      >
        {lines
          ? lines.map((line, index) => (
              <div
                key={index}
                style={{ display: 'flex' }}
              >
                {renderHeadline(line, highlight, false, fontSize)}
              </div>
            ))
          : renderHeadline(card.title, highlight, true, fontSize)}
      </div>
      <div style={{ position: 'absolute', right: 56, bottom: 38, fontSize: 20, color: '#c5c2ce' }}>
        {new URL(SITE_URL).hostname}
      </div>
    </div>,
    {
      ...SOCIAL_IMAGE_SIZE,
      fonts: [
        { name: 'Manrope', data: fontRegular, weight: 400, style: 'normal' },
        { name: 'Manrope', data: fontSemibold, weight: 600, style: 'normal' },
      ],
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  )
}
