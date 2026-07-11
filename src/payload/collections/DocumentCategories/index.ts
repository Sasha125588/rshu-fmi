import { slugField } from 'payload'

import {
  preventDeletingUsedCategory,
  revalidateDocumentCatalogCategory,
  revalidateDocumentCatalogCategoryAfterDelete,
} from './hooks'
import { adminsOrEditors, publicAccess } from '@/payload/access'

import type { CollectionConfig } from 'payload'

export const DocumentCategories: CollectionConfig = {
  slug: 'document-categories',
  labels: {
    singular: 'Категорія документів',
    plural: 'Категорії документів',
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
    defaultColumns: ['title', 'slug', 'sortOrder', 'updatedAt'],
    listSearchableFields: ['title', 'slug'],
    useAsTitle: 'title',
  },
  defaultSort: ['sortOrder', 'title'],
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Назва категорії',
      required: true,
    },
    slugField({
      useAsSlug: 'title',
      required: true,
    }),
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Порядок сортування',
      defaultValue: 0,
    },
  ],
  hooks: {
    afterChange: [revalidateDocumentCatalogCategory],
    afterDelete: [revalidateDocumentCatalogCategoryAfterDelete],
    beforeDelete: [preventDeletingUsedCategory],
  },
  timestamps: true,
}
