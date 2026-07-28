import {
  BlockquoteFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { slugField } from 'payload'

import { NEWS_TAG_OPTIONS } from './constants'
import {
  cleanupFacultyNewsRedirects,
  prepareFacultyNews,
  rememberPreviousPublishedFacultyNewsSlug,
  revalidateFacultyNewsConsumers,
  revalidateFacultyNewsConsumersAfterDelete,
  synchronizeFacultyNewsRedirects,
  validatePublishedFacultyNewsMedia,
} from './hooks'
import { adminsOrEditors, publishedOrAuthenticated } from '@/payload/access'
import { slugifyValue } from '@/payload/helpers'

import type { CollectionConfig } from 'payload'

export const FacultyNews: CollectionConfig = {
  slug: 'faculty-news',
  labels: {
    singular: 'Новина факультету',
    plural: 'Новини факультету',
  },
  access: {
    admin: (args) => Boolean(adminsOrEditors(args)),
    create: adminsOrEditors,
    delete: adminsOrEditors,
    read: publishedOrAuthenticated,
    readVersions: adminsOrEditors,
    update: adminsOrEditors,
  },
  admin: {
    group: 'Контент',
    defaultColumns: ['title', 'isPinned', 'tags', 'publishedAt', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'excerpt'],
    useAsTitle: 'title',
  },
  defaultSort: ['-isPinned', '-publishedAt'],
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    slugField({
      useAsSlug: 'title',
      required: true,
      slugify: ({ valueToSlugify }) => slugifyValue(String(valueToSlugify ?? '')),
      overrides: (field) => ({
        ...field,
        fields: field.fields.map((field) => {
          if (!('name' in field)) return field

          if (field.name === 'slug' && field.type === 'text') {
            return {
              ...field,
              label: 'Slug',
              admin: {
                ...field.admin,
                description:
                  'Створюється із заголовка, доки ви не відредагуєте його вручну. Після зміни адреси опублікованої новини стара адреса перенаправлятиме на нову.',
              },
            }
          }

          return field
        }),
      }),
    }),
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Короткий опис',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Текст новини',
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          BoldFeature(),
          ItalicFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
          BlockquoteFeature(),
          LinkFeature(),
          UploadFeature({
            enabledCollections: ['media'],
            maxDepth: 1,
          }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Обкладинка',
      admin: {
        description: 'Необов’язкова обкладинка новини. Для публікації потрібен alt-текст.',
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
      name: 'tags',
      type: 'select',
      label: 'Теми',
      admin: {
        isSortable: true,
        position: 'sidebar',
      },
      hasMany: true,
      options: [...NEWS_TAG_OPTIONS],
      required: true,
      // validate: (value) => {
      //   if (!Array.isArray(value) || !value.length) {
      //     return 'Оберіть щонайменше одну тему.'
      //   }

      //   return true
      // },
    },
    {
      name: 'relatedDepartments',
      type: 'relationship',
      label: 'Пов’язані кафедри',
      hasMany: true,
      maxDepth: 1,
      relationTo: 'departments',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата публікації',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description:
          'Під час першої публікації встановиться автоматично, якщо дату не задано вручну.',
        position: 'sidebar',
      },
      hooks: {
        beforeDuplicate: [() => null],
      },
      index: true,
    },
    {
      name: 'isPinned',
      type: 'checkbox',
      label: 'Закріпити новину',
      admin: {
        position: 'sidebar',
      },
      defaultValue: false,
    },
  ],
  hooks: {
    afterChange: [synchronizeFacultyNewsRedirects, revalidateFacultyNewsConsumers],
    afterDelete: [revalidateFacultyNewsConsumersAfterDelete],
    beforeChange: [rememberPreviousPublishedFacultyNewsSlug],
    beforeDelete: [cleanupFacultyNewsRedirects],
    beforeValidate: [prepareFacultyNews, validatePublishedFacultyNewsMedia],
  },
  timestamps: true,
  typescript: {
    interface: 'FacultyNews',
  },
  versions: {
    drafts: {
      validate: false,
    },
    maxPerDoc: 20,
  },
}
