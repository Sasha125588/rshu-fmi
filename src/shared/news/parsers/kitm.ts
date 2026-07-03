import * as cheerio from 'cheerio'

import { normalizePublishedAt, normalizeText, resolveUrl } from './utils'

import type { DepartmentNews } from '../types'

const KITM_ORIGIN = 'https://kitm.rshu.edu.ua'

export const parseKitmNews = (html: string) => {
  const $ = cheerio.load(html)
  const news: DepartmentNews<'kitm'>[] = []

  $('li.wp-block-post').each((_, element) => {
    const post = $(element)
    const anchor = post.find('.wp-block-post-title a').first()
    const title = normalizeText(anchor.text())
    const link = resolveUrl(anchor.attr('href'), KITM_ORIGIN)
    const publishedAt = normalizePublishedAt(post.find('.wp-block-post-date time').attr('datetime'))

    if (!title || !link || !publishedAt) return

    const description = normalizeText(post.find('.wp-block-post-excerpt__excerpt').text())
    const image = post.find('.wp-block-post-featured-image img, img').first()
    const previewImage = resolveUrl(
      image.attr('src') ?? image.attr('data-src') ?? image.attr('data-lazy-src'),
      KITM_ORIGIN
    )

    news.push({
      source: 'kitm',
      title,
      link,
      publishedAt,
      description,
      previewImage,
    })
  })

  return news
}

export const parseKitmPreviewImage = (html: string, articleUrl: string) => {
  const $ = cheerio.load(html)
  const candidates = $('.wp-block-post-content img').filter((_, element) => {
    const image = $(element)
    const source = image.attr('src') ?? image.attr('data-src') ?? image.attr('data-lazy-src')

    if (!source || source.includes('static.xx.fbcdn.net/images/emoji.php')) return false

    const width = Number.parseInt(image.attr('width') ?? '', 10)
    const height = Number.parseInt(image.attr('height') ?? '', 10)
    const isTinyImage =
      Number.isFinite(width) && Number.isFinite(height) && width <= 32 && height <= 32

    return !isTinyImage
  })

  let image = candidates
    .filter((_, element) => $(element).closest('figure.wp-block-image').length > 0)
    .first()

  if (image.length === 0) image = candidates.first()

  return resolveUrl(
    image.attr('src') ?? image.attr('data-src') ?? image.attr('data-lazy-src'),
    articleUrl
  )
}
