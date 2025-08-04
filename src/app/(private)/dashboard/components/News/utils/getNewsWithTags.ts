import { NewsItem } from '../constants/types'

import { generateTags } from './generateTags'

export const getNewsWithTags = (news: NewsItem[]) => {
	return news.map(item => ({
		...item,
		tags: generateTags(item.title)
	}))
}
