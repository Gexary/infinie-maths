// import fs from "fs/promises";
import path from "path";
import { fileTypeFromBuffer } from "file-type";
import { eq } from "drizzle-orm";
import { chapters } from "@/db/schemas/app";
import { db } from "@/db";
import { NextResponse } from "next/server";
import { del, put } from "@vercel/blob";

const DIR_PATH = path.resolve(`./public/files`);

export type FileType = "course-pdf" | "corrections-pdf" | "course-video";

const folderNames: Record<FileType, string> = {
  "course-pdf": "courses",
  "corrections-pdf": "corrections",
  "course-video": "videos",
};

const jsonKeyNames: Record<FileType, string> = {
  "course-pdf": "coursePDFUrl",
  "corrections-pdf": "correctionsPDFUrl",
  "course-video": "videoUrl",
};

const ALLOWED_MIME = new Set(["application/pdf", "video/mp4"]);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const chapterId = formData.get("chapterId") as string;
    const type = formData.get("type") as FileType;
    const file = formData.get("file") as File;

    if (!file) return new Response(JSON.stringify({ error: "Aucun fichier n'a été fourni" }), { status: 400, headers: { "Content-Type": "application/json" } });
    if (!(file instanceof Blob)) return new Response(JSON.stringify({ error: "Format de fichier invalide" }), { status: 400, headers: { "Content-Type": "application/json" } });

    const fileArrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileArrayBuffer);

    const detected = await fileTypeFromBuffer(buffer);
    if (!detected) return new Response(JSON.stringify({ error: "Unknown or unsupported file type" }), { status: 415, headers: { "Content-Type": "application/json" } });

    const { mime, ext } = detected;
    if (!ALLOWED_MIME.has(mime)) return new Response(JSON.stringify({ error: "File type not allowed" }), { status: 415, headers: { "Content-Type": "application/json" } });

    const fileName = `${chapterId}.${ext}`;
    const filePath = path.resolve(DIR_PATH, folderNames[type], fileName);

    // await fs.mkdir(path.dirname(filePath), { recursive: true });
    // await fs.writeFile(filePath, buffer);
    const { url } = await put(`chapters/${chapterId}.${ext}`, buffer, { access: "public", allowOverwrite: true });

    await db
      .update(chapters)
      .set({
        [jsonKeyNames[type]]: url,
      })
      .where(eq(chapters.id, chapterId));

    return new Response(JSON.stringify({ success: true, fileName: url }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Erreur lors du traitement du fichier:", error);
    return new Response(JSON.stringify({ error: "Erreur lors du traitement du fichier" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

export async function DELETE(req: Request) {
  const { id, type, url }: { id: string; type: FileType; url: string } = await req.json();

  try {
    await del(url);

    const rows = await db
      .update(chapters)
      .set({ [jsonKeyNames[type]]: null })
      .where(eq(chapters.id, id));
    if (rows.rowCount === 0) throw new Error("Chapitre introuvable");
    return NextResponse.json({ id, type }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression du chapitre:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression du chapitre" }, { status: 500 });
  }
}
