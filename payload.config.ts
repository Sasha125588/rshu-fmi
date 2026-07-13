// import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import {
  AcademicCouncilMembers,
  Departments,
  DocumentCategories,
  Documents,
  EducationalPrograms,
  Media,
  TuitionRates,
  Users,
} from '@/payload/collections'

export default buildConfig({
  //   editor: lexicalEditor(),

  collections: [
    Users,
    Departments,
    AcademicCouncilMembers,
    EducationalPrograms,
    TuitionRates,
    DocumentCategories,
    Documents,
    Media,
  ],

  admin: {
    user: Users.slug,
  },

  secret: process.env.PAYLOAD_SECRET!,

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    migrationDir: './drizzle/migrations',
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: !!process.env.R2_BUCKET,
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename

            return `${process.env.R2_PUBLIC_URL}/${key}`
          },
          prefix: 'media',
        },
      },
      bucket: process.env.R2_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
        region: 'auto',
      },
    }),
  ],
})
