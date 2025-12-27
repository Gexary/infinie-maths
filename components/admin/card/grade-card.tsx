"use client";

import Link from "next/link";
import { type Grade, type GradeId } from "@/types/global";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, EditIcon, Trash2Icon } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useAdmin } from "@/contexts/admin/admin-context";
import StylizedText from "../../app/stylized-text";

export default function GradeCard({ grade, gradeId, index }: { grade: Grade; gradeId: GradeId; index: number }) {
  const { ref, handleRef, isDragging } = useSortable({
    id: gradeId,
    index,
  });

  const { gradeForm, gradeAlert } = useAdmin();

  return (
    <Card ref={ref} className={`relative overflow-visible card-hover gap-2 bg-card animate-fade-in ${isDragging ? "dragging" : ""}`}>
      <div ref={handleRef} className={`absolute top-0 -left-8 text-foreground transition-opacity opacity-50 hover:opacity-100 bg-white/10 rounded-xs h-6 w-5 flex items-center justify-center ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
        <GripVertical className="h-5 w-5" />
      </div>
      <CardHeader>
        <div className="flex flex-row items-start justify-between gap-2">
          <div className="space-y-2">
            <CardTitle className="text-base font-medium text-foreground">{grade.name}</CardTitle>
            <CardDescription className="line-clamp-2 text-muted-foreground">
              <StylizedText text={grade.description || "Aucune description"} />
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => gradeForm.open({ toEdit: gradeId })} className="cursor-pointer bg-gray-500/10 text-gray-300 border border-gray-500/20 hover:bg-gray-500/15! hover:text-gray-300!">
              <EditIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => gradeAlert.open({ toDelete: gradeId })} className="cursor-pointer bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/15! hover:text-red-500!">
              <Trash2Icon className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-end">
        <Link href={`/admin/niveau/${grade.slug}`}>
          <Button size="sm" className="cursor-pointer">
            Voir les chapitres
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
