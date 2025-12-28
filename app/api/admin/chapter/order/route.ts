import { db } from "@/db";
import { base36ToUuid } from "@/lib/base36-converter";
import type { ChapterId, GradeId } from "@/types/global";
import { sql } from "drizzle-orm";

const GAP = 1000;

export async function PATCH(req: Request) {
  const body = (await req.json()) as { order: ChapterId[] };

  if (!Array.isArray(body.order) || body.order.length === 0) return new Response("Invalid order payload", { status: 400 });
  const order = body.order.map(base36ToUuid);

  try {
    const cases = order.map((id, index) => `WHEN id = '${id}' THEN ${GAP * (index + 1)}`).join(" ");
    const ids = order.map((id) => `'${id}'`).join(",");

    await db.execute(sql`
      UPDATE chapters
      SET position = CASE ${sql.raw(cases)} END,
          updated_at = NOW()
      WHERE id IN (${sql.raw(ids)})
    `);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error reordering:", error);
    return Response.json({ error: "Failed to reorder" }, { status: 500 });
  }
}
