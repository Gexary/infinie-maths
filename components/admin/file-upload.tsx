"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Loader2, ExternalLink, FileTextIcon } from "lucide-react";
import { toast } from "sonner";
import { useAdminGrade } from "@/contexts/admin/admin-grade-context";
import type { Chapter } from "@/types/global";

type FileType = "course-pdf" | "corrections-pdf" | "course-video";

const fileMetadata: Record<FileType, { label: string }> = {
  "course-pdf": { label: "PDF du cours" },
  "corrections-pdf": { label: "PDF des corrections" },
  "course-video": { label: "Lien vidéo" },
};

const valueToKey: Record<FileType, keyof Chapter> = {
  "course-pdf": "coursePDFUrl",
  "corrections-pdf": "correctionsPDFUrl",
  "course-video": "videoUrl",
};

export function FileUpload({ value }: { value: FileType }) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    chapterForm: { data: dialogData },
    getChapterById,
    editChapterKey,
  } = useAdminGrade();
  const relatedChapter = getChapterById(dialogData?.toEdit);
  const actualUrl = relatedChapter?.[valueToKey[value]];

  const uploadFile = async (file: File) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.set("chapterId", dialogData?.toEdit!);
      formData.set("type", value);
      formData.set("file", file);

      const response = await fetch("/api/chapter/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!data.success) throw new Error("Erreur lors du traitement du fichier");

      const { fileName } = data;
      editChapterKey(dialogData?.toEdit!, valueToKey[value], fileName);

      toast("Fichier enregistré", {
        description: `Ce fichier pdf a été sauvegardé avec succès.`,
      });
      return true;
    } catch (error) {
      toast.error("Erreur lors du traitement du fichier");
      return false;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.includes("pdf")) {
      toast.error("Type de fichier invalide", {
        description: "Veuillez sélectionner un fichier PDF.",
      });
      return;
    }

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("Fichier trop volumineux", {
        description: "La taille maximale est de 50 Mo.",
      });
      return;
    }

    setIsUploading(true);

    await uploadFile(file);

    setIsUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = async () => {
    try {
      const response = await fetch(`/api/chapter/upload`, {
        method: "DELETE",
        body: JSON.stringify({ id: dialogData?.toEdit!, type: value }),
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression du fichier");
      editChapterKey(dialogData?.toEdit!, valueToKey[value], null);
      toast("Fichier supprimé", {
        description: `Ce fichier pdf a été supprimé avec succès.`,
      });
    } catch (error) {
      toast.error("Erreur lors de la suppression du fichier");
      console.error("Erreur lors de la suppression du fichier:", error);
    }
  };

  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" accept={"application/pdf"} onChange={handleFileChange} className="hidden" />

      {actualUrl ? (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg border border-border">
          <FileTextIcon className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{fileMetadata[value].label}</p>
            <a href={`/files/${value}/${actualUrl}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
              Voir le fichier
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={handleRemove} className="shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={isUploading} className="flex-1 gap-2">
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Upload en cours...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Choisir un fichier PDF
              </>
            )}
          </Button>
        </div>
      )}

      {/* Alternative: manual URL input */}
      <div className="relative">
        <Input type="url" value={actualUrl || ""} onChange={() => {}} placeholder="Ou collez une URL..." className="text-sm bg-background" />
      </div>
    </div>
  );
}
