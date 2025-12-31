"use client";

import { getActiveChapter } from "@/contexts/chapter-context";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("@/components/app/pdf/pdf-viewer"), {
  ssr: false,
});

export default function Page() {
  const activeChapter = getActiveChapter();
  return <PDFViewer url={activeChapter.correctionsPDFUrl ?? ""} />;
}
