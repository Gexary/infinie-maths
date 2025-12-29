"use server";

import { PageBreadcrumbList } from "@/components/app/app-breadcrumbs";
import { ChapterList } from "@/components/app/chapter-list";
import StylizedText from "@/components/app/stylized-text";
import { ChapterProvider } from "@/contexts/chapter-context";
import { db } from "@/db";
import { chapters, gradeLevels } from "@/db/schemas/app";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function ChapterLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ chapterSlug: string; gradeSlug: string }> }>) {
  let { chapterSlug, gradeSlug } = await params;

  const gradeRows = await db.select({ id: gradeLevels.id }).from(gradeLevels).where(eq(gradeLevels.slug, gradeSlug)).limit(1);
  if (gradeRows.length === 0) return redirect("/");
  const gradeId = gradeRows[0].id;

  const chapterRows = await db
    .select({ description: chapters.description, title: chapters.title, id: chapters.id })
    .from(chapters)
    .where(and(eq(chapters.gradeId, gradeId), eq(chapters.slug, chapterSlug)))
    .limit(1);
  if (chapterRows.length === 0) return redirect(`/niveau/${gradeSlug}`);

  return (
    <ChapterProvider chapterId={chapterRows[0].id} chapterSlug={chapterSlug}>
      <PageBreadcrumbList />
      <h1 className="mt-4 text-3xl font-bold text-white">{chapterRows[0].title}</h1>
      <p className="mt-2 text-base leading-relaxed">
        <StylizedText text={chapterRows[0].description} />
      </p>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr]">
        <ChapterList />
        <div className="w-full">{children}</div>
      </div>
    </ChapterProvider>
  );
}
