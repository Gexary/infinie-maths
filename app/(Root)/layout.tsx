"use server";

import { AppProvider } from "@/contexts/app-context";
import type { DBGrade, Grade, GradeId } from "@/types/global";
import { gradeLevels } from "@/db/schemas/app";
import { db } from "@/db";
import { asc } from "drizzle-orm";

function buildGradesCollection(rows: Omit<DBGrade, "createdAt" | "updatedAt" | "position">[]) {
  const items: Record<GradeId, Grade> = {};
  const order: GradeId[] = [];

  for (const row of rows) {
    const { id, hero, ...rest } = row;
    const finalHero = Object.keys(hero ?? {}).length === 0 ? null : (hero as Grade["hero"]);
    items[id] = { ...rest, hero: finalHero };
    order.push(id);
  }

  return { items, order };
}

export default async function PageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const rows = await db
    .select({
      id: gradeLevels.id,
      slug: gradeLevels.slug,
      name: gradeLevels.name,
      title: gradeLevels.title,
      description: gradeLevels.description,
      summary: gradeLevels.summary,
      hero: gradeLevels.hero,
    })
    .from(gradeLevels)
    .orderBy(asc(gradeLevels.position));
  const json = buildGradesCollection(rows);

  return <AppProvider gradesCollection={json}>{children}</AppProvider>;
}
