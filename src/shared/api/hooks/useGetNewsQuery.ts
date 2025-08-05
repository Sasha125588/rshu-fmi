import { useQuery } from '@tanstack/react-query'

import { getNews } from '../requests/getNews'

import type { NewsItem } from '@/app/(private)/dashboard/components/News/constants/types'

interface GetNewsParams {
	currentPage: number
	initialData: NewsItem[]
	initialPage: number
}

export const useGetNewsQuery = ({ currentPage, initialData, initialPage }: GetNewsParams) =>
	useQuery({
		queryKey: ['getNews', currentPage],
		initialData: currentPage === initialPage ? initialData : undefined,
		queryFn: () => getNews(currentPage)
	})
