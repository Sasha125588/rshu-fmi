import { sql } from '@payloadcms/db-postgres'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM "specialties" AS "specialty"
      LEFT JOIN "educational_programs" AS "program"
        ON "program"."specialty_id" = "specialty"."id"
      GROUP BY "specialty"."id"
      HAVING
        COUNT("program"."id") = 0
        OR COUNT(*) FILTER (
          WHERE "program"."short_title" IS NULL OR BTRIM("program"."short_title") = ''
        ) > 0
        OR COUNT(DISTINCT BTRIM("program"."short_title")) <> 1
        OR COUNT(*) FILTER (WHERE "program"."department_id" IS NULL) > 0
        OR COUNT(DISTINCT "program"."department_id") <> 1
    ) THEN
      RAISE EXCEPTION 'Cannot move shared program fields: every specialty must have programs with one non-empty short title and one department';
    END IF;
  END
  $$;

  ALTER TABLE "educational_programs" DROP CONSTRAINT "educational_programs_department_id_departments_id_fk";
  
  ALTER TABLE "_educational_programs_v" DROP CONSTRAINT "_educational_programs_v_version_department_id_departments_id_fk";
  
  DROP INDEX "educational_programs_department_idx";
  DROP INDEX "_educational_programs_v_version_version_department_idx";
  ALTER TABLE "specialties" ADD COLUMN "abbreviation" varchar;
  ALTER TABLE "specialties" ADD COLUMN "responsible_department_id" integer;
  ALTER TABLE "_specialties_v" ADD COLUMN "version_abbreviation" varchar;
  ALTER TABLE "_specialties_v" ADD COLUMN "version_responsible_department_id" integer;

  UPDATE "specialties" AS "specialty"
  SET
    "abbreviation" = "shared_fields"."abbreviation",
    "responsible_department_id" = "shared_fields"."department_id"
  FROM (
    SELECT DISTINCT ON ("specialty_id")
      "specialty_id",
      BTRIM("short_title") AS "abbreviation",
      "department_id"
    FROM "educational_programs"
    ORDER BY "specialty_id", "id"
  ) AS "shared_fields"
  WHERE "specialty"."id" = "shared_fields"."specialty_id";

  UPDATE "_specialties_v" AS "version"
  SET
    "version_abbreviation" = "specialty"."abbreviation",
    "version_responsible_department_id" = "specialty"."responsible_department_id"
  FROM "specialties" AS "specialty"
  WHERE "version"."parent_id" = "specialty"."id";

  DO $$
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM "specialties"
      WHERE
        "abbreviation" IS NULL
        OR BTRIM("abbreviation") = ''
        OR "responsible_department_id" IS NULL
    ) THEN
      RAISE EXCEPTION 'Specialty shared fields backfill is incomplete';
    END IF;
  END
  $$;

  ALTER TABLE "specialties" ADD CONSTRAINT "specialties_responsible_department_id_departments_id_fk" FOREIGN KEY ("responsible_department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_specialties_v" ADD CONSTRAINT "_specialties_v_version_responsible_department_id_departments_id_fk" FOREIGN KEY ("version_responsible_department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "specialties_responsible_department_idx" ON "specialties" USING btree ("responsible_department_id");
  CREATE INDEX "_specialties_v_version_version_responsible_department_idx" ON "_specialties_v" USING btree ("version_responsible_department_id");
  ALTER TABLE "educational_programs" DROP COLUMN "short_title";
  ALTER TABLE "educational_programs" DROP COLUMN "department_id";
  ALTER TABLE "_educational_programs_v" DROP COLUMN "version_short_title";
  ALTER TABLE "_educational_programs_v" DROP COLUMN "version_department_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "specialties" DROP CONSTRAINT "specialties_responsible_department_id_departments_id_fk";
  
  ALTER TABLE "_specialties_v" DROP CONSTRAINT "_specialties_v_version_responsible_department_id_departments_id_fk";
  
  DROP INDEX "specialties_responsible_department_idx";
  DROP INDEX "_specialties_v_version_version_responsible_department_idx";
  ALTER TABLE "educational_programs" ADD COLUMN "short_title" varchar;
  ALTER TABLE "educational_programs" ADD COLUMN "department_id" integer;
  ALTER TABLE "_educational_programs_v" ADD COLUMN "version_short_title" varchar;
  ALTER TABLE "_educational_programs_v" ADD COLUMN "version_department_id" integer;

  UPDATE "educational_programs" AS "program"
  SET
    "short_title" = "specialty"."abbreviation",
    "department_id" = "specialty"."responsible_department_id"
  FROM "specialties" AS "specialty"
  WHERE "program"."specialty_id" = "specialty"."id";

  UPDATE "_educational_programs_v" AS "version"
  SET
    "version_short_title" = "specialty"."abbreviation",
    "version_department_id" = "specialty"."responsible_department_id"
  FROM "educational_programs" AS "program"
  CROSS JOIN "specialties" AS "specialty"
  WHERE
    "version"."parent_id" = "program"."id"
    AND "specialty"."id" = COALESCE(
      "version"."version_specialty_id",
      "program"."specialty_id"
    );

  DO $$
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM "educational_programs"
      WHERE
        "short_title" IS NULL
        OR BTRIM("short_title") = ''
        OR "department_id" IS NULL
    ) THEN
      RAISE EXCEPTION 'Educational program shared fields rollback is incomplete';
    END IF;
  END
  $$;

  ALTER TABLE "educational_programs" ADD CONSTRAINT "educational_programs_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_educational_programs_v" ADD CONSTRAINT "_educational_programs_v_version_department_id_departments_id_fk" FOREIGN KEY ("version_department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "educational_programs_department_idx" ON "educational_programs" USING btree ("department_id");
  CREATE INDEX "_educational_programs_v_version_version_department_idx" ON "_educational_programs_v" USING btree ("version_department_id");
  ALTER TABLE "specialties" DROP COLUMN "abbreviation";
  ALTER TABLE "specialties" DROP COLUMN "responsible_department_id";
  ALTER TABLE "_specialties_v" DROP COLUMN "version_abbreviation";
  ALTER TABLE "_specialties_v" DROP COLUMN "version_responsible_department_id";`)
}
