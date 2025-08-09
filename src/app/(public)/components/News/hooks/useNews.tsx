import { parseAsInteger, useQueryState } from 'nuqs'

import type { NewsItem as NewsItemProps } from '../constants/types'
import { getNewsWithTags } from '../helpers/getNewsWithTags'

import { useGetNewsQuery } from '@/shared/api/hooks/useGetNewsQuery'

interface Props {
	initialNews: NewsItemProps[]
	initialPage: number
}

export const useNews = ({ initialNews, initialPage }: Props) => {
	const [currentPage, setCurrentPage] = useQueryState('news-page', parseAsInteger)

	const { data: news, isLoading } = useGetNewsQuery({
		currentPage: currentPage ?? initialPage,
		initialData: initialNews,
		initialPage
	})

	const newsWithTags = getNewsWithTags(news ?? initialNews)

	return {
		state: {
			news: news ?? initialNews,
			isLoading,
			newsWithTags,
			currentPage,
			totalPages: 213
		},
		functions: {
			setCurrentPage
		}
	}
}
