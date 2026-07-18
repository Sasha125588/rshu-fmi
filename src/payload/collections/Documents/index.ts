import { DOCUMENT_TYPE_OPTIONS } from './constants'
import {
  revalidateDocumentCatalog,
  revalidateDocumentCatalogAfterDelete,
  setDocumentTitle,
  validatePublishedDocument,
} from './hooks'
import { adminsOrEditors, publishedOrAuthenticated } from '@/payload/access'
import { validateUrl } from '@/payload/validators'

import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Документ',
    plural: 'Документи',
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
      'documentType',
      'showInRegulatoryCatalog',
      'source',
      'documentDate',
      'sortOrder',
    ],
    listSearchableFields: ['title', 'periodLabel', 'description', 'externalUrl'],
    useAsTitle: 'title',
  },
  defaultSort: ['sortOrder', '-documentDate', 'title'],
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Назва документа',
      required: true,
      admin: {
        components: {
          Field: '@/payload/collections/Documents/components/DocumentTitleField#DocumentTitleField',
        },
        description:
          'Формується автоматично. Відредагуйте назву вручну за потреби; очистіть поле, щоб повернути автоматичний режим.',
      },
    },
    {
      name: 'generatedTitleSnapshot',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'documentType',
      type: 'select',
      label: 'Тип документа',
      options: [...DOCUMENT_TYPE_OPTIONS],
      required: true,
    },
    {
      name: 'documentDate',
      type: 'date',
      label: 'Дата документа',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'periodLabel',
      type: 'text',
      label: 'Період / навчальний рік',
      admin: {
        placeholder: '2025/2026 або 2026',
      },
    },
    {
      name: 'file',
      type: 'upload',
      label: 'Файл документа',
      relationTo: 'media',
      admin: {
        description: 'Завантажте PDF. Можна одночасно вказати зовнішнє посилання.',
      },
      filterOptions: {
        mimeType: { equals: 'application/pdf' },
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'Зовнішнє посилання',
      admin: {
        description: 'Якщо також вибрано файл, на сайті пріоритет матиме завантажений файл.',
        placeholder: 'https://example.edu.ua/document.pdf',
      },
      validate: validateUrl,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
    },
    {
      name: 'educationalPrograms',
      type: 'relationship',
      label: 'Освітні програми',
      relationTo: 'educational-programs',
      hasMany: true,
      admin: {
        description: 'Документ відображатиметься на сторінках усіх вибраних програм.',
      },
    },
    {
      name: 'showInRegulatoryCatalog',
      type: 'checkbox',
      label: 'Показувати в нормативних документах',
      defaultValue: false,
    },
    {
      name: 'category',
      type: 'relationship',
      label: 'Категорія нормативного документа',
      relationTo: 'document-categories',
      admin: {
        condition: (data) => data.showInRegulatoryCatalog === true,
      },
    },
    {
      name: 'source',
      type: 'select',
      label: 'Джерело нормативного документа',
      options: [
        { label: 'Факультет', value: 'faculty' },
        { label: 'Університет', value: 'university' },
      ],
      admin: {
        condition: (data) => data.showInRegulatoryCatalog === true,
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Порядок сортування',
      defaultValue: 0,
    },
  ],
  hooks: {
    afterChange: [revalidateDocumentCatalog],
    afterDelete: [revalidateDocumentCatalogAfterDelete],
    beforeValidate: [setDocumentTitle, validatePublishedDocument],
  },
  timestamps: true,
  versions: {
    drafts: {
      validate: false,
    },
    maxPerDoc: 20,
  },
}
