"use client";

import { ComponentExample } from "@/components/component-example";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { CheckIcon, MenuIcon, XIcon } from "lucide-react";
import PixelGridBackground from "@/components/effects/PixelGridBackground";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CourseCard from "@/components/app/course-card";
import { PremiumPlan } from "@/components/app/premium";
import { StylizedTextPatterns } from "@/components/app/stylized-text-patterns";
import StylizedText from "@/components/app/stylized-text";
import Header from "@/components/app/header";
import Footer from "../components/app/footer";

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
    <div className="size-full bg-gray-900 min-h-screen relative">
      <Header />

      <section className="px-4 md:px-8 flex flex-col items-center">
        <div className="max-w-7xl">
          <h1 className="text-white text-center mt-16 text-3xl font-bold">
            Spécialité mathématiques en <span className="text-blue-500">Première</span>
          </h1>
          <p className="text-sm leading-relaxed mt-4">
            <StylizedText text={description} textStyle={stylizedTextStyle} />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mt-8 gap-4">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <CourseCard key={i} i={i} />
              ))}
          </div>
          <div className="mt-8 w-full">
            <PremiumPlan />
          </div>
        </div>
      </section>

      <Footer />
    </div>
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
