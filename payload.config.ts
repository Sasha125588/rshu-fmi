// import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
// import { r2Storage } from '@payloadcms/storage-r2'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import {
  Departments,
  EducationalPrograms,
  ProgramDocuments,
  TuitionRates,
  Users,
} from '@/payload/collections'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  //   editor: lexicalEditor(),

  collections: [Users, Departments, EducationalPrograms, TuitionRates, ProgramDocuments],

  admin: {
    user: Users.slug,
  },

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET ?? '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    migrationDir: './drizzle/migrations',
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  // plugins: [
  //   r2Storage({
  //     collections: {
  //       media: true,
  //     },
  //     bucket: ,
  //   }),
  // ],
})
