import { revalidateEducationalProgramsPageSettings } from './hooks'
import { validateApplicantResourceFile, validateApplicantResourceHref } from './validators'
import { adminsOrEditors, publicAccess } from '@/payload/access'

import type { GlobalConfig } from 'payload'

export const EducationalProgramsPageSettings: GlobalConfig = {
  slug: 'educational-programs-page-settings',
  dbName: 'spec_settings',
  label: 'Сторінка спеціальностей',
  access: {
    read: publicAccess,
    readVersions: adminsOrEditors,
    update: adminsOrEditors,
  },
  admin: {
    group: 'Налаштування',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Вступна кампанія',
          fields: [
            {
              name: 'activeAdmissionCampaignYear',
              type: 'number',
              label: 'Активний рік вступної кампанії',
              admin: {
                description: 'Цей рік використовується для вибору даних вступної кампанії.',
                placeholder: '2026',
              },
              defaultValue: 2026,
              max: 2100,
              min: 2000,
              required: true,
            },
          ],
        },
        {
          label: 'Каталог',
          fields: [
            {
              name: 'groups',
              type: 'array',
              label: 'Групи спеціальностей',
              labels: {
                singular: 'Група спеціальностей',
                plural: 'Групи спеціальностей',
              },
              required: true,
              fields: [
                {
                  name: 'anchor',
                  type: 'text',
                  label: 'Якір',
                  admin: {
                    description: 'Значення для навігаційного посилання без символу #.',
                  },
                  required: true,
                },
                {
                  name: 'interestLabel',
                  type: 'text',
                  label: 'Назва інтересу',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Заголовок',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Опис',
                  required: true,
                },
                {
                  name: 'specialties',
                  type: 'relationship',
                  label: 'Спеціальності',
                  hasMany: true,
                  relationTo: 'specialties',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Корисні ресурси',
          fields: [
            {
              name: 'applicantResources',
              type: 'array',
              label: 'Корисні ресурси для вступника',
              labels: {
                singular: 'Ресурс для вступника',
                plural: 'Ресурси для вступника',
              },
              admin: {
                description:
                  'Порядок елементів визначає порядок карток на сторінці. У заголовку можна використати {year}.',
              },
              minRows: 1,
              required: true,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Заголовок',
                  admin: {
                    description:
                      'Placeholder {year} буде замінено активним роком вступної кампанії.',
                  },
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Опис',
                  required: true,
                },
                {
                  name: 'destinationType',
                  dbName: 'enum_spec_resource_destination',
                  type: 'select',
                  label: 'Тип переходу',
                  defaultValue: 'link',
                  options: [
                    { label: 'Посилання', value: 'link' },
                    { label: 'PDF-файл', value: 'file' },
                  ],
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  label: 'Посилання',
                  admin: {
                    condition: (_, siblingData) => siblingData?.destinationType === 'link',
                    description: 'Внутрішній шлях з / або повне посилання з http:// чи https://.',
                    placeholder: '/contacts або https://example.edu.ua',
                  },
                  validate: validateApplicantResourceHref,
                },
                {
                  name: 'file',
                  type: 'upload',
                  label: 'PDF-файл',
                  relationTo: 'media',
                  admin: {
                    condition: (_, siblingData) => siblingData?.destinationType === 'file',
                    description: 'Завантажте новий PDF або виберіть наявний у Media.',
                  },
                  filterOptions: {
                    mimeType: { equals: 'application/pdf' },
                  },
                  validate: validateApplicantResourceFile,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateEducationalProgramsPageSettings],
  },
  versions: {
    drafts: {
      validate: false,
    },
    max: 20,
  },
}
