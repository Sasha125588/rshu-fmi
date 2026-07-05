import { parseKitmNews, parseKitmPreviewImage } from '../parsers/kitm'
import { fetchNewsDocument, getParsedNewsPage } from './shared'

import type { DepartmentNews } from '../types'
import type { NewsLoader } from './shared'

export const getKitmNewsPage: NewsLoader<'kitm'> = async (page, options) => {
  const news = await getParsedNewsPage('kitm', page, parseKitmNews, options)

  if (!options?.includeImages) return news

  return enrichKitmNewsImages(news)
}

const enrichKitmNewsImages = async (news: DepartmentNews<'kitm'>[]) => {
  const results = await Promise.allSettled(
    news.map(async (item) => {
      if (item.previewImage) return item

      const previewImage = await getKitmPreviewImage(item.link)
      return previewImage ? { ...item, previewImage } : item
    })
  )

  return results.map((result, index) =>
    result.status === 'fulfilled' ? result.value : news[index]
  )
}

const getKitmPreviewImage = async (articleUrl: string) => {
  const html = await fetchNewsDocument(articleUrl, `KITM article fetch failed: ${articleUrl}`)

  return parseKitmPreviewImage(html, articleUrl)
}
