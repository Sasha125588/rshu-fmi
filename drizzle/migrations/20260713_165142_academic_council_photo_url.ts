import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "academic_council_members" ADD COLUMN IF NOT EXISTS "photo_url" varchar;
  ALTER TABLE "_academic_council_members_v" ADD COLUMN IF NOT EXISTS "version_photo_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "academic_council_members" DROP COLUMN IF EXISTS "photo_url";
  ALTER TABLE "_academic_council_members_v" DROP COLUMN IF EXISTS "version_photo_url";`)
}
