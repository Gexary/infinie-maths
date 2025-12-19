"use client";

import CourseCard from "@/components/app/course-card";
import NoticeCard from "@/components/app/notice-card";
import { PremiumPlan } from "@/components/app/premium";
import StylizedText, { StylizedTextPatterns } from "@/components/app/stylized-text";
import { levels, type Level } from "@/core/data";
import { motion } from "motion/react";
import Link from "next/link";

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
      <NoticeCard
        {...{
          title: "Ton espace de maths dédié au lycée.",
          description: "Des cours simples, des exercices corrigés et des entraînements ciblés pour réussir en Seconde, Première et Terminale, à ton rythme.",
        }}
      />
      <h1 className="text-white text-center text-3xl font-bold">Choisis ton niveau</h1>
      <p className="text-sm leading-relaxed mt-4 text-center">
        <StylizedText text={"Chaque parcours te guide pas à pas, du cours aux exercices corrigés."} textStyle={stylizedTextStyle} />
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mt-8 gap-4">
        {levels.map((level, i) => (
          <LevelCard key={i} i={i} level={level} />
        ))}
      </div>
      <div className="mt-8 w-full">
        <PremiumPlan />
      </div>
    </>
  );
}

export function LevelCard({ level, i }: { level: Level; i: number }) {
  return (
    <motion.div
      key={i}
      className="bg-gray-950 group p-6 md:p-8 border rounded-xl border-gray-800 cursor-pointer hover:border-blue-500 transition-colors duration-200 ease-in-out"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: i * 0.03,
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <h4 className="text-white/80 text-sm mb-1">Niveau</h4>
      <h1 className="text-lg font-medium group-hover:text-blue-400">{level.title}</h1>
      <p className="text-sm leading-relaxed mt-2">{level.description}</p>
      <div className="mt-4 flex flex-row gap-2 flex-wrap">
        <Link href="/niveau/premiere" className="bg-orange-500 border border-white/20 text-gray-950 font-medium text-base rounded-full text-nowrap px-8 py-2">
          Accédez à la {level.title}
        </Link>
      </div>
    </motion.div>
  );
}
