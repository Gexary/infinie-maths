import Footer from "@/components/app/footer";
import Header from "@/components/app/header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative grid size-full min-h-screen grid-rows-[auto_1fr_auto] bg-gray-900">
      <Header />

      <main className="flex flex-col items-center px-4 pt-8 md:px-8">
        <div className="w-full max-w-7xl">{children}</div>
      </main>

      <Footer />
    </div>
  );
}

const data = {
  title: "Spécialité mathématiques en !Première!",
  description:
    "Tu avances pas à pas : chaque notion de cours est suivie immédiatement d'exercices d'application. Commence par **Cours et exercices**, cherche sérieusement, puis utilise **Corrigés** pour comparer ta méthode et progresser en rédaction. Les **vidéos** seront ajoutées progressivement sur les méthodes importantes.",
  course: [],
};

interface Course {
  name: string;
  description: string;
  pdf: string;
}
