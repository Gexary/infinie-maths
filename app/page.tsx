"use client";

import { ComponentExample } from "@/components/component-example";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { CheckIcon } from "lucide-react";
import PixelGridBackground from "@/components/effects/PixelGridBackground";

interface NavLinkProps {
  href: string;
  name: string;
  icon?: React.ReactNode;
  active?: boolean;
}

const navLinks: NavLinkProps[] = [
  {
    href: "/",
    name: "Accueil",
  },
  {
    href: "/seconde",
    name: "Seconde",
  },
  {
    href: "/premiere",
    name: "Première",
  },
  {
    href: "/terminale",
    name: "Terminale",
    active: true,
  },
  {
    href: "/premium",
    name: "Pass Premium",
  },
];

export default function Page() {
  return (
    <div className="size-full bg-gray-900 min-h-screen">
      <div className="w-full h-16 bg-gray-950 flex flex-row justify-between items-center px-16">
        <div>Les maths du lycée, simplement.</div>
        <div className="flex flex-row gap-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn("hover:text-white/80 hover:underline px-4 py-1 rounded-full border text-base text-white border-transparent", {
                "text-primary border-primary": link.active,
              })}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <h1 className="text-white text-center mt-16 text-3xl font-bold">
        Spécialité mathématiques en <span className="text-blue-500">Première</span>
      </h1>
      <div className="grid grid-cols-3 px-80 mt-8 gap-4">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <CourseCard key={i} i={i} />
          ))}
      </div>
      <div className="px-80 mt-8">
        <SubscriptionPlan />
      </div>
      <footer className="w-full bg-gray-950 mt-16">test</footer>
    </div>
  );
}

export function CourseCard({ i }: { i: number }) {
  return (
    <motion.div
      className="bg-gray-950 p-8 border rounded-xl border-gray-800 cursor-pointer hover:border-blue-500 transition-colors duration-200 ease-in-out"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: i * 0.03,
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <h4 className="text-white/80 text-sm mb-1">Chapitre 1</h4>
      <h1 className="text-lg font-medium">Trinôme du second degré</h1>
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

const animationVariants: Variants = {
  initial: {
    opacity: 0,
    translateY: 10,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  animate: (i: number) => ({
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: i * 0.1,
    },
  }),
};

export const subscriptionStyle = {
  feature: "border border-yellow-300/50 bg-yellow-400/50",
};

export function SubscriptionPlan() {
  return (
    <motion.div {...animationVariants} custom={0} className="w-full p-6 2xl:p-8 rounded-xl relative overflow-hidden bg-yellow-500/10 border border-yellow-400/20">
      {/* Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-20">
          <PixelGridBackground color="#ffcf0f" cols={400} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-50 w-xl mx-auto text-center">
        <div className="space-y-2 mb-8">
          <h1 className="font-bold text-3xl">Pass Premium - Terminale</h1>
          <p className="text-white text-sm leading-relaxed">Avec le Premium, tu auras accès à plus de sujets type bac corrigés, des exercices supplémentaires, et des fiches de révision pour chaque chapitre de Terminale.</p>
        </div>
        <button className="bg-yellow-500 text-gray-950 rounded-full px-8 py-2 text-base font-bold cursor-pointer">Découvrez le plan Premium</button>
      </div>
    </motion.div>
  );
}

// export function SubscriptionPlan({ mode, type, name, description, price, features, effects, index = 0 }: Readonly<{ type: SubscriptionType; effects: React.ReactNode; index?: number; mode: "monthly" | "yearly" } & Subscription>) {
//   return (
//     <motion.div {...animationVariants} custom={index} className={cn("w-full p-6 2xl:p-8 rounded-xl relative overflow-hidden shadow-lg backdrop-blur-2xl", subscriptionStyle.card)}>
//       {/* Effects */}
//       <div className="absolute inset-0 z-0 pointer-events-none">{effects}</div>

//       {/* Content */}
//       <div className="relative z-50">
//         <div className="space-y-2 mb-4">
//           <h1 className="font-bold text-3xl">Pass Premium - Terminale</h1>
//           <p className={cn("text-sm", subscriptionStyle.description)}>Avec le Premium, tu auras accès à plus de sujets type bac corrigés, des exercices supplémentaires, et des fiches de révision pour chaque chapitre de Terminale.</p>
//         </div>
//         <div className="mb-8 flex flex-col gap-2 mt-4">
//           {features.map((feature, i) => (
//             <div className="w-full flex flex-row justify-start items-center gap-4" key={i}>
//               <div className={cn("size-6 rounded-full flex items-center justify-center", subscriptionStyle.feature)}>
//                 <CheckIcon strokeWidth={2} size={16} />
//               </div>
//               <p className="text-base">{feature}</p>
//             </div>
//           ))}
//         </div>
//         <button className="bg-yellow-500 text-gray-950 rounded-lg px-4 py-2 text-base font-bold w-full cursor-pointer">Découvrez le plan Premium</button>
//       </div>
//     </motion.div>
//   );
// }
