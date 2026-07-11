import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "documents" ADD COLUMN "generated_title_snapshot" varchar;
  ALTER TABLE "_documents_v" ADD COLUMN "version_generated_title_snapshot" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "documents" DROP COLUMN "generated_title_snapshot";
  ALTER TABLE "_documents_v" DROP COLUMN "version_generated_title_snapshot";`)
}
