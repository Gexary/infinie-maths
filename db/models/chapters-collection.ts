"use server";

import { db } from "@/db";
import { chapters, gradeLevels } from "@/db/schemas/app";
import type { DataReturnType, Chapter, ChapterId, ChaptersCollection, DBChapter, GradeId } from "@/types/global";
import { asc, eq } from "drizzle-orm";

function buildChaptersCollection(rows: Omit<DBChapter, "createdAt" | "updatedAt" | "position" | "gradeId">[]) {
  const items: Record<ChapterId, Chapter> = {};
  const order: ChapterId[] = [];

  for (const row of rows) {
    const { id, ...rest } = row;
    items[id] = { ...rest };
    order.push(id);
  }

  return { items, order };
}

export async function getGradeIdFromSlug(gradeSlug: string): Promise<GradeId | null> {
  const gradeRows = await db.select({ id: gradeLevels.id }).from(gradeLevels).where(eq(gradeLevels.slug, gradeSlug)).limit(1);
  return gradeRows.length === 0 ? null : gradeRows[0].id;
}

export async function getChaptersCollection(gradeSlug: string): DataReturnType<{ gradeId: GradeId; chaptersCollection: ChaptersCollection }> {
  const gradeId = await getGradeIdFromSlug(gradeSlug);
  if (!gradeId) return { redirect: "/" };

  const chapterList = await db
    .select({
      id: chapters.id,
      slug: chapters.slug,
      title: chapters.title,
      description: chapters.description,
      annotation: chapters.annotation,
      coursePDFUrl: chapters.coursePDFUrl,
      correctionsPDFUrl: chapters.correctionsPDFUrl,
      videoUrl: chapters.videoUrl,
    })
    .from(chapters)
    .where(eq(chapters.gradeId, gradeId))
    .orderBy(asc(chapters.position));

  return { gradeId, chaptersCollection: buildChaptersCollection(chapterList) };
}

export async function getAdminGradeInfo(gradeSlug: string) {
  const gradeRows = await db.select({ id: gradeLevels.id, slug: gradeLevels.slug }).from(gradeLevels).where(eq(gradeLevels.slug, gradeSlug)).limit(1);
  if (gradeRows.length === 0) return { redirect: "/admin" };
  return gradeRows[0];
}

export async function getAdminChaptersData(gradeSlug: string) {
  const activeGradeData = await getAdminGradeInfo(gradeSlug);
  if ("redirect" in activeGradeData) return activeGradeData;

  const rows = await db.select().from(chapters).where(eq(chapters.gradeId, activeGradeData.id)).orderBy(asc(chapters.position));

  const chaptersData: ChaptersCollection = {
    items: {},
    order: [],
  };

  for (const chapter of rows) {
    chaptersData.items[chapter.id] = {
      title: chapter.title,
      description: chapter.description,
      annotation: chapter.annotation,
      slug: chapter.slug,
      coursePDFUrl: chapter.coursePDFUrl,
      correctionsPDFUrl: chapter.correctionsPDFUrl,
      videoUrl: chapter.videoUrl,
    };
    chaptersData.order.push(chapter.id);
  }

  return { chaptersData, activeGradeData };
}
