import { sql } from '@payloadcms/db-postgres'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_departments_staff_role" AS ENUM('professor', 'associate', 'senior', 'lecturer', 'assistant', 'other');
  CREATE TYPE "public"."enum__departments_v_version_staff_role" AS ENUM('professor', 'associate', 'senior', 'lecturer', 'assistant', 'other');
  CREATE TABLE "departments_staff" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_departments_staff_role" NOT NULL,
  	"note" varchar,
  	"is_head" boolean,
  	"schedule_name" varchar
  );
  
  CREATE TABLE "departments_research" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"topic" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "departments_leadership" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"period" varchar NOT NULL
  );
  
  CREATE TABLE "_departments_v_version_staff" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum__departments_v_version_staff_role" NOT NULL,
  	"note" varchar,
  	"is_head" boolean,
  	"schedule_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_departments_v_version_research" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"topic" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_departments_v_version_leadership" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"period" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  ALTER TABLE "departments" ADD COLUMN "logo_id" integer;
  ALTER TABLE "departments" ADD COLUMN "founded_year" numeric;
  ALTER TABLE "departments" ADD COLUMN "contacts_address" varchar;
  ALTER TABLE "departments" ADD COLUMN "contacts_room" varchar;
  ALTER TABLE "departments" ADD COLUMN "contacts_email" varchar;
  ALTER TABLE "departments" ADD COLUMN "source_url" varchar;
  ALTER TABLE "_departments_v" ADD COLUMN "version_logo_id" integer;
  ALTER TABLE "_departments_v" ADD COLUMN "version_founded_year" numeric;
  ALTER TABLE "_departments_v" ADD COLUMN "version_contacts_address" varchar;
  ALTER TABLE "_departments_v" ADD COLUMN "version_contacts_room" varchar;
  ALTER TABLE "_departments_v" ADD COLUMN "version_contacts_email" varchar;
  ALTER TABLE "_departments_v" ADD COLUMN "version_source_url" varchar;
  ALTER TABLE "departments_staff" ADD CONSTRAINT "departments_staff_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments_research" ADD CONSTRAINT "departments_research_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments_leadership" ADD CONSTRAINT "departments_leadership_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_departments_v_version_staff" ADD CONSTRAINT "_departments_v_version_staff_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_departments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_departments_v_version_research" ADD CONSTRAINT "_departments_v_version_research_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_departments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_departments_v_version_leadership" ADD CONSTRAINT "_departments_v_version_leadership_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_departments_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "departments_staff_order_idx" ON "departments_staff" USING btree ("_order");
  CREATE INDEX "departments_staff_parent_id_idx" ON "departments_staff" USING btree ("_parent_id");
  CREATE INDEX "departments_research_order_idx" ON "departments_research" USING btree ("_order");
  CREATE INDEX "departments_research_parent_id_idx" ON "departments_research" USING btree ("_parent_id");
  CREATE INDEX "departments_leadership_order_idx" ON "departments_leadership" USING btree ("_order");
  CREATE INDEX "departments_leadership_parent_id_idx" ON "departments_leadership" USING btree ("_parent_id");
  CREATE INDEX "_departments_v_version_staff_order_idx" ON "_departments_v_version_staff" USING btree ("_order");
  CREATE INDEX "_departments_v_version_staff_parent_id_idx" ON "_departments_v_version_staff" USING btree ("_parent_id");
  CREATE INDEX "_departments_v_version_research_order_idx" ON "_departments_v_version_research" USING btree ("_order");
  CREATE INDEX "_departments_v_version_research_parent_id_idx" ON "_departments_v_version_research" USING btree ("_parent_id");
  CREATE INDEX "_departments_v_version_leadership_order_idx" ON "_departments_v_version_leadership" USING btree ("_order");
  CREATE INDEX "_departments_v_version_leadership_parent_id_idx" ON "_departments_v_version_leadership" USING btree ("_parent_id");
  ALTER TABLE "departments" ADD CONSTRAINT "departments_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_departments_v" ADD CONSTRAINT "_departments_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "departments_logo_idx" ON "departments" USING btree ("logo_id");
  CREATE INDEX "_departments_v_version_version_logo_idx" ON "_departments_v" USING btree ("version_logo_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "departments_staff" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "departments_research" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "departments_leadership" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_departments_v_version_staff" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_departments_v_version_research" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_departments_v_version_leadership" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "departments_staff" CASCADE;
  DROP TABLE "departments_research" CASCADE;
  DROP TABLE "departments_leadership" CASCADE;
  DROP TABLE "_departments_v_version_staff" CASCADE;
  DROP TABLE "_departments_v_version_research" CASCADE;
  DROP TABLE "_departments_v_version_leadership" CASCADE;
  ALTER TABLE "departments" DROP CONSTRAINT "departments_logo_id_media_id_fk";
  
  ALTER TABLE "_departments_v" DROP CONSTRAINT "_departments_v_version_logo_id_media_id_fk";
  
  DROP INDEX "departments_logo_idx";
  DROP INDEX "_departments_v_version_version_logo_idx";
  ALTER TABLE "departments" DROP COLUMN "logo_id";
  ALTER TABLE "departments" DROP COLUMN "founded_year";
  ALTER TABLE "departments" DROP COLUMN "contacts_address";
  ALTER TABLE "departments" DROP COLUMN "contacts_room";
  ALTER TABLE "departments" DROP COLUMN "contacts_email";
  ALTER TABLE "departments" DROP COLUMN "source_url";
  ALTER TABLE "_departments_v" DROP COLUMN "version_logo_id";
  ALTER TABLE "_departments_v" DROP COLUMN "version_founded_year";
  ALTER TABLE "_departments_v" DROP COLUMN "version_contacts_address";
  ALTER TABLE "_departments_v" DROP COLUMN "version_contacts_room";
  ALTER TABLE "_departments_v" DROP COLUMN "version_contacts_email";
  ALTER TABLE "_departments_v" DROP COLUMN "version_source_url";
  DROP TYPE "public"."enum_departments_staff_role";
  DROP TYPE "public"."enum__departments_v_version_staff_role";`)
}
