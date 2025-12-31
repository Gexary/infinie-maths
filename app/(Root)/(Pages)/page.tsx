"use client";

import GradeCard from "@/components/app/grade-card";
import NoticeCard from "@/components/app/notice-card";
import { PremiumPlan } from "@/components/app/premium";
import StylizedText from "@/components/app/stylized-text";
import GridBackground from "@/components/effects/GridBackground";
import { useApp } from "@/contexts/app-context";

const HOME_PAGE_NOTICE = `# Comment fonctionne InfinieMaths
--
Tu choisis ton niveau (Seconde, Première, Terminale).
Tu suis un parcours structuré, chapitre par chapitre.
Tu t'entraînes avec des exercices corrigés étape par étape.
Tu arrives en contrôle ou au Bac en ayant déjà vu l'essentiel.
--`;

export default function Page() {
  const { gradeLevels } = useApp();

  return (
    <>
      {/* Hero Section */}
      <NoticeCard title="Ton espace de maths dédié au lycée." description="Des cours simples, des exercices corrigés et des entraînements ciblés pour réussir en Seconde, Première et Terminale, à ton rythme." notice={HOME_PAGE_NOTICE} />

      {/* Grade Levels Selection Section */}
      <h1 className="text-center text-3xl font-bold text-white relative">
        <div className="absolute top-1/2 left-1/2 w-xl h-16 bg-blue-500 blur-3xl rounded-[100%] opacity-40 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <GridBackground width={800} height={600} cellSize={32} borderColor="rgba(255,255,255,0.05)" />
        </div>
        Choisis ton niveau
      </h1>
      <StylizedText text="Chaque parcours te guide pas à pas, du cours aux exercices corrigés." className="mt-4 text-center text-sm leading-relaxed" />
      <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {gradeLevels.iterateOver((grade, i) => (
          <GradeCard key={grade.slug} index={i} grade={grade} />
        ))}
      </div>

      {/* Premium Plan Section */}
      <div className="mt-8 w-full">
        <PremiumPlan />
      </div>
    </>
  );
}
