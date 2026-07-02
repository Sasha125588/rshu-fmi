import * as cheerio from 'cheerio'

import { normalizeText, resolveUrl } from './utils'

import type { UniversityNews } from '../types'

const UNIVERSITY_ORIGIN = 'https://www.rshu.edu.ua'

export const parseUniversityNews = (html: string) => {
  const $ = cheerio.load(html)
  const news: UniversityNews[] = []

  $('tr.cat-list-row0, tr.cat-list-row1').each((_, element) => {
    const row = $(element)
    const anchor = row.find('td[headers="categorylist_header_title"] a').first()
    const title = normalizeText(anchor.text())
    const link = resolveUrl(anchor.attr('href'), UNIVERSITY_ORIGIN)

    if (!title || !link) return

    const viewsText = row.find('td[headers="categorylist_header_hits"] .badge').text()
    const views = Number.parseInt(viewsText.match(/Перегляди:\s*(\d+)/)?.[1] ?? '0', 10)

    news.push({ source: 'university', title, link, views })
  })

  if (html.trim() && news.length === 0) {
    throw new Error('University news parser returned no items')
  }

  return news
}

export const parseUniversityPreviewImage = (html: string, articleUrl: string) => {
  const $ = cheerio.load(html)
  const image = $('[itemprop="articleBody"] img').first()

  return resolveUrl(
    image.attr('src') ?? image.attr('data-src') ?? image.attr('data-lazy-src'),
    articleUrl
  )
}
