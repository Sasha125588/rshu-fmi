import { afterEach, beforeEach, describe, expect, it, spyOn } from 'bun:test'
import sharp from 'sharp'

import { SOCIAL_CARDS } from './config'
import { getSocialMetadata } from './metadata'
import { renderSocialCard } from './render'

describe('social cards', () => {
  let fetchAssets: ReturnType<typeof spyOn<typeof globalThis, 'fetch'>>

  beforeEach(() => {
    const fetchPublicAssets = Object.assign(async () => new Response(null, { status: 503 }), {
      preconnect: globalThis.fetch.preconnect,
    })
    fetchAssets = spyOn(globalThis, 'fetch').mockImplementation(fetchPublicAssets)
  })

  afterEach(() => fetchAssets.mockRestore())

  it('uses a versioned PNG for both OG and Twitter', () => {
    const metadata = getSocialMetadata('/news/faculty/example', 'Новина', 'Опис', '2026-10-10')
    const og = metadata.openGraph as {
      images: { url: string; width: number; height: number; type: string }[]
    }
    const twitter = metadata.twitter as { card: string; images: { url: string }[] }
    const image = og.images[0]
    expect(new URL(image.url).pathname).toBe('/og/news/faculty/example')
    expect(new URL(image.url).searchParams.get('v')).toBe('3-2026-10-10')
    expect([image.width, image.height, image.type]).toEqual([1200, 630, 'image/png'])
    expect(twitter.card).toBe('summary_large_image')
    expect(twitter.images[0].url).toBe(image.url)
  })

  it('renders a Ukrainian title and allows the highlight to be removed', async () => {
    const highlighted = await (await renderSocialCard(SOCIAL_CARDS['/'])).arrayBuffer()
    const plain = await (await renderSocialCard(SOCIAL_CARDS['/'], false)).arrayBuffer()
    const image = await sharp(Buffer.from(plain)).metadata()
    expect([image.format, image.width, image.height]).toEqual(['png', 1200, 630])
    expect(Buffer.from(highlighted).equals(Buffer.from(plain))).toBe(false)
  })

  it('renders the bundled background without an HTTP request', async () => {
    const response = await renderSocialCard(SOCIAL_CARDS['/'])
    const image = await sharp(Buffer.from(await response.arrayBuffer())).metadata()
    expect([image.format, image.width, image.height]).toEqual(['png', 1200, 630])
    expect(fetchAssets).not.toHaveBeenCalled()
  })

  it.each([
    ['Розклад занять', 'занять'],
    ['Формула успіху для студентів факультету математики та інформатики', 'успіху для студентів'],
    [
      'Факультет математики та інформатики запрошує майбутніх студентів на день відкритих дверей',
      'Факультет математики',
    ],
  ])('highlights "%s" without explicit lines', async (title, highlight) => {
    const card = { title, subtitle: '', highlight }
    const highlighted = Buffer.from(await (await renderSocialCard(card)).arrayBuffer())
    const disabled = Buffer.from(await (await renderSocialCard(card, false)).arrayBuffer())
    const unconfigured = Buffer.from(
      await (await renderSocialCard({ title, subtitle: '' })).arrayBuffer()
    )
    expect(highlighted.equals(disabled)).toBe(false)
    expect(disabled.equals(unconfigured)).toBe(true)
    const image = await sharp(highlighted).metadata()
    expect([image.format, image.width, image.height]).toEqual(['png', 1200, 630])
  })

  it('keeps the title unchanged when the highlight is empty or absent from the text', async () => {
    const card = { title: 'Розклад занять', subtitle: '' }
    const plain = Buffer.from(await (await renderSocialCard(card)).arrayBuffer())
    for (const highlight of ['', 'відсутня фраза']) {
      const image = Buffer.from(
        await (await renderSocialCard({ ...card, highlight })).arrayBuffer()
      )
      expect(image.equals(plain)).toBe(true)
    }
  })

  it('still produces a card when the cover cannot be fetched', async () => {
    const response = await renderSocialCard({
      title: 'Новина без доступного фото',
      subtitle: 'Новини факультету',
      photo: { url: 'https://media.fmi-rshu.dev/unavailable.avif' },
    })
    const image = await sharp(Buffer.from(await response.arrayBuffer())).metadata()
    expect(response.status).toBe(200)
    expect([image.format, image.width, image.height]).toEqual(['png', 1200, 630])
    expect(
      fetchAssets.mock.calls.filter(
        ([input]) => String(input) === 'https://media.fmi-rshu.dev/unavailable.avif'
      )
    ).toHaveLength(1)
  })
})
