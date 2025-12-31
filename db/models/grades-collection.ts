"use server";

import type { DBGrade, Grade, GradeId, GradesCollection } from "@/types/global";
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

export async function getGradesCollection() {
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

  return buildGradesCollection(rows);
}

export async function getAdminGradesCollection() {
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

  return gradesCollection;
}
