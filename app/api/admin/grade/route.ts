import { NextResponse } from "next/server";
import { GradeLevelSchema } from "@/lib/validation";
import { db } from "@/db";
import { gradeLevels } from "@/db/schemas/app";
import { desc, eq } from "drizzle-orm";

export const GAP = 1000;

export async function POST(req: Request) {
  const body = await req.json();
  const result = GradeLevelSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
  }

  try {
    const grade = await db.transaction(async (tx) => {
      const lastRowPosition = await tx.select({ position: gradeLevels.position }).from(gradeLevels).orderBy(desc(gradeLevels.position)).limit(1).for("update");
      const newPow = lastRowPosition.length === 0 ? GAP : lastRowPosition[0].position + GAP;
      const rows = await tx
        .insert(gradeLevels)
        .values({
          name: result.data.name,
          slug: result.data.slug,
          title: result.data.title,
          description: result.data.description,
          summary: result.data.summary,
          hero: result.data.hero,
          position: newPow,
        })
        .returning();
      const row = rows[0];
      return {
        id: row.id,
        position: row.position,
        name: row.name,
        slug: row.slug,
        title: row.title,
        description: row.description,
        summary: row.summary,
        hero: row.hero,
      };
    });

    return NextResponse.json(grade, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du niveau:", error);
    return NextResponse.json({ error: "Erreur lors de la création du niveau" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const result = GradeLevelSchema.safeParse(body.data);
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
  }

  try {
    const grade = await db.transaction(async (tx) => {
      const rows = await tx.update(gradeLevels).set(result.data).where(eq(gradeLevels.id, body.id)).returning();
      const row = rows[0];
      return {
        id: row.id,
        position: row.position,
        name: row.name,
        slug: row.slug,
        title: row.title,
        description: row.description,
        summary: row.summary,
        hero: row.hero,
      };
    });

    return NextResponse.json(grade, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la modification du niveau:", error);
    return NextResponse.json({ error: "Erreur lors de la modification du niveau" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    const rows = await db.delete(gradeLevels).where(eq(gradeLevels.id, id));
    if (rows.rowCount === 0) return NextResponse.json({ error: "Niveau introuvable" }, { status: 404 });

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression du niveau:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression du niveau" }, { status: 500 });
  }
}
