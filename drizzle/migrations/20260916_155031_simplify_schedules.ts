import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "schedules" DROP COLUMN "title";
    ALTER TABLE "schedules" DROP COLUMN "content_hash";
    ALTER TABLE "schedules" DROP COLUMN "checked_at";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "schedules" ADD COLUMN "title" varchar;
    UPDATE "schedules" SET "title" = "source_key";
    ALTER TABLE "schedules" ALTER COLUMN "title" SET NOT NULL;
    ALTER TABLE "schedules" ADD COLUMN "content_hash" varchar;
    ALTER TABLE "schedules" ADD COLUMN "checked_at" timestamp(3) with time zone;
    UPDATE "schedules" SET "checked_at" = "updated_at";
  `)
}
