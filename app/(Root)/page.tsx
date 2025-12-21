"use client";

import NoticeCard from "@/components/app/notice-card";
import { PremiumPlan } from "@/components/app/premium";
import StylizedText from "@/components/app/stylized-text";
import { levels, type Level } from "@/core/data";
import { motion } from "motion/react";
import Link from "next/link";

const HOME_PAGE_NOTICE = `
#Comment fonctionne InfinieMaths
--
Tu choisis ton niveau (Seconde, Première, Terminale).
Tu suis un parcours structuré, chapitre par chapitre.
Tu t'entraînes avec des exercices corrigés étape par étape.
Tu arrives en contrôle ou au Bac en ayant déjà vu l'essentiel.
--`;

export default function Page() {
  return (
    <>
      <NoticeCard
        {...{
          title: "Ton espace de maths dédié au lycée.",
          description:
            "Des cours simples, des exercices corrigés et des entraînements ciblés pour réussir en Seconde, Première et Terminale, à ton rythme.",
        }}
        notice={HOME_PAGE_NOTICE}
      />
      <h1 className="text-center text-3xl font-bold text-white">
        Choisis ton niveau
      </h1>
      <p className="mt-4 text-center text-sm leading-relaxed">
        <StylizedText text="Chaque parcours te guide pas à pas, du cours aux exercices corrigés." />
      </p>
      <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
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

const MotionLink = motion(Link);

export function LevelCard({ level, i }: { level: Level; i: number }) {
  return (
    <MotionLink
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: i * 0.03,
        duration: 0.3,
        ease: "easeOut",
      }}
      href="/niveau/premiere"
      className="group block size-full cursor-pointer flex-col justify-between rounded-xl border border-gray-800 bg-gray-950 p-6 transition-colors duration-200 ease-in-out hover:border-blue-500"
    >
      <div>
        <h4 className="mb-1 text-sm text-white/80">Niveau</h4>
        <h1 className="text-lg font-medium group-hover:text-blue-400">
          {level.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed">{level.description}</p>
      </div>
      <div className="mt-4">
        <button className="rounded-full border border-white/20 bg-orange-500 px-8 py-2 text-base font-medium text-nowrap text-gray-950">
          Accédez à la {level.title}
        </button>
      </div>
    </MotionLink>
  );
}
