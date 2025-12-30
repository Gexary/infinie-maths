import PixelGridBackground from "@/components/effects/PixelGridBackground";
import { useApp } from "@/contexts/app-context";
import { getActiveGrade, useGradeLevel } from "@/contexts/grade-level-context";
import type { Variants } from "motion";
import { motion } from "motion/react";
import { useParams } from "next/navigation";

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

export function PremiumPlan() {
  const activeGrade = getActiveGrade();

  return (
    <motion.div {...animationVariants} custom={0} className="w-full p-4 md:p-6 2xl:p-8 rounded-xl relative overflow-hidden bg-yellow-500/10 border border-yellow-400/20">
      {/* Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-20">
          <PixelGridBackground color="#ffcf0f" cols={68} />
        </div>
        <div className="absolute inset-0 shadow-[inset_0_-32px_128px_-32px_#ffcf0f40]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-0.5 bg-[linear-gradient(to_right,#ffcd2a00_0%,#ffcd2a_25%,#fffcdf_50%,#ffcd2a_85%,#ffcd2a00_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-1 bg-[linear-gradient(to_right,#ffcd2a00_0%,#ffcd2a_25%,#fffcdf_50%,#ffcd2a_85%,#ffcd2a00_100%)] blur-lg" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="space-y-2 mb-6">
          <h1 className="font-bold text-xl md:text-3xl">Pass Premium{activeGrade ? ` - ${activeGrade.name}` : ""}</h1>
          <p className="text-white text-sm leading-relaxed">
            En mode Premium, tu bénéficies de contrôles corrigés supplémentaires, d'exercices plus approfondis et de fiches de révision ainsi que de ressources organisées pour chaque chapitre, de la Seconde à la Terminale.
          </p>
        </div>
        <button className="bg-linear-to-tl via-yellow-500 to-yellow-400 from-yellow-600 text-gray-950 rounded-full px-8 py-2 text-base font-bold cursor-pointer border border-yellow-200/20">Découvrez le plan Premium</button>
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
