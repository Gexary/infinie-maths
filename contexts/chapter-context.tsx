"use client";

import { useChapters } from "@/contexts/grade-level-context";
import type { Chapter, ChapterId, ChapterSlug } from "@/types/global";
import { createContext, useContext, useRef, type ReactNode } from "react";

export interface ChapterContextProps {
  activeChapter: {
    id: ChapterId;
    slug: ChapterSlug;
  };
}

const ChapterContext = createContext<ChapterContextProps | null>(null);

export function useChapter() {
  const context = useContext(ChapterContext);
  if (!context) throw new Error("useChapter must be used within a ChapterProvider");
  return context;
}

export function ChapterProvider({ children, chapterId, chapterSlug }: Readonly<{ children: ReactNode; chapterId: ChapterId; chapterSlug: ChapterSlug }>) {
  const activeChapterRef = useRef<{
    id: ChapterId;
    slug: ChapterSlug;
  }>({ id: chapterId, slug: chapterSlug });

  return <ChapterContext value={{ activeChapter: activeChapterRef.current }}>{children}</ChapterContext>;
}

export function getActiveChapter(): Chapter {
  const { activeChapter } = useChapter();
  const chapters = useChapters();
  return chapters.items[activeChapter.id];
}
