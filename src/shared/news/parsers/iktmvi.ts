import * as cheerio from 'cheerio'

import { normalizePublishedAt, normalizeText, resolveUrl } from './utils'

import type { DepartmentNews } from '../types'

const IKTMVI_ORIGIN = 'https://iktmvi.rshu.edu.ua'

export const parseIktmviNews = (html: string) => {
  const $ = cheerio.load(html)
  const news: DepartmentNews<'iktmvi'>[] = []

  $('article[itemprop="blogPost"], article.item').each((_, element) => {
    const article = $(element)
    const anchor = article.find('h2[itemprop="name"] a[itemprop="url"], h2 a').first()
    const title = normalizeText(anchor.text())
    const link = resolveUrl(anchor.attr('href'), IKTMVI_ORIGIN)
    const publishedAt = normalizePublishedAt(
      article.find('time[itemprop="datePublished"]').attr('datetime')
    )

    if (!title || !link || !publishedAt) return

    const image = article.find('a.thumbnail img, .entry-header img').first()
    const previewImage = resolveUrl(
      image.attr('src') ?? image.attr('data-src') ?? image.attr('data-lazy-src'),
      IKTMVI_ORIGIN
    )

    const descriptionRoot = article.find('.entry-header').first().clone()
    descriptionRoot
      .find(
        'h2, dl, .article-info, .published-date-wrap, .readmore, a.thumbnail, img, script, style'
      )
      .remove()
    const description = normalizeText(descriptionRoot.text())

    news.push({
      source: 'iktmvi',
      title,
      link,
      publishedAt,
      description,
      previewImage,
    })
  })

  if (html.trim() && news.length === 0) {
    throw new Error('IKTMVI news parser returned no items')
  }

  return news
}
