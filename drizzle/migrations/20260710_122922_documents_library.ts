import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_documents_document_type" AS ENUM('regulation', 'order', 'educational-program', 'previous-educational-program', 'syllabus', 'work-program', 'curriculum', 'accreditation', 'review', 'other');
  CREATE TYPE "public"."enum_documents_source" AS ENUM('faculty', 'university');
  CREATE TYPE "public"."enum_documents_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__documents_v_version_document_type" AS ENUM('regulation', 'order', 'educational-program', 'previous-educational-program', 'syllabus', 'work-program', 'curriculum', 'accreditation', 'review', 'other');
  CREATE TYPE "public"."enum__documents_v_version_source" AS ENUM('faculty', 'university');
  CREATE TYPE "public"."enum__documents_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "document_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"document_type" "enum_documents_document_type",
  	"document_date" timestamp(3) with time zone,
  	"period_label" varchar,
  	"file_id" integer,
  	"external_url" varchar,
  	"description" varchar,
  	"show_in_regulatory_catalog" boolean DEFAULT false,
  	"category_id" integer,
  	"source" "enum_documents_source",
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_documents_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"educational_programs_id" integer
  );
  
  CREATE TABLE "_documents_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_document_type" "enum__documents_v_version_document_type",
  	"version_document_date" timestamp(3) with time zone,
  	"version_period_label" varchar,
  	"version_file_id" integer,
  	"version_external_url" varchar,
  	"version_description" varchar,
  	"version_show_in_regulatory_catalog" boolean DEFAULT false,
  	"version_category_id" integer,
  	"version_source" "enum__documents_v_version_source",
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__documents_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_documents_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"educational_programs_id" integer
  );
  
  ALTER TABLE "program_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_program_documents_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "program_documents" CASCADE;
  DROP TABLE "_program_documents_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_program_documents_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_program_documents_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "document_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_category_id_document_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."document_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents_rels" ADD CONSTRAINT "documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_rels" ADD CONSTRAINT "documents_rels_educational_programs_fk" FOREIGN KEY ("educational_programs_id") REFERENCES "public"."educational_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_documents_v" ADD CONSTRAINT "_documents_v_parent_id_documents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_documents_v" ADD CONSTRAINT "_documents_v_version_file_id_media_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_documents_v" ADD CONSTRAINT "_documents_v_version_category_id_document_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."document_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_documents_v_rels" ADD CONSTRAINT "_documents_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_documents_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_documents_v_rels" ADD CONSTRAINT "_documents_v_rels_educational_programs_fk" FOREIGN KEY ("educational_programs_id") REFERENCES "public"."educational_programs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "document_categories_slug_idx" ON "document_categories" USING btree ("slug");
  CREATE INDEX "document_categories_updated_at_idx" ON "document_categories" USING btree ("updated_at");
  CREATE INDEX "document_categories_created_at_idx" ON "document_categories" USING btree ("created_at");
  CREATE INDEX "documents_file_idx" ON "documents" USING btree ("file_id");
  CREATE INDEX "documents_category_idx" ON "documents" USING btree ("category_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE INDEX "documents__status_idx" ON "documents" USING btree ("_status");
  CREATE INDEX "documents_rels_order_idx" ON "documents_rels" USING btree ("order");
  CREATE INDEX "documents_rels_parent_idx" ON "documents_rels" USING btree ("parent_id");
  CREATE INDEX "documents_rels_path_idx" ON "documents_rels" USING btree ("path");
  CREATE INDEX "documents_rels_educational_programs_id_idx" ON "documents_rels" USING btree ("educational_programs_id");
  CREATE INDEX "_documents_v_parent_idx" ON "_documents_v" USING btree ("parent_id");
  CREATE INDEX "_documents_v_version_version_file_idx" ON "_documents_v" USING btree ("version_file_id");
  CREATE INDEX "_documents_v_version_version_category_idx" ON "_documents_v" USING btree ("version_category_id");
  CREATE INDEX "_documents_v_version_version_updated_at_idx" ON "_documents_v" USING btree ("version_updated_at");
  CREATE INDEX "_documents_v_version_version_created_at_idx" ON "_documents_v" USING btree ("version_created_at");
  CREATE INDEX "_documents_v_version_version__status_idx" ON "_documents_v" USING btree ("version__status");
  CREATE INDEX "_documents_v_created_at_idx" ON "_documents_v" USING btree ("created_at");
  CREATE INDEX "_documents_v_updated_at_idx" ON "_documents_v" USING btree ("updated_at");
  CREATE INDEX "_documents_v_latest_idx" ON "_documents_v" USING btree ("latest");
  CREATE INDEX "_documents_v_rels_order_idx" ON "_documents_v_rels" USING btree ("order");
  CREATE INDEX "_documents_v_rels_parent_idx" ON "_documents_v_rels" USING btree ("parent_id");
  CREATE INDEX "_documents_v_rels_path_idx" ON "_documents_v_rels" USING btree ("path");
  CREATE INDEX "_documents_v_rels_educational_programs_id_idx" ON "_documents_v_rels" USING btree ("educational_programs_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_document_categories_fk" FOREIGN KEY ("document_categories_id") REFERENCES "public"."document_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_document_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("document_categories_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "program_documents_id";
  DROP TYPE "public"."enum_program_documents_type";
  DROP TYPE "public"."enum_program_documents_status";
  DROP TYPE "public"."enum__program_documents_v_version_type";
  DROP TYPE "public"."enum__program_documents_v_version_status";
  INSERT INTO "document_categories" ("title", "generate_slug", "slug", "sort_order") VALUES
    ('Освітній процес', false, 'education', 10),
    ('Доброчесність', false, 'integrity', 20),
    ('Міжнародна діяльність', false, 'international', 30),
    ('Наука', false, 'research', 40),
    ('Управління', false, 'governance', 50);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_program_documents_type" AS ENUM('educational-program', 'previous-educational-program', 'syllabus', 'work-program', 'curriculum', 'accreditation', 'review', 'other');
  CREATE TYPE "public"."enum_program_documents_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__program_documents_v_version_type" AS ENUM('educational-program', 'previous-educational-program', 'syllabus', 'work-program', 'curriculum', 'accreditation', 'review', 'other');
  CREATE TYPE "public"."enum__program_documents_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "program_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"educational_program_id" integer,
  	"type" "enum_program_documents_type",
  	"period_label" varchar,
  	"file_id" integer,
  	"external_url" varchar,
  	"description" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_program_documents_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_program_documents_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_educational_program_id" integer,
  	"version_type" "enum__program_documents_v_version_type",
  	"version_period_label" varchar,
  	"version_file_id" integer,
  	"version_external_url" varchar,
  	"version_description" varchar,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__program_documents_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "document_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "documents_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_documents_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_documents_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "document_categories" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "documents_rels" CASCADE;
  DROP TABLE "_documents_v" CASCADE;
  DROP TABLE "_documents_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_document_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_documents_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_document_categories_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_documents_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "program_documents_id" integer;
  ALTER TABLE "program_documents" ADD CONSTRAINT "program_documents_educational_program_id_educational_programs_id_fk" FOREIGN KEY ("educational_program_id") REFERENCES "public"."educational_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_documents" ADD CONSTRAINT "program_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_documents_v" ADD CONSTRAINT "_program_documents_v_parent_id_program_documents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."program_documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_documents_v" ADD CONSTRAINT "_program_documents_v_version_educational_program_id_educational_programs_id_fk" FOREIGN KEY ("version_educational_program_id") REFERENCES "public"."educational_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_documents_v" ADD CONSTRAINT "_program_documents_v_version_file_id_media_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "program_documents_educational_program_idx" ON "program_documents" USING btree ("educational_program_id");
  CREATE INDEX "program_documents_file_idx" ON "program_documents" USING btree ("file_id");
  CREATE INDEX "program_documents_updated_at_idx" ON "program_documents" USING btree ("updated_at");
  CREATE INDEX "program_documents_created_at_idx" ON "program_documents" USING btree ("created_at");
  CREATE INDEX "program_documents__status_idx" ON "program_documents" USING btree ("_status");
  CREATE INDEX "_program_documents_v_parent_idx" ON "_program_documents_v" USING btree ("parent_id");
  CREATE INDEX "_program_documents_v_version_version_educational_program_idx" ON "_program_documents_v" USING btree ("version_educational_program_id");
  CREATE INDEX "_program_documents_v_version_version_file_idx" ON "_program_documents_v" USING btree ("version_file_id");
  CREATE INDEX "_program_documents_v_version_version_updated_at_idx" ON "_program_documents_v" USING btree ("version_updated_at");
  CREATE INDEX "_program_documents_v_version_version_created_at_idx" ON "_program_documents_v" USING btree ("version_created_at");
  CREATE INDEX "_program_documents_v_version_version__status_idx" ON "_program_documents_v" USING btree ("version__status");
  CREATE INDEX "_program_documents_v_created_at_idx" ON "_program_documents_v" USING btree ("created_at");
  CREATE INDEX "_program_documents_v_updated_at_idx" ON "_program_documents_v" USING btree ("updated_at");
  CREATE INDEX "_program_documents_v_latest_idx" ON "_program_documents_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_program_documents_fk" FOREIGN KEY ("program_documents_id") REFERENCES "public"."program_documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_program_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("program_documents_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "document_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "documents_id";
  DROP TYPE "public"."enum_documents_document_type";
  DROP TYPE "public"."enum_documents_source";
  DROP TYPE "public"."enum_documents_status";
  DROP TYPE "public"."enum__documents_v_version_document_type";
  DROP TYPE "public"."enum__documents_v_version_source";
  DROP TYPE "public"."enum__documents_v_version_status";`)
}
