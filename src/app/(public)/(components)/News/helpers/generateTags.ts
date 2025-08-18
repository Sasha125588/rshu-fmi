export const generateTags = (title: string) => {
	const normalizedTitle = title.toLowerCase()
	const tags: string[] = []

	const checkKeywords = (keywords: string[]) => {
		return keywords.some(keyword => normalizedTitle.includes(keyword))
	}

	if (checkKeywords(['студент', 'освіт', 'навчан', 'диплом', 'урок', 'курс', 'магістрату'])) {
		tags.push('Освіта')
	}
	if (checkKeywords(['грант'])) {
		tags.push('Грант')
	}
	if (checkKeywords(['день', 'днем', 'свято', 'ювілей'])) {
		tags.push('Свята')
	}
	if (checkKeywords(['досліджен', 'наук', 'конференц'])) {
		tags.push('Наука')
	}
	if (checkKeywords(['факультет', 'кафедр', 'університет'])) {
		tags.push('Факультет')
	}
	if (checkKeywords(['програму', 'інформат', "комп'ютер"])) {
		tags.push('IT')
	}
	if (checkKeywords(['математик', 'алгебр', 'геометр'])) {
		tags.push('Математика')
	}
	if (
		checkKeywords([
			'подія',
			'зустріч',
			'захід',
			'семінар',
			'лекція',
			'форум',
			'участ',
			'конкурс',
			'концерт',
			'вікенд',
			'профорієнтаці',
			'засіданн',
			'відкритих дверей'
		])
	) {
		tags.push('Події')
	}
	if (checkKeywords(['нагород', 'перемог', 'досягнен', 'призер', 'срібл', 'золот', 'відзнак'])) {
		tags.push('Досягнення')
	}
	if (checkKeywords(['міжнародн', 'обмін', 'партнер', 'стажування', 'україно-'])) {
		tags.push('Міжнародне')
	}
	if (checkKeywords(["кар'єр", 'робот', 'працевлаштуван'])) {
		tags.push("Кар'єра")
	}
	if (checkKeywords(['меморандум', 'співпрац'])) {
		tags.push('Університет')
	}

	if (!tags.length) {
		tags.push('Новини')
	}

	return tags
}
