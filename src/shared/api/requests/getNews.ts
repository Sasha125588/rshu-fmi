import * as cheerio from 'cheerio'

export interface ParsedNewsItem {
	title: string
	link: string
	views: number
}

export const getNews = async (): Promise<ParsedNewsItem[]> => {
	try {
		const response = await fetch('https://www.rshu.edu.ua/novyny-rdhu')
		const html = await response.text()

		const $ = cheerio.load(html)
		const newsItems: ParsedNewsItem[] = []

		// Парсим строки таблицы с новостями
		$('tr.cat-list-row0, tr.cat-list-row1').each((index, element) => {
			const $row = $(element)

			// Извлекаем заголовок и ссылку
			const titleElement = $row.find('td[headers="categorylist_header_title"] a')
			const title = titleElement.text().trim()
			const link = titleElement.attr('href') || ''

			// Извлекаем количество просмотров
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

		return newsItems
	} catch (error) {
		console.error('Ошибка при загрузке новостей:', error)
		return []
	}
}
