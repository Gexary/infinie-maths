"use server";

import { GradeLevelProvider } from "@/contexts/grade-level-context";
import { db } from "@/db";
import { chapters, gradeLevels } from "@/db/schemas/app";
import type { Chapter, ChapterId, DBChapter } from "@/types/global";
import { asc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { convertToSlug } from "@/lib/slug";

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

export default async function GradeLevelLayout({ children, params }: Readonly<{ params: Promise<{ gradeSlug: string }>; children: React.ReactNode }>) {
  let { gradeSlug } = await params;
  gradeSlug = convertToSlug(gradeSlug);

  const gradeId = await db.select({ id: gradeLevels.id }).from(gradeLevels).where(eq(gradeLevels.slug, gradeSlug)).limit(1);

  if (gradeId.length === 0) return redirect("/");

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
    .where(eq(chapters.gradeId, gradeId[0].id))
    .orderBy(asc(chapters.position));
  const chaptersCollection = buildChaptersCollection(chapterList);

  return (
    <GradeLevelProvider chapters={chaptersCollection} gradeId={gradeId[0].id}>
      {children}
    </GradeLevelProvider>
  );
}
