export interface DepartmentContact {
	title: string
	name: string
	position?: string
	email?: string
}

export interface DepartmentInfo {
	address: string
	website?: string
	websiteUrl?: string
}

export interface Specialization {
	code: string
	name: string
	bachelor?: string
	master?: string
}

export interface Department {
	name: string
	tabName: string
	gradient: string
	leadership: DepartmentContact[]
	contact: DepartmentInfo
	specializations?: Specialization[]
}

export const departmentsData: Department[] = [
	{
		name: 'Кафедра цифрових технологій та методики навчання інформатики',
		tabName: 'Цифрові технології',
		gradient: 'from-blue-50 to-indigo-50',
		leadership: [
			{
				title: 'Завідувач кафедри',
				name: 'Павлова Наталія Степанівна',
				position: 'кандидат педагогічних наук, доцент',
				email: 'nataliia.pavlova@rshu.edu.ua'
			},
			{
				title: 'Старший лаборант',
				name: 'Литвак Людмила Петрівна',
				email: 'kiktmvi@rshu.edu.ua'
			}
		],
		contact: {
			address: '33000, м. Рівне, вул Пластова, 31, каб. 205',
			website: 'iktmvi.rshu.edu.ua',
			websiteUrl: 'http://iktmvi.rshu.edu.ua/'
		},
		specializations: [
			{
				code: '014.09',
				name: 'Середня освіта (Інформатика)',
				bachelor: 'Вчитель інформатики',
				master: 'Вчитель інформатики'
			},
			{
				code: '015.39',
				name: 'Професійна освіта (Цифрові технології)',
				bachelor: 'Викладач + Фахівець з ІТ',
				master: 'Викладач + Розробник обчислювальних систем'
			}
		]
	},
	{
		name: 'Кафедра інформаційних технологій та моделювання',
		tabName: 'ІТ та моделювання',
		gradient: 'from-green-50 to-emerald-50',
		leadership: [
			{
				title: 'Завідувач кафедри',
				name: 'Мороз Ігор Петрович',
				position: 'кандидат фізико-математичних наук, доцент',
				email: 'kipm@rshu.edu.ua'
			}
		],
		contact: {
			address: '33000, м. Рівне, вул Пластова, 31, каб. 110',
			website: 'kitm.rshu.edu.ua',
			websiteUrl: 'https://kitm.rshu.edu.ua/'
		},
		specializations: [
			{
				code: '122',
				name: 'Компʼютерні науки',
				bachelor: 'Фахівець з розробки ПЗ',
				master: 'Розробник обчислювальних систем'
			},
			{
				code: '121',
				name: 'Інженерія програмного забезпечення',
				bachelor: 'Фахівець з ІТ та розробки ПЗ'
			}
		]
	},
	{
		name: 'Кафедра вищої математики',
		tabName: 'Вища математика',
		gradient: 'from-purple-50 to-pink-50',
		leadership: [
			{
				title: 'Завідувач кафедри',
				name: 'Петрівський Ярослав Борисович',
				position: 'доктор технічних наук, професор',
				email: 'yaroslav.petrivskyi@rshu.edu.ua'
			},
			{
				title: 'Старший лаборант',
				name: 'Хмель Тетяна Олександрівна',
				email: 'kvm@rshu.edu.ua'
			}
		],
		contact: {
			address: '33000, м. Рівне, вул Пластова, 31, каб. 310',
			website: 'vmivm.gavrysha.com',
			websiteUrl: 'http://vmivm.gavrysha.com/'
		}
	},
	{
		name: 'Кафедра математики з методикою викладання',
		tabName: 'Математика з методикою',
		gradient: 'from-orange-50 to-yellow-50',
		leadership: [
			{
				title: 'Завідувач кафедри',
				name: 'Крайчук Олександр Васильович',
				position: 'кандидат фізико-математичних наук, доцент',
				email: 'kmmv@rshu.edu.ua'
			},
			{
				title: 'Старший лаборант',
				name: 'Цимбалюк Ольга Олександрівна',
				position: 'Старший лаборант',
				email: 'kmmv@rshu.edu.ua'
			}
		],
		contact: {
			address: '33000, м. Рівне, вул. Пластова 31, к.311',
			website: 'vmivm.gavrysha.com',
			websiteUrl: 'http://vmivm.gavrysha.com/'
		},
		specializations: [
			{
				code: '014',
				name: 'Середня освіта (Математика. Інформатика)',
				bachelor: 'Вчитель математики та інформатики'
			},
			{
				code: '014',
				name: 'Середня освіта (Математика)',
				master: 'Вчитель математики'
			}
		]
	}
]
