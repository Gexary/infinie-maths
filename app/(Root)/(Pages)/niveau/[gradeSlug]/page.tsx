"use client";

import CourseCard from "@/components/app/course-card";
import { PremiumPlan } from "@/components/app/premium";
import StylizedText from "@/components/app/stylized-text";
import NoticeCard from "@/components/app/notice-card";
import { getActiveGrade, useChapters } from "@/contexts/grade-level-context";
import Link from "next/link";
import GridBackground from "@/components/effects/GridBackground";

export default function Page() {
  const activeGrade = getActiveGrade();
  const { iterateOver } = useChapters();

  return (
    <>
      {/* Hero Section */}
      {activeGrade.hero ? <NoticeCard {...activeGrade.hero} /> : null}

      {/* Grade Information */}
      <h1 className="text-center text-3xl font-bold text-white relative">
        <div className="absolute top-1/2 left-1/2 w-2xl h-16 bg-blue-500 blur-3xl rounded-[100%] opacity-40 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <GridBackground width={800} height={600} cellSize={32} borderColor="rgba(255,255,255,0.05)" />
        </div>
        <StylizedText text={activeGrade.title} />
      </h1>
      <StylizedText text={activeGrade.description} className="mt-4 text-sm leading-relaxed" />

      {/* Chapters List Section */}
      <div className="mt-8 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {iterateOver((chapter, i) => (
          <CourseCard key={chapter.slug} index={i} chapter={chapter} />
        ))}
      </div>

      {/* Premium Plan Section */}
      <div className="mt-8 w-full">
        <PremiumPlan />
      </div>
    </>
  );
}
