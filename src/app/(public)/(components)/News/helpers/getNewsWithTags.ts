import { generateTags } from './generateTags'

import type { NewsItem } from '../constants/types'
import type { ParsedNewsItem } from '@/shared/api/requests/getNews'

export const getNewsWithTags = (news: ParsedNewsItem[]): NewsItem[] => {
  return news.map((item) => ({
    ...item,
    tags: generateTags(item.title),
  }))
}
