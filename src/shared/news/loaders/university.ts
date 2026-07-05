import { parseUniversityNews, parseUniversityPreviewImage } from '../parsers/university'
import { fetchNewsDocument, getParsedNewsPage } from './shared'

import type { UniversityNews } from '../types'
import type { NewsLoader } from './shared'

export const getUniversityNewsPage: NewsLoader<'university'> = async (page, options) => {
  const news = await getParsedNewsPage('university', page, parseUniversityNews, options)

  if (!options?.includeImages) return news

  return enrichUniversityNewsImages(news)
}

const enrichUniversityNewsImages = async (news: UniversityNews[]) => {
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
  const html = await fetchNewsDocument(articleUrl, `University article fetch failed: ${articleUrl}`)

  return parseUniversityPreviewImage(html, articleUrl)
}
