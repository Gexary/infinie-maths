"use client";

import StylizedText from "@/components/app/stylized-text";
import dynamic from "next/dynamic";
import { ChapterList } from "@/app/(Root)/course/[classLevel]/[courseSlug]/chapters";
import { PageBreadcrumbList } from "@/app/(Root)/course/[classLevel]/[courseSlug]/breadcrumbs";
import { use } from "react";
import { appData, isClassLevel, type ClassLevel } from "@/core/data";
const PDFViewer = dynamic(() => import("@/components/app/pdf-viewer"), { ssr: false });

export default function Page(props: PageProps<"/course/[classLevel]/[courseSlug]">) {
  const { classLevel, courseSlug } = use(props.params);

  const thisData = isClassLevel(classLevel) ? appData[classLevel] : null;
  if (!thisData) return <div>Page introuvable</div>;

  return (
    <>
      <PageBreadcrumbList />
      <h1 className="text-white mt-4 text-3xl font-bold">Trinôme du second degré</h1>
      <p className="text-base leading-relaxed mt-2">
        <StylizedText text={"Étude des fonctions du second degré : forme canonique, signe, variations, résolution d'équations et d'inéquations."} />
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 mt-8">
        <ChapterList classLevel={classLevel as ClassLevel} courseSlug={courseSlug} />
        <div className="w-full">
          <PDFViewer />
        </div>
      </div>
    </>
  );
}
