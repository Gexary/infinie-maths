import { doublePrecision, index, jsonb, pgTable, text, unique } from "drizzle-orm/pg-core";
import { base36Id, base36IdRef, base36UUID } from "@/db/utils/base36-id";
import { slugType } from "@/db/utils/text-types";
import { createdTimestamp, updateTimestamp } from "@/db/utils/time";

export const gradeLevels = pgTable(
  "grade_levels",
  {
    id: base36Id(),
    slug: slugType().unique("unique_grade_slug"),
    name: text().notNull(),

    title: text().notNull(),
    description: text().notNull(),
    summary: text().notNull(),
    hero: jsonb().notNull(),

    createdAt: createdTimestamp(),
    updatedAt: updateTimestamp(),

    position: doublePrecision().notNull(),
  },
  (t) => [index("idx_grades_position_asc").on(t.position.asc())]
);

export const chapters = pgTable(
  "chapters",
  {
    id: base36Id(),
    gradeId: base36IdRef("grade_id", gradeLevels.id, true).notNull(),
    slug: slugType(),
    title: text().notNull(),

    description: text().notNull(),
    annotation: text().notNull(),

    coursePDFUrl: text("course_pdf_url"),
    correctionsPDFUrl: text("corrections_pdf_url"),
    videoUrl: text("video_url"),

    createdAt: createdTimestamp(),
    updatedAt: updateTimestamp(),

    position: doublePrecision().notNull(),
  },
  (t) => [unique("uq_chapters_grade_slug").on(t.gradeId, t.slug), index("idx_chapters_position_asc").on(t.position.asc())]
);
