import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "schedules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_key" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"snapshot" jsonb,
  	"content_hash" varchar,
  	"synced_at" timestamp(3) with time zone,
  	"checked_at" timestamp(3) with time zone,
  	"last_error" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "schedules_id" integer;
  CREATE UNIQUE INDEX "schedules_source_key_idx" ON "schedules" USING btree ("source_key");
  CREATE INDEX "schedules_updated_at_idx" ON "schedules" USING btree ("updated_at");
  CREATE INDEX "schedules_created_at_idx" ON "schedules" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_schedules_fk" FOREIGN KEY ("schedules_id") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_schedules_id_idx" ON "payload_locked_documents_rels" USING btree ("schedules_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_schedules_fk";
  DROP INDEX "payload_locked_documents_rels_schedules_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "schedules_id";
  DROP TABLE "schedules";`)
}
