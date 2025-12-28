import { NextResponse } from "next/server";
import { CreateChapterSchema } from "@/lib/validation";
import { db } from "@/db";
import { chapters } from "@/db/schemas/app";
import { desc, eq, and } from "drizzle-orm";
import type { Chapter, ChapterId } from "@/types/global";

export const GAP = 1000;

export async function POST(req: Request) {
  const { data, gradeId } = await req.json();

  const result = CreateChapterSchema.safeParse(data);

  if (!result.success || !gradeId) {
    return NextResponse.json({ error: result?.error?.issues[0].message ?? "Erreur lors de la création du chapitre" }, { status: 400 });
  }

  try {
    const chapter = await db.transaction(async (tx): Promise<Chapter & { id: ChapterId }> => {
      const lastRow = await tx.select({ position: chapters.position }).from(chapters).where(eq(chapters.gradeId, gradeId)).orderBy(desc(chapters.position)).limit(1).for("update");

      const newPosition = lastRow.length === 0 ? GAP : lastRow[0].position + GAP;

      const rows = await tx
        .insert(chapters)
        .values({
          gradeId,
          slug: result.data.slug,
          title: result.data.title,
          description: result.data.description,
          annotation: result.data.annotation,
          position: newPosition,
        })
        .returning();
      const row = rows[0];

      return {
        id: row.id,
        title: row.title,
        description: row.description,
        annotation: row.annotation,
        slug: row.slug,
        coursePDFUrl: row.coursePDFUrl,
        correctionsPDFUrl: row.correctionsPDFUrl,
        videoUrl: row.videoUrl,
      };
    });

    return NextResponse.json(chapter, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du chapitre:", error);
    return NextResponse.json({ error: "Erreur lors de la création du chapitre" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const { id, data } = await req.json();
  const result = CreateChapterSchema.safeParse(data);

  if (!result.success || !id) {
    return NextResponse.json({ error: result?.error?.issues[0].message ?? "Erreur lors de la modification du chapitre" }, { status: 400 });
  }

  try {
    const rows = await db.update(chapters).set(result.data).where(eq(chapters.id, id)).returning();
    if (rows.length === 0) return NextResponse.json({ error: "Chapitre introuvable" }, { status: 404 });
    const row = rows[0];
    const finalData: Chapter & { id: ChapterId } = {
      id: row.id,
      title: row.title,
      description: row.description,
      annotation: row.annotation,
      slug: row.slug,
      coursePDFUrl: row.coursePDFUrl,
      correctionsPDFUrl: row.correctionsPDFUrl,
      videoUrl: row.videoUrl,
    };
    return NextResponse.json(finalData, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la modification du chapitre:", error);
    return NextResponse.json({ error: "Erreur lors de la modification du chapitre" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    const res = await db.delete(chapters).where(eq(chapters.id, id));

    if (res.rowCount === 0) {
      return NextResponse.json({ error: "Chapitre introuvable" }, { status: 404 });
    }

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression du chapitre:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression du chapitre" }, { status: 500 });
  }
}
