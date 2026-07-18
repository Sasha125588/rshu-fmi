import {
  prepareTuitionRate,
  revalidateTuitionRateConsumers,
  revalidateTuitionRateConsumersAfterDelete,
} from './hooks'
import { validateAnnualAmount } from './validators'
import { adminsOrEditors, publishedOrAuthenticated } from '@/payload/access'

import type { CollectionConfig } from 'payload'

export const TuitionRates: CollectionConfig = {
  slug: 'tuition-rates',
  labels: {
    singular: 'Вартість навчання',
    plural: 'Вартість навчання',
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
      'educationalProgram',
      'academicYear',
      'studyForm',
      'availability',
      'amountPerYear',
      'totalAmount',
    ],
    listSearchableFields: ['adminTitle', 'academicYear', 'note'],
    useAsTitle: 'adminTitle',
  },
  defaultSort: ['-academicYear', 'educationalProgram', 'studyForm'],
  indexes: [
    {
      fields: ['academicYear', 'educationalProgram', 'studyForm'],
      unique: true,
    },
  ],
  fields: [
    {
      name: 'adminTitle',
      type: 'text',
      label: 'Назва в адмінці',
      admin: {
        description: 'Формується автоматично з року, форми та освітньої програми.',
        readOnly: true,
      },
      index: true,
    },
    {
      name: 'educationalProgram',
      type: 'relationship',
      label: 'Освітня програма',
      relationTo: 'educational-programs',
      admin: {
        description: 'Рівень освіти (бакалавр/магістр) береться з обраної освітньої програми.',
      },
      required: true,
    },
    {
      name: 'academicYear',
      type: 'text',
      label: 'Навчальний рік',
      admin: {
        placeholder: '2025/2026',
      },
      defaultValue: '2026/2027',
      hooks: {
        beforeDuplicate: [() => null],
      },
      index: true,
      required: true,
    },
    {
      name: 'studyForm',
      type: 'select',
      label: 'Форма навчання',
      options: [
        { label: 'Денна', value: 'full-time' },
        { label: 'Заочна', value: 'part-time' },
      ],
      index: true,
      required: true,
      admin: {
        components: {
          Field: '@/payload/components/StudyFormSelect/StudyFormSelect#StudyFormSelect',
        },
      },
    },
    {
      name: 'availability',
      type: 'select',
      label: 'Доступність',
      defaultValue: 'available',
      options: [
        { label: 'Доступно', value: 'available' },
        { label: 'Набір не здійснюється', value: 'unavailable' },
        { label: 'Уточнюється', value: 'to-be-announced' },
      ],
      required: true,
    },
    {
      name: 'amountPerYear',
      type: 'number',
      label: 'Вартість за рік',
      min: 0,
      validate: validateAnnualAmount,
    },
    {
      name: 'totalAmount',
      type: 'number',
      label: 'Вартість за повний термін',
      min: 0,
    },
    {
      name: 'currency',
      type: 'select',
      label: 'Валюта',
      defaultValue: 'UAH',
      options: [{ label: 'UAH', value: 'UAH' }],
      required: true,
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'Примітка',
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Порядок сортування',
      defaultValue: 0,
    },
  ],
  hooks: {
    afterChange: [revalidateTuitionRateConsumers],
    afterDelete: [revalidateTuitionRateConsumersAfterDelete],
    beforeValidate: [prepareTuitionRate],
  },
  timestamps: true,
  versions: {
    drafts: {
      validate: false,
    },
    maxPerDoc: 20,
  },
}
