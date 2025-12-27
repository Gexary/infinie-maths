"use client";

import { ChapterMainContent } from "@/components/admin/main-content";
import { ChapterAlert } from "@/components/admin/form/alert";
import { ChapterFormDialog } from "@/components/admin/form/chapter-form";
import { ChapterHeader } from "@/components/admin/header";

export default function GradePage() {
  return (
    <>
      {/* Header */}
      <ChapterHeader />

      {/* Content */}
      <ChapterMainContent />

      {/* Chapter Form */}
      <ChapterFormDialog />

      {/* Chapter Alert */}
      <ChapterAlert />
    </>
  );
}
