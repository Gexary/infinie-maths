import Link from "next/link";

export interface NoticeProps {
  title: string;
  description: string;
}

export default function NoticeCard({ title, description }: NoticeProps) {
  return (
    <div className="p-4 bg-white rounded-xl text-gray-950 mt-16 mb-12 grid grid-cols-1 md:grid-cols-[1fr_512px] gap-8">
      <div className="p-4">
        <h1 className="max-w-2xl text-3xl font-extrabold">{title}</h1>
        <p className="max-w-xl text-base mt-2 leading-relaxed text-gray-800">{description}</p>
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
  );
}
