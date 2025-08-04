export const generateTags = (title: string) => {
	const normalizedTitle = title.toLowerCase()
	const tags: string[] = []

	const checkKeywords = (keywords: string[]): boolean => {
		return keywords.some(keyword => normalizedTitle.includes(keyword))
	}

	switch (true) {
		case checkKeywords(['студент', 'освіт', 'навчан', 'диплом']):
			tags.push('Освіта')
			break

		case checkKeywords(['грант']):
			tags.push('Грант')
			break

		case checkKeywords(['день', 'днем', 'свято', 'ювілей']):
			tags.push('Свята')
			break

		case checkKeywords(['досліджен', 'наук', 'конференц']):
			tags.push('Наука')
			break

		case checkKeywords(['факультет', 'кафедр', 'університет']):
			tags.push('Факультет')
			break

		case checkKeywords(['програму', 'інформат', "комп'ютер"]):
			tags.push('IT')
			break

		case checkKeywords(['математик', 'алгебр', 'геометр']):
			tags.push('Математика')
			break

		case checkKeywords(['подія', 'захід', 'семінар', 'лекція', 'форум', 'участ']):
			tags.push('Події')
			break

		case checkKeywords(['нагород', 'перемог', 'досягнен', 'призер']):
			tags.push('Досягнення')
			break

		case checkKeywords(['міжнародн', 'обмін', 'партнер']):
			tags.push('Міжнародне')
			break

		case checkKeywords(["кар'єр", 'робот', 'працевлаштуван']):
			tags.push("Кар'єра")
			break
	}

	if (tags.length === 0) {
		tags.push('Новини')
	}

	return tags
}
