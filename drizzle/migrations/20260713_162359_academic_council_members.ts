import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  const { rows } = await db.execute<{ tableName: null | string }>(
    sql`SELECT to_regclass('public.academic_council_members')::text AS "tableName"`
  )

  if (rows[0]?.tableName) {
    payload.logger.info(
      'Academic council schema already exists from Payload dev push; skipping additive DDL.'
    )
    return
  }

  await db.execute(sql`
   CREATE TYPE "public"."enum_academic_council_members_council_role" AS ENUM('chair', 'deputy-chair', 'secretary', 'member');
  CREATE TYPE "public"."enum_academic_council_members_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__academic_council_members_v_version_council_role" AS ENUM('chair', 'deputy-chair', 'secretary', 'member');
  CREATE TYPE "public"."enum__academic_council_members_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "academic_council_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"council_role" "enum_academic_council_members_council_role",
  	"sort_order" numeric DEFAULT 0,
  	"position" varchar,
  	"description" varchar,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_academic_council_members_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "academic_council_members_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"departments_id" integer
  );
  
  CREATE TABLE "_academic_council_members_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_council_role" "enum__academic_council_members_v_version_council_role",
  	"version_sort_order" numeric DEFAULT 0,
  	"version_position" varchar,
  	"version_description" varchar,
  	"version_photo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__academic_council_members_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_academic_council_members_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"departments_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "academic_council_members_id" integer;
  ALTER TABLE "academic_council_members" ADD CONSTRAINT "academic_council_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "academic_council_members_rels" ADD CONSTRAINT "academic_council_members_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."academic_council_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "academic_council_members_rels" ADD CONSTRAINT "academic_council_members_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_academic_council_members_v" ADD CONSTRAINT "_academic_council_members_v_parent_id_academic_council_members_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."academic_council_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_academic_council_members_v" ADD CONSTRAINT "_academic_council_members_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_academic_council_members_v_rels" ADD CONSTRAINT "_academic_council_members_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_academic_council_members_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_academic_council_members_v_rels" ADD CONSTRAINT "_academic_council_members_v_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "academic_council_members_name_idx" ON "academic_council_members" USING btree ("name");
  CREATE INDEX "academic_council_members_council_role_idx" ON "academic_council_members" USING btree ("council_role");
  CREATE INDEX "academic_council_members_sort_order_idx" ON "academic_council_members" USING btree ("sort_order");
  CREATE INDEX "academic_council_members_photo_idx" ON "academic_council_members" USING btree ("photo_id");
  CREATE INDEX "academic_council_members_updated_at_idx" ON "academic_council_members" USING btree ("updated_at");
  CREATE INDEX "academic_council_members_created_at_idx" ON "academic_council_members" USING btree ("created_at");
  CREATE INDEX "academic_council_members__status_idx" ON "academic_council_members" USING btree ("_status");
  CREATE INDEX "academic_council_members_rels_order_idx" ON "academic_council_members_rels" USING btree ("order");
  CREATE INDEX "academic_council_members_rels_parent_idx" ON "academic_council_members_rels" USING btree ("parent_id");
  CREATE INDEX "academic_council_members_rels_path_idx" ON "academic_council_members_rels" USING btree ("path");
  CREATE INDEX "academic_council_members_rels_departments_id_idx" ON "academic_council_members_rels" USING btree ("departments_id");
  CREATE INDEX "_academic_council_members_v_parent_idx" ON "_academic_council_members_v" USING btree ("parent_id");
  CREATE INDEX "_academic_council_members_v_version_version_name_idx" ON "_academic_council_members_v" USING btree ("version_name");
  CREATE INDEX "_academic_council_members_v_version_version_council_role_idx" ON "_academic_council_members_v" USING btree ("version_council_role");
  CREATE INDEX "_academic_council_members_v_version_version_sort_order_idx" ON "_academic_council_members_v" USING btree ("version_sort_order");
  CREATE INDEX "_academic_council_members_v_version_version_photo_idx" ON "_academic_council_members_v" USING btree ("version_photo_id");
  CREATE INDEX "_academic_council_members_v_version_version_updated_at_idx" ON "_academic_council_members_v" USING btree ("version_updated_at");
  CREATE INDEX "_academic_council_members_v_version_version_created_at_idx" ON "_academic_council_members_v" USING btree ("version_created_at");
  CREATE INDEX "_academic_council_members_v_version_version__status_idx" ON "_academic_council_members_v" USING btree ("version__status");
  CREATE INDEX "_academic_council_members_v_created_at_idx" ON "_academic_council_members_v" USING btree ("created_at");
  CREATE INDEX "_academic_council_members_v_updated_at_idx" ON "_academic_council_members_v" USING btree ("updated_at");
  CREATE INDEX "_academic_council_members_v_latest_idx" ON "_academic_council_members_v" USING btree ("latest");
  CREATE INDEX "_academic_council_members_v_rels_order_idx" ON "_academic_council_members_v_rels" USING btree ("order");
  CREATE INDEX "_academic_council_members_v_rels_parent_idx" ON "_academic_council_members_v_rels" USING btree ("parent_id");
  CREATE INDEX "_academic_council_members_v_rels_path_idx" ON "_academic_council_members_v_rels" USING btree ("path");
  CREATE INDEX "_academic_council_members_v_rels_departments_id_idx" ON "_academic_council_members_v_rels" USING btree ("departments_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_academic_council_members_fk" FOREIGN KEY ("academic_council_members_id") REFERENCES "public"."academic_council_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_academic_council_members_i_idx" ON "payload_locked_documents_rels" USING btree ("academic_council_members_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_academic_council_members_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_academic_council_members_i_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "academic_council_members_id";
  ALTER TABLE "academic_council_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "academic_council_members_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_academic_council_members_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_academic_council_members_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "academic_council_members" CASCADE;
  DROP TABLE "academic_council_members_rels" CASCADE;
  DROP TABLE "_academic_council_members_v" CASCADE;
  DROP TABLE "_academic_council_members_v_rels" CASCADE;
  DROP TYPE "public"."enum_academic_council_members_council_role";
  DROP TYPE "public"."enum_academic_council_members_status";
  DROP TYPE "public"."enum__academic_council_members_v_version_council_role";
  DROP TYPE "public"."enum__academic_council_members_v_version_status";`)
}
