"use server";

import { GradeLevelProvider } from "@/contexts/grade-level-context";
import { getChaptersCollection } from "@/db/models/chapters-collection";
import { redirect } from "next/navigation";

export default async function GradeLevelLayout({ children, params }: Readonly<{ params: Promise<{ gradeSlug: string }>; children: React.ReactNode }>) {
  let { gradeSlug } = await params;

  const result = await getChaptersCollection(gradeSlug);
  if ("redirect" in result) return redirect(result.redirect);

  const { chaptersCollection, gradeId } = result;

  return (
    <GradeLevelProvider chapters={chaptersCollection} gradeId={gradeId}>
      {children}
    </GradeLevelProvider>
  );
}
