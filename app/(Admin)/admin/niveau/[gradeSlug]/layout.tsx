"use server";

import { AdminGradeProvider } from "@/contexts/admin/admin-grade-context";
import { getAdminChaptersData } from "@/db/models/chapters-collection";
import { convertToSlug } from "@/lib/slug";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children, params }: Readonly<{ params: Promise<{ gradeSlug: string }>; children: React.ReactNode }>) {
  let { gradeSlug } = await params;
  gradeSlug = convertToSlug(gradeSlug);

  const result = await getAdminChaptersData(gradeSlug);
  if ("redirect" in result) return redirect(result.redirect);

  const { chaptersData, activeGradeData } = result;

  return <AdminGradeProvider data={{ chaptersData, activeGradeData }}>{children}</AdminGradeProvider>;
}
