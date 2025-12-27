"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormController, InputWithSlug } from "@/components/admin/form/form-utils";
import { useForm } from "react-hook-form";
import { useAdmin } from "@/contexts/admin/admin-context";
import * as z from "zod";
import { CreateChapterSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/admin/file-upload";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAdminGrade } from "@/contexts/admin/admin-grade-context";

export function ChapterFormDialog() {
  const { chapterCount, chapterForm, addChapter, updateChapter, getChapterById } = useAdminGrade();

  const { data: dialogData, close, dialogProps } = chapterForm;

  const { control, handleSubmit, setValue, getFieldState, reset } = useForm<z.infer<typeof CreateChapterSchema>>({
    resolver: zodResolver(CreateChapterSchema),
    defaultValues: {
      title: "",
      description: "",
      annotation: `Chapitre ${chapterCount + 1}`,
      slug: "",
    },
    mode: "onSubmit",
  });

  const chapterToEdit = getChapterById(dialogData?.toEdit);

  useEffect(() => {
    reset({
      title: chapterToEdit?.title ?? "",
      description: chapterToEdit?.description ?? "",
      annotation: chapterToEdit?.annotation ?? `Chapitre ${chapterCount + 1}`,
      slug: chapterToEdit?.slug ?? "",
    });
  }, [chapterToEdit, reset]);

  async function onSubmit(data: z.infer<typeof CreateChapterSchema>) {
    let result;
    if (!dialogData) result = await addChapter(data);
    else result = await updateChapter(dialogData.toEdit, data);
    setValue("annotation", `Chapitre ${chapterCount + 2}`);
    if (result) close();
  }

  const [videoUrl, setVideoUrl] = useState("");

  return (
    <Dialog {...dialogProps}>
      <DialogContent className={`w-full bg-card ${dialogData ? "max-w-7xl!" : "max-w-xl!"}`}>
        <DialogHeader>
          <DialogTitle>{dialogData ? "Modifier le chapitre" : "Nouveau chapitre"}</DialogTitle>
          <DialogDescription>{dialogData ? "Modifiez les informations de ce chapitre." : "Ajoutez un nouveau chapitre à cette classe."}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className={`grid gap-8 ${dialogData ? "grid-cols-2" : "grid-cols-1"}`}>
            <div className="space-y-4">
              <InputWithSlug inputName="title" slugName="slug" control={control} displayName="Nom" getFieldState={getFieldState} setValue={setValue} />
              <FormController name="annotation" control={control} displayName="Annotation" type="input" />
              <FormController name="description" control={control} displayName="Description" type="textarea" placeholder="Description de la classe..." rows={2} />
            </div>
            {dialogData && (
              <div className="space-y-4">
                <h4 className="font-medium text-foreground mb-3">Ressources</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">PDF du cours</Label>
                    <FileUpload value="course-pdf" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">PDF des corrections</Label>
                    <FileUpload value="corrections-pdf" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="videoUrl" className="text-foreground">
                      Lien vidéo
                    </Label>
                    <Input id="videoUrl" type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/..." className="bg-background" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={close}>
              Annuler
            </Button>
            <Button type="submit">{dialogData ? "Sauvegarder" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
