"use client";

import NoticeCard from "@/components/app/notice-card";
import GridBackground from "@/components/effects/GridBackground";

const HOME_PAGE_NOTICE = `
# Pour qui ?
--
Élèves qui veulent remonter leurs notes en maths.
Parents qui cherchent un cadre de travail clair pour leur enfant.
Professeurs qui veulent des exercices supplémentaires à proposer.
--
# Ce que tu gagnes :
Moins de stress avant les contrôles, plus de méthode, plus de confiance le jour du Bac.
`;

const NOTICE_DESCRIPTION = `
Tu veux vraiment progresser en maths, sans te perdre dans des ressources partout sur internet ? Avec le Pass Premium InfinieMaths, tu as accès à un espace structuré qui t'indique quoi travailler, comment, et dans quel ordre.
--
Des cours structurés, clairs et sans blabla inutile.
Des exercices corrigés étape par étape.
Des parcours de révision pour les contrôles et le Bac.
Des mises à jour régulières avec de nouveaux sujets et corrigés.
--
Sans engagement. Tu peux arrêter quand tu veux.
`;

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <NoticeCard title="⚡ Pass Premium InfinieMaths" description={NOTICE_DESCRIPTION} notice={HOME_PAGE_NOTICE} buttons={false} />

      {/* Grade Levels Selection Section */}
      <h1 className="text-center text-3xl font-bold text-white relative">
        <div className="absolute top-1/2 left-1/2 w-xl h-16 bg-blue-500 blur-3xl rounded-[100%] opacity-40 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <GridBackground width={800} height={600} cellSize={32} borderColor="rgba(255,255,255,0.05)" />
        </div>
        Chapitres disponibles
      </h1>
    </>
  );
}
