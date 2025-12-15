import { motion } from "motion/react";
import Link from "next/link";

export default function CourseCard({ i }: { i: number }) {
  return (
    <motion.div
      className="bg-gray-950 group p-6 md:p-8 border rounded-xl border-gray-800 cursor-pointer hover:border-blue-500 transition-colors duration-200 ease-in-out"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: i * 0.03,
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <h4 className="text-white/80 text-sm mb-1">Chapitre 1</h4>
      <h1 className="text-lg font-medium group-hover:text-blue-400">Trinôme du second degré</h1>
      <p className="text-sm leading-relaxed mt-2">Étude des fonctions du second degré : forme canonique, signe, variations, résolution d'équations et d'inéquations.</p>
      <div className="mt-4 flex flex-row gap-2 flex-wrap">
        <Link href="" className="bg-blue-500 border border-blue-400 hover:border-blue-300 text-gray-950 font-medium text-sm rounded-full text-nowrap px-3 py-0.5">
          Cours et exercices
        </Link>
        <Link href="" className="bg-blue-500 border border-blue-400 hover:border-blue-300 text-gray-950 font-medium text-sm rounded-full text-nowrap px-3 py-0.5">
          Corrigés
        </Link>
        <Link href="" className="bg-blue-500 border border-blue-400 hover:border-blue-300 text-gray-950 font-medium text-sm rounded-full text-nowrap px-3 py-0.5">
          Vidéos (bientôt)
        </Link>
      </div>
    </motion.div>
  );
}
