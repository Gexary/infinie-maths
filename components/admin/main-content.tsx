import GradeCard from "@/components/admin/card/grade-card";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/admin/admin-context";
import { useAdminGrade } from "@/contexts/admin/admin-grade-context";
import { DragDropProvider, PointerSensor } from "@dnd-kit/react";
import { BookOpenIcon, GraduationCapIcon, PlusIcon } from "lucide-react";
import { move } from "@dnd-kit/helpers";
import { ChapterCard } from "@/components/admin/card/chapter-card";

export type Variant = "chapter" | "grade";

const variants: Record<Variant, { title: string; description: string; button: string; icon: React.ComponentType<any> }> = {
  chapter: {
    title: "Aucun chapitre",
    description: "Ajoutez des chapitres pour organiser vos cours",
    button: "Ajouter un chapitre",
    icon: BookOpenIcon,
  },

  grade: {
    title: "Aucune classe",
    description: "Commencez par créer votre première classe",
    button: "Créer une classe",
    icon: GraduationCapIcon,
  },
};

const sensors = [PointerSensor];

export function MainContent({ children, variant, itemCount, openFunc }: Readonly<{ children: React.ReactNode; variant: Variant; itemCount: number; openFunc: () => void }>) {
  const Icon = variants[variant].icon;

  return (
    <main className="w-full flex py-8 px-4 pl-8! md:px-32 gap-8 flex-col items-center">
      <section className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {variant === "grade" ? "Classes" : "Chapitres"} ({itemCount})
          </h3>
          <Button size="sm" className="gap-2 cursor-pointer" onClick={openFunc}>
            <PlusIcon className="h-4 w-4" />
            Ajouter {variant === "grade" ? "une classe" : "un chapitre"}
          </Button>
        </div>
        {itemCount === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
              <Icon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">{variants[variant].title}</h4>
            <p className="text-muted-foreground mb-4">{variants[variant].description}</p>
            <Button className="gap-2 cursor-pointer" onClick={openFunc}>
              <PlusIcon className="h-4 w-4" />
              {variants[variant].button}
            </Button>
          </div>
        ) : (
          children
        )}
      </section>
    </main>
  );
}

export function GradeMainContent() {
  const {
    gradeCount,
    gradeLevels: { setOrder, iterateOver },
    gradeForm: { open },
  } = useAdmin();

  return (
    <MainContent variant="grade" itemCount={gradeCount} openFunc={() => open()}>
      <DragDropProvider
        sensors={sensors}
        onDragEnd={(event) => {
          if (event.canceled) return;
          setOrder((prev) => move(prev, event));
        }}
      >
        <div className="space-y-3">
          {iterateOver((grade, gradeId, i) => (
            <GradeCard key={gradeId} grade={grade} gradeId={gradeId} index={i} />
          ))}
        </div>
      </DragDropProvider>
    </MainContent>
  );
}

export function ChapterMainContent() {
  const {
    chapterCount,
    chapters: { setOrder, iterateOver },
    chapterForm: { open },
  } = useAdminGrade();

  return (
    <MainContent variant="chapter" itemCount={chapterCount} openFunc={() => open()}>
      <DragDropProvider
        sensors={sensors}
        onDragEnd={(event) => {
          if (event.canceled) return;
          setOrder((prev) => move(prev, event));
        }}
      >
        <div className="space-y-3">
          {iterateOver((chapter, chapterId, i) => (
            <ChapterCard key={chapterId} chapterId={chapterId} index={i} chapter={chapter} />
          ))}
        </div>
      </DragDropProvider>
    </MainContent>
  );
}
