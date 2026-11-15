import { slugField } from 'payload'

import { revalidateDepartmentConsumers, revalidateDepartmentConsumersAfterDelete } from './hooks'
import { adminsOrEditors, publicAccess } from '@/payload/access'

import type { CollectionConfig } from 'payload'

export const Departments: CollectionConfig = {
  slug: 'departments',
  labels: {
    singular: 'Кафедра',
    plural: 'Кафедри',
  },
  access: {
    admin: (args) => !!adminsOrEditors(args),
    create: adminsOrEditors,
    delete: adminsOrEditors,
    read: publicAccess,
    update: adminsOrEditors,
  },
  admin: {
    group: 'Контент',
    defaultColumns: ['name', 'shortName', 'slug', 'updatedAt'],
    listSearchableFields: ['name', 'shortName', 'slug'],
    useAsTitle: 'name',
  },
  defaultSort: 'name',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Повна назва',
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'shortName',
      type: 'text',
      label: 'Скорочена назва',
      index: true,
      required: true,
    },
    slugField({
      useAsSlug: 'name',
      required: true,
    }),
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
      required: true,
    },
    {
      name: 'websiteUrl',
      type: 'text',
      label: 'Сайт кафедри',
      required: true,
      admin: {
        placeholder: 'https://example.edu.ua',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Емблема',
      relationTo: 'media',
      filterOptions: { mimeType: { contains: 'image/' } },
    },
    {
      name: 'foundedYear',
      type: 'number',
      label: 'Рік заснування',
      min: 1800,
      max: 2100,
    },
    {
      name: 'contacts',
      type: 'group',
      label: 'Контакти',
      fields: [
        { name: 'address', type: 'text', label: 'Адреса' },
        { name: 'room', type: 'text', label: 'Кабінет' },
        { name: 'email', type: 'email', label: 'Електронна пошта' },
      ],
    },
    {
      name: 'staff',
      type: 'array',
      label: 'Склад кафедри',
      admin: { description: 'Виберіть посаду для фільтра й діаграми складу.' },
      fields: [
        { name: 'name', type: 'text', label: 'ПІБ', required: true },
        {
          name: 'role',
          type: 'select',
          label: 'Посада',
          required: true,
          options: [
            { label: 'Професор', value: 'professor' },
            { label: 'Доцент', value: 'associate' },
            { label: 'Старший викладач', value: 'senior' },
            { label: 'Викладач', value: 'lecturer' },
            { label: 'Лаборант', value: 'assistant' },
            { label: 'Інша посада', value: 'other' },
          ],
        },
        { name: 'note', type: 'text', label: 'Науковий ступінь або уточнення посади' },
        { name: 'isHead', type: 'checkbox', label: 'Завідує кафедрою' },
        {
          name: 'scheduleName',
          type: 'text',
          label: 'Ім’я в розкладі',
          admin: { description: 'Укажіть значення, яке використовується в розкладі занять.' },
        },
      ],
    },
    {
      name: 'research',
      type: 'array',
      label: 'Наукові напрями',
      fields: [
        { name: 'title', type: 'text', label: 'Назва', required: true },
        { name: 'description', type: 'textarea', label: 'Опис', required: true },
        { name: 'topic', type: 'text', label: 'Коротка тема' },
        { name: 'url', type: 'text', label: 'Посилання на матеріал' },
      ],
    },
    {
      name: 'leadership',
      type: 'array',
      label: 'Історія керівництва',
      fields: [
        { name: 'name', type: 'text', label: 'ПІБ', required: true },
        { name: 'period', type: 'text', label: 'Період', required: true },
      ],
    },
    {
      name: 'sourceUrl',
      type: 'text',
      label: 'Джерело відомостей',
    },
  ],
  hooks: {
    afterChange: [revalidateDepartmentConsumers],
    afterDelete: [revalidateDepartmentConsumersAfterDelete],
  },
  timestamps: true,
  versions: {
    maxPerDoc: 20,
  },
}
