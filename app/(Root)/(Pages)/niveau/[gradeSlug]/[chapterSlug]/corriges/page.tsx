"use client";

import dynamic from "next/dynamic";
const PDFViewer = dynamic(() => import("@/components/app/pdf-viewer"), {
  ssr: false,
});

export default function Page() {
  return <PDFViewer type="correction" />;
}
