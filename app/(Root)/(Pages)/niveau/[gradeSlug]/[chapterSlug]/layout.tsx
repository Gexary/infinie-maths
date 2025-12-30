"use server";

import { PageBreadcrumbList } from "@/components/app/app-breadcrumbs";
import { ChapterList } from "@/components/app/chapter-list";
import StylizedText from "@/components/app/stylized-text";
import { ChapterProvider } from "@/contexts/chapter-context";
import { getChapter } from "@/db/models/chapter";
import { redirect } from "next/navigation";

export default async function ChapterLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ chapterSlug: string; gradeSlug: string }> }>) {
  let { chapterSlug, gradeSlug } = await params;

  const result = await getChapter(chapterSlug, gradeSlug);
  if ("redirect" in result) return redirect(result.redirect);

  const { chapterRow } = result;

  return (
    <ChapterProvider chapterId={chapterRow.id} chapterSlug={chapterRow.slug}>
      <PageBreadcrumbList />
      <h1 className="mt-4 text-3xl font-bold text-white">{chapterRow.title}</h1>
      <p className="mt-2 text-base leading-relaxed">
        <StylizedText text={chapterRow.description} />
      </p>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr]">
        <ChapterList />
        <div className="w-full">{children}</div>
      </div>
    </ChapterProvider>
  );
}
