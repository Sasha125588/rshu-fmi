import { TAG_RULES } from '../constants/data'

import type { NewsTag } from '../constants/types'

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[’`ʼ]/g, "'")
    .replace(/\s+/g, ' ')

export const generateTags = (title: string): NewsTag[] => {
  const normalizedTitle = normalizeText(title)

  const tags = TAG_RULES.filter((rule) =>
    rule.keywords.some((keyword) => normalizedTitle.includes(keyword))
  ).map((rule) => rule.tag)

  return tags.length ? tags : ['Новини']
}
