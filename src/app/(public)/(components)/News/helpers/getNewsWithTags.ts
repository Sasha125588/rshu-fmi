import { generateTags } from './generateTags'

import type { NewsItem } from '../constants/types'

export const getNewsWithTags = (news: NewsItem[]) => {
  return news.map((item) => ({
    ...item,
    tags: generateTags(item.title),
  }))
}
