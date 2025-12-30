"use client";

import { useApp } from "@/contexts/app-context";
import type { Chapter, ChaptersCollection, Grade, GradeId, GradeSlug } from "@/types/global";
import { createContext, useCallback, useContext, useRef, type ReactNode } from "react";

export interface GradeLevelContextProps {
  chapters: ChaptersCollection & {
    iterateOver: (callback: (chapter: Chapter, index: number) => ReactNode) => ReactNode[] | null;
  };
  activeGrade: {
    id: GradeId;
    slug: GradeSlug;
  };
}

const GradeLevelContext = createContext<GradeLevelContextProps>({
  chapters: { items: {}, order: [], iterateOver: () => null },
  activeGrade: { id: "", slug: "" },
});

export function useGradeLevel() {
  const context = useContext(GradeLevelContext);
  return context;
}

export function GradeLevelProvider({ children, gradeId, chapters }: Readonly<{ children: ReactNode; gradeId: GradeId; chapters: ChaptersCollection }>) {
  const { gradeLevels } = useApp();
  const activeGradeRef = useRef<{
    id: GradeId;
    slug: GradeSlug;
  }>({ id: gradeId, slug: gradeLevels.items[gradeId].slug });

  const chaptersData = useRef<ChaptersCollection>(chapters);

  const iterateOver = useCallback(
    (callback: (chapter: Chapter, index: number) => ReactNode) => {
      return chaptersData.current.order.map((chapterId, i) => callback(chaptersData.current.items[chapterId], i));
    },
    [chaptersData]
  );

  return (
    <GradeLevelContext
      value={{
        activeGrade: activeGradeRef.current,
        chapters: { ...chaptersData.current, iterateOver },
      }}
    >
      {children}
    </GradeLevelContext>
  );
}

export function getActiveGrade() {
  const { getGradeById } = useApp();
  const { activeGrade } = useGradeLevel();
  return getGradeById(activeGrade.id) as Grade;
}

export function useChapters() {
  return useGradeLevel().chapters;
}
