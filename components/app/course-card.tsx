import { useGradeLevel } from "@/contexts/grade-level-context";
import type { Chapter } from "@/types/global";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CourseCard({ index, chapter }: { index: number; chapter: Chapter }) {
  const { title, description, annotation } = chapter;
  const { activeGrade } = useGradeLevel();
  const rooter = useRouter();

  return (
    <motion.div
      className="group cursor-pointer rounded-xl border border-gray-800 bg-gray-950 p-6 transition-colors duration-200 ease-in-out hover:border-blue-500 md:p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.03,
        duration: 0.3,
        ease: "easeOut",
      }}
      onClick={() => rooter.push(`/niveau/${activeGrade.slug}/${chapter.slug}/cours`)}
    >
      <h4 className="mb-1 text-sm text-white/80">{annotation}</h4>
      <h1 className="text-lg font-medium group-hover:text-blue-400">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed">{description}</p>
      <div className="mt-4 flex flex-row flex-wrap gap-2">
        <Link href="" className="rounded-full border border-blue-400 bg-blue-500 px-3 py-0.5 text-sm font-medium text-nowrap text-gray-950 hover:border-blue-300">
          Cours et exercices
        </Link>
        {!!true && (
          <Link href="" className="rounded-full border border-blue-400 bg-blue-500 px-3 py-0.5 text-sm font-medium text-nowrap text-gray-950 hover:border-blue-300">
            Corrigés
          </Link>
        )}
        {!!chapter.videoUrl && (
          <Link href="" className="rounded-full border border-blue-400 bg-blue-500 px-3 py-0.5 text-sm font-medium text-nowrap text-gray-950 hover:border-blue-300">
            Vidéos (bientôt)
          </Link>
        )}
      </div>
    </motion.div>
  );
}
