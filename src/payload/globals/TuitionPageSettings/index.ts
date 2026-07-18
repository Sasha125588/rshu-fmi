import { revalidateTuitionPageSettings } from './hooks'
import { adminsOrEditors, publicAccess } from '@/payload/access'
import { validateUrl } from '@/payload/validators'

import type { GlobalConfig } from 'payload'

export const TuitionPageSettings: GlobalConfig = {
  slug: 'tuition-page-settings',
  label: 'Сторінка вартості навчання',
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
      name: 'activeAcademicYear',
      type: 'text',
      label: 'Активний навчальний рік',
      admin: {
        description: 'Цей рік використовується для вибору тарифів на публічній сторінці.',
        placeholder: '2026/2027',
      },
      defaultValue: '2026/2027',
      required: true,
    },
    {
      type: 'collapsible',
      label: 'Офіційний документ',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'officialDocumentTitle',
          type: 'text',
          label: 'Назва документа',
          defaultValue: 'Офіційна вартість навчання',
          required: true,
        },
        {
          name: 'officialDocumentFile',
          type: 'upload',
          label: 'Файл документа',
          admin: {
            description:
              'Завантажте файл або вкажіть HTTPS-посилання нижче ("Посилання на документ" пріоритетніше).',
          },
          filterOptions: {
            mimeType: {
              contains: 'application/pdf',
            },
          },
          maxDepth: 1,
          relationTo: 'media',
        },
        {
          name: 'officialDocumentUrl',
          type: 'text',
          label: 'Посилання на документ',
          admin: {
            description:
              'Зовнішнє HTTPS-посилання. Залиште порожнім, якщо документ завантажено як файл.',
            placeholder: 'https://www.rshu.edu.ua/path/to/document.pdf',
          },
          defaultValue: 'https://www.rshu.edu.ua/images/buhgal/nak_129od_30062026.pdf',
          validate: validateUrl,
        },
        {
          name: 'officialDocumentDate',
          type: 'date',
          label: 'Дата документа',
          admin: {
            date: {
              displayFormat: 'dd.MM.yyyy',
              pickerAppearance: 'dayOnly',
            },
          },
          defaultValue: '2026-06-30T00:00:00.000Z',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Реквізити на оплату',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'recipientName',
          type: 'text',
          label: 'Отримувач',
          defaultValue: 'Рівненський державний гуманітарний університет',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'recipientCode',
              type: 'text',
              label: 'Код отримувача',
              admin: {
                width: '40%',
              },
              defaultValue: '25736989',
              required: true,
            },
            {
              name: 'recipientBank',
              type: 'text',
              label: 'Банк отримувача',
              admin: {
                width: '60%',
              },
              defaultValue: 'ДКСУ м. Київ',
              required: true,
            },
          ],
        },
        {
          name: 'iban',
          type: 'text',
          label: 'IBAN',
          defaultValue: 'UA278201720313251002201015208',
          required: true,
        },
        {
          name: 'paymentPurposeTemplate',
          type: 'textarea',
          label: 'Шаблон призначення платежу',
          admin: {
            description: 'Залиште зрозумілі місця для ПІБ студента, курсу та факультету.',
          },
          defaultValue:
            'за навчання ________ (ПІБ студента) ________, курс ___, факультет ________________',
          required: true,
        },
        {
          name: 'paymentNote',
          type: 'textarea',
          label: 'Примітка',
          defaultValue: 'Перед оплатою уважно перевірте призначення платежу.',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateTuitionPageSettings],
  },
  versions: {
    drafts: {
      validate: false,
    },
    max: 20,
  },
}
