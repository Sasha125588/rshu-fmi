import { sql } from '@payloadcms/db-postgres'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "project_applications" ADD COLUMN "contributor_id" integer;
    ALTER TABLE "project_applications" ADD CONSTRAINT "project_applications_contributor_id_project_contributors_id_fk" FOREIGN KEY ("contributor_id") REFERENCES "public"."project_contributors"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX "project_applications_contributor_idx" ON "project_applications" USING btree ("contributor_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "project_applications" DROP COLUMN "contributor_id";`)
}
