import { Crown, FileText, type LucideProps, UserCheck } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

export interface CouncilMember {
	name: string
	position: string
	description: string
}

export interface LeadershipMember {
	name: string
	position: string
	description: string
	role: 'chairman' | 'deputy' | 'secretary'
}

export interface AcademicCouncilData {
	leadership: LeadershipMember[]
	members: CouncilMember[]
}

export interface RoleConfig {
	[key: string]: {
		icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
		iconClass: string
		label: string
		containerClass: string
	}
}

export const roleConfig: RoleConfig = {
	chairman: {
		icon: Crown,
		iconClass: 'text-emerald-400',
		label: 'Голова Вченої ради',
		containerClass:
			'border-green-primary/20 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-900'
	},
	deputy: {
		icon: UserCheck,
		iconClass: 'text-blue-400',
		label: 'Заступник голови',
		containerClass: 'border-blue-200 bg-blue-50 dark:bg-indigo-950 dark:border-indigo-900'
	},
	secretary: {
		icon: FileText,
		iconClass: 'text-orange-400',
		label: 'Секретар',
		containerClass: 'border-orange-200 bg-orange-50 dark:bg-yellow-950 dark:border-yellow-900'
	}
}

export const academicCouncilData: AcademicCouncilData = {
	leadership: [
		{
			name: 'Юрій МАКСИМЦЕВ',
			position: 'Декан факультету',
			description:
				'Кандидат фізико-математичних наук, доцент, кафедра фізики, астрономії та методики викладання',
			role: 'chairman'
		},
		{
			name: 'Микола АНТОНЮК',
			position: 'Заступник декана з навчальної роботи',
			description:
				'Кандидат педагогічних наук, доцент, кафедра цифрових технологій та методики навчання інформатики',
			role: 'deputy'
		},
		{
			name: 'Наталія СИНІЦЬКА',
			position: 'Секретар Вченої ради',
			description: 'Кандидат педагогічних наук, доцент, кафедра математики з методикою викладання',
			role: 'secretary'
		}
	],
	members: [
		{
			name: "БІЛЕЦЬКИЙ В'ячеслав",
			position: 'Заступник декана з виховної роботи',
			description:
				'Кандидат педагогічних наук, доцент, кафедра вищої математики, голова НМК факультету'
		},
		{
			name: 'ВОЙТОВИЧ Ігор',
			position: 'Проректор з навчально-виховної роботи',
			description: 'Доктор педагогічних наук, професор'
		},
		{
			name: 'ГЕНСІЦЬКА-АНТОНЮК Наталія',
			position: 'Доцент',
			description: 'Кандидат педагогічних наук, доцент, кафедра математики з методикою викладання'
		},
		{
			name: 'ЖАРЧИНСЬКА Анастасія',
			position: 'В.о. профорга факультету',
			description: 'Факультет математики та інформатики'
		},
		{
			name: 'КРАЙЧУК Олександр',
			position: 'Завідувач кафедри',
			description:
				'Кандидат фізико-математичних наук, професор, кафедра математики з методикою викладання'
		},
		{
			name: 'ЛИТВАК Андрій',
			position: 'Завідувач лабораторіями',
			description: 'Кафедра інформаційних технологій та моделювання'
		},
		{
			name: 'МОРОЗ Ігор',
			position: 'Завідувач кафедри',
			description:
				'Кандидат фізико-математичних наук, доцент, кафедра інформаційних технологій та моделювання'
		},
		{
			name: 'ПАВЕЛКО Ілля',
			position: 'Студдекан факультету',
			description: 'Факультет математики та інформатики'
		},
		{
			name: 'ПАВЛОВА Наталія',
			position: 'Завідувач кафедри',
			description:
				'Кандидат педагогічних наук, професор, кафедра цифрових технологій та методики навчання інформатики'
		},
		{
			name: 'ПЕТРІВСЬКИЙ Борис',
			position: 'Професор',
			description: 'Кандидат фізико-математичних наук, професор, кафедра вищої математики'
		},
		{
			name: 'ПЕТРІВСЬКИЙ Ярослав',
			position: 'Завідувач кафедри',
			description: 'Доктор технічних наук, професор, кафедра вищої математики'
		},
		{
			name: 'ПОЛЮХОВИЧ Наталія',
			position: 'Доцент',
			description:
				'Кандидат педагогічних наук, доцент, кафедра цифрових технологій та методики навчання інформатики'
		},
		{
			name: 'ПРИСЯЖНЮК Ігор',
			position: 'Доцент',
			description: 'Кандидат технічних наук, доцент, кафедра вищої математики'
		},
		{
			name: 'СЯСЬКИЙ Володимир',
			position: 'Доцент',
			description:
				'Кандидат технічних наук, доцент, кафедра інформаційних технологій та моделювання'
		},
		{
			name: 'ШРОЛЬ Тетяна',
			position: 'Голова профбюро факультету',
			description:
				'Кандидат педагогічних наук, доцент, кафедра цифрових технологій та методики навчання інформатики'
		}
	]
}
