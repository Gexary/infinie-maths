import type { chapters, gradeLevels } from "@/db/schemas/app";

export type GradeId = string;
export type GradeSlug = string;
export type ChapterId = string;
export type ChapterSlug = string;

export interface Chapter {
  title: string;
  description: string;
  annotation: string;
  slug: ChapterSlug;
  coursePDFUrl: string | null;
  correctionsPDFUrl: string | null;
  videoUrl: string | null;
}

export interface Grade {
  name: string;
  slug: GradeSlug;

  title: string;
  description: string;
  summary: string;
  hero: {
    title?: string;
    description?: string;
    notice?: string;
  } | null;
}

export interface OrderedCollection<ID, T> {
  items: Record<ID, T>;
  order: ID[];
}

export type ChaptersCollection = OrderedCollection<ChapterId, Chapter>;
export type GradesCollection = OrderedCollection<GradeId, Grade>; // JSON file grade_levels.json
export type ChaptersByGrade = Record<GradeId, ChapterId[]>; // JSON file chapters.json

export type DBChapter = typeof chapters.$inferSelect;
export type DBGrade = typeof gradeLevels.$inferSelect;
