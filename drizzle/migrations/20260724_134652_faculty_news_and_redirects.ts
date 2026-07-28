import { sql } from '@payloadcms/db-postgres'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_faculty_news_tags" AS ENUM('accreditation', 'international', 'scholarships', 'grants', 'science', 'education', 'events', 'achievements', 'partnership', 'career-guidance', 'holidays', 'culture', 'sports', 'announcements', 'it', 'mathematics', 'career');
  CREATE TYPE "public"."enum_faculty_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faculty_news_v_version_tags" AS ENUM('accreditation', 'international', 'scholarships', 'grants', 'science', 'education', 'events', 'achievements', 'partnership', 'career-guidance', 'holidays', 'culture', 'sports', 'announcements', 'it', 'mathematics', 'career');
  CREATE TYPE "public"."enum__faculty_news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference');
  CREATE TABLE "faculty_news_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_faculty_news_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faculty_news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"cover_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"is_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_faculty_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "faculty_news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"departments_id" integer
  );
  
  CREATE TABLE "_faculty_news_v_version_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__faculty_news_v_version_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_faculty_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_cover_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_is_pinned" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faculty_news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_faculty_news_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"departments_id" integer
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faculty_news_id" integer
  );
  
  ALTER TABLE "media" ADD COLUMN "sizes_news_card_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_news_card_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_news_card_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_news_card_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_news_card_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_news_card_filename" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faculty_news_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "redirects_id" integer;
  ALTER TABLE "faculty_news_tags" ADD CONSTRAINT "faculty_news_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faculty_news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faculty_news" ADD CONSTRAINT "faculty_news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faculty_news_rels" ADD CONSTRAINT "faculty_news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faculty_news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faculty_news_rels" ADD CONSTRAINT "faculty_news_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faculty_news_v_version_tags" ADD CONSTRAINT "_faculty_news_v_version_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_faculty_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faculty_news_v" ADD CONSTRAINT "_faculty_news_v_parent_id_faculty_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faculty_news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faculty_news_v" ADD CONSTRAINT "_faculty_news_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faculty_news_v_rels" ADD CONSTRAINT "_faculty_news_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_faculty_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faculty_news_v_rels" ADD CONSTRAINT "_faculty_news_v_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_faculty_news_fk" FOREIGN KEY ("faculty_news_id") REFERENCES "public"."faculty_news"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "faculty_news_tags_order_idx" ON "faculty_news_tags" USING btree ("order");
  CREATE INDEX "faculty_news_tags_parent_idx" ON "faculty_news_tags" USING btree ("parent_id");
  CREATE UNIQUE INDEX "faculty_news_slug_idx" ON "faculty_news" USING btree ("slug");
  CREATE INDEX "faculty_news_cover_image_idx" ON "faculty_news" USING btree ("cover_image_id");
  CREATE INDEX "faculty_news_published_at_idx" ON "faculty_news" USING btree ("published_at");
  CREATE INDEX "faculty_news_updated_at_idx" ON "faculty_news" USING btree ("updated_at");
  CREATE INDEX "faculty_news_created_at_idx" ON "faculty_news" USING btree ("created_at");
  CREATE INDEX "faculty_news__status_idx" ON "faculty_news" USING btree ("_status");
  CREATE INDEX "faculty_news_rels_order_idx" ON "faculty_news_rels" USING btree ("order");
  CREATE INDEX "faculty_news_rels_parent_idx" ON "faculty_news_rels" USING btree ("parent_id");
  CREATE INDEX "faculty_news_rels_path_idx" ON "faculty_news_rels" USING btree ("path");
  CREATE INDEX "faculty_news_rels_departments_id_idx" ON "faculty_news_rels" USING btree ("departments_id");
  CREATE INDEX "_faculty_news_v_version_tags_order_idx" ON "_faculty_news_v_version_tags" USING btree ("order");
  CREATE INDEX "_faculty_news_v_version_tags_parent_idx" ON "_faculty_news_v_version_tags" USING btree ("parent_id");
  CREATE INDEX "_faculty_news_v_parent_idx" ON "_faculty_news_v" USING btree ("parent_id");
  CREATE INDEX "_faculty_news_v_version_version_slug_idx" ON "_faculty_news_v" USING btree ("version_slug");
  CREATE INDEX "_faculty_news_v_version_version_cover_image_idx" ON "_faculty_news_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_faculty_news_v_version_version_published_at_idx" ON "_faculty_news_v" USING btree ("version_published_at");
  CREATE INDEX "_faculty_news_v_version_version_updated_at_idx" ON "_faculty_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_faculty_news_v_version_version_created_at_idx" ON "_faculty_news_v" USING btree ("version_created_at");
  CREATE INDEX "_faculty_news_v_version_version__status_idx" ON "_faculty_news_v" USING btree ("version__status");
  CREATE INDEX "_faculty_news_v_created_at_idx" ON "_faculty_news_v" USING btree ("created_at");
  CREATE INDEX "_faculty_news_v_updated_at_idx" ON "_faculty_news_v" USING btree ("updated_at");
  CREATE INDEX "_faculty_news_v_latest_idx" ON "_faculty_news_v" USING btree ("latest");
  CREATE INDEX "_faculty_news_v_rels_order_idx" ON "_faculty_news_v_rels" USING btree ("order");
  CREATE INDEX "_faculty_news_v_rels_parent_idx" ON "_faculty_news_v_rels" USING btree ("parent_id");
  CREATE INDEX "_faculty_news_v_rels_path_idx" ON "_faculty_news_v_rels" USING btree ("path");
  CREATE INDEX "_faculty_news_v_rels_departments_id_idx" ON "_faculty_news_v_rels" USING btree ("departments_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_faculty_news_id_idx" ON "redirects_rels" USING btree ("faculty_news_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faculty_news_fk" FOREIGN KEY ("faculty_news_id") REFERENCES "public"."faculty_news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_sizes_news_card_sizes_news_card_filename_idx" ON "media" USING btree ("sizes_news_card_filename");
  CREATE INDEX "payload_locked_documents_rels_faculty_news_id_idx" ON "payload_locked_documents_rels" USING btree ("faculty_news_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "faculty_news_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faculty_news" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faculty_news_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faculty_news_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faculty_news_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faculty_news_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "redirects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "redirects_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faculty_news_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_redirects_fk";
  
  DROP INDEX "media_sizes_news_card_sizes_news_card_filename_idx";
  DROP INDEX "payload_locked_documents_rels_faculty_news_id_idx";
  DROP INDEX "payload_locked_documents_rels_redirects_id_idx";
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "_faculty_news_v_rels" CASCADE;
  DROP TABLE "_faculty_news_v_version_tags" CASCADE;
  DROP TABLE "_faculty_news_v" CASCADE;
  DROP TABLE "faculty_news_rels" CASCADE;
  DROP TABLE "faculty_news_tags" CASCADE;
  DROP TABLE "faculty_news" CASCADE;
  ALTER TABLE "media" DROP COLUMN "sizes_news_card_url";
  ALTER TABLE "media" DROP COLUMN "sizes_news_card_width";
  ALTER TABLE "media" DROP COLUMN "sizes_news_card_height";
  ALTER TABLE "media" DROP COLUMN "sizes_news_card_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_news_card_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_news_card_filename";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faculty_news_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "redirects_id";
  DROP TYPE "public"."enum_faculty_news_tags";
  DROP TYPE "public"."enum_faculty_news_status";
  DROP TYPE "public"."enum__faculty_news_v_version_tags";
  DROP TYPE "public"."enum__faculty_news_v_version_status";
  DROP TYPE "public"."enum_redirects_to_type";`)
}
