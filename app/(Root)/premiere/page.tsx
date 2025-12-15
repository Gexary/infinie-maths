"use client";

import CourseCard from "@/components/app/course-card";
import { PremiumPlan } from "@/components/app/premium";
import StylizedText, { StylizedTextPatterns } from "@/components/app/stylized-text";

const stylizedTextStyle = new StylizedTextPatterns({
  "** **": ({ children, params }) => (
    <span className="font-bold">
      {children}
      {params ? ` (${params})` : ""}
    </span>
  ),
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

const description =
  "Tu avances pas à pas : chaque notion de cours est suivie immédiatement d'exercices d'application. Commence par **Cours et exercices**, cherche sérieusement, puis utilise **Corrigés** pour comparer ta méthode et progresser en rédaction. Les **vidéos** seront ajoutées progressivement sur les méthodes importantes.";

export default function Page() {
  return (
    <>
      <h1 className="text-white text-center mt-16 text-3xl font-bold">
        Spécialité mathématiques en <span className="text-blue-500">Première</span>
      </h1>
      <p className="text-sm leading-relaxed mt-4">
        <StylizedText text={description} textStyle={stylizedTextStyle} />
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mt-8 gap-4">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <CourseCard key={i} i={i} />
          ))}
      </div>
      <div className="mt-8 w-full">
        <PremiumPlan />
      </div>
    </>
  );
}
