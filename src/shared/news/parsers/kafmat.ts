import * as cheerio from 'cheerio'

import { NEWS_SOURCE_CONFIG } from '../config'
import { normalizeText } from '@/shared/utils/helpers'

import type { ExternalDepartmentNews } from '../types'

const { archiveUrl } = NEWS_SOURCE_CONFIG.kafmat
const SECTION_SELECTOR = 'section[id^="h."]'
const SECTION_ID = /^h\.[a-z\d]+_\d+$/i
const MONTHS = [
  'січня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
]
const WRITTEN_DATE = new RegExp(
  `\\b(?:(\\d{1,2})\\s*[-–—]\\s*)?(\\d{1,2})\\s+(${MONTHS.join('|')})\\s+(20\\d{2})\\b`,
  'giu'
)
const NUMERIC_DATE = /\b(?:(\d{1,2})\s*[-–—]\s*)?(\d{1,2})\.\s*(\d{1,2})\.\s*(20\d{2})\b/g

const getEventDate = (text: string) => {
  const [match, otherMatch] = [...text.matchAll(NUMERIC_DATE), ...text.matchAll(WRITTEN_DATE)]
  if (!match || otherMatch || match[1]) return

  const day = Number(match[2])
  const month = Number(match[3]) || MONTHS.indexOf(match[3].toLowerCase()) + 1
  const year = Number(match[4])
  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) return

  return { value: date.toISOString().slice(0, 10), leadingText: match.index === 0 ? match[0] : '' }
}

const takeWords = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text

  const space = text.lastIndexOf(' ', maxLength)
  return text.slice(0, space > 0 ? space : maxLength)
}

const isKafmatImage = (src: string | undefined): src is string =>
  Boolean(src?.startsWith('https://sites.google.com/sitesv-images-rt/'))

export const parseKafmatNews = (html: string) => {
  const $ = cheerio.load(html)
  const news: ExternalDepartmentNews<'kafmat'>[] = []
  const seen = new Set<string>()

  for (const element of $(SECTION_SELECTOR)) {
    const section = $(element)
    const id = section.attr('id')
    if (!id || !SECTION_ID.test(id) || seen.has(id)) continue

    const paragraphs = section
      .find('h1, h2, h3, h4, p')
      .toArray()
      .map((paragraph) => normalizeText($(paragraph).text()))
      .filter(Boolean)
    if (!paragraphs.length) continue

    const [opening, ...rest] = paragraphs
    const eventDate = getEventDate(opening)
    const afterDate = eventDate?.leadingText
      ? opening
          .slice(eventDate.leadingText.length)
          .replace(/^\s*(?:року|р\.)?(?=\s|,|$)[\s,]*/iu, '')
      : ''
    const titleText = afterDate || opening
    const titleExcerpt = takeWords(titleText, 100)
    const titleSuffix = titleText.length > titleExcerpt.length ? '…' : ''
    const title =
      titleExcerpt.charAt(0).toLocaleUpperCase('uk-UA') + titleExcerpt.slice(1) + titleSuffix
    const summary = [titleText.slice(titleExcerpt.length).trim(), ...rest].filter(Boolean).join(' ')
    const summaryExcerpt = takeWords(summary, 220)

    // Google Sites places galleries in the news section or immediately after it.
    // Its section IDs can have unrelated prefixes even within a single news item.
    const next = section.next(SECTION_SELECTOR)
    const gallery = normalizeText(next.text()) ? null : next
    const previewImage = section
      .add(gallery ?? [])
      .find('img[src]')
      .toArray()
      .map((image) => $(image).attr('src'))
      .find(isKafmatImage)

    seen.add(id)
    news.push({
      source: 'kafmat',
      title,
      description:
        summary.length > summaryExcerpt.length ? `${summaryExcerpt}…` : summaryExcerpt || undefined,
      publishedAt: eventDate?.value,
      link: `${archiveUrl}#${id}`,
      previewImage,
    })
  }

  return news
}
