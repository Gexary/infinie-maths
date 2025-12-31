"use server";

import { AdminProvider } from "@/contexts/admin/admin-context";
import { getAdminGradesCollection } from "@/db/models/grades-collection";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gradesCollection = await getAdminGradesCollection();

  return (
    <AdminProvider data={{ gradeLevels: gradesCollection }}>
      <div className="min-h-screen bg-background">{children}</div>
    </AdminProvider>
  );
}
