import { scheduleEndpoints } from './endpoints'
import { adminsOrEditors } from '@/payload/access'

import type { CollectionConfig } from 'payload'

export const Schedules: CollectionConfig = {
  slug: 'schedules',
  labels: { singular: 'Розклад', plural: 'Розклади' },
  admin: {
    group: 'Контент',
    useAsTitle: 'sourceKey',
    defaultColumns: ['sourceKey', 'syncedAt', 'updatedAt', 'lastError'],
    components: {
      beforeList: [
        '@/payload/collections/Schedules/components/SyncScheduleButton#SyncScheduleButton',
      ],
    },
    description: 'Дані імпортуються з Google. Зміни вносіть у вихідну таблицю.',
  },
  access: {
    admin: (args) => !!adminsOrEditors(args),
    read: adminsOrEditors,
    create: adminsOrEditors,
    update: adminsOrEditors,
    delete: adminsOrEditors,
  },
  endpoints: scheduleEndpoints,
  fields: [
    {
      name: 'sourceKey',
      type: 'text',
      label: 'Курс',
      required: true,
      unique: true,
      admin: { readOnly: true },
    },
    { name: 'snapshot', type: 'json', label: 'Перевірена версія', admin: { readOnly: true } },
    { name: 'syncedAt', type: 'date', label: 'Успішно перевірено', admin: { readOnly: true } },
    { name: 'lastError', type: 'textarea', label: 'Помилка імпорту', admin: { readOnly: true } },
  ],
}
