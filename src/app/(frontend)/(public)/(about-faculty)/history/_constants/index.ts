import type { Route } from 'next'

export type HistoryEraId = 'origins' | 'formation' | 'today'

export interface HistoryEra {
  id: HistoryEraId
  label: string
  range: string
  description: string
}

export interface HistoryEvent {
  id: string
  era: HistoryEraId
  year: string
  title: string
  description: string
  fact: string
}

export interface HistoryPillar {
  id: 'mathematics' | 'digital-education' | 'it-modeling'
  title: string
  description: string
  department: string
  programs: {
    label: string
    href: Route
  }[]
}

export const OFFICIAL_HISTORY_URL =
  'https://www.rshu.edu.ua/rsuh/fakultety-instytuty-koledzhi/fakultet-matematyky-ta-informatyky'

export const historyEras = [
  {
    id: 'origins',
    label: 'Витоки',
    range: '1940–1953',
    description: 'Інститут, відновлення та педагогічна школа.',
  },
  {
    id: 'formation',
    label: 'Формування ФМІ',
    range: '1991–2006',
    description: 'Від обчислювальної техніки до сучасної структури факультету.',
  },
  {
    id: 'today',
    label: 'Факультет сьогодні',
    range: '2015–сьогодні',
    description: 'Цифрові технології, математика та підготовка педагогів.',
  },
] as const satisfies HistoryEra[]

export const historyEvents = [
  {
    id: 'teachers-institute',
    era: 'origins',
    year: '1940',
    title: 'Початок математичної школи Рівненщини',
    description:
      'У березні відкрився Учительський інститут — перший заклад вищої освіти регіону. Фізико-математичний факультет був одним із трьох його перших факультетів.',
    fact: 'Підготовка вчителів тоді тривала два роки.',
  },
  {
    id: 'recovery',
    era: 'origins',
    year: '1944–1945',
    title: 'Відновлення після війни',
    description:
      'Після визволення Рівного інститут відновив роботу. На двох факультетах стаціонарного відділення навчалися 179 студентів, а перший випуск відбувся вже у 1945 році.',
    fact: 'Перший диплом Учительського інституту отримали 16 студентів.',
  },
  {
    id: 'pedagogical-institute',
    era: 'origins',
    year: '1953',
    title: 'Новий рівень: педагогічний інститут',
    description:
      'Рівненський державний учительський інститут реорганізували в педагогічний. Фізико-математичний факультет продовжив роботу як одна з його двох базових складових.',
    fact: 'Математична освіта стала опорою для розвитку вищої школи області.',
  },
  {
    id: 'informatics-faculty',
    era: 'formation',
    year: '1991',
    title: 'Поворот до інформатики',
    description:
      'Наприкінці року створили факультет інформатики та обчислювальної техніки. Він об’єднав напрями математики й інформатики, праці та інформатики, а також нову прикладну математику.',
    fact: 'Тоді ж запрацювала кафедра інформатики та прикладної математики.',
  },
  {
    id: 'fmi-formed',
    era: 'formation',
    year: '1994',
    title: 'Постає факультет математики та інформатики',
    description:
      'Після чергової реорганізації сформувався теперішній ФМІ. Його програми поєднали математичну підготовку, фізику, економіку та прикладну математику.',
    fact: 'Саме ця назва об’єднала спадщину фізмату й нові цифрові напрями.',
  },
  {
    id: 'rshu-and-departments',
    era: 'formation',
    year: '1999–2006',
    title: 'У структурі РДГУ та нові кафедри',
    description:
      'ФМІ увійшов до складу Рівненського державного гуманітарного університету. У 2000 році ліцензували спеціальність «Інформатика», а в 2006 році створили кафедру інформаційно-комунікаційних технологій та методики викладання інформатики.',
    fact: 'Факультет послідовно розширив підготовку в системних науках і кібернетиці.',
  },
  {
    id: 'professional-education',
    era: 'today',
    year: '2015',
    title: 'Цифрові технології в професійній освіті',
    description:
      'Факультет ліцензував спеціальність «Професійна освіта (Комп’ютерні технології)», посиливши зв’язок між технологіями, педагогікою та практичними професіями.',
    fact: 'Навчання цифрових інструментів стало окремою освітньою траєкторією.',
  },
] as const satisfies HistoryEvent[]

export const historyPillars = [
  {
    id: 'mathematics',
    title: 'Математика як основа',
    description:
      'Математична школа залишається мовою, якою факультет описує складні системи, навчає точності мислення та будує фундамент для технологічних спеціальностей.',
    department: 'Кафедра математики та методики її навчання',
    programs: [
      {
        label: 'Середня освіта. Математика',
        href: '/specializations/a4-04-serednia-osvita-matematyka-bakalavr' as Route,
      },
    ],
  },
  {
    id: 'digital-education',
    title: 'Цифрова освіта',
    description:
      'Педагогічна традиція факультету розвивається через сучасні цифрові інструменти, методики навчання інформатики та підготовку фахівців, які працюють на перетині технологій і освіти.',
    department: 'Кафедра цифрових технологій та методики навчання інформатики',
    programs: [
      {
        label: 'Середня освіта. Інформатика',
        href: '/specializations/a4-09-serednia-osvita-informatyka-bakalavr' as Route,
      },
      {
        label: 'Професійна освіта. Цифрові технології',
        href: '/specializations/a5-39-profesiina-osvita-tsyfrovi-tekhnolohii-bakalavr' as Route,
      },
    ],
  },
  {
    id: 'it-modeling',
    title: 'ІТ та моделювання',
    description:
      'Програмування, комп’ютерне моделювання й інженерія програмного забезпечення перетворюють математичні ідеї на системи, продукти та практичні рішення.',
    department: 'Кафедра інформаційних технологій та моделювання',
    programs: [
      {
        label: 'Інженерія програмного забезпечення',
        href: '/specializations/f2-inzheneriia-prohramnoho-zabezpechennia-bakalavr' as Route,
      },
      {
        label: 'Комп’ютерні науки',
        href: '/specializations/f3-kompiuterni-nauky-bakalavr' as Route,
      },
    ],
  },
] as const satisfies HistoryPillar[]

export const getHistoryEraAnchor = (era: HistoryEraId) => `history-era-${era}`
