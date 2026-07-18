import {
  revalidateAdmissionCampaignConsumers,
  revalidateAdmissionCampaignConsumersAfterDelete,
  setCampaignAdminTitle,
} from './hooks'
import { adminsOrEditors, publishedOrAuthenticated } from '@/payload/access'
import { validateUrl } from '@/payload/validators'

import type { CollectionConfig } from 'payload'

export const AdmissionCampaigns: CollectionConfig = {
  slug: 'admission-campaigns',
  labels: {
    singular: 'Вступна кампанія',
    plural: 'Вступні кампанії',
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
      'campaignYear',
      'studyForm',
      'dataUpdatedAt',
      'updatedAt',
    ],
    listSearchableFields: ['adminTitle', 'campaignYear', 'statisticsYear'],
    useAsTitle: 'adminTitle',
  },
  defaultSort: ['-campaignYear', 'educationalProgram', 'studyForm'],
  indexes: [
    {
      fields: ['campaignYear', 'educationalProgram', 'studyForm'],
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
      type: 'row',
      fields: [
        {
          name: 'educationalProgram',
          type: 'relationship',
          label: 'Освітня програма',
          admin: {
            width: '50%',
          },
          maxDepth: 1,
          relationTo: 'educational-programs',
          required: true,
        },
        {
          name: 'campaignYear',
          type: 'number',
          label: 'Рік вступної кампанії',
          admin: {
            placeholder: '2026',
            width: '25%',
          },
          hooks: {
            beforeDuplicate: [() => null],
          },
          index: true,
          max: 2100,
          min: 2000,
          required: true,
        },
        {
          name: 'studyForm',
          type: 'select',
          label: 'Форма навчання',
          admin: {
            components: {
              Field: '@/payload/components/StudyFormSelect/StudyFormSelect#StudyFormSelect',
            },
            width: '25%',
          },
          index: true,
          options: [
            { label: 'Денна', value: 'full-time' },
            { label: 'Заочна', value: 'part-time' },
          ],
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'licensedCapacity',
          type: 'number',
          label: 'Ліцензований обсяг прийому',
          admin: {
            width: '50%',
          },
          min: 0,
        },
        {
          name: 'maxStateOrder',
          type: 'number',
          label: 'Максимальне держзамовлення',
          admin: {
            width: '50%',
          },
          min: 0,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'statisticsYear',
          type: 'number',
          label: 'Рік статистики',
          admin: {
            placeholder: '2025',
            width: '34%',
          },
          max: 2100,
          min: 2000,
        },
        {
          name: 'averageBudgetScore',
          type: 'number',
          label: 'Середній бал зарахованих на бюджет',
          admin: {
            width: '33%',
          },
          max: 200,
          min: 0,
        },
        {
          name: 'averageContractScore',
          type: 'number',
          label: 'Середній бал зарахованих на контракт',
          admin: {
            width: '33%',
          },
          max: 200,
          min: 0,
        },
      ],
    },
    {
      name: 'statisticsUrl',
      type: 'text',
      label: 'Детальна статистика',
      admin: {
        placeholder: 'https://vstup.osvita.ua/...',
      },
      validate: validateUrl,
    },
    {
      name: 'dataUpdatedAt',
      type: 'date',
      label: 'Дані актуальні станом на',
      admin: {
        date: {
          displayFormat: 'd MMM yyy',
          pickerAppearance: 'dayOnly',
        },
      },
      required: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Порядок сортування',
      defaultValue: 0,
      min: 0,
    },
  ],
  hooks: {
    afterChange: [revalidateAdmissionCampaignConsumers],
    afterDelete: [revalidateAdmissionCampaignConsumersAfterDelete],
    beforeValidate: [setCampaignAdminTitle],
  },
  timestamps: true,
  versions: {
    drafts: {
      validate: false,
    },
    maxPerDoc: 20,
  },
}
