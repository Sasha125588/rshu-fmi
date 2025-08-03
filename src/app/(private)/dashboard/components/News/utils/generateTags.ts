// Автоматическое определение тегов на основе заголовка новости
export const generateTags = (title: string): string[] => {
	const normalizedTitle = title.toLowerCase()
	const tags: string[] = []

	if (
		normalizedTitle.includes('студент') ||
		normalizedTitle.includes('освіт') ||
		normalizedTitle.includes('навчан')
	) {
		tags.push('Освіта')
	}

	if (
		normalizedTitle.includes('досліджен') ||
		normalizedTitle.includes('наук') ||
		normalizedTitle.includes('конференц')
	) {
		tags.push('Наука')
	}

	if (
		normalizedTitle.includes('факультет') ||
		normalizedTitle.includes('кафедр') ||
		normalizedTitle.includes('університет')
	) {
		tags.push('Факультет')
	}

	if (
		normalizedTitle.includes('програму') ||
		normalizedTitle.includes('інформат') ||
		normalizedTitle.includes("комп'ютер")
	) {
		tags.push('IT')
	}

	if (
		normalizedTitle.includes('математик') ||
		normalizedTitle.includes('алгебр') ||
		normalizedTitle.includes('геометр')
	) {
		tags.push('Математика')
	}

	if (
		normalizedTitle.includes('подія') ||
		normalizedTitle.includes('захід') ||
		normalizedTitle.includes('семінар') ||
		normalizedTitle.includes('лекція')
	) {
		tags.push('Події')
	}

	if (
		normalizedTitle.includes('нагород') ||
		normalizedTitle.includes('перемог') ||
		normalizedTitle.includes('досягнен') ||
		normalizedTitle.includes('призер')
	) {
		tags.push('Досягнення')
	}

	if (
		normalizedTitle.includes('міжнародн') ||
		normalizedTitle.includes('обмін') ||
		normalizedTitle.includes('партнер')
	) {
		tags.push('Міжнародне')
	}

	if (
		normalizedTitle.includes("кар'єр") ||
		normalizedTitle.includes('робот') ||
		normalizedTitle.includes('працевлаштуван')
	) {
		tags.push("Кар'єра")
	}

	if (tags.length === 0) {
		tags.push('Новини')
	}

	return tags.slice(0, 3)
}
