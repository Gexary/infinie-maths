import type { ClassLevel } from "@/core/data";
import type { Chapter } from "@/types/global";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CourseCard({ i, chapter, classLevel }: { i: number; chapter: Chapter; classLevel: ClassLevel }) {
  const { title, description, annotation } = chapter;
  const rooter = useRouter();

  return (
    <motion.div
      className="bg-gray-950 group p-6 md:p-6 border rounded-xl border-gray-800 cursor-pointer hover:border-blue-500 transition-colors duration-200 ease-in-out"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: i * 0.03,
        duration: 0.3,
        ease: "easeOut",
      }}
      onClick={() => rooter.push(`/course/${classLevel}/${chapter.slug}`)}
    >
      <h4 className="text-white/80 text-sm mb-1">{annotation}</h4>
      <h1 className="text-lg font-medium group-hover:text-blue-400">{title}</h1>
      <p className="text-sm leading-relaxed mt-2">{description}</p>
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
