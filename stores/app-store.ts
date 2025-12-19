import type { Chapter, ChapterSlug } from "@/types/global";
import { create } from "zustand";

type State = {
  chapters: Record<ChapterSlug, Chapter>;
  activeChapter: ChapterSlug;
};

export const useAppStore = create<State>((set) => ({
  chapters: {
    "0": { slug: "0", description: "Étude des fonctions du **second** degré : forme canonique, signe, variations, résolution d'équations et d'inéquations.", title: "Trinôme du second degré" },
    "1": { slug: "1", description: "Étude des fonctions du **second** degré : forme canonique, signe, variations, résolution d'équations et d'inéquations.", title: "Probabilité conditionnelle et variable aléatoire" },
    "2": { slug: "2", description: "Étude des fonctions du **second** degré : forme canonique, signe, variations, résolution d'équations et d'inéquations.", title: "Dérivation" },
    "3": { slug: "3", description: "Étude des fonctions du **second** degré : forme canonique, signe, variations, résolution d'équations et d'inéquations.", title: "Suites numériques" },
  },
  chapterOrder: ["0", "1", "2", "3"],
  activeChapter: "0",
}));
