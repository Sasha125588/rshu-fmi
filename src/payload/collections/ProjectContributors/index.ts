import { revalidatePath } from 'next/cache'

import { importGitHubContributors } from './importGitHubContributors'
import { adminOnly, adminOnlyFieldAccess, publishedOrAuthenticated } from '@/payload/access'
import { invalidateCacheTags } from '@/payload/helpers'
import { CONTENT_CACHE_TAGS } from '@/shared/constants/cache'

import type { ProjectContributor } from '@/payload-types'
import type { CollectionConfig, PayloadRequest } from 'payload'

const revalidateContributors = ({
  doc,
  previousDoc,
  req,
}: {
  doc: ProjectContributor
  previousDoc?: ProjectContributor
  req: PayloadRequest
}) => {
  if (
    !req.context.disableRevalidate &&
    (doc._status === 'published' || previousDoc?._status === 'published')
  ) {
    invalidateCacheTags(CONTENT_CACHE_TAGS.projectContributors)
    revalidatePath('/projects')
  }

  return doc
}

export const ProjectContributors: CollectionConfig = {
  slug: 'project-contributors',
  typescript: { interface: 'ProjectContributor' },
  labels: { singular: 'Контриб’ютор', plural: 'Контриб’ютори' },
  access: {
    admin: (args) => !!adminOnly(args),
    create: adminOnly,
    delete: adminOnly,
    read: publishedOrAuthenticated,
    readVersions: adminOnly,
    update: adminOnly,
  },
  admin: {
    group: 'Дошка проєктів',
    useAsTitle: 'name',
    defaultColumns: ['name', 'source', '_status'],
    components: {
      beforeList: [
        '@/payload/collections/ProjectContributors/ImportGitHubButton#ImportGitHubButton',
      ],
    },
  },
  versions: { drafts: true },
  endpoints: [importGitHubContributors],
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Публічне ім’я',
      required: true,
      maxLength: 120,
      admin: { description: 'Публікуй ім’я учасника проєкту за його згодою.' },
    },
    {
      name: 'source',
      type: 'select',
      label: 'Тип внеску',
      required: true,
      defaultValue: 'project',
      options: [
        { label: 'Участь у проєктах', value: 'project' },
        { label: 'Внесок у сайт', value: 'github' },
        { label: 'Участь у проєктах і внесок у сайт', value: 'both' },
      ],
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      label: 'Проєкт',
      access: { read: adminOnlyFieldAccess },
    },
    {
      name: 'githubId',
      type: 'number',
      label: 'GitHub ID',
      min: 1,
      unique: true,
      admin: { description: 'Прив’яжи підтверджений ID GitHub, щоб імпорт впізнав цей профіль.' },
      validate: (value: number | null | undefined) =>
        value == null ||
        (Number.isSafeInteger(value) && value > 0) ||
        'Вкажи цілий додатний GitHub ID.',
    },
    {
      name: 'githubAvatarUrl',
      type: 'text',
      label: 'Аватар GitHub',
      admin: { readOnly: true },
      validate: (value: string | null | undefined) =>
        !value ||
        URL.parse(value)?.origin === 'https://avatars.githubusercontent.com' ||
        'Вкажи посилання на аватар GitHub.',
    },
  ],
  hooks: {
    afterChange: [revalidateContributors],
    afterDelete: [revalidateContributors],
  },
}
