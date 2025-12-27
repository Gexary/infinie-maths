"use client";

import { useAdmin } from "@/contexts/admin/admin-context";
import { useApp } from "@/contexts/app-context";
import { useDialog, type DialogHandler } from "@/hooks/use-dialog";
import type { CreateChapterSchema } from "@/lib/validation";
import type { Chapter, ChapterId, ChaptersCollection, Grade, GradeId, GradeSlug } from "@/types/global";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type z from "zod";

interface ActiveGradeProps {
  id: GradeId;
  slug: GradeSlug;
}

export interface AdminGradeContextProps {
  chapterCount: number;
  chapters: ChaptersCollection & {
    iterateOver: (callback: (chapter: Chapter, chapterId: ChapterId, index: number) => ReactNode) => ReactNode[] | null;
    setOrder: (callback: (prev: ChapterId[]) => ChapterId[]) => void;
  };
  getChapterById(chapterId?: ChapterId | null): Chapter | null;

  // CRUD Chapters
  addChapter: (chapter: z.infer<typeof CreateChapterSchema>) => any;
  deleteChapter: (chapterId: ChapterId) => any;
  updateChapter: (chapterId: ChapterId, data: Partial<z.infer<typeof CreateChapterSchema>>) => any;
  setOrder: (callback: (prev: ChapterId[]) => ChapterId[]) => void;

  chapterForm: DialogHandler<{ toEdit: ChapterId }>;
  chapterAlert: DialogHandler<{ toDelete: ChapterId }>;

  activeGrade: ActiveGradeProps;
  getActiveGrade(): Grade;

  editChapterKey: (chapterId: ChapterId, key: keyof Chapter, value: any) => void;
}

const AdminGradeContext = createContext<AdminGradeContextProps | null>(null);

export function useAdminGrade() {
  const context = useContext(AdminGradeContext);
  if (!context) throw new Error("useAdminGrade must be used within a AdminGradeProvider");
  return context;
}

export function AdminGradeProvider({ children, data: { activeGradeData, chaptersData } }: Readonly<{ children: ReactNode; data: { activeGradeData: ActiveGradeProps; chaptersData: ChaptersCollection } }>) {
  const { getGradeById } = useAdmin();

  const [chapters, setChapters] = useState<ChaptersCollection>(chaptersData);
  const [activeGrade, setActiveGradeState] = useState<ActiveGradeProps>(activeGradeData);
  const [chapterCount, setChapterCount] = useState(chapters.order.length);

  const chapterForm = useDialog<{ toEdit: ChapterId }>();
  const chapterAlert = useDialog<{ toDelete: ChapterId }>();

  const iterateOver = useCallback(
    (callback: (chapter: Chapter, chapterId: ChapterId, index: number) => ReactNode) => {
      return chapters.order.map((chapterId, i) => callback(chapters.items[chapterId], chapterId, i));
    },
    [chapters]
  );

  const getChapterById = useCallback((chapterId?: ChapterId | null) => (chapterId ? (chapters.items[chapterId] ?? null) : null), [chapters]);

  const getActiveGrade = useCallback(() => getGradeById(activeGrade.id) as Grade, [activeGrade, getGradeById]);

  const addChapter = useCallback(
    async (chapter: z.infer<typeof CreateChapterSchema>) => {
      try {
        const result = await fetch("/api/chapter", {
          method: "POST",
          body: JSON.stringify({
            gradeId: activeGrade.id,
            data: chapter,
          }),
        });
        if (!result.ok) throw new Error("Erreur lors de la création du chapitre");
        const { id, ...rest } = await result.json();
        setChapters((prev) => {
          const newChapters = {
            ...prev,
            items: { ...prev.items, [id]: rest },
            order: [...prev.order, id],
          };
          setChapterCount(newChapters.order.length);
          return newChapters;
        });
        return true;
      } catch (error) {
        toast("Erreur lors de la création du chapitre", {
          description: "Une erreur est survenue lors de la création du chapitre. Veuillez réessayer.",
        });
        console.error("Erreur lors de la création du chapitre:", error);
        return false;
      }
    },
    [setChapters, setChapterCount]
  );

  const deleteChapter = useCallback(
    async (chapterId: ChapterId) => {
      try {
        const result = await fetch(`/api/chapter`, {
          method: "DELETE",
          body: JSON.stringify({ id: chapterId }),
        });
        if (!result.ok) throw new Error("Erreur lors de la suppression du chapitre");
        setChapters((prev) => {
          const newChapters = {
            items: Object.fromEntries(Object.entries(prev.items).filter(([id]) => id !== chapterId)),
            order: prev.order.filter((id) => id !== chapterId),
          };
          setChapterCount(newChapters.order.length);
          return newChapters;
        });
        return true;
      } catch (error) {
        toast("Erreur lors de la suppression du chapitre", {
          description: "Une erreur est survenue lors de la suppression du chapitre. Veuillez réessayer.",
        });
        console.error("Erreur lors de la suppression du chapitre:", error);
        return false;
      }
    },
    [activeGrade, setChapters]
  );

  const updateChapter = useCallback(
    async (chapterId: ChapterId, data: Partial<z.infer<typeof CreateChapterSchema>>) => {
      try {
        const result = await fetch(`/api/chapter`, {
          method: "PATCH",
          body: JSON.stringify({
            id: chapterId,
            data,
          }),
        });
        if (!result.ok) throw new Error("Erreur lors de la modification du chapitre");
        const { id, ...rest } = await result.json();
        setChapters((prev) => {
          const newChapters = {
            ...prev,
            items: {
              ...prev.items,
              [id]: { ...prev.items[id], ...rest },
            },
          };
          setChapterCount(newChapters.order.length);
          return newChapters;
        });
        return true;
      } catch (error) {
        toast("Erreur lors de la modification du chapitre", {
          description: "Une erreur est survenue lors de la modification du chapitre. Veuillez réessayer.",
        });
        console.error("Erreur lors de la modification du chapitre:", error);
        return false;
      }
    },
    [setChapters, setChapterCount]
  );

  const editChapterKey = useCallback(
    (chapterId: ChapterId, key: keyof Chapter, value: string) => {
      setChapters((prev) => {
        const newChapters = {
          ...prev,
          items: {
            ...prev.items,
            [chapterId]: {
              ...prev.items[chapterId],
              [key]: value,
            },
          },
        };
        setChapterCount(newChapters.order.length);
        return newChapters;
      });
    },
    [setChapters, setChapterCount]
  );

  const setOrder = useCallback(
    async (callback: (prev: ChapterId[]) => ChapterId[]) => {
      let newOrder, isChanged;
      setChapters((prev) => {
        const prevOrder = prev.order;
        newOrder = callback(prevOrder);
        if (JSON.stringify(prevOrder) === JSON.stringify(newOrder)) {
          isChanged = false;
          return prev;
        }
        setChapterCount(newOrder.length);
        return { ...prev, order: newOrder };
      });
      try {
        const result = await fetch(`/api/chapter/order`, {
          method: "PATCH",
          body: JSON.stringify({ order: newOrder }),
        });
        if (!result.ok) throw new Error("Erreur lors de la modification du niveau");
        toast("Niveaux modifiés avec succès");
        return true;
      } catch (error) {
        toast("Erreur lors de la modification du niveau", {
          description: "Une erreur est survenue lors de la modification du niveau. Veuillez réessayer.",
        });
        console.error("Erreur lors de la modification du niveau:", error);
        return false;
      }
    },
    [setChapters, setChapterCount]
  );

  return (
    <AdminGradeContext
      value={{
        activeGrade,
        chapterCount,
        chapters: { ...chapters, iterateOver, setOrder },
        getChapterById,

        addChapter,
        deleteChapter,
        updateChapter,
        setOrder,

        chapterForm,
        chapterAlert,
        getActiveGrade,
        editChapterKey,
      }}
    >
      {children}
    </AdminGradeContext>
  );
}

export function useAdminChapters() {
  return useAdminGrade().chapters;
}
