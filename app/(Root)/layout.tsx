"use server";

import { AppProvider } from "@/contexts/app-context";
import { getGradesCollection } from "@/db/models/grades-collection";

export default async function PageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const json = await getGradesCollection();

  return <AppProvider gradesCollection={json}>{children}</AppProvider>;
}
