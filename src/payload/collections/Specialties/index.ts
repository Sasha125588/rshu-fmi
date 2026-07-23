import {
  preventDeletingUsedSpecialty,
  revalidateSpecialtyConsumers,
  revalidateSpecialtyConsumersAfterDelete,
  // syncRelatedProgramAdminTitles,
} from './hooks'
import { adminsOrEditors, publishedOrAuthenticated } from '@/payload/access'

import type { CollectionConfig } from 'payload'

export const Specialties: CollectionConfig = {
  slug: 'specialties',
  labels: {
    singular: 'Спеціальність',
    plural: 'Спеціальності',
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
      'title',
      'code',
      'legacyCode',
      'abbreviation',
      'responsibleDepartment',
      'sortOrder',
      'updatedAt',
    ],
    listSearchableFields: ['title', 'code', 'legacyCode', 'abbreviation'],
    useAsTitle: 'title',
  },
  defaultSort: ['sortOrder', 'code'],
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Назва спеціальності',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'code',
          type: 'text',
          label: 'Код спеціальності',
          admin: {
            description: 'Чинний код, наприклад F2 або A4.04.',
            width: '34%',
          },
          index: true,
          required: true,
          unique: true,
        },
        {
          name: 'abbreviation',
          type: 'text',
          label: 'Коротка назва',
          admin: {
            description: 'Наприклад ІПЗ або КН.',
            width: '33%',
          },
          required: true,
        },
        {
          name: 'legacyCode',
          type: 'text',
          label: 'Старий код спеціальності',
          admin: {
            description: 'Попередній код, наприклад 121.',
            width: '33%',
          },
          index: true,
        },
      ],
    },
    {
      name: 'responsibleDepartment',
      type: 'relationship',
      label: 'Відповідальна кафедра',
      index: true,
      maxDepth: 1,
      relationTo: 'departments',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Короткий опис',
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
      name: 'sortOrder',
      type: 'number',
      label: 'Порядок сортування',
      defaultValue: 0,
    },
    {
      name: 'educationalPrograms',
      type: 'join',
      label: 'Освітні програми',
      collection: 'educational-programs',
      defaultLimit: 0,
      defaultSort: 'sortOrder',
      on: 'specialty',
      admin: {
        allowCreate: false,
        defaultColumns: ['adminTitle', 'educationLevel', 'slug', '_status', 'updatedAt'],
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSpecialtyConsumers], // syncRelatedProgramAdminTitles
    afterDelete: [revalidateSpecialtyConsumersAfterDelete],
    beforeDelete: [preventDeletingUsedSpecialty],
  },
  timestamps: true,
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
