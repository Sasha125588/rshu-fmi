export type Department = {
  id: string
  name: string
  shortName: string
  href: string
  description: string
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'kitm',
    name: 'Кафедра інформаційних технологій та моделювання',
    shortName: 'КІТМ',
    href: 'https://kitm.rshu.edu.ua/',
    description:
      'Відповідає за підготовку фахівців з програмування, моделювання, інформаційних технологій та суміжних напрямів.',
  },
]

export const getDepartmentById = (id: string) =>
  DEPARTMENTS.find((department) => department.id === id)
