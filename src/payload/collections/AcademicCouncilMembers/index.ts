import { revalidateAcademicCouncil, revalidateAcademicCouncilAfterDelete } from './hooks'
import { adminsOrEditors, publishedOrAuthenticated } from '@/payload/access'

import type { CollectionConfig, TextFieldSingleValidation } from 'payload'

const validatePhotoUrl: TextFieldSingleValidation = (value) => {
  if (!value) return true

  try {
    const url = new URL(value)

    return (
      ['http:', 'https:'].includes(url.protocol) || 'Використовуйте URL з http:// або https://.'
    )
  } catch {
    return 'Вкажіть коректне посилання на фото.'
  }
}

export const AcademicCouncilMembers: CollectionConfig = {
  slug: 'academic-council-members',
  labels: {
    singular: 'Член Вченої ради',
    plural: 'Члени Вченої ради',
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
    defaultColumns: ['name', 'councilRole', 'position', 'sortOrder', 'updatedAt'],
    listSearchableFields: ['name', 'position', 'description'],
    useAsTitle: 'name',
  },
  defaultSort: ['sortOrder', 'name'],
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Імʼя',
      index: true,
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'councilRole',
          type: 'select',
          label: 'Роль у Вченій раді',
          admin: {
            width: '65%',
          },
          index: true,
          options: [
            { label: 'Голова Вченої ради', value: 'chair' },
            {
              label: 'Заступник голови вченої ради факультету',
              value: 'deputy-chair',
            },
            {
              label: 'Секретар вченої ради факультету',
              value: 'secretary',
            },
            { label: 'Член вченої ради факультету', value: 'member' },
          ],
          required: true,
        },
        {
          name: 'sortOrder',
          type: 'number',
          label: 'Порядок',
          admin: {
            width: '35%',
          },
          defaultValue: 0,
          index: true,
          min: 0,
          required: true,
        },
      ],
    },
    {
      name: 'position',
      type: 'text',
      label: 'Основна посада',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
      required: true,
    },
    {
      name: 'departments',
      type: 'relationship',
      label: 'Кафедри',
      hasMany: true,
      maxDepth: 1,
      relationTo: 'departments',
    },
    {
      name: 'photo',
      type: 'upload',
      label: 'Фото',
      admin: {
        description: 'Завантажте файл або вкажіть HTTPS-посилання нижче.',
      },
      filterOptions: {
        mimeType: {
          contains: 'image/',
        },
      },
      maxDepth: 1,
      relationTo: 'media',
    },
    {
      name: 'photoUrl',
      type: 'text',
      label: 'Посилання на фото',
      admin: {
        description: 'Зовнішнє HTTPS-посилання. Залиште порожнім, якщо фото завантажене як файл.',
        placeholder: 'https://example.com/photo.jpg',
      },
      validate: validatePhotoUrl,
    },
  ],
  hooks: {
    afterChange: [revalidateAcademicCouncil],
    afterDelete: [revalidateAcademicCouncilAfterDelete],
  },
  timestamps: true,
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
