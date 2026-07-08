import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_educational_programs_study_forms_form" AS ENUM('full-time', 'part-time', 'dual');
  CREATE TYPE "public"."enum_educational_programs_education_level" AS ENUM('bachelor', 'master');
  CREATE TYPE "public"."enum_educational_programs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__educational_programs_v_version_study_forms_form" AS ENUM('full-time', 'part-time', 'dual');
  CREATE TYPE "public"."enum__educational_programs_v_version_education_level" AS ENUM('bachelor', 'master');
  CREATE TYPE "public"."enum__educational_programs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_tuition_rates_study_form" AS ENUM('full-time', 'part-time', 'dual');
  CREATE TYPE "public"."enum_tuition_rates_availability" AS ENUM('available', 'unavailable', 'to-be-announced');
  CREATE TYPE "public"."enum_tuition_rates_currency" AS ENUM('UAH');
  CREATE TYPE "public"."enum_tuition_rates_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tuition_rates_v_version_study_form" AS ENUM('full-time', 'part-time', 'dual');
  CREATE TYPE "public"."enum__tuition_rates_v_version_availability" AS ENUM('available', 'unavailable', 'to-be-announced');
  CREATE TYPE "public"."enum__tuition_rates_v_version_currency" AS ENUM('UAH');
  CREATE TYPE "public"."enum__tuition_rates_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_program_documents_type" AS ENUM('educational-program', 'previous-educational-program', 'syllabus', 'work-program', 'curriculum', 'accreditation', 'review', 'other');
  CREATE TYPE "public"."enum_program_documents_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__program_documents_v_version_type" AS ENUM('educational-program', 'previous-educational-program', 'syllabus', 'work-program', 'curriculum', 'accreditation', 'review', 'other');
  CREATE TYPE "public"."enum__program_documents_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_media_category" AS ENUM('document', 'page-image', 'news', 'gallery', 'other');
  CREATE TABLE "educational_programs_study_forms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form" "enum_educational_programs_study_forms_form",
  	"duration_label" varchar DEFAULT '3 роки 10 місяців',
  	"note" varchar
  );
  
  CREATE TABLE "educational_programs_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "educational_programs_careers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "educational_programs_study_focus" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "educational_programs_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "educational_programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"short_title" varchar,
  	"admin_title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"specialty_code" varchar,
  	"legacy_specialty_code" varchar,
  	"specialty_name" varchar,
  	"education_level" "enum_educational_programs_education_level",
  	"department_id" integer,
  	"is_featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"description" varchar,
  	"hero_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_educational_programs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_educational_programs_v_version_study_forms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form" "enum__educational_programs_v_version_study_forms_form",
  	"duration_label" varchar DEFAULT '3 роки 10 місяців',
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_educational_programs_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_educational_programs_v_version_careers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_educational_programs_v_version_study_focus" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_educational_programs_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_educational_programs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_short_title" varchar,
  	"version_admin_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_specialty_code" varchar,
  	"version_legacy_specialty_code" varchar,
  	"version_specialty_name" varchar,
  	"version_education_level" "enum__educational_programs_v_version_education_level",
  	"version_department_id" integer,
  	"version_is_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_description" varchar,
  	"version_hero_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__educational_programs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "tuition_rates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"educational_program_id" integer,
  	"academic_year" varchar,
  	"study_form" "enum_tuition_rates_study_form",
  	"availability" "enum_tuition_rates_availability" DEFAULT 'available',
  	"amount_per_year" numeric,
  	"total_amount" numeric,
  	"currency" "enum_tuition_rates_currency" DEFAULT 'UAH',
  	"note" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_tuition_rates_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_tuition_rates_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_educational_program_id" integer,
  	"version_academic_year" varchar,
  	"version_study_form" "enum__tuition_rates_v_version_study_form",
  	"version_availability" "enum__tuition_rates_v_version_availability" DEFAULT 'available',
  	"version_amount_per_year" numeric,
  	"version_total_amount" numeric,
  	"version_currency" "enum__tuition_rates_v_version_currency" DEFAULT 'UAH',
  	"version_note" varchar,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__tuition_rates_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
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
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"category" "enum_media_category" DEFAULT 'document' NOT NULL,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "educational_programs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tuition_rates_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "program_documents_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "educational_programs_study_forms" ADD CONSTRAINT "educational_programs_study_forms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."educational_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educational_programs_tags" ADD CONSTRAINT "educational_programs_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."educational_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educational_programs_careers" ADD CONSTRAINT "educational_programs_careers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."educational_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educational_programs_study_focus" ADD CONSTRAINT "educational_programs_study_focus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."educational_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educational_programs_faq" ADD CONSTRAINT "educational_programs_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."educational_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educational_programs" ADD CONSTRAINT "educational_programs_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educational_programs_v_version_study_forms" ADD CONSTRAINT "_educational_programs_v_version_study_forms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_educational_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_educational_programs_v_version_tags" ADD CONSTRAINT "_educational_programs_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_educational_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_educational_programs_v_version_careers" ADD CONSTRAINT "_educational_programs_v_version_careers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_educational_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_educational_programs_v_version_study_focus" ADD CONSTRAINT "_educational_programs_v_version_study_focus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_educational_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_educational_programs_v_version_faq" ADD CONSTRAINT "_educational_programs_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_educational_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_educational_programs_v" ADD CONSTRAINT "_educational_programs_v_parent_id_educational_programs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."educational_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educational_programs_v" ADD CONSTRAINT "_educational_programs_v_version_department_id_departments_id_fk" FOREIGN KEY ("version_department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tuition_rates" ADD CONSTRAINT "tuition_rates_educational_program_id_educational_programs_id_fk" FOREIGN KEY ("educational_program_id") REFERENCES "public"."educational_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tuition_rates_v" ADD CONSTRAINT "_tuition_rates_v_parent_id_tuition_rates_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tuition_rates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tuition_rates_v" ADD CONSTRAINT "_tuition_rates_v_version_educational_program_id_educational_programs_id_fk" FOREIGN KEY ("version_educational_program_id") REFERENCES "public"."educational_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_documents" ADD CONSTRAINT "program_documents_educational_program_id_educational_programs_id_fk" FOREIGN KEY ("educational_program_id") REFERENCES "public"."educational_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "program_documents" ADD CONSTRAINT "program_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_documents_v" ADD CONSTRAINT "_program_documents_v_parent_id_program_documents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."program_documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_documents_v" ADD CONSTRAINT "_program_documents_v_version_educational_program_id_educational_programs_id_fk" FOREIGN KEY ("version_educational_program_id") REFERENCES "public"."educational_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_program_documents_v" ADD CONSTRAINT "_program_documents_v_version_file_id_media_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "educational_programs_study_forms_order_idx" ON "educational_programs_study_forms" USING btree ("_order");
  CREATE INDEX "educational_programs_study_forms_parent_id_idx" ON "educational_programs_study_forms" USING btree ("_parent_id");
  CREATE INDEX "educational_programs_tags_order_idx" ON "educational_programs_tags" USING btree ("_order");
  CREATE INDEX "educational_programs_tags_parent_id_idx" ON "educational_programs_tags" USING btree ("_parent_id");
  CREATE INDEX "educational_programs_careers_order_idx" ON "educational_programs_careers" USING btree ("_order");
  CREATE INDEX "educational_programs_careers_parent_id_idx" ON "educational_programs_careers" USING btree ("_parent_id");
  CREATE INDEX "educational_programs_study_focus_order_idx" ON "educational_programs_study_focus" USING btree ("_order");
  CREATE INDEX "educational_programs_study_focus_parent_id_idx" ON "educational_programs_study_focus" USING btree ("_parent_id");
  CREATE INDEX "educational_programs_faq_order_idx" ON "educational_programs_faq" USING btree ("_order");
  CREATE INDEX "educational_programs_faq_parent_id_idx" ON "educational_programs_faq" USING btree ("_parent_id");
  CREATE INDEX "educational_programs_admin_title_idx" ON "educational_programs" USING btree ("admin_title");
  CREATE UNIQUE INDEX "educational_programs_slug_idx" ON "educational_programs" USING btree ("slug");
  CREATE INDEX "educational_programs_specialty_code_idx" ON "educational_programs" USING btree ("specialty_code");
  CREATE INDEX "educational_programs_legacy_specialty_code_idx" ON "educational_programs" USING btree ("legacy_specialty_code");
  CREATE INDEX "educational_programs_department_idx" ON "educational_programs" USING btree ("department_id");
  CREATE INDEX "educational_programs_updated_at_idx" ON "educational_programs" USING btree ("updated_at");
  CREATE INDEX "educational_programs_created_at_idx" ON "educational_programs" USING btree ("created_at");
  CREATE INDEX "educational_programs__status_idx" ON "educational_programs" USING btree ("_status");
  CREATE INDEX "_educational_programs_v_version_study_forms_order_idx" ON "_educational_programs_v_version_study_forms" USING btree ("_order");
  CREATE INDEX "_educational_programs_v_version_study_forms_parent_id_idx" ON "_educational_programs_v_version_study_forms" USING btree ("_parent_id");
  CREATE INDEX "_educational_programs_v_version_tags_order_idx" ON "_educational_programs_v_version_tags" USING btree ("_order");
  CREATE INDEX "_educational_programs_v_version_tags_parent_id_idx" ON "_educational_programs_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_educational_programs_v_version_careers_order_idx" ON "_educational_programs_v_version_careers" USING btree ("_order");
  CREATE INDEX "_educational_programs_v_version_careers_parent_id_idx" ON "_educational_programs_v_version_careers" USING btree ("_parent_id");
  CREATE INDEX "_educational_programs_v_version_study_focus_order_idx" ON "_educational_programs_v_version_study_focus" USING btree ("_order");
  CREATE INDEX "_educational_programs_v_version_study_focus_parent_id_idx" ON "_educational_programs_v_version_study_focus" USING btree ("_parent_id");
  CREATE INDEX "_educational_programs_v_version_faq_order_idx" ON "_educational_programs_v_version_faq" USING btree ("_order");
  CREATE INDEX "_educational_programs_v_version_faq_parent_id_idx" ON "_educational_programs_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "_educational_programs_v_parent_idx" ON "_educational_programs_v" USING btree ("parent_id");
  CREATE INDEX "_educational_programs_v_version_version_admin_title_idx" ON "_educational_programs_v" USING btree ("version_admin_title");
  CREATE INDEX "_educational_programs_v_version_version_slug_idx" ON "_educational_programs_v" USING btree ("version_slug");
  CREATE INDEX "_educational_programs_v_version_version_specialty_code_idx" ON "_educational_programs_v" USING btree ("version_specialty_code");
  CREATE INDEX "_educational_programs_v_version_version_legacy_specialty_idx" ON "_educational_programs_v" USING btree ("version_legacy_specialty_code");
  CREATE INDEX "_educational_programs_v_version_version_department_idx" ON "_educational_programs_v" USING btree ("version_department_id");
  CREATE INDEX "_educational_programs_v_version_version_updated_at_idx" ON "_educational_programs_v" USING btree ("version_updated_at");
  CREATE INDEX "_educational_programs_v_version_version_created_at_idx" ON "_educational_programs_v" USING btree ("version_created_at");
  CREATE INDEX "_educational_programs_v_version_version__status_idx" ON "_educational_programs_v" USING btree ("version__status");
  CREATE INDEX "_educational_programs_v_created_at_idx" ON "_educational_programs_v" USING btree ("created_at");
  CREATE INDEX "_educational_programs_v_updated_at_idx" ON "_educational_programs_v" USING btree ("updated_at");
  CREATE INDEX "_educational_programs_v_latest_idx" ON "_educational_programs_v" USING btree ("latest");
  CREATE INDEX "tuition_rates_educational_program_idx" ON "tuition_rates" USING btree ("educational_program_id");
  CREATE INDEX "tuition_rates_academic_year_idx" ON "tuition_rates" USING btree ("academic_year");
  CREATE INDEX "tuition_rates_updated_at_idx" ON "tuition_rates" USING btree ("updated_at");
  CREATE INDEX "tuition_rates_created_at_idx" ON "tuition_rates" USING btree ("created_at");
  CREATE INDEX "tuition_rates__status_idx" ON "tuition_rates" USING btree ("_status");
  CREATE INDEX "_tuition_rates_v_parent_idx" ON "_tuition_rates_v" USING btree ("parent_id");
  CREATE INDEX "_tuition_rates_v_version_version_educational_program_idx" ON "_tuition_rates_v" USING btree ("version_educational_program_id");
  CREATE INDEX "_tuition_rates_v_version_version_academic_year_idx" ON "_tuition_rates_v" USING btree ("version_academic_year");
  CREATE INDEX "_tuition_rates_v_version_version_updated_at_idx" ON "_tuition_rates_v" USING btree ("version_updated_at");
  CREATE INDEX "_tuition_rates_v_version_version_created_at_idx" ON "_tuition_rates_v" USING btree ("version_created_at");
  CREATE INDEX "_tuition_rates_v_version_version__status_idx" ON "_tuition_rates_v" USING btree ("version__status");
  CREATE INDEX "_tuition_rates_v_created_at_idx" ON "_tuition_rates_v" USING btree ("created_at");
  CREATE INDEX "_tuition_rates_v_updated_at_idx" ON "_tuition_rates_v" USING btree ("updated_at");
  CREATE INDEX "_tuition_rates_v_latest_idx" ON "_tuition_rates_v" USING btree ("latest");
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
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_educational_programs_fk" FOREIGN KEY ("educational_programs_id") REFERENCES "public"."educational_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tuition_rates_fk" FOREIGN KEY ("tuition_rates_id") REFERENCES "public"."tuition_rates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_program_documents_fk" FOREIGN KEY ("program_documents_id") REFERENCES "public"."program_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_educational_programs_id_idx" ON "payload_locked_documents_rels" USING btree ("educational_programs_id");
  CREATE INDEX "payload_locked_documents_rels_tuition_rates_id_idx" ON "payload_locked_documents_rels" USING btree ("tuition_rates_id");
  CREATE INDEX "payload_locked_documents_rels_program_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("program_documents_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "educational_programs_study_forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "educational_programs_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "educational_programs_careers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "educational_programs_study_focus" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "educational_programs_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "educational_programs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_educational_programs_v_version_study_forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_educational_programs_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_educational_programs_v_version_careers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_educational_programs_v_version_study_focus" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_educational_programs_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_educational_programs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tuition_rates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tuition_rates_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "program_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_program_documents_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "educational_programs_study_forms" CASCADE;
  DROP TABLE "educational_programs_tags" CASCADE;
  DROP TABLE "educational_programs_careers" CASCADE;
  DROP TABLE "educational_programs_study_focus" CASCADE;
  DROP TABLE "educational_programs_faq" CASCADE;
  DROP TABLE "educational_programs" CASCADE;
  DROP TABLE "_educational_programs_v_version_study_forms" CASCADE;
  DROP TABLE "_educational_programs_v_version_tags" CASCADE;
  DROP TABLE "_educational_programs_v_version_careers" CASCADE;
  DROP TABLE "_educational_programs_v_version_study_focus" CASCADE;
  DROP TABLE "_educational_programs_v_version_faq" CASCADE;
  DROP TABLE "_educational_programs_v" CASCADE;
  DROP TABLE "tuition_rates" CASCADE;
  DROP TABLE "_tuition_rates_v" CASCADE;
  DROP TABLE "program_documents" CASCADE;
  DROP TABLE "_program_documents_v" CASCADE;
  DROP TABLE "media" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_educational_programs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tuition_rates_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_program_documents_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_fk";
  
  DROP INDEX "payload_locked_documents_rels_educational_programs_id_idx";
  DROP INDEX "payload_locked_documents_rels_tuition_rates_id_idx";
  DROP INDEX "payload_locked_documents_rels_program_documents_id_idx";
  DROP INDEX "payload_locked_documents_rels_media_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "educational_programs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tuition_rates_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "program_documents_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_id";
  DROP TYPE "public"."enum_educational_programs_study_forms_form";
  DROP TYPE "public"."enum_educational_programs_education_level";
  DROP TYPE "public"."enum_educational_programs_status";
  DROP TYPE "public"."enum__educational_programs_v_version_study_forms_form";
  DROP TYPE "public"."enum__educational_programs_v_version_education_level";
  DROP TYPE "public"."enum__educational_programs_v_version_status";
  DROP TYPE "public"."enum_tuition_rates_study_form";
  DROP TYPE "public"."enum_tuition_rates_availability";
  DROP TYPE "public"."enum_tuition_rates_currency";
  DROP TYPE "public"."enum_tuition_rates_status";
  DROP TYPE "public"."enum__tuition_rates_v_version_study_form";
  DROP TYPE "public"."enum__tuition_rates_v_version_availability";
  DROP TYPE "public"."enum__tuition_rates_v_version_currency";
  DROP TYPE "public"."enum__tuition_rates_v_version_status";
  DROP TYPE "public"."enum_program_documents_type";
  DROP TYPE "public"."enum_program_documents_status";
  DROP TYPE "public"."enum__program_documents_v_version_type";
  DROP TYPE "public"."enum__program_documents_v_version_status";
  DROP TYPE "public"."enum_media_category";`)
}
