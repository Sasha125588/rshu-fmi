import { linkApplicationContributor } from './hooks/linkContributor'
import { adminOnly } from '@/payload/access'

import type { CollectionConfig } from 'payload'

export const ProjectApplications: CollectionConfig = {
  slug: 'project-applications',
  typescript: { interface: 'ProjectApplication' },
  labels: { singular: 'Заявка на участь', plural: 'Заявки на участь' },
  access: {
    admin: (args) => !!adminOnly(args),
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    group: 'Дошка проєктів',
    components: {
      beforeList: [
        '@/payload/collections/ProjectApplications/components/ApplicationsScope#ApplicationsScope',
      ],
    },
    defaultColumns: ['name', 'project', 'roleTitle', 'status', 'createdAt'],
    listSearchableFields: ['name', 'group', 'contact', 'roleTitle'],
    useAsTitle: 'name',
  },
  defaultSort: '-createdAt',
  disableDuplicate: true,
  lockDocuments: false,
  fields: [
    {
      name: 'project',
      type: 'relationship',
      label: 'Проєкт',
      relationTo: 'projects',
      required: true,
      access: { update: () => false },
      admin: { allowCreate: false, readOnly: true },
    },
    {
      name: 'publisher',
      type: 'relationship',
      label: 'Перший публікатор',
      relationTo: 'users',
      access: { create: () => false, update: () => false },
      admin: { position: 'sidebar', readOnly: true, allowCreate: false },
    },
    { name: 'name', type: 'text', label: 'Ім’я', required: true },
    {
      name: 'group',
      type: 'text',
      label: 'Група',
      required: true,
      access: { update: () => false },
      admin: { readOnly: true },
    },
    {
      name: 'course',
      type: 'number',
      label: 'Курс',
      required: true,
      access: { update: () => false },
      admin: { readOnly: true },
    },
    {
      name: 'contact',
      type: 'text',
      label: 'Контакт',
      required: true,
      access: { update: () => false },
      admin: { readOnly: true, description: 'Email або акаунт у Telegram.' },
    },
    { name: 'message', type: 'textarea', label: 'Повідомлення' },
    {
      name: 'roleTitle',
      type: 'text',
      label: 'Обрана роль',
      admin: { readOnly: true },
      access: { update: () => false },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Стан розгляду',
      defaultValue: 'new',
      required: true,
      options: [
        { value: 'new', label: 'Нова' },
        { value: 'reviewed', label: 'Переглянута' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'contributor',
      type: 'relationship',
      relationTo: 'project-contributors',
      label: 'Пов’язаний контриб’ютор',
      access: { create: () => false, update: () => false },
      admin: {
        condition: (data) => !!data.contributor,
        position: 'sidebar',
        readOnly: true,
        allowCreate: false,
      },
    },
    {
      name: 'createContributorDraft',
      type: 'checkbox',
      label: 'Створити чернетку контриб’ютора',
      virtual: true,
      admin: {
        condition: (data, _siblingData, { operation }) =>
          operation === 'update' && !data.contributor && !data.linkContributor,
        description: 'Увімкни після підтвердження участі й збережи заявку.',
        readOnly: false,
        disableBulkEdit: true,
        disableListColumn: true,
        disableListFilter: true,
        position: 'sidebar',
      },
    },
    {
      name: 'linkContributor',
      type: 'relationship',
      relationTo: 'project-contributors',
      label: 'Прив’язати наявний профіль',
      virtual: true,
      admin: {
        condition: (data, _siblingData, { operation }) =>
          operation === 'update' && !data.contributor && !data.createContributorDraft,
        description: 'Вибери профіль цієї людини й збережи заявку.',
        readOnly: false,
        allowCreate: false,
        allowEdit: false,
        disableBulkEdit: true,
        disableListColumn: true,
        disableListFilter: true,
        position: 'sidebar',
      },
    },
  ],
  hooks: { beforeChange: [linkApplicationContributor] },
}
