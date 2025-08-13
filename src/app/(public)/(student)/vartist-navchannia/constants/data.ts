import type { TuitionCost } from './types'

export interface StudyForms {
	title: string
	costIdx: number[]
}

export const STUDY_FORMS_DATA: StudyForms[] = [
	{
		title: 'Бакалавр (денна форма)',
		costIdx: [0, 1]
	},
	{
		title: 'Бакалавр (заочна форма)',
		costIdx: [2, 3]
	},
	{
		title: 'Магістр (денна форма)',
		costIdx: [4, 5]
	},
	{
		title: 'Магістр (заочна форма)',
		costIdx: [6, 7]
	}
]

export const STUDY_COSTS_DATA: TuitionCost[] = [
	{
		id: 'A4.04',
		programName: 'Середня освіта (Математика)',
		description: 'Середня освіта (Математика. Інформатика)',
		values: [30500, 122000, 23100, 92400, 34700, 52050, 29600, 44400]
	},
	{
		id: 'A4.09',
		programName: 'Середня освіта (Інформатика)',
		description: 'Середня освіта (Інформатика)',
		values: [30500, 122000, 23100, 92400, 34700, 52050, 29600, 44400]
	},
	{
		id: 'A5.39',
		programName: 'Професійна освіта (Цифрові технології)',
		description: 'Професійна освіта (Цифрові технології)',
		values: [30500, 122000, 23100, 92400, 34700, 52050, 29600, 44400]
	},
	{
		id: 'F2',
		programName: 'Інженерія програмного забезпечення',
		description: 'Інженерія програмного забезпечення',
		values: [32200, 128800, 23100, 92400, '---', '---', '---', '---']
	},
	{
		id: 'F3',
		programName: "Комп'ютерні науки",
		description: "Комп'ютерні науки",
		values: [32200, 128800, 23100, 92400, 52320, 78480, 29600, 44400]
	}
]
