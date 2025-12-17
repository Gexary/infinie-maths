"use client";

import CourseCard from "@/components/app/course-card";
import { PremiumPlan } from "@/components/app/premium";
import StylizedText, { StylizedTextPatterns } from "@/components/app/stylized-text";
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
      <div className="p-6 md:p-8 bg-white rounded-xl text-gray-950 mt-16 grid grid-cols-1 md:grid-cols-[1fr_512px] gap-8">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold">Ton espace de maths dédié au lycée.</h1>
          <p className="text-base mt-2 leading-relaxed text-gray-800">Des cours simples, des exercices corrigés et des entraînements ciblés pour réussir en Seconde, Première et Terminale, à ton rythme.</p>
          <div className="mt-8 flex flex-row gap-2 flex-wrap">
            <Link href="" className="bg-orange-500 border border-white/20 text-gray-950 font-medium text-base rounded-full text-nowrap px-8 py-2">
              Commencer par la Seconde
            </Link>
            <Link href="" className="bg-orange-500 border border-white/20 text-gray-950 font-medium text-base rounded-full text-nowrap px-8 py-2">
              Aller en Première
            </Link>
          </div>
        </div>
        <div className="bg-gray-950 rounded-xl text-white p-4 md:p-6">
          <h1 className="text-xl font-bold">Comment fonctionne InfinieMaths</h1>
          <p className="text-base mt-2 leading-relaxed text-gray-200">
            Tu choisis ton niveau (Seconde, Première, Terminale). Tu suis un parcours structuré, chapitre par chapitre. Tu t’entraînes avec des exercices corrigés étape par étape. Tu arrives en contrôle ou au Bac en ayant déjà vu l’essentiel.
          </p>
        </div>
      </div>
      <h1 className="text-white text-center mt-8 text-3xl font-bold">Choisis ton niveau</h1>
      <p className="text-sm leading-relaxed mt-4 text-center">
        <StylizedText text={"Chaque parcours te guide pas à pas, du cours aux exercices corrigés."} textStyle={stylizedTextStyle} />
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mt-8 gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
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
              <h1 className="text-lg font-medium group-hover:text-blue-400">Première</h1>
              <p className="text-sm leading-relaxed mt-2">Étude des fonctions du second degré : forme canonique, signe, variations, résolution d'équations et d'inéquations.</p>
              <div className="mt-4 flex flex-row gap-2 flex-wrap">
                <Link href="/premiere" className="bg-orange-500 border border-white/20 text-gray-950 font-medium text-base rounded-full text-nowrap px-8 py-2">
                  Accédez à la Première
                </Link>
              </div>
            </motion.div>
          ))}
      </div>
      <div className="mt-8 w-full">
        <PremiumPlan />
      </div>
    </>
  );
}
