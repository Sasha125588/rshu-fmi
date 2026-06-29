import { BookOpen, BriefcaseBusiness, Code2, FileText, GraduationCap } from 'lucide-react'

import { getDepartmentById } from './departments'

import type { LucideIcon } from 'lucide-react'

export type SpecializationDocument = {
  title: string
  type: 'Освітня програма' | 'Силабус' | 'Робоча програма' | 'Попередня редакція'
  href: string
  year: string
}

export type Specialization = {
  slug: string
  title: string
  shortTitle: string
  code: string
  level: string
  departmentId: string
  description: string
  promise: string
  tags: string[]
  icon: LucideIcon
  careers: string[]
  studyFocus: string[]
  admission: string[]
  tuition?: {
    label: string
    value: string
    note: string
  }
  documents: SpecializationDocument[]
  faq: Array<{ question: string; answer: string }>
}

export const SPECIALIZATIONS: Specialization[] = [
  {
    slug: 'software-engineering',
    title: 'Інженерія програмного забезпечення',
    shortTitle: 'ІПЗ',
    code: '121',
    level: 'Бакалавр',
    departmentId: 'kitm',
    description:
      'Підготовка фахівців з розробки, проєктування, тестування та супроводу програмного забезпечення.',
    promise:
      'Навчишся створювати вебзастосунки, працювати з базами даних, командною розробкою, тестуванням і сучасними інженерними практиками.',
    tags: ['Програмування', 'Веб-розробка', 'Тестування', 'Командна робота'],
    icon: Code2,
    careers: [
      'Software Engineer',
      'Frontend Developer',
      'Backend Developer',
      'QA Engineer',
      'Full-stack Developer',
    ],
    studyFocus: [
      'Алгоритми та структури даних',
      'Вебтехнології та клієнт-серверна розробка',
      'Бази даних',
      'Проєктування програмного забезпечення',
      'Тестування та якість ПЗ',
      'Командні проєкти',
    ],
    admission: [
      'Перевірити актуальні правила вступу на сайті приймальної комісії РДГУ.',
      'Порівняти конкурсні пропозиції та форму навчання.',
      'Підготувати документи й подати заяву через електронний кабінет вступника.',
    ],
    tuition: {
      label: 'Вартість навчання',
      value: 'Уточнюється для актуального року вступу',
      note: 'Окремої сторінки вартості в MVP немає; актуальну суму можна додати в цей блок після затвердження даних.',
    },
    documents: [
      {
        title: 'Освітня програма 121 Інженерія програмного забезпечення',
        type: 'Освітня програма',
        href: '#',
        year: '2026',
      },
      {
        title: 'Силабуси освітніх компонентів',
        type: 'Силабус',
        href: '#',
        year: '2026',
      },
      {
        title: 'Попередня редакція освітньої програми',
        type: 'Попередня редакція',
        href: '#',
        year: '2025',
      },
    ],
    faq: [
      {
        question: 'Чи підходить ІПЗ, якщо я ще не маю комерційного досвіду?',
        answer:
          'Так. Програма розрахована на поступове занурення: від базового програмування до командних проєктів і спеціалізованих дисциплін.',
      },
      {
        question: "Чим ІПЗ відрізняється від комп'ютерних наук?",
        answer:
          'ІПЗ більше сфокусована на інженерному процесі створення програмних продуктів: вимогах, архітектурі, розробці, тестуванні та супроводі.',
      },
    ],
  },
]

export const SPECIALIZATION_ICONS = {
  careers: BriefcaseBusiness,
  documents: FileText,
  admission: GraduationCap,
  study: BookOpen,
}

export const getSpecializationBySlug = (slug: string) =>
  SPECIALIZATIONS.find((specialization) => specialization.slug === slug)

export const getSpecializationDepartment = (specialization: Specialization) =>
  getDepartmentById(specialization.departmentId)
