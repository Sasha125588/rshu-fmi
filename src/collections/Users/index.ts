import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { adminOnly } from '@/access/adminOnly'
import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'
import { adminOrSelf } from '@/access/adminOrSelf'
import { adminsOrEditors } from '@/access/adminsOrEditors'

import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Користувач',
    plural: 'Користувачі',
  },
  access: {
    admin: adminsOrEditors,
    create: adminOnly,
    delete: adminOnly,
    read: adminOrSelf,
    unlock: adminOnly,
    update: adminOrSelf,
  },
  admin: {
    group: 'Доступ',
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 10,
    lockTime: 10 * 60 * 1000,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: "Ім'я",
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      label: 'Ролі',
      access: {
        create: adminOnlyFieldAccess,
        read: adminOnlyFieldAccess,
        update: adminOnlyFieldAccess,
      },
      defaultValue: ['editor'],
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: 'Адміністратор',
          value: 'admin',
        },
        {
          label: 'Редактор',
          value: 'editor',
        },
      ],
      required: true,
    },
  ],
  versions: false,
}
