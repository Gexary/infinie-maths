"use client";

import { GradeMainContent } from "@/components/admin/main-content";
import { GradeAlert } from "@/components/admin/form/alert";
import { GradeFormDialog } from "@/components/admin/form/grade-form";
import { GradeHeader } from "@/components/admin/header";

export default function Page() {
  return (
    <>
      {/* Header */}
      <GradeHeader />

      {/* Content */}
      <GradeMainContent />

      {/* Grade Form */}
      <GradeFormDialog />

      {/* Grade Alert */}
      <GradeAlert />
    </>
  );
}
