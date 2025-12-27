import type { Variant } from "@/components/admin/main-content";
import { useAdminGrade } from "@/contexts/admin/admin-grade-context";
import { ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";

function Header({ title, subtitle, variant }: { title: string; subtitle: string; variant?: Variant }) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container max-w-4xl py-6 px-32">
        <div className="flex items-center gap-3">
          {variant === "chapter" ? (
            <Link href={`/admin`} className="size-10 inline-flex items-center justify-center rounded-xl bg-gray-500/10 hover:bg-gray-500/15">
              <ArrowLeft className="size-4" />
            </Link>
          ) : (
            <div className="size-10 inline-flex items-center justify-center rounded-xl bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export function GradeHeader() {
  return <Header title="Gestion des Classes" subtitle="Organisez vos cours par niveau" />;
}

export function ChapterHeader() {
  const { getActiveGrade } = useAdminGrade();
  const activeGrade = getActiveGrade();

  return <Header title={activeGrade.name} subtitle={`${activeGrade.slug}`} variant="chapter" />;
}
