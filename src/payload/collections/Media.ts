import { adminsOrEditors, publicAccess } from '@/payload/access'

import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Медіафайл',
    plural: 'Медіафайли',
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
    defaultColumns: ['filename', 'category', 'mimeType', 'filesize', 'updatedAt'],
    listSearchableFields: ['filename', 'alt', 'caption'],
    useAsTitle: 'filename',
  },
  upload: {
    adminThumbnail: ({ doc }) => {
      const mediaDoc = doc as {
        sizes?: {
          thumbnail?: {
            url?: null | string
          }
        }
        url?: null | string
      }

      return mediaDoc.sizes?.thumbnail?.url || mediaDoc.url || ''
    },
    crop: true,
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1600,
        height: 900,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/avif', 'image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt-текст',
      admin: {
        description: 'Обов’язково заповнюй для зображень. Для PDF можна залишити порожнім.',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Підпис / опис',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категорія',
      defaultValue: 'document',
      options: [
        { label: 'Документ', value: 'document' },
        { label: 'Зображення сторінки', value: 'page-image' },
        { label: 'Новина', value: 'news' },
        { label: 'Фотоальбом', value: 'gallery' },
        { label: 'Інше', value: 'other' },
      ],
      required: true,
    },
  ],
  timestamps: true,
}
