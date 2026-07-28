import { parseUniversityNews, parseUniversityPreviewImage } from '../parsers/university'
import { fetchNewsDocument, getParsedNewsPage } from './shared'

import type { ExternalUniversityNews } from '../types'
import type { ExternalNewsLoader } from './shared'

export const getUniversityNewsPage: ExternalNewsLoader<'university'> = async (page, options) => {
  const news = await getParsedNewsPage('university', page, parseUniversityNews, options)

  if (!options?.includeImages) return news

  return enrichUniversityNewsImages(news)
}

const enrichUniversityNewsImages = async (news: ExternalUniversityNews[]) => {
  const results = await Promise.allSettled(
    news.map(async (item) => {
      if (item.previewImage) return item

      const previewImage = await getUniversityPreviewImage(item.link)
      return previewImage ? { ...item, previewImage } : item
    })
  )

  return results.map((result, index) =>
    result.status === 'fulfilled' ? result.value : news[index]
  )
}

const getUniversityPreviewImage = async (articleUrl: string) => {
  const html = await fetchNewsDocument(
    'university',
    articleUrl,
    `University article fetch failed: ${articleUrl}`
  )

  return parseUniversityPreviewImage(html, articleUrl)
}
