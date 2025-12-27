"use server";

import { AdminGradeProvider } from "@/contexts/admin/admin-grade-context";
import { db } from "@/db";
import { chapters, gradeLevels } from "@/db/schemas/app";
import { convertToSlug } from "@/lib/slug";
import type { ChaptersCollection } from "@/types/global";
import { asc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children, params }: Readonly<{ params: Promise<{ gradeSlug: string }>; children: React.ReactNode }>) {
  let { gradeSlug } = await params;
  gradeSlug = convertToSlug(gradeSlug);

  const gradeRows = await db.select({ id: gradeLevels.id, slug: gradeLevels.slug }).from(gradeLevels).where(eq(gradeLevels.slug, gradeSlug)).limit(1);
  if (gradeRows.length === 0) return redirect("/admin");
  const activeGradeData = gradeRows[0];

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

  return <AdminGradeProvider data={{ chaptersData, activeGradeData }}>{children}</AdminGradeProvider>;
}
