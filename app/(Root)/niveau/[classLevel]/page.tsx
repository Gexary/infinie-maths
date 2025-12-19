"use client";

import CourseCard from "@/components/app/course-card";
import { PremiumPlan } from "@/components/app/premium";
import StylizedText, { StylizedTextPatterns } from "@/components/app/stylized-text";
import { useRouter } from "next/navigation";
import { use } from "react";
import { Chapter } from "../../../../types/global";
import { appData, isClassLevel, type ClassLevel } from "@/core/data";
import NoticeCard from "@/components/app/notice-card";

const stylizedTextStyle = new StylizedTextPatterns({
  "** **": ({ children, params }) => <span className="font-bold">{children}</span>,
  "! !": ({ children, params }) => <span className="text-blue-500">{children}</span>,

  // "{ }": ({ children, params }) => (
  //   <span className="text-red-500">
  //     {children}
  //     {params ? ` (${params})` : ""}
  //   </span>
  // ),
  // "% %": ({ children, params }) => (
  //   <span className="text-green-500">
  //     {children}
  //     {params ? ` (${params})` : ""}
  //   </span>
  // ),
  // "$ $": ({ children, params }) => <span className={`text-[${params}]`}>{children}</span>,
});

export default function Page(props: PageProps<"/niveau/[classLevel]">) {
  const { classLevel } = use(props.params);

  const thisData = isClassLevel(classLevel) ? appData[classLevel] : null;
  if (!thisData) return <div>Page introuvable</div>;
  const { description, title, chapters } = thisData;

  return (
    <>
      <NoticeCard {...thisData.notice} />
      <h1 className="text-white text-center text-3xl font-bold">
        <StylizedText text={title} textStyle={stylizedTextStyle} />
      </h1>
      <p className="text-sm leading-relaxed mt-4">
        <StylizedText text={description} textStyle={stylizedTextStyle} />
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mt-8 gap-4">
        {chapters.map((chapter, i) => (
          <CourseCard key={chapter.slug} i={i} chapter={chapter} classLevel={classLevel as ClassLevel} />
        ))}
      </div>
      <div className="mt-8 w-full">
        <PremiumPlan />
      </div>
    </>
  );
}
