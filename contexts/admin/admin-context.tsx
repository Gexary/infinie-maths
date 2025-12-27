"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Grade, GradeId, GradesCollection, GradeSlug } from "@/types/global";
import { toast } from "sonner";
import { useDialog, type DialogHandler } from "@/hooks/use-dialog";

export interface AdminContextProps {
  gradeCount: number;
  gradeLevels: GradesCollection & {
    iterateOver: (callback: (grade: Grade, gradeId: GradeId, index: number) => ReactNode) => ReactNode[] | null;
    setOrder: (callback: (prev: GradeId[]) => GradeId[]) => void;
  };
  getGradeById(gradeId?: GradeId | null): Grade | null;

  // Grades CRUD Functions
  addGrade: (grade: Grade) => any;
  updateGrade: (gradeId: GradeId, data: Partial<Grade>) => any;
  deleteGrade: (gradeId: GradeId) => any;

  gradeForm: DialogHandler<{ toEdit: GradeId }>;
  gradeAlert: DialogHandler<{ toDelete: GradeId }>;
}

const AdminContext = createContext<AdminContextProps | null>(null);

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
}

interface AdminProviderProps {
  children: ReactNode;
  data: {
    gradeLevels: GradesCollection;
  };
}

export function AdminProvider({ children, data }: AdminProviderProps) {
  const [gradeLevels, setGradeLevels] = useState<GradesCollection>(data.gradeLevels);
  const gradeCount = gradeLevels.order.length;
  const gradeForm = useDialog<{ toEdit: GradeId }>();
  const gradeAlert = useDialog<{ toDelete: GradeId }>();
  const [activeGrade, setActiveGradeState] = useState<{ id: GradeId; slug: GradeSlug } | null>(null);

  // Iterators
  const iterateOver = useCallback((callback: (grade: Grade, gradeId: GradeId, index: number) => ReactNode) => gradeLevels.order.map((id, i) => callback(gradeLevels.items[id], id, i)), [gradeLevels]);

  // CRUD Grades
  const addGrade = useCallback(
    async (grade: Grade) => {
      try {
        const result = await fetch("/api/grade", {
          method: "POST",
          body: JSON.stringify(grade),
        });
        if (!result.ok) throw new Error("Erreur lors de la création du niveau");
        const { id, ...rest } = await result.json();
        setGradeLevels((prev) => ({
          ...prev,
          items: { ...prev.items, [id]: rest },
          order: [...prev.order, id],
        }));
        return true;
      } catch (error) {
        toast("Erreur lors de la création du niveau", {
          description: "Une erreur est survenue lors de la création du niveau. Veuillez réessayer.",
        });
        console.error("Erreur lors de la création du niveau:", error);
        return false;
      }
    },
    [setGradeLevels]
  );

  const updateGrade = useCallback(
    async (gradeId: GradeId, data: Partial<Grade>) => {
      try {
        const result = await fetch(`/api/grade`, {
          method: "PATCH",
          body: JSON.stringify({
            id: gradeId,
            data,
          }),
        });
        if (!result.ok) throw new Error("Erreur lors de la modification du niveau");
        const { id, ...rest } = await result.json();
        setGradeLevels((prev) => ({
          ...prev,
          items: {
            ...prev.items,
            [id]: { ...prev.items[id], ...rest },
          },
        }));
        return true;
      } catch (error) {
        toast("Erreur lors de la modification du niveau", {
          description: "Une erreur est survenue lors de la modification du niveau. Veuillez réessayer.",
        });
        console.error("Erreur lors de la modification du niveau:", error);
        return false;
      }
    },
    [setGradeLevels]
  );

  const deleteGrade = useCallback(
    async (gradeId: GradeId) => {
      try {
        const result = await fetch(`/api/grade`, {
          method: "DELETE",
          body: JSON.stringify({ id: gradeId }),
        });
        if (!result.ok) throw new Error("Erreur lors de la suppression du niveau");
        setGradeLevels((prev) => ({
          items: Object.fromEntries(Object.entries(prev.items).filter(([id]) => id !== gradeId)),
          order: prev.order.filter((id) => id !== gradeId),
        }));
        if (activeGrade?.id === gradeId) setActiveGradeState(null);
        return true;
      } catch (error) {
        toast("Erreur lors de la suppression du niveau", {
          description: "Une erreur est survenue lors de la suppression du niveau. Veuillez réessayer.",
        });
        console.error("Erreur lors de la suppression du niveau:", error);
        return false;
      }
    },
    [activeGrade, setGradeLevels, setActiveGradeState]
  );

  const getGradeById = useCallback((gradeId?: GradeId | null) => (gradeId ? (gradeLevels.items[gradeId] ?? null) : null), [gradeLevels]);

  const setOrder = useCallback(
    async (callback: (prev: GradeId[]) => GradeId[]) => {
      let newOrder, isChanged;
      setGradeLevels((prev) => {
        const prevOrder = prev.order;
        newOrder = callback(prevOrder);
        if (JSON.stringify(prevOrder) === JSON.stringify(newOrder)) {
          isChanged = false;
          return prev;
        }
        return { ...prev, order: callback(prev.order) };
      });
      try {
        const result = await fetch(`/api/grade/order`, {
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
    [setGradeLevels]
  );

  return (
    <AdminContext.Provider
      value={{
        gradeLevels: { ...gradeLevels, iterateOver, setOrder },
        gradeCount,

        addGrade,
        updateGrade,
        deleteGrade,

        gradeForm,
        gradeAlert,

        getGradeById,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
