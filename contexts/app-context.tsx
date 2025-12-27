"use client";

import type { Grade, GradeId, GradesCollection } from "@/types/global";
import { createContext, useCallback, useContext, useRef, type ReactNode } from "react";

export interface AppContextProps {
  gradeLevels: GradesCollection & {
    iterateOver: (callback: (grade: Grade, index: number) => ReactNode) => ReactNode[] | null;
  };
  getGradeById: (id: GradeId) => Grade | null;
}

const AppContext = createContext<AppContextProps | null>(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within a AppContextProvider");
  return context;
}

export function AppProvider({ children, gradesCollection }: Readonly<{ children: ReactNode; gradesCollection: GradesCollection }>) {
  const gradesData = useRef<GradesCollection>(gradesCollection);

  const iterateOver = useCallback(
    (callback: (grade: Grade, index: number) => ReactNode) => {
      return gradesData.current.order.map((gradeId, i) => callback(gradesData.current.items[gradeId], i));
    },
    [gradesData]
  );

  const getGradeById = useCallback((id: GradeId) => gradesData.current.items[id] ?? null, [gradesData]);

  return <AppContext value={{ gradeLevels: { ...gradesData.current, iterateOver }, getGradeById }}>{children}</AppContext>;
}

export function useGradeLevels() {
  return useApp().gradeLevels;
}
