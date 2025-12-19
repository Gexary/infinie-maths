"use client";

import { appData, type ClassLevel } from "@/core/data";
import { ArrowUpRightIcon, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export function ChapterList({ classLevel, courseSlug }: { classLevel: ClassLevel; courseSlug: string }) {
  const { chapters } = appData[classLevel];

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCollapsed((prev) => {
      const newValue = !prev;
      if (chapterRef.current) {
        if (chapterRef.current && newValue) {
          chapterRef.current.style.maxHeight = `${chapterRef.current.scrollHeight}px`;
          setTimeout(() => {
            if (chapterRef.current) chapterRef.current.style.maxHeight = `0px`;
          }, 10);
        } else if (chapterRef.current) {
          chapterRef.current.style.maxHeight = `0px`;
          setTimeout(() => {
            if (chapterRef.current) chapterRef.current.style.maxHeight = `${chapterRef.current.scrollHeight}px`;
          }, 10);
        }
      }
      return newValue;
    });
  };

  const chapterRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-full relative z-10 lg:max-w-xs h-fit overflow-hidden bg-gray-950 rounded-md border border-gray-800">
      <div className="w-full">
        <div className="shadow-[0_1px_0_0_var(--color-gray-800)] flex items-center justify-between text-blue-500 px-6 py-4 bg-blue-500/10">
          <h2 className="font-semibold text-lg">Chapitres</h2>
          <Link className="flex items-center justify-center size-8 rounded-md transition hover:bg-blue-100/5 cursor-pointer" href={`/niveau/${classLevel}`}>
            <ArrowUpRightIcon className="size-5" />
          </Link>
          {/* <button onClick={toggleCollapsed} className="flex items-center justify-center size-8 rounded-md transition hover:bg-blue-100/5 cursor-pointer">
            <ChevronDownIcon className={`size-5 transition-transform duration-300 ease-in-out ${collapsed ? "rotate-180" : ""}`} />
          </button> */}
        </div>
        <div ref={chapterRef} className="divide-y divide-gray-800 transition-all duration-1000 ease-in-out overflow-hidden">
          {chapters.map(({ slug, title }) => {
            const active = slug === courseSlug;
            return (
              <Link
                key={slug}
                className={`block cursor-pointer transition px-6 py-3 ${active ? "bg-blue-500/10" : "hover:bg-gray-900/50"}`}
                style={{ boxShadow: active ? "inset 2px 0 0 0 var(--color-blue-600)" : "none" }}
                href={`/course/${classLevel}/${slug}`}
              >
                <p className={`truncate font-medium text-sm ${active ? "text-white" : "text-gray-300"}`}>{title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
