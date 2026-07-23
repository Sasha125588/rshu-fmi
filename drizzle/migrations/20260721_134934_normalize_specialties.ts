import { sql } from '@payloadcms/db-postgres'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_specialties_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum__specialties_v_version_status" AS ENUM('draft', 'published');

    CREATE TABLE "specialties_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    );

    CREATE TABLE "specialties" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "code" varchar,
      "legacy_code" varchar,
      "description" varchar,
      "is_featured" boolean DEFAULT false,
      "sort_order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_specialties_status" DEFAULT 'draft'
    );

    CREATE TABLE "_specialties_v_version_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE "_specialties_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_title" varchar,
      "version_code" varchar,
      "version_legacy_code" varchar,
      "version_description" varchar,
      "version_is_featured" boolean DEFAULT false,
      "version_sort_order" numeric DEFAULT 0,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__specialties_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean
    );

    CREATE TABLE "spec_settings_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "specialties_id" integer
    );

    CREATE TABLE "_spec_settings_v_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "specialties_id" integer
    );

    ALTER TABLE "educational_programs" ADD COLUMN "specialty_id" integer;
    ALTER TABLE "_educational_programs_v" ADD COLUMN "version_specialty_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "specialties_id" integer;

    ALTER TABLE "specialties_tags"
      ADD CONSTRAINT "specialties_tags_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."specialties"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_specialties_v_version_tags"
      ADD CONSTRAINT "_specialties_v_version_tags_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_specialties_v"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_specialties_v"
      ADD CONSTRAINT "_specialties_v_parent_id_specialties_id_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."specialties"("id")
      ON DELETE set null ON UPDATE no action;
    ALTER TABLE "spec_settings_rels"
      ADD CONSTRAINT "spec_settings_rels_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."spec_settings"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "spec_settings_rels"
      ADD CONSTRAINT "spec_settings_rels_specialties_fk"
      FOREIGN KEY ("specialties_id") REFERENCES "public"."specialties"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_spec_settings_v_rels"
      ADD CONSTRAINT "_spec_settings_v_rels_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."_spec_settings_v"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_spec_settings_v_rels"
      ADD CONSTRAINT "_spec_settings_v_rels_specialties_fk"
      FOREIGN KEY ("specialties_id") REFERENCES "public"."specialties"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "educational_programs"
      ADD CONSTRAINT "educational_programs_specialty_id_specialties_id_fk"
      FOREIGN KEY ("specialty_id") REFERENCES "public"."specialties"("id")
      ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_educational_programs_v"
      ADD CONSTRAINT "_educational_programs_v_version_specialty_id_specialties_id_fk"
      FOREIGN KEY ("version_specialty_id") REFERENCES "public"."specialties"("id")
      ON DELETE set null ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_specialties_fk"
      FOREIGN KEY ("specialties_id") REFERENCES "public"."specialties"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "specialties_tags_order_idx" ON "specialties_tags" USING btree ("_order");
    CREATE INDEX "specialties_tags_parent_id_idx" ON "specialties_tags" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "specialties_code_idx" ON "specialties" USING btree ("code");
    CREATE INDEX "specialties_legacy_code_idx" ON "specialties" USING btree ("legacy_code");
    CREATE INDEX "specialties_updated_at_idx" ON "specialties" USING btree ("updated_at");
    CREATE INDEX "specialties_created_at_idx" ON "specialties" USING btree ("created_at");
    CREATE INDEX "specialties__status_idx" ON "specialties" USING btree ("_status");
    CREATE INDEX "_specialties_v_version_tags_order_idx" ON "_specialties_v_version_tags" USING btree ("_order");
    CREATE INDEX "_specialties_v_version_tags_parent_id_idx" ON "_specialties_v_version_tags" USING btree ("_parent_id");
    CREATE INDEX "_specialties_v_parent_idx" ON "_specialties_v" USING btree ("parent_id");
    CREATE INDEX "_specialties_v_version_version_code_idx" ON "_specialties_v" USING btree ("version_code");
    CREATE INDEX "_specialties_v_version_version_legacy_code_idx" ON "_specialties_v" USING btree ("version_legacy_code");
    CREATE INDEX "_specialties_v_version_version_updated_at_idx" ON "_specialties_v" USING btree ("version_updated_at");
    CREATE INDEX "_specialties_v_version_version_created_at_idx" ON "_specialties_v" USING btree ("version_created_at");
    CREATE INDEX "_specialties_v_version_version__status_idx" ON "_specialties_v" USING btree ("version__status");
    CREATE INDEX "_specialties_v_created_at_idx" ON "_specialties_v" USING btree ("created_at");
    CREATE INDEX "_specialties_v_updated_at_idx" ON "_specialties_v" USING btree ("updated_at");
    CREATE INDEX "_specialties_v_latest_idx" ON "_specialties_v" USING btree ("latest");
    CREATE INDEX "spec_settings_rels_order_idx" ON "spec_settings_rels" USING btree ("order");
    CREATE INDEX "spec_settings_rels_parent_idx" ON "spec_settings_rels" USING btree ("parent_id");
    CREATE INDEX "spec_settings_rels_path_idx" ON "spec_settings_rels" USING btree ("path");
    CREATE INDEX "spec_settings_rels_specialties_id_idx" ON "spec_settings_rels" USING btree ("specialties_id");
    CREATE INDEX "_spec_settings_v_rels_order_idx" ON "_spec_settings_v_rels" USING btree ("order");
    CREATE INDEX "_spec_settings_v_rels_parent_idx" ON "_spec_settings_v_rels" USING btree ("parent_id");
    CREATE INDEX "_spec_settings_v_rels_path_idx" ON "_spec_settings_v_rels" USING btree ("path");
    CREATE INDEX "_spec_settings_v_rels_specialties_id_idx" ON "_spec_settings_v_rels" USING btree ("specialties_id");
    CREATE INDEX "educational_programs_specialty_idx" ON "educational_programs" USING btree ("specialty_id");
    CREATE INDEX "_educational_programs_v_version_version_specialty_idx" ON "_educational_programs_v" USING btree ("version_specialty_id");
    CREATE INDEX "payload_locked_documents_rels_specialties_id_idx" ON "payload_locked_documents_rels" USING btree ("specialties_id");

    WITH ranked_programs AS (
      SELECT
        ep.*,
        CASE
          WHEN left(ep.specialty_code, 1) = 'А' THEN 'A' || substring(ep.specialty_code FROM 2)
          ELSE ep.specialty_code
        END AS normalized_code,
        row_number() OVER (
          PARTITION BY CASE
            WHEN left(ep.specialty_code, 1) = 'А' THEN 'A' || substring(ep.specialty_code FROM 2)
            ELSE ep.specialty_code
          END
          ORDER BY CASE ep.education_level WHEN 'bachelor' THEN 0 ELSE 1 END, ep.id
        ) AS specialty_rank
      FROM educational_programs ep
    ), selected_programs AS (
      SELECT * FROM ranked_programs WHERE specialty_rank = 1
    )
    INSERT INTO specialties (
      title,
      code,
      legacy_code,
      description,
      is_featured,
      sort_order,
      updated_at,
      created_at,
      _status
    )
    SELECT
      specialty_name,
      normalized_code,
      legacy_specialty_code,
      COALESCE(description, ''),
      COALESCE(is_featured, false),
      row_number() OVER (ORDER BY id) * 10,
      updated_at,
      created_at,
      COALESCE(_status::text, 'draft')::enum_specialties_status
    FROM selected_programs
    ORDER BY id;

    WITH ranked_programs AS (
      SELECT
        ep.id,
        CASE
          WHEN left(ep.specialty_code, 1) = 'А' THEN 'A' || substring(ep.specialty_code FROM 2)
          ELSE ep.specialty_code
        END AS normalized_code,
        row_number() OVER (
          PARTITION BY CASE
            WHEN left(ep.specialty_code, 1) = 'А' THEN 'A' || substring(ep.specialty_code FROM 2)
            ELSE ep.specialty_code
          END
          ORDER BY CASE ep.education_level WHEN 'bachelor' THEN 0 ELSE 1 END, ep.id
        ) AS specialty_rank
      FROM educational_programs ep
    )
    INSERT INTO specialties_tags (_order, _parent_id, id, label)
    SELECT tags._order, specialties.id, tags.id, tags.label
    FROM ranked_programs
    JOIN specialties ON specialties.code = ranked_programs.normalized_code
    JOIN educational_programs_tags tags ON tags._parent_id = ranked_programs.id
    WHERE ranked_programs.specialty_rank = 1;

    INSERT INTO _specialties_v (
      parent_id,
      version_title,
      version_code,
      version_legacy_code,
      version_description,
      version_is_featured,
      version_sort_order,
      version_updated_at,
      version_created_at,
      version__status,
      created_at,
      updated_at,
      latest
    )
    SELECT
      id,
      title,
      code,
      legacy_code,
      description,
      is_featured,
      sort_order,
      updated_at,
      created_at,
      COALESCE(_status::text, 'draft')::enum__specialties_v_version_status,
      now(),
      now(),
      true
    FROM specialties;

    INSERT INTO _specialties_v_version_tags (_order, _parent_id, label, _uuid)
    SELECT tags._order, specialty_versions.id, tags.label, tags.id
    FROM specialties_tags tags
    JOIN _specialties_v specialty_versions
      ON specialty_versions.parent_id = tags._parent_id
      AND specialty_versions.latest = true;

    UPDATE educational_programs programs
    SET specialty_id = specialties.id
    FROM specialties
    WHERE specialties.code = CASE
      WHEN left(programs.specialty_code, 1) = 'А' THEN 'A' || substring(programs.specialty_code FROM 2)
      ELSE programs.specialty_code
    END;

    UPDATE _educational_programs_v versions
    SET version_specialty_id = specialties.id
    FROM specialties
    WHERE specialties.code = CASE
      WHEN left(versions.version_specialty_code, 1) = 'А' THEN 'A' || substring(versions.version_specialty_code FROM 2)
      ELSE versions.version_specialty_code
    END;

    UPDATE educational_programs
    SET sort_order = CASE education_level WHEN 'bachelor' THEN 10 ELSE 20 END
    WHERE COALESCE(sort_order, 0) = 0;

    UPDATE _educational_programs_v
    SET version_sort_order = CASE version_education_level WHEN 'bachelor' THEN 10 ELSE 20 END
    WHERE COALESCE(version_sort_order, 0) = 0;

    INSERT INTO spec_settings_rels ("order", parent_id, path, specialties_id)
    SELECT
      codes._order,
      groups._parent_id,
      'groups.' || (groups._order - 1) || '.specialties',
      specialties.id
    FROM spec_settings_groups_specialty_codes codes
    JOIN spec_settings_groups groups ON groups.id = codes._parent_id
    JOIN specialties ON specialties.code = CASE
      WHEN left(codes.code, 1) = 'А' THEN 'A' || substring(codes.code FROM 2)
      ELSE codes.code
    END;

    INSERT INTO _spec_settings_v_rels ("order", parent_id, path, specialties_id)
    SELECT
      codes._order,
      groups._parent_id,
      'groups.' || (groups._order - 1) || '.specialties',
      specialties.id
    FROM _spec_settings_v_version_groups_specialty_codes codes
    JOIN _spec_settings_v_version_groups groups ON groups.id = codes._parent_id
    JOIN specialties ON specialties.code = CASE
      WHEN left(codes.code, 1) = 'А' THEN 'A' || substring(codes.code FROM 2)
      ELSE codes.code
    END;

    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM educational_programs WHERE specialty_id IS NULL) THEN
        RAISE EXCEPTION 'normalize_specialties: an educational program could not be linked to a specialty';
      END IF;

      IF EXISTS (
        SELECT 1
        FROM spec_settings_groups_specialty_codes codes
        LEFT JOIN specialties ON specialties.code = CASE
          WHEN left(codes.code, 1) = 'А' THEN 'A' || substring(codes.code FROM 2)
          ELSE codes.code
        END
        WHERE specialties.id IS NULL
      ) THEN
        RAISE EXCEPTION 'normalize_specialties: a configured specialty code could not be resolved';
      END IF;

      IF (SELECT count(*) FROM spec_settings_groups_specialty_codes)
        <> (SELECT count(*) FROM spec_settings_rels) THEN
        RAISE EXCEPTION 'normalize_specialties: not all current catalog relationships were migrated';
      END IF;
    END
    $$;

    DROP TABLE "educational_programs_tags" CASCADE;
    DROP TABLE "_educational_programs_v_version_tags" CASCADE;
    DROP TABLE "spec_settings_groups_specialty_codes" CASCADE;
    DROP TABLE "_spec_settings_v_version_groups_specialty_codes" CASCADE;

    DROP INDEX "educational_programs_specialty_code_idx";
    DROP INDEX "educational_programs_legacy_specialty_code_idx";
    DROP INDEX "specialtyCode_educationLevel_idx";
    DROP INDEX "_educational_programs_v_version_version_specialty_code_idx";
    DROP INDEX "_educational_programs_v_version_version_legacy_specialty_idx";
    DROP INDEX "version_specialtyCode_version_educationLevel_idx";

    ALTER TABLE "educational_programs" DROP COLUMN "specialty_code";
    ALTER TABLE "educational_programs" DROP COLUMN "legacy_specialty_code";
    ALTER TABLE "educational_programs" DROP COLUMN "specialty_name";
    ALTER TABLE "educational_programs" DROP COLUMN "is_featured";
    ALTER TABLE "educational_programs" DROP COLUMN "description";
    ALTER TABLE "_educational_programs_v" DROP COLUMN "version_specialty_code";
    ALTER TABLE "_educational_programs_v" DROP COLUMN "version_legacy_specialty_code";
    ALTER TABLE "_educational_programs_v" DROP COLUMN "version_specialty_name";
    ALTER TABLE "_educational_programs_v" DROP COLUMN "version_is_featured";
    ALTER TABLE "_educational_programs_v" DROP COLUMN "version_description";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "educational_programs_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    );

    CREATE TABLE "_educational_programs_v_version_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE "spec_settings_groups_specialty_codes" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "code" varchar
    );

    CREATE TABLE "_spec_settings_v_version_groups_specialty_codes" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "code" varchar,
      "_uuid" varchar
    );

    ALTER TABLE "educational_programs" ADD COLUMN "specialty_code" varchar;
    ALTER TABLE "educational_programs" ADD COLUMN "legacy_specialty_code" varchar;
    ALTER TABLE "educational_programs" ADD COLUMN "specialty_name" varchar;
    ALTER TABLE "educational_programs" ADD COLUMN "is_featured" boolean DEFAULT false;
    ALTER TABLE "educational_programs" ADD COLUMN "description" varchar;
    ALTER TABLE "_educational_programs_v" ADD COLUMN "version_specialty_code" varchar;
    ALTER TABLE "_educational_programs_v" ADD COLUMN "version_legacy_specialty_code" varchar;
    ALTER TABLE "_educational_programs_v" ADD COLUMN "version_specialty_name" varchar;
    ALTER TABLE "_educational_programs_v" ADD COLUMN "version_is_featured" boolean DEFAULT false;
    ALTER TABLE "_educational_programs_v" ADD COLUMN "version_description" varchar;

    ALTER TABLE "educational_programs_tags"
      ADD CONSTRAINT "educational_programs_tags_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."educational_programs"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_educational_programs_v_version_tags"
      ADD CONSTRAINT "_educational_programs_v_version_tags_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_educational_programs_v"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "spec_settings_groups_specialty_codes"
      ADD CONSTRAINT "spec_settings_groups_specialty_codes_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."spec_settings_groups"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_spec_settings_v_version_groups_specialty_codes"
      ADD CONSTRAINT "_spec_settings_v_version_groups_specialty_codes_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_spec_settings_v_version_groups"("id")
      ON DELETE cascade ON UPDATE no action;

    UPDATE educational_programs programs
    SET
      specialty_code = CASE
        WHEN specialties.code ~ '^A[0-9]' THEN 'А' || substring(specialties.code FROM 2)
        ELSE specialties.code
      END,
      legacy_specialty_code = specialties.legacy_code,
      specialty_name = specialties.title,
      is_featured = specialties.is_featured,
      description = specialties.description
    FROM specialties
    WHERE specialties.id = programs.specialty_id;

    UPDATE _educational_programs_v versions
    SET
      version_specialty_code = CASE
        WHEN specialties.code ~ '^A[0-9]' THEN 'А' || substring(specialties.code FROM 2)
        ELSE specialties.code
      END,
      version_legacy_specialty_code = specialties.legacy_code,
      version_specialty_name = specialties.title,
      version_is_featured = specialties.is_featured,
      version_description = specialties.description
    FROM specialties
    WHERE specialties.id = versions.version_specialty_id;

    INSERT INTO educational_programs_tags (_order, _parent_id, id, label)
    SELECT
      tags._order,
      programs.id,
      md5(tags.id || ':' || programs.id::text),
      tags.label
    FROM educational_programs programs
    JOIN specialties_tags tags ON tags._parent_id = programs.specialty_id;

    INSERT INTO _educational_programs_v_version_tags (_order, _parent_id, label, _uuid)
    SELECT
      tags._order,
      versions.id,
      tags.label,
      md5(tags.id || ':' || versions.id::text)
    FROM _educational_programs_v versions
    JOIN specialties_tags tags ON tags._parent_id = versions.version_specialty_id;

    INSERT INTO spec_settings_groups_specialty_codes (_order, _parent_id, id, code)
    SELECT
      relationships."order",
      groups.id,
      md5(relationships.id::text),
      CASE
        WHEN specialties.code ~ '^A[0-9]' THEN 'А' || substring(specialties.code FROM 2)
        ELSE specialties.code
      END
    FROM spec_settings_rels relationships
    JOIN spec_settings_groups groups
      ON groups._parent_id = relationships.parent_id
      AND relationships.path = 'groups.' || (groups._order - 1) || '.specialties'
    JOIN specialties ON specialties.id = relationships.specialties_id;

    INSERT INTO _spec_settings_v_version_groups_specialty_codes (
      _order,
      _parent_id,
      code,
      _uuid
    )
    SELECT
      relationships."order",
      groups.id,
      CASE
        WHEN specialties.code ~ '^A[0-9]' THEN 'А' || substring(specialties.code FROM 2)
        ELSE specialties.code
      END,
      md5(relationships.id::text)
    FROM _spec_settings_v_rels relationships
    JOIN _spec_settings_v_version_groups groups
      ON groups._parent_id = relationships.parent_id
      AND relationships.path = 'groups.' || (groups._order - 1) || '.specialties'
    JOIN specialties ON specialties.id = relationships.specialties_id;

    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM educational_programs WHERE specialty_code IS NULL) THEN
        RAISE EXCEPTION 'normalize_specialties rollback: an educational program has no specialty code';
      END IF;

      IF EXISTS (
        SELECT 1
        FROM educational_programs
        GROUP BY specialty_code, education_level
        HAVING count(*) > 1
      ) THEN
        RAISE EXCEPTION 'normalize_specialties rollback: the legacy unique program constraint would be violated';
      END IF;
    END
    $$;

    CREATE INDEX "educational_programs_tags_order_idx" ON "educational_programs_tags" USING btree ("_order");
    CREATE INDEX "educational_programs_tags_parent_id_idx" ON "educational_programs_tags" USING btree ("_parent_id");
    CREATE INDEX "_educational_programs_v_version_tags_order_idx" ON "_educational_programs_v_version_tags" USING btree ("_order");
    CREATE INDEX "_educational_programs_v_version_tags_parent_id_idx" ON "_educational_programs_v_version_tags" USING btree ("_parent_id");
    CREATE INDEX "spec_settings_groups_specialty_codes_order_idx" ON "spec_settings_groups_specialty_codes" USING btree ("_order");
    CREATE INDEX "spec_settings_groups_specialty_codes_parent_id_idx" ON "spec_settings_groups_specialty_codes" USING btree ("_parent_id");
    CREATE INDEX "_spec_settings_v_version_groups_specialty_codes_order_idx" ON "_spec_settings_v_version_groups_specialty_codes" USING btree ("_order");
    CREATE INDEX "_spec_settings_v_version_groups_specialty_codes_parent_id_idx" ON "_spec_settings_v_version_groups_specialty_codes" USING btree ("_parent_id");
    CREATE INDEX "educational_programs_specialty_code_idx" ON "educational_programs" USING btree ("specialty_code");
    CREATE INDEX "educational_programs_legacy_specialty_code_idx" ON "educational_programs" USING btree ("legacy_specialty_code");
    CREATE UNIQUE INDEX "specialtyCode_educationLevel_idx" ON "educational_programs" USING btree ("specialty_code", "education_level");
    CREATE INDEX "_educational_programs_v_version_version_specialty_code_idx" ON "_educational_programs_v" USING btree ("version_specialty_code");
    CREATE INDEX "_educational_programs_v_version_version_legacy_specialty_idx" ON "_educational_programs_v" USING btree ("version_legacy_specialty_code");
    CREATE INDEX "version_specialtyCode_version_educationLevel_idx" ON "_educational_programs_v" USING btree ("version_specialty_code", "version_education_level");

    ALTER TABLE "educational_programs"
      DROP CONSTRAINT "educational_programs_specialty_id_specialties_id_fk";
    ALTER TABLE "_educational_programs_v"
      DROP CONSTRAINT "_educational_programs_v_version_specialty_id_specialties_id_fk";
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT "payload_locked_documents_rels_specialties_fk";

    DROP INDEX "educational_programs_specialty_idx";
    DROP INDEX "_educational_programs_v_version_version_specialty_idx";
    DROP INDEX "payload_locked_documents_rels_specialties_id_idx";

    ALTER TABLE "educational_programs" DROP COLUMN "specialty_id";
    ALTER TABLE "_educational_programs_v" DROP COLUMN "version_specialty_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "specialties_id";

    DROP TABLE "spec_settings_rels" CASCADE;
    DROP TABLE "_spec_settings_v_rels" CASCADE;
    DROP TABLE "specialties_tags" CASCADE;
    DROP TABLE "_specialties_v_version_tags" CASCADE;
    DROP TABLE "_specialties_v" CASCADE;
    DROP TABLE "specialties" CASCADE;

    DROP TYPE "public"."enum_specialties_status";
    DROP TYPE "public"."enum__specialties_v_version_status";
  `)
}
