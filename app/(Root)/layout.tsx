"use server";

import { AppProvider } from "@/contexts/app-context";
import { getGradesCollection } from "@/db/models/grades-collection";

export default async function PageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gradesCollection = await getGradesCollection();

  return <AppProvider gradesCollection={gradesCollection}>{children}</AppProvider>;
}
