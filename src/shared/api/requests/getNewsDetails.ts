'use server'

import * as cheerio from 'cheerio'

export interface ParsedNewsDetails {
	description: string
}

export const getNewsDetails = async (link: string): Promise<ParsedNewsDetails> => {
	// Добавляем таймаут 10 секунд
	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), 10000)

	try {
		const response = await fetch(link, {
			signal: controller.signal
		})
		clearTimeout(timeoutId)

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const html = await response.text()
		const $ = cheerio.load(html)

		const description = $('.item-page [itemprop="articleBody"]')
			.clone()
			.children()
			.not('img')
			.end()
			.text()
			.trim()

		return {
			description: description || 'Описание недоступно'
		}
	} catch (error) {
		clearTimeout(timeoutId)
		console.error('Ошибка получения деталей новости:', error)
		return {
			description: 'Ошибка загрузки описания'
		}
	}
}
