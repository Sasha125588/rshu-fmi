'use server'

import * as cheerio from 'cheerio'

export interface ParsedNewsItem {
	title: string
	link: string
	views: number
}

export const getNews = async (currentPage = 1): Promise<ParsedNewsItem[]> => {
	const response = await fetch(
		`https://www.rshu.edu.ua/novyny-rdhu?start=${(currentPage - 1) * 10}`
	)

	const html = await response.text()

	const $ = cheerio.load(html)
	const newsItems: ParsedNewsItem[] = []

	$('tr.cat-list-row0, tr.cat-list-row1').each((_, element) => {
		const $row = $(element)

		const titleElement = $row.find('td[headers="categorylist_header_title"] a')
		const title = titleElement.text().trim()
		const link = titleElement.attr('href') || ''

		const viewsText = $row.find('td[headers="categorylist_header_hits"] .badge').text()
		const viewsMatch = viewsText.match(/Перегляди:\s*(\d+)/)
		const views = viewsMatch ? parseInt(viewsMatch[1], 10) : 0

		if (title && link) {
			newsItems.push({
				title,
				link: link.startsWith('http') ? link : `https://www.rshu.edu.ua${link}`,
				views
			})
		}
	})

	return newsItems ?? []
}
