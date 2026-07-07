import { slugField } from 'payload'

import { adminsOrEditors } from '@/access/adminsOrEditors'
import { publicAccess } from '@/access/publicAccess'

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
  ],
  timestamps: true,
  versions: {
    maxPerDoc: 20,
  },
}
