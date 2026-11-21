import { slugField } from 'payload'

import { PROJECT_CATEGORIES } from './constants'
import {
  keepFirstPublication,
  keepProjectApplications,
  revalidateProjects,
  validateProjectFields,
  validateProjectInitiator,
} from './hooks'
import { adminOnly, publishedOrAuthenticated } from '@/payload/access'
import { slugifyValue } from '@/payload/helpers'

import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  typescript: { interface: 'Project' },
  labels: { singular: 'Проєкт', plural: 'Проєкти' },
  access: {
    admin: (args) => !!adminOnly(args),
    create: adminOnly,
    delete: adminOnly,
    read: publishedOrAuthenticated,
    readVersions: adminOnly,
    update: adminOnly,
  },
  admin: {
    group: 'Дошка проєктів',
    defaultColumns: ['title', 'category', 'recruiting', 'deadline', '_status', 'publishedAt'],
    listSearchableFields: ['title', 'summary'],
    useAsTitle: 'title',
  },
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', type: 'text', label: 'Назва', required: true },
    slugField({
      slugify: ({ valueToSlugify }) => slugifyValue(String(valueToSlugify ?? '')),
      overrides: (row) => ({
        ...row,
        fields: row.fields.map((field) =>
          field.type === 'text' ? { ...field, label: 'Адреса сторінки', maxLength: 120 } : field
        ),
      }),
    }),
    { name: 'summary', type: 'textarea', label: 'Короткий опис', required: true, maxLength: 280 },
    { name: 'description', type: 'textarea', label: 'Повний опис', required: true },
    {
      name: 'category',
      type: 'select',
      label: 'Категорія',
      options: [...PROJECT_CATEGORIES],
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'recruiting',
      type: 'checkbox',
      label: 'Відкрити набір',
      defaultValue: false,
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'deadline',
      type: 'text',
      label: 'Дедлайн набору',
      admin: {
        description: 'РРРР-ММ-ДД. Набір триває до кінця цього дня за Києвом.',
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Перша публікація',
      index: true,
      access: { create: () => false, update: () => false },
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'publisher',
      type: 'relationship',
      relationTo: 'users',
      maxDepth: 0,
      access: { create: () => false, read: () => false, update: () => false },
      admin: { hidden: true },
    },
    {
      name: 'sourceProposal',
      type: 'relationship',
      relationTo: 'project-proposals',
      maxDepth: 0,
      unique: true,
      access: { create: () => false, read: () => false, update: () => false },
      admin: { hidden: true },
    },
    { name: 'initiatorName', type: 'text', label: 'Публічне ім’я ініціатора' },
    {
      name: 'tasks',
      type: 'array',
      label: 'Завдання',
      fields: [{ name: 'text', type: 'text', label: 'Завдання', required: true }],
    },
    {
      name: 'roles',
      type: 'array',
      label: 'Відкриті ролі',
      fields: [
        { name: 'title', type: 'text', label: 'Назва ролі', required: true },
        { name: 'description', type: 'textarea', label: 'Опис ролі' },
        {
          name: 'spots',
          type: 'number',
          label: 'Кількість місць',
          min: 1,
          validate: (value: number | null | undefined) =>
            value == null ||
            (Number.isSafeInteger(value) && value >= 1) ||
            'Вкажіть цілу кількість місць, не меншу за 1.',
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      label: 'Навички й технології',
      fields: [{ name: 'label', type: 'text', label: 'Навичка або технологія', required: true }],
    },
    {
      name: 'links',
      type: 'array',
      label: 'Посилання',
      fields: [
        { name: 'label', type: 'text', label: 'Назва посилання', required: true },
        { name: 'url', type: 'text', label: 'URL', required: true },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateProjects],
    afterDelete: [revalidateProjects],
    beforeChange: [keepFirstPublication, validateProjectInitiator],
    beforeDelete: [keepProjectApplications],
    beforeValidate: [validateProjectFields],
  },
  versions: { drafts: true, maxPerDoc: 20 },
}
