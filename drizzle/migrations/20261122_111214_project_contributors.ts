import { sql } from '@payloadcms/db-postgres'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_project_contributors_source" AS ENUM('project', 'github', 'both');
  CREATE TYPE "public"."enum_project_contributors_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__project_contributors_v_version_source" AS ENUM('project', 'github', 'both');
  CREATE TYPE "public"."enum__project_contributors_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "project_contributors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"source" "enum_project_contributors_source" DEFAULT 'project',
  	"project_id" integer,
  	"github_id" numeric,
  	"github_avatar_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_project_contributors_status" DEFAULT 'draft'
  );

  CREATE TABLE "_project_contributors_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_source" "enum__project_contributors_v_version_source" DEFAULT 'project',
  	"version_project_id" integer,
  	"version_github_id" numeric,
  	"version_github_avatar_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__project_contributors_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "project_contributors_id" integer;
  ALTER TABLE "project_contributors" ADD CONSTRAINT "project_contributors_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_project_contributors_v" ADD CONSTRAINT "_project_contributors_v_parent_id_project_contributors_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."project_contributors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_project_contributors_v" ADD CONSTRAINT "_project_contributors_v_version_project_id_projects_id_fk" FOREIGN KEY ("version_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "project_contributors_project_idx" ON "project_contributors" USING btree ("project_id");
  CREATE UNIQUE INDEX "project_contributors_github_id_idx" ON "project_contributors" USING btree ("github_id");
  CREATE INDEX "project_contributors_updated_at_idx" ON "project_contributors" USING btree ("updated_at");
  CREATE INDEX "project_contributors_created_at_idx" ON "project_contributors" USING btree ("created_at");
  CREATE INDEX "project_contributors__status_idx" ON "project_contributors" USING btree ("_status");
  CREATE INDEX "_project_contributors_v_parent_idx" ON "_project_contributors_v" USING btree ("parent_id");
  CREATE INDEX "_project_contributors_v_version_version_project_idx" ON "_project_contributors_v" USING btree ("version_project_id");
  CREATE INDEX "_project_contributors_v_version_version_github_id_idx" ON "_project_contributors_v" USING btree ("version_github_id");
  CREATE INDEX "_project_contributors_v_version_version_updated_at_idx" ON "_project_contributors_v" USING btree ("version_updated_at");
  CREATE INDEX "_project_contributors_v_version_version_created_at_idx" ON "_project_contributors_v" USING btree ("version_created_at");
  CREATE INDEX "_project_contributors_v_version_version__status_idx" ON "_project_contributors_v" USING btree ("version__status");
  CREATE INDEX "_project_contributors_v_created_at_idx" ON "_project_contributors_v" USING btree ("created_at");
  CREATE INDEX "_project_contributors_v_updated_at_idx" ON "_project_contributors_v" USING btree ("updated_at");
  CREATE INDEX "_project_contributors_v_latest_idx" ON "_project_contributors_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_contributors_fk" FOREIGN KEY ("project_contributors_id") REFERENCES "public"."project_contributors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_project_contributors_id_idx" ON "payload_locked_documents_rels" USING btree ("project_contributors_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "project_contributors_id";
  DROP TABLE "_project_contributors_v";
  DROP TABLE "project_contributors";
  DROP TYPE "public"."enum_project_contributors_source";
  DROP TYPE "public"."enum_project_contributors_status";
  DROP TYPE "public"."enum__project_contributors_v_version_source";
  DROP TYPE "public"."enum__project_contributors_v_version_status";`)
}
