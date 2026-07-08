import { adminsOrEditors, publishedOrAuthenticated } from '@/payload/access'

import type { CollectionConfig } from 'payload'

export const ProgramDocuments: CollectionConfig = {
  slug: 'program-documents',
  labels: {
    singular: 'Документ освітньої програми',
    plural: 'Документи освітніх програм',
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
    defaultColumns: ['title', 'type', 'educationalProgram', 'periodLabel', 'sortOrder'],
    listSearchableFields: ['title', 'periodLabel', 'description'],
    useAsTitle: 'title',
  },
  defaultSort: ['sortOrder', '-updatedAt'],
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Назва документа',
      required: true,
    },
    {
      name: 'educationalProgram',
      type: 'relationship',
      label: 'Освітня програма',
      relationTo: 'educational-programs',
      admin: {
        description: 'Обирай програму з потрібним рівнем освіти: бакалавр або магістр.',
      },
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Тип документа',
      options: [
        { label: 'Освітня програма', value: 'educational-program' },
        { label: 'Попередня редакція ОП', value: 'previous-educational-program' },
        { label: 'Силабус', value: 'syllabus' },
        { label: 'Робоча програма', value: 'work-program' },
        { label: 'Навчальний план', value: 'curriculum' },
        { label: 'Акредитаційні матеріали', value: 'accreditation' },
        { label: 'Рецензія / відгук', value: 'review' },
        { label: 'Інше', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'periodLabel',
      type: 'text',
      label: 'Період / рік',
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
        description: 'Основний варіант: завантаж PDF.',
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
        description: 'Використовуй тільки якщо документ реально зберігається на зовнішньому сайті.',
        placeholder: 'https://example.edu.ua/document.pdf',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Порядок сортування',
      defaultValue: 0,
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
