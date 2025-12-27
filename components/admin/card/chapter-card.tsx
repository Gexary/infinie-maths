"use client";

import { Chapter, type ChapterId } from "@/types/global";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, ExternalLink, FileTextIcon, VideoIcon, EditIcon, Trash2Icon } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useAdminGrade } from "@/contexts/admin/admin-grade-context";
import StylizedText from "@/components/app/stylized-text";

interface ChapterCardProps {
  index: number;
  chapterId: ChapterId;
  chapter: Chapter;
}

export function ChapterCard({ index, chapter, chapterId }: ChapterCardProps) {
  const { ref, handleRef, isDragging } = useSortable({
    id: chapterId,
    index,
  });

  const { chapterForm, chapterAlert } = useAdminGrade();

  return (
    <Card ref={ref} className={`relative overflow-visible card-hover gap-2 bg-card animate-fade-in ${isDragging ? "dragging" : ""}`}>
      <div ref={handleRef} className={`absolute top-0 -left-8 text-foreground transition-opacity opacity-50 hover:opacity-100 bg-white/10 rounded-xs h-6 w-5 flex items-center justify-center ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
        <GripVertical className="h-5 w-5" />
      </div>
      <CardHeader>
        <div className="flex flex-row items-start justify-between gap-2">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md inline-block">{chapter.annotation}</p>
            <CardTitle className="text-base font-medium text-foreground">{chapter.title}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => chapterForm.open({ toEdit: chapterId })} className="cursor-pointer bg-gray-500/10 text-gray-300 border border-gray-500/20 hover:bg-gray-500/15! hover:text-gray-300!">
              <EditIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => chapterAlert.open({ toDelete: chapterId })} className="cursor-pointer bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/15! hover:text-red-500!">
              <Trash2Icon className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 text-muted-foreground">
          <StylizedText text={chapter.description ? chapter.description : "Aucune description"} />
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {chapter.coursePDFUrl && <ChapterLink href={chapter.coursePDFUrl} type="pdf" name="Cours PDF" />}
          {chapter.correctionsPDFUrl && <ChapterLink href={chapter.correctionsPDFUrl} type="pdf" name="Corrections PDF" />}
          {chapter.videoUrl && <ChapterLink href={chapter.videoUrl} type="video" name="Lien vidéo" />}
        </div>
      </CardContent>
    </Card>
  );
}

function ChapterLink({ href, type, name }: { href: string; type: "pdf" | "video"; name: string }) {
  const Icon = type === "pdf" ? FileTextIcon : VideoIcon;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 bg-primary/10 px-2.5 py-1.5 rounded-md transition-colors">
      <Icon className="h-3.5 w-3.5" />
      {name}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}
