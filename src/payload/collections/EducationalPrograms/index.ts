import { slugField } from 'payload'

import { getProgramAdminTitle, setProgramAdminTitle } from './hooks'
import { adminsOrEditors, publishedOrAuthenticated } from '@/payload/access'
import { slugifyProgramValue } from '@/payload/helpers'

import type { EducationalProgram } from '@/payload-types'
import type { CollectionConfig } from 'payload'
import type { Slugify } from 'payload/shared'

type EducationLevel = EducationalProgram['educationLevel']

type ProgramSlugData = Pick<
  EducationalProgram,
  'educationLevel' | 'specialtyCode' | 'title' | 'id' | 'slug'
>

const educationLevelSlugParts = {
  bachelor: 'bakalavr',
  master: 'magistr',
} satisfies Record<EducationLevel, string>

const titledDescriptionFields = [
  {
    name: 'title',
    type: 'text',
    label: 'Заголовок',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Опис',
  },
] satisfies CollectionConfig['fields']

const slugifyProgram: Slugify<ProgramSlugData> = ({ data }) => {
  if (data.slug) return slugifyProgramValue(data.slug)

  const educationLevel = educationLevelSlugParts[data.educationLevel]

  return slugifyProgramValue(
    [data.specialtyCode, data.title, educationLevel].filter(Boolean).join(' ')
  )
}

export const EducationalPrograms: CollectionConfig = {
  slug: 'educational-programs',
  labels: {
    singular: 'Освітня програма',
    plural: 'Освітні програми',
  },
  access: {
    admin: (args) => !!adminsOrEditors(args),
    create: adminsOrEditors,
    delete: adminsOrEditors,
    read: publishedOrAuthenticated,
    readVersions: adminsOrEditors,
    update: adminsOrEditors,
  },
  admin: {
    group: 'Контент',
    defaultColumns: [
      'adminTitle',
      'specialtyCode',
      'legacySpecialtyCode',
      'educationLevel',
      'department',
      'updatedAt',
    ],
    listSearchableFields: [
      'adminTitle',
      'title',
      'shortTitle',
      'specialtyCode',
      'legacySpecialtyCode',
      'slug',
    ],
    useAsTitle: 'adminTitle',
  },
  defaultSort: 'adminTitle',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Основне',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Назва програми',
              required: true,
            },
            {
              name: 'shortTitle',
              type: 'text',
              label: 'Коротка назва',
              required: true,
            },
            {
              name: 'adminTitle',
              type: 'text',
              label: 'Назва в адмінці',
              admin: {
                description:
                  'Формується автоматично з назви програми, рівня освіти та кодів спеціальності.',
                readOnly: true,
              },
              hooks: {
                afterRead: [getProgramAdminTitle],
              },
              index: true,
            },
            slugField({
              useAsSlug: 'title',
              slugify: slugifyProgram,
              required: true,
            }),
            {
              name: 'specialtyCode',
              type: 'text',
              label: 'Код спеціальності',
              admin: {
                description: 'Новий код, наприклад F2.',
              },
              index: true,
              required: true,
            },
            {
              name: 'legacySpecialtyCode',
              type: 'text',
              label: 'Старий код спеціальності',
              admin: {
                description: 'Старий код, наприклад 121.',
              },
              index: true,
              required: true,
            },
            {
              name: 'specialtyName',
              type: 'text',
              label: 'Назва спеціальності',
              required: true,
            },
            {
              name: 'educationLevel',
              type: 'select',
              label: 'Рівень освіти',
              options: [
                { label: 'Бакалавр', value: 'bachelor' },
                { label: 'Магістр', value: 'master' },
              ],
              required: true,
            },
            {
              name: 'department',
              type: 'relationship',
              label: 'Відповідальна кафедра',
              relationTo: 'departments',
              required: true,
            },
            {
              name: 'studyForms',
              type: 'array',
              label: 'Форми навчання',
              labels: {
                singular: 'Форма навчання',
                plural: 'Форми навчання',
              },
              minRows: 1,
              fields: [
                {
                  name: 'form',
                  type: 'select',
                  label: 'Форма',
                  options: [
                    { label: 'Денна', value: 'full-time' },
                    { label: 'Заочна', value: 'part-time' },
                    { label: 'Дуальна', value: 'dual' },
                  ],
                  required: true,
                },
                {
                  name: 'durationLabel',
                  type: 'text',
                  label: 'Термін навчання',
                  admin: {
                    placeholder: '3 роки 10 місяців',
                  },
                  required: true,
                  defaultValue: '3 роки 10 місяців',
                },
                {
                  name: 'note',
                  type: 'textarea',
                  label: 'Примітка',
                },
              ],
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Показувати на головній',
              defaultValue: false,
            },
            {
              name: 'sortOrder',
              type: 'number',
              label: 'Порядок сортування',
              defaultValue: 0,
            },
          ],
        },
        {
          label: 'Контент сторінки',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Короткий опис',
              required: true,
            },
            {
              name: 'heroText',
              type: 'textarea',
              label: 'Головний текст',
              required: true,
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Теги',
              labels: {
                singular: 'Тег',
                plural: 'Теги',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Тег',
                  required: true,
                },
              ],
            },
            {
              name: 'careers',
              type: 'array',
              label: 'Ким зможе працювати',
              labels: {
                singular: 'Професія',
                plural: 'Професії',
              },
              fields: titledDescriptionFields,
            },
            {
              name: 'studyFocus',
              type: 'array',
              label: 'Що вивчатиме',
              labels: {
                singular: 'Напрям навчання',
                plural: 'Напрями навчання',
              },
              fields: titledDescriptionFields,
            },
            {
              name: 'faq',
              type: 'array',
              label: 'FAQ',
              labels: {
                singular: 'Питання',
                plural: 'Питання',
              },
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  label: 'Питання',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  label: 'Відповідь',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              label: 'SEO title',
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              label: 'SEO description',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [setProgramAdminTitle],
  },
  timestamps: true,
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
