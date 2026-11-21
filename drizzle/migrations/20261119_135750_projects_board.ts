import { sql } from '@payloadcms/db-postgres'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_category" AS ENUM('development', 'research', 'education', 'competition', 'volunteering', 'internship', 'other');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_category" AS ENUM('development', 'research', 'education', 'competition', 'volunteering', 'internship', 'other');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_project_proposals_status" AS ENUM('new', 'reviewed');
  CREATE TYPE "public"."enum_project_applications_status" AS ENUM('new', 'reviewed');
  CREATE TABLE "projects_tasks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"spots" numeric
  );
  
  CREATE TABLE "projects_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"summary" varchar,
  	"description" varchar,
  	"category" "enum_projects_category",
  	"recruiting" boolean DEFAULT false,
  	"deadline" varchar,
  	"published_at" timestamp(3) with time zone,
  	"publisher_id" integer,
  	"source_proposal_id" integer,
  	"initiator_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_projects_v_version_tasks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"spots" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_description" varchar,
  	"version_category" "enum__projects_v_version_category",
  	"version_recruiting" boolean DEFAULT false,
  	"version_deadline" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_publisher_id" integer,
  	"version_source_proposal_id" integer,
  	"version_initiator_name" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "project_proposals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"looking_for" varchar,
  	"show_initiator_name" boolean DEFAULT false NOT NULL,
  	"status" "enum_project_proposals_status" DEFAULT 'new' NOT NULL,
  	"project_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "project_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer NOT NULL,
  	"publisher_id" integer,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"message" varchar,
  	"role_title" varchar,
  	"status" "enum_project_applications_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "projects_tasks" ADD CONSTRAINT "projects_tasks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_roles" ADD CONSTRAINT "projects_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_skills" ADD CONSTRAINT "projects_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_publisher_id_users_id_fk" FOREIGN KEY ("publisher_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_source_proposal_id_project_proposals_id_fk" FOREIGN KEY ("source_proposal_id") REFERENCES "public"."project_proposals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_tasks" ADD CONSTRAINT "_projects_v_version_tasks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_roles" ADD CONSTRAINT "_projects_v_version_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_skills" ADD CONSTRAINT "_projects_v_version_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_links" ADD CONSTRAINT "_projects_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_publisher_id_users_id_fk" FOREIGN KEY ("version_publisher_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_source_proposal_id_project_proposals_id_fk" FOREIGN KEY ("version_source_proposal_id") REFERENCES "public"."project_proposals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "project_proposals" ADD CONSTRAINT "project_proposals_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "project_applications" ADD CONSTRAINT "project_applications_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "project_applications" ADD CONSTRAINT "project_applications_publisher_id_users_id_fk" FOREIGN KEY ("publisher_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "projects_tasks_order_idx" ON "projects_tasks" USING btree ("_order");
  CREATE INDEX "projects_tasks_parent_id_idx" ON "projects_tasks" USING btree ("_parent_id");
  CREATE INDEX "projects_roles_order_idx" ON "projects_roles" USING btree ("_order");
  CREATE INDEX "projects_roles_parent_id_idx" ON "projects_roles" USING btree ("_parent_id");
  CREATE INDEX "projects_skills_order_idx" ON "projects_skills" USING btree ("_order");
  CREATE INDEX "projects_skills_parent_id_idx" ON "projects_skills" USING btree ("_parent_id");
  CREATE INDEX "projects_links_order_idx" ON "projects_links" USING btree ("_order");
  CREATE INDEX "projects_links_parent_id_idx" ON "projects_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_published_at_idx" ON "projects" USING btree ("published_at");
  CREATE INDEX "projects_publisher_idx" ON "projects" USING btree ("publisher_id");
  CREATE UNIQUE INDEX "projects_source_proposal_idx" ON "projects" USING btree ("source_proposal_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "_projects_v_version_tasks_order_idx" ON "_projects_v_version_tasks" USING btree ("_order");
  CREATE INDEX "_projects_v_version_tasks_parent_id_idx" ON "_projects_v_version_tasks" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_roles_order_idx" ON "_projects_v_version_roles" USING btree ("_order");
  CREATE INDEX "_projects_v_version_roles_parent_id_idx" ON "_projects_v_version_roles" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_skills_order_idx" ON "_projects_v_version_skills" USING btree ("_order");
  CREATE INDEX "_projects_v_version_skills_parent_id_idx" ON "_projects_v_version_skills" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_links_order_idx" ON "_projects_v_version_links" USING btree ("_order");
  CREATE INDEX "_projects_v_version_links_parent_id_idx" ON "_projects_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_published_at_idx" ON "_projects_v" USING btree ("version_published_at");
  CREATE INDEX "_projects_v_version_version_publisher_idx" ON "_projects_v" USING btree ("version_publisher_id");
  CREATE INDEX "_projects_v_version_version_source_proposal_idx" ON "_projects_v" USING btree ("version_source_proposal_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "project_proposals_project_idx" ON "project_proposals" USING btree ("project_id");
  CREATE INDEX "project_proposals_updated_at_idx" ON "project_proposals" USING btree ("updated_at");
  CREATE INDEX "project_proposals_created_at_idx" ON "project_proposals" USING btree ("created_at");
  CREATE INDEX "project_applications_project_idx" ON "project_applications" USING btree ("project_id");
  CREATE INDEX "project_applications_publisher_idx" ON "project_applications" USING btree ("publisher_id");
  CREATE INDEX "project_applications_updated_at_idx" ON "project_applications" USING btree ("updated_at");
  CREATE INDEX "project_applications_created_at_idx" ON "project_applications" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "projects_id";
  DROP TABLE "projects_tasks", "projects_roles", "projects_skills", "projects_links", "projects",
    "_projects_v_version_tasks", "_projects_v_version_roles", "_projects_v_version_skills",
    "_projects_v_version_links", "_projects_v", "project_proposals", "project_applications";
  DROP TYPE "public"."enum_projects_category";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_category";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_project_proposals_status";
  DROP TYPE "public"."enum_project_applications_status";`)
}
