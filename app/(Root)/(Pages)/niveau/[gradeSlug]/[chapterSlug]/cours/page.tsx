"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
const PDFViewer = dynamic(() => import("@/components/app/pdf-viewer"), {
  ssr: false,
});

export default function Page() {
  return <PDFViewer />;
}

export function TableOfContents() {
  return (
    <div className="w-full">
      <div className="h-fit rounded-none border-b bg-transparent p-0">
        <Link className="text-xl font-medium relative rounded-none inline-block px-4 py-2 bg-transparent shadow-none data-[state=active]:shadow-[inset_0_-2px_0_0_var(--color-primary)]" href={""} data-state="active">
          Cours
        </Link>
        <Link className="text-xl font-medium relative rounded-none inline-block px-4 py-2 bg-transparent shadow-none data-[state=active]:shadow-[inset_0_-2px_0_0_var(--color-primary)]" href={""}>
          Corrigés
        </Link>
        <Link className="text-xl font-medium relative rounded-none inline-block px-4 py-2 bg-transparent shadow-none data-[state=active]:shadow-[inset_0_-2px_0_0_var(--color-primary)]" href={""}>
          Vidéos
        </Link>
      </div>
    </div>
  );
}
