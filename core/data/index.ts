import { chapters as premiereChapters } from "@/core/data/seconde";
import { chapters as secondeChapters } from "@/core/data/premiere";
import { chapters as terminaleChapters } from "@/core/data/premiere";
import type { Chapter } from "@/types/global";
import type { NoticeProps } from "@/components/app/notice-card";

export type ClassLevel = "premiere" | "seconde" | "terminale";

export interface ClassLevelData {
  title: string;
  description: string;
  chapters: Chapter[];
  notice: NoticeProps;
}

export interface Level {
  title: string;
  description: string;
  href: string;
}

export const levels: Level[] = [
  {
    title: "Seconde",
    description: "Spécialité Maths ou tronc commun, travaille ce qui compte pour la suite. Fiches claires, exercices type contrôle et entraînements progressifs.",
    href: "/niveau/seconde",
  },
  {
    title: "Première",
    description: "Revois les bases calmement : fonctions, équations, géométrie, statistiques… Des explications simples, des exemples détaillés et des exercices pour reprendre confiance.",
    href: "/niveau/premiere",
  },
  {
    title: "Terminale",
    description: "Prépare le Bac avec sérieux : annales, exercices clés et rappels de cours ciblés pour éviter les pièges le jour J.",
    href: "/niveau/terminale",
  },
];

export const appData: Record<ClassLevel, ClassLevelData> = {
  premiere: {
    title: "Spécialité mathématiques en !Première!",
    description:
      "Tu avances pas à pas : chaque notion de cours est suivie immédiatement d'exercices d'application. Commence par **Cours et exercices**, cherche sérieusement, puis utilise **Corrigés** pour comparer ta méthode et progresser en rédaction. Les **vidéos** seront ajoutées progressivement sur les méthodes importantes.",
    chapters: premiereChapters,
    notice: {
      title: "La Première : consolider et approfondir.",
      description: "En Première, les maths deviennent plus techniques, mais restent accessibles avec une bonne méthode : trinôme, probabilités, dérivation, suites, fonction exponentielle, trigonométrie, produit scalaire… tout est lié.",
    },
  },

  seconde: {
    title: "Chapitres de mathématiques en !Seconde!",
    description:
      "Tu avances pas à pas : chaque notion de cours est suivie immédiatement d'exercices d'application. Commence par **Cours et exercices**, cherche sérieusement, puis utilise **Corrigés** pour comparer ta méthode et progresser en rédaction. Les **vidéos** seront ajoutées progressivement sur les méthodes importantes.",
    chapters: secondeChapters,

    notice: {
      title: "La Seconde : poser des bases solides.",
      description: "En Seconde, on revoit les fondamentaux et on découvre les outils qui serviront en Première et Terminale : nombres réels, géométrie, calcul littéral, fonctions, statistiques, probabilités…",
    },
  },

  terminale: {
    title: "Spécialité mathématiques en !Terminale!",
    description:
      "Tu avances pas à pas : chaque notion de cours est suivie immédiatement d'exercices d'application. Commence par **Cours et exercices**, cherche sérieusement, puis utilise **Corrigés** pour comparer ta méthode et progresser en rédaction. Les **vidéos** seront ajoutées progressivement sur les méthodes importantes.",
    chapters: terminaleChapters,
    notice: {
      title: "La Terminale : approfondir et réussir le bac en maths.",
      description:
        "En Terminale, tu consolides tes bases et tu te prépares sérieusement à l'épreuve de mathématiques du bac. Chaque chapitre te propose un cours avec ses exercices, des corrigés détaillés et des vidéos de méthode pour t'aider à progresser pas à pas...",
    },
  },
};

export function isClassLevel(value: string): value is ClassLevel {
  return value in appData;
}
