"use server";

import { db } from "@/db";
import { getGradeIdFromSlug } from "@/db/models/chapters-collection";
import { chapters } from "@/db/schemas/app";
import type { DataReturnType, Chapter, ChapterId } from "@/types/global";
import { and, eq } from "drizzle-orm";

export async function getChapter(chapterSlug: string, gradeSlug: string): DataReturnType<{ chapterRow: { id: ChapterId; title: Chapter["title"]; description: Chapter["description"]; slug: Chapter["slug"] } }> {
  const gradeId = await getGradeIdFromSlug(gradeSlug);
  if (!gradeId) return { redirect: "/" };

  const chapterRows = await db
    .select({ description: chapters.description, title: chapters.title, id: chapters.id, slug: chapters.slug })
    .from(chapters)
    .where(and(eq(chapters.gradeId, gradeId), eq(chapters.slug, chapterSlug)))
    .limit(1);

  return chapterRows.length === 0 ? { redirect: `/niveau/${gradeSlug}` } : { chapterRow: chapterRows[0] };
}
