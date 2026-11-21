import { sql } from '@payloadcms/db-postgres'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Only new submissions have a group and course.
  await db.execute(sql`
    ALTER TABLE "project_proposals" RENAME COLUMN "email" TO "contact";
    ALTER TABLE "project_applications" RENAME COLUMN "email" TO "contact";
    ALTER TABLE "project_proposals" ADD COLUMN "group" varchar, ADD COLUMN "course" numeric;
    ALTER TABLE "project_applications" ADD COLUMN "group" varchar, ADD COLUMN "course" numeric;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "project_proposals" DROP COLUMN "group", DROP COLUMN "course";
    ALTER TABLE "project_applications" DROP COLUMN "group", DROP COLUMN "course";
    ALTER TABLE "project_proposals" RENAME COLUMN "contact" TO "email";
    ALTER TABLE "project_applications" RENAME COLUMN "contact" TO "email";
  `)
}
