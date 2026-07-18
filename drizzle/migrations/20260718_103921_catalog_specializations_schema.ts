import { sql } from '@payloadcms/db-postgres'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_admission_campaigns_study_form" AS ENUM('full-time', 'part-time');
  CREATE TYPE "public"."enum_admission_campaigns_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__admission_campaigns_v_version_study_form" AS ENUM('full-time', 'part-time');
  CREATE TYPE "public"."enum__admission_campaigns_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_spec_resource_destination" AS ENUM('link', 'file');
  CREATE TYPE "public"."enum_spec_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__spec_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_tuition_page_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tuition_page_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "admission_campaigns" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"admin_title" varchar,
  	"educational_program_id" integer,
  	"campaign_year" numeric,
  	"study_form" "enum_admission_campaigns_study_form",
  	"licensed_capacity" numeric,
  	"max_state_order" numeric,
  	"statistics_year" numeric,
  	"average_budget_score" numeric,
  	"average_contract_score" numeric,
  	"statistics_url" varchar,
  	"data_updated_at" timestamp(3) with time zone,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_admission_campaigns_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_admission_campaigns_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_admin_title" varchar,
  	"version_educational_program_id" integer,
  	"version_campaign_year" numeric,
  	"version_study_form" "enum__admission_campaigns_v_version_study_form",
  	"version_licensed_capacity" numeric,
  	"version_max_state_order" numeric,
  	"version_statistics_year" numeric,
  	"version_average_budget_score" numeric,
  	"version_average_contract_score" numeric,
  	"version_statistics_url" varchar,
  	"version_data_updated_at" timestamp(3) with time zone,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__admission_campaigns_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "spec_settings_groups_specialty_codes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "spec_settings_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"interest_label" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "spec_settings_applicant_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"destination_type" "enum_spec_resource_destination" DEFAULT 'link',
  	"href" varchar,
  	"file_id" integer
  );
  
  CREATE TABLE "spec_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"active_admission_campaign_year" numeric DEFAULT 2026,
  	"_status" "enum_spec_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_spec_settings_v_version_groups_specialty_codes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_spec_settings_v_version_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"interest_label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_spec_settings_v_version_applicant_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"destination_type" "enum_spec_resource_destination" DEFAULT 'link',
  	"href" varchar,
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_spec_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_active_admission_campaign_year" numeric DEFAULT 2026,
  	"version__status" "enum__spec_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "tuition_page_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"active_academic_year" varchar DEFAULT '2026/2027',
  	"official_document_title" varchar DEFAULT 'Офіційна вартість навчання',
  	"official_document_file_id" integer,
  	"official_document_url" varchar DEFAULT 'https://www.rshu.edu.ua/images/buhgal/nak_129od_30062026.pdf',
  	"official_document_date" timestamp(3) with time zone DEFAULT '2026-06-30T00:00:00.000Z',
  	"recipient_name" varchar DEFAULT 'Рівненський державний гуманітарний університет',
  	"recipient_code" varchar DEFAULT '25736989',
  	"recipient_bank" varchar DEFAULT 'ДКСУ м. Київ',
  	"iban" varchar DEFAULT 'UA278201720313251002201015208',
  	"payment_purpose_template" varchar DEFAULT 'за навчання ________ (ПІБ студента) ________, курс ___, факультет ________________',
  	"payment_note" varchar DEFAULT 'Перед оплатою уважно перевірте призначення платежу.',
  	"_status" "enum_tuition_page_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_tuition_page_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_active_academic_year" varchar DEFAULT '2026/2027',
  	"version_official_document_title" varchar DEFAULT 'Офіційна вартість навчання',
  	"version_official_document_file_id" integer,
  	"version_official_document_url" varchar DEFAULT 'https://www.rshu.edu.ua/images/buhgal/nak_129od_30062026.pdf',
  	"version_official_document_date" timestamp(3) with time zone DEFAULT '2026-06-30T00:00:00.000Z',
  	"version_recipient_name" varchar DEFAULT 'Рівненський державний гуманітарний університет',
  	"version_recipient_code" varchar DEFAULT '25736989',
  	"version_recipient_bank" varchar DEFAULT 'ДКСУ м. Київ',
  	"version_iban" varchar DEFAULT 'UA278201720313251002201015208',
  	"version_payment_purpose_template" varchar DEFAULT 'за навчання ________ (ПІБ студента) ________, курс ___, факультет ________________',
  	"version_payment_note" varchar DEFAULT 'Перед оплатою уважно перевірте призначення платежу.',
  	"version__status" "enum__tuition_page_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "educational_programs_study_forms" ALTER COLUMN "form" SET DATA TYPE text;
  DROP TYPE "public"."enum_educational_programs_study_forms_form";
  CREATE TYPE "public"."enum_educational_programs_study_forms_form" AS ENUM('full-time', 'part-time');
  ALTER TABLE "educational_programs_study_forms" ALTER COLUMN "form" SET DATA TYPE "public"."enum_educational_programs_study_forms_form" USING "form"::"public"."enum_educational_programs_study_forms_form";
  ALTER TABLE "_educational_programs_v_version_study_forms" ALTER COLUMN "form" SET DATA TYPE text;
  DROP TYPE "public"."enum__educational_programs_v_version_study_forms_form";
  CREATE TYPE "public"."enum__educational_programs_v_version_study_forms_form" AS ENUM('full-time', 'part-time');
  ALTER TABLE "_educational_programs_v_version_study_forms" ALTER COLUMN "form" SET DATA TYPE "public"."enum__educational_programs_v_version_study_forms_form" USING "form"::"public"."enum__educational_programs_v_version_study_forms_form";
  ALTER TABLE "tuition_rates" ALTER COLUMN "study_form" SET DATA TYPE text;
  DROP TYPE "public"."enum_tuition_rates_study_form";
  CREATE TYPE "public"."enum_tuition_rates_study_form" AS ENUM('full-time', 'part-time');
  ALTER TABLE "tuition_rates" ALTER COLUMN "study_form" SET DATA TYPE "public"."enum_tuition_rates_study_form" USING "study_form"::"public"."enum_tuition_rates_study_form";
  ALTER TABLE "_tuition_rates_v" ALTER COLUMN "version_study_form" SET DATA TYPE text;
  DROP TYPE "public"."enum__tuition_rates_v_version_study_form";
  CREATE TYPE "public"."enum__tuition_rates_v_version_study_form" AS ENUM('full-time', 'part-time');
  ALTER TABLE "_tuition_rates_v" ALTER COLUMN "version_study_form" SET DATA TYPE "public"."enum__tuition_rates_v_version_study_form" USING "version_study_form"::"public"."enum__tuition_rates_v_version_study_form";
  ALTER TABLE "tuition_rates" ALTER COLUMN "academic_year" SET DEFAULT '2026/2027';
  ALTER TABLE "_tuition_rates_v" ALTER COLUMN "version_academic_year" SET DEFAULT '2026/2027';
  ALTER TABLE "tuition_rates" ADD COLUMN "admin_title" varchar;
  ALTER TABLE "_tuition_rates_v" ADD COLUMN "version_admin_title" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "admission_campaigns_id" integer;
  ALTER TABLE "admission_campaigns" ADD CONSTRAINT "admission_campaigns_educational_program_id_educational_programs_id_fk" FOREIGN KEY ("educational_program_id") REFERENCES "public"."educational_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_admission_campaigns_v" ADD CONSTRAINT "_admission_campaigns_v_parent_id_admission_campaigns_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."admission_campaigns"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_admission_campaigns_v" ADD CONSTRAINT "_admission_campaigns_v_version_educational_program_id_educational_programs_id_fk" FOREIGN KEY ("version_educational_program_id") REFERENCES "public"."educational_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "spec_settings_groups_specialty_codes" ADD CONSTRAINT "spec_settings_groups_specialty_codes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spec_settings_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spec_settings_groups" ADD CONSTRAINT "spec_settings_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spec_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "spec_settings_applicant_resources" ADD CONSTRAINT "spec_settings_applicant_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "spec_settings_applicant_resources" ADD CONSTRAINT "spec_settings_applicant_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spec_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spec_settings_v_version_groups_specialty_codes" ADD CONSTRAINT "_spec_settings_v_version_groups_specialty_codes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spec_settings_v_version_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spec_settings_v_version_groups" ADD CONSTRAINT "_spec_settings_v_version_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spec_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_spec_settings_v_version_applicant_resources" ADD CONSTRAINT "_spec_settings_v_version_applicant_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_spec_settings_v_version_applicant_resources" ADD CONSTRAINT "_spec_settings_v_version_applicant_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_spec_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tuition_page_settings" ADD CONSTRAINT "tuition_page_settings_official_document_file_id_media_id_fk" FOREIGN KEY ("official_document_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tuition_page_settings_v" ADD CONSTRAINT "_tuition_page_settings_v_version_official_document_file_id_media_id_fk" FOREIGN KEY ("version_official_document_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "admission_campaigns_admin_title_idx" ON "admission_campaigns" USING btree ("admin_title");
  CREATE INDEX "admission_campaigns_educational_program_idx" ON "admission_campaigns" USING btree ("educational_program_id");
  CREATE INDEX "admission_campaigns_campaign_year_idx" ON "admission_campaigns" USING btree ("campaign_year");
  CREATE INDEX "admission_campaigns_study_form_idx" ON "admission_campaigns" USING btree ("study_form");
  CREATE INDEX "admission_campaigns_updated_at_idx" ON "admission_campaigns" USING btree ("updated_at");
  CREATE INDEX "admission_campaigns_created_at_idx" ON "admission_campaigns" USING btree ("created_at");
  CREATE INDEX "admission_campaigns__status_idx" ON "admission_campaigns" USING btree ("_status");
  CREATE UNIQUE INDEX "campaignYear_educationalProgram_studyForm_idx" ON "admission_campaigns" USING btree ("campaign_year","educational_program_id","study_form");
  CREATE INDEX "_admission_campaigns_v_parent_idx" ON "_admission_campaigns_v" USING btree ("parent_id");
  CREATE INDEX "_admission_campaigns_v_version_version_admin_title_idx" ON "_admission_campaigns_v" USING btree ("version_admin_title");
  CREATE INDEX "_admission_campaigns_v_version_version_educational_progr_idx" ON "_admission_campaigns_v" USING btree ("version_educational_program_id");
  CREATE INDEX "_admission_campaigns_v_version_version_campaign_year_idx" ON "_admission_campaigns_v" USING btree ("version_campaign_year");
  CREATE INDEX "_admission_campaigns_v_version_version_study_form_idx" ON "_admission_campaigns_v" USING btree ("version_study_form");
  CREATE INDEX "_admission_campaigns_v_version_version_updated_at_idx" ON "_admission_campaigns_v" USING btree ("version_updated_at");
  CREATE INDEX "_admission_campaigns_v_version_version_created_at_idx" ON "_admission_campaigns_v" USING btree ("version_created_at");
  CREATE INDEX "_admission_campaigns_v_version_version__status_idx" ON "_admission_campaigns_v" USING btree ("version__status");
  CREATE INDEX "_admission_campaigns_v_created_at_idx" ON "_admission_campaigns_v" USING btree ("created_at");
  CREATE INDEX "_admission_campaigns_v_updated_at_idx" ON "_admission_campaigns_v" USING btree ("updated_at");
  CREATE INDEX "_admission_campaigns_v_latest_idx" ON "_admission_campaigns_v" USING btree ("latest");
  CREATE INDEX "compound_index_idx" ON "_admission_campaigns_v" USING btree ("version_campaign_year","version_educational_program_id","version_study_form");
  CREATE INDEX "spec_settings_groups_specialty_codes_order_idx" ON "spec_settings_groups_specialty_codes" USING btree ("_order");
  CREATE INDEX "spec_settings_groups_specialty_codes_parent_id_idx" ON "spec_settings_groups_specialty_codes" USING btree ("_parent_id");
  CREATE INDEX "spec_settings_groups_order_idx" ON "spec_settings_groups" USING btree ("_order");
  CREATE INDEX "spec_settings_groups_parent_id_idx" ON "spec_settings_groups" USING btree ("_parent_id");
  CREATE INDEX "spec_settings_applicant_resources_order_idx" ON "spec_settings_applicant_resources" USING btree ("_order");
  CREATE INDEX "spec_settings_applicant_resources_parent_id_idx" ON "spec_settings_applicant_resources" USING btree ("_parent_id");
  CREATE INDEX "spec_settings_applicant_resources_file_idx" ON "spec_settings_applicant_resources" USING btree ("file_id");
  CREATE INDEX "spec_settings__status_idx" ON "spec_settings" USING btree ("_status");
  CREATE INDEX "_spec_settings_v_version_groups_specialty_codes_order_idx" ON "_spec_settings_v_version_groups_specialty_codes" USING btree ("_order");
  CREATE INDEX "_spec_settings_v_version_groups_specialty_codes_parent_id_idx" ON "_spec_settings_v_version_groups_specialty_codes" USING btree ("_parent_id");
  CREATE INDEX "_spec_settings_v_version_groups_order_idx" ON "_spec_settings_v_version_groups" USING btree ("_order");
  CREATE INDEX "_spec_settings_v_version_groups_parent_id_idx" ON "_spec_settings_v_version_groups" USING btree ("_parent_id");
  CREATE INDEX "_spec_settings_v_version_applicant_resources_order_idx" ON "_spec_settings_v_version_applicant_resources" USING btree ("_order");
  CREATE INDEX "_spec_settings_v_version_applicant_resources_parent_id_idx" ON "_spec_settings_v_version_applicant_resources" USING btree ("_parent_id");
  CREATE INDEX "_spec_settings_v_version_applicant_resources_file_idx" ON "_spec_settings_v_version_applicant_resources" USING btree ("file_id");
  CREATE INDEX "_spec_settings_v_version_version__status_idx" ON "_spec_settings_v" USING btree ("version__status");
  CREATE INDEX "_spec_settings_v_created_at_idx" ON "_spec_settings_v" USING btree ("created_at");
  CREATE INDEX "_spec_settings_v_updated_at_idx" ON "_spec_settings_v" USING btree ("updated_at");
  CREATE INDEX "_spec_settings_v_latest_idx" ON "_spec_settings_v" USING btree ("latest");
  CREATE INDEX "tuition_page_settings_official_document_file_idx" ON "tuition_page_settings" USING btree ("official_document_file_id");
  CREATE INDEX "tuition_page_settings__status_idx" ON "tuition_page_settings" USING btree ("_status");
  CREATE INDEX "_tuition_page_settings_v_version_version_official_docume_idx" ON "_tuition_page_settings_v" USING btree ("version_official_document_file_id");
  CREATE INDEX "_tuition_page_settings_v_version_version__status_idx" ON "_tuition_page_settings_v" USING btree ("version__status");
  CREATE INDEX "_tuition_page_settings_v_created_at_idx" ON "_tuition_page_settings_v" USING btree ("created_at");
  CREATE INDEX "_tuition_page_settings_v_updated_at_idx" ON "_tuition_page_settings_v" USING btree ("updated_at");
  CREATE INDEX "_tuition_page_settings_v_latest_idx" ON "_tuition_page_settings_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admission_campaigns_fk" FOREIGN KEY ("admission_campaigns_id") REFERENCES "public"."admission_campaigns"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "specialtyCode_educationLevel_idx" ON "educational_programs" USING btree ("specialty_code","education_level");
  CREATE INDEX "version_specialtyCode_version_educationLevel_idx" ON "_educational_programs_v" USING btree ("version_specialty_code","version_education_level");
  CREATE INDEX "tuition_rates_admin_title_idx" ON "tuition_rates" USING btree ("admin_title");
  CREATE INDEX "tuition_rates_study_form_idx" ON "tuition_rates" USING btree ("study_form");
  CREATE UNIQUE INDEX "academicYear_educationalProgram_studyForm_idx" ON "tuition_rates" USING btree ("academic_year","educational_program_id","study_form");
  CREATE INDEX "_tuition_rates_v_version_version_admin_title_idx" ON "_tuition_rates_v" USING btree ("version_admin_title");
  CREATE INDEX "_tuition_rates_v_version_version_study_form_idx" ON "_tuition_rates_v" USING btree ("version_study_form");
  CREATE INDEX "compound_index_1_idx" ON "_tuition_rates_v" USING btree ("version_academic_year","version_educational_program_id","version_study_form");
  CREATE INDEX "payload_locked_documents_rels_admission_campaigns_id_idx" ON "payload_locked_documents_rels" USING btree ("admission_campaigns_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_educational_programs_study_forms_form" ADD VALUE 'dual';
  ALTER TYPE "public"."enum__educational_programs_v_version_study_forms_form" ADD VALUE 'dual';
  ALTER TYPE "public"."enum_tuition_rates_study_form" ADD VALUE 'dual';
  ALTER TYPE "public"."enum__tuition_rates_v_version_study_form" ADD VALUE 'dual';
  ALTER TABLE "admission_campaigns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_admission_campaigns_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spec_settings_groups_specialty_codes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spec_settings_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spec_settings_applicant_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "spec_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spec_settings_v_version_groups_specialty_codes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spec_settings_v_version_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spec_settings_v_version_applicant_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_spec_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tuition_page_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tuition_page_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_admission_campaigns_fk";
  DROP INDEX "payload_locked_documents_rels_admission_campaigns_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "admission_campaigns_id";
  DROP TABLE "admission_campaigns" CASCADE;
  DROP TABLE "_admission_campaigns_v" CASCADE;
  DROP TABLE "spec_settings_groups_specialty_codes" CASCADE;
  DROP TABLE "spec_settings_groups" CASCADE;
  DROP TABLE "spec_settings_applicant_resources" CASCADE;
  DROP TABLE "spec_settings" CASCADE;
  DROP TABLE "_spec_settings_v_version_groups_specialty_codes" CASCADE;
  DROP TABLE "_spec_settings_v_version_groups" CASCADE;
  DROP TABLE "_spec_settings_v_version_applicant_resources" CASCADE;
  DROP TABLE "_spec_settings_v" CASCADE;
  DROP TABLE "tuition_page_settings" CASCADE;
  DROP TABLE "_tuition_page_settings_v" CASCADE;

  DROP INDEX "specialtyCode_educationLevel_idx";
  DROP INDEX "version_specialtyCode_version_educationLevel_idx";
  DROP INDEX "tuition_rates_admin_title_idx";
  DROP INDEX "tuition_rates_study_form_idx";
  DROP INDEX "academicYear_educationalProgram_studyForm_idx";
  DROP INDEX "_tuition_rates_v_version_version_admin_title_idx";
  DROP INDEX "_tuition_rates_v_version_version_study_form_idx";
  DROP INDEX "compound_index_1_idx";
  ALTER TABLE "tuition_rates" ALTER COLUMN "academic_year" DROP DEFAULT;
  ALTER TABLE "_tuition_rates_v" ALTER COLUMN "version_academic_year" DROP DEFAULT;
  ALTER TABLE "tuition_rates" DROP COLUMN "admin_title";
  ALTER TABLE "_tuition_rates_v" DROP COLUMN "version_admin_title";
  DROP TYPE "public"."enum_admission_campaigns_study_form";
  DROP TYPE "public"."enum_admission_campaigns_status";
  DROP TYPE "public"."enum__admission_campaigns_v_version_study_form";
  DROP TYPE "public"."enum__admission_campaigns_v_version_status";
  DROP TYPE "public"."enum_spec_resource_destination";
  DROP TYPE "public"."enum_spec_settings_status";
  DROP TYPE "public"."enum__spec_settings_v_version_status";
  DROP TYPE "public"."enum_tuition_page_settings_status";
  DROP TYPE "public"."enum__tuition_page_settings_v_version_status";`)
}
