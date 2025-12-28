"use client";

import { MotionLink } from "@/components/app/global";
import type { Grade } from "@/types/global";

export default function GradeCard({ grade, index }: { grade: Grade; index: number }) {
  return (
    <MotionLink
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3, ease: "easeOut" }}
      href={`/niveau/${grade.slug}`}
      className="bottom-glow group block size-full cursor-pointer flex-col justify-between rounded-xl border border-gray-800 bg-gray-950 p-6 transition-colors duration-200 ease-in-out hover:border-blue-500"
    >
      <div>
        <h4 className="mb-1 text-sm text-white/80">Niveau</h4>
        <h1 className="text-lg font-medium group-hover:text-blue-400">{grade.name}</h1>
        <p className="mt-2 text-sm leading-relaxed">{grade.summary}</p>
      </div>
      <div className="mt-4">
        <button className="rounded-full border border-blue-500 bg-linear-to-tl from-blue-600 to-blue-500 px-8 py-2 text-base font-medium text-nowrap text-gray-950 outline outline-offset-2 outline-white/20 top-glow">Accédez à la {grade.name}</button>
      </div>
    </MotionLink>
  );
}
