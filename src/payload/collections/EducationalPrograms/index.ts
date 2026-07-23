import { slugField } from 'payload'

import {
  getProgramAdminTitle,
  revalidateProgramConsumers,
  revalidateProgramConsumersAfterDelete,
  setProgramAdminTitle,
} from './hooks'
import { validateStudyForms } from './validators'
import { adminsOrEditors, publishedOrAuthenticated } from '@/payload/access'
import { slugifyProgramValue } from '@/payload/helpers'

import type { EducationLevel } from './constants'
import type { EducationalProgram } from '@/payload-types'
import type { CollectionConfig } from 'payload'
import type { Slugify } from 'payload/shared'

const educationLevelSlugParts = {
  bachelor: 'bakalavr',
  master: 'magistr',
} satisfies Record<EducationLevel, string>

type ProgramSlugData = Pick<EducationalProgram, 'educationLevel' | 'title' | 'id' | 'slug'>

const slugifyProgram: Slugify<ProgramSlugData> = ({ data }) => {
  if (data.slug) return slugifyProgramValue(data.slug)

  const educationLevel = educationLevelSlugParts[data.educationLevel]

  return slugifyProgramValue([data.title, educationLevel].filter(Boolean).join(' '))
}

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
    defaultColumns: ['adminTitle', 'specialty', 'educationLevel', 'slug', 'updatedAt'],
    listSearchableFields: ['adminTitle', 'title', 'slug'],
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
              name: 'specialty',
              type: 'relationship',
              label: 'Спеціальність',
              admin: {
                description: 'Спеціальність, у межах якої реалізується ця освітня програма.',
              },
              index: true,
              maxDepth: 1,
              relationTo: 'specialties',
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
              name: 'studyForms',
              type: 'array',
              label: 'Форми навчання',
              labels: {
                singular: 'Форма навчання',
                plural: 'Форми навчання',
              },
              minRows: 1,
              required: true,
              validate: validateStudyForms,
              fields: [
                {
                  name: 'form',
                  type: 'select',
                  label: 'Форма',
                  options: [
                    { label: 'Денна', value: 'full-time' },
                    { label: 'Заочна', value: 'part-time' },
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
              name: 'heroText',
              type: 'textarea',
              label: 'Головний текст',
              required: true,
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
          label: 'Повʼязані дані',
          fields: [
            {
              name: 'admissionCampaigns',
              type: 'join',
              label: 'Вступні кампанії',
              collection: 'admission-campaigns',
              defaultLimit: 0,
              defaultSort: '-campaignYear',
              on: 'educationalProgram',
              admin: {
                allowCreate: true,
                defaultColumns: ['adminTitle', 'campaignYear', 'studyForm', '_status', 'updatedAt'],
              },
            },
            {
              name: 'tuitionRates',
              type: 'join',
              label: 'Вартість навчання',
              collection: 'tuition-rates',
              defaultLimit: 0,
              defaultSort: '-academicYear',
              on: 'educationalProgram',
              admin: {
                allowCreate: true,
                defaultColumns: [
                  'adminTitle',
                  'academicYear',
                  'studyForm',
                  'availability',
                  '_status',
                ],
              },
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
    afterChange: [revalidateProgramConsumers],
    afterDelete: [revalidateProgramConsumersAfterDelete],
    beforeValidate: [setProgramAdminTitle],
  },
  timestamps: true,
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
