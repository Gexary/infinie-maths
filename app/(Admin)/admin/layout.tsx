"use server";

import { AdminProvider } from "@/contexts/admin/admin-context";
import { db } from "@/db";
import { gradeLevels } from "@/db/schemas/app";
import type { GradesCollection } from "@/types/global";
import { asc } from "drizzle-orm";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const grades = await db.select().from(gradeLevels).orderBy(asc(gradeLevels.position));

  const gradesCollection: GradesCollection = {
    items: {},
    order: [],
  };

  for (const grade of grades) {
    gradesCollection.items[grade.id] = {
      name: grade.name,
      slug: grade.slug,
      title: grade.title,
      description: grade.description,
      summary: grade.summary,
      hero: grade.hero ?? null,
    };
    gradesCollection.order.push(grade.id);
  }

  return (
    <AdminProvider data={{ gradeLevels: gradesCollection }}>
      <div className="min-h-screen bg-background">{children}</div>
    </AdminProvider>
  );
}
