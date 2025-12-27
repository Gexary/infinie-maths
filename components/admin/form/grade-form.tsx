"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type Control } from "react-hook-form";
import { GradeLevelSchema } from "@/lib/validation";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { FormController, InputWithSlug } from "@/components/admin/form/form-utils";
import { useAdmin } from "@/contexts/admin/admin-context";
import { convertToSlug } from "@/lib/slug";

export function GradeFormDialog() {
  const {
    gradeForm: { open, close, dialogProps, data: dialogData },
    getGradeById,
    addGrade,
    updateGrade,
  } = useAdmin();

  const gradeToEdit = getGradeById(dialogData?.toEdit);

  const { control, handleSubmit, setValue, getFieldState, reset } = useForm<z.infer<typeof GradeLevelSchema>>({
    resolver: zodResolver(GradeLevelSchema as any),
    defaultValues: {
      name: "",
      slug: "",
      title: "",
      description: "",
      summary: "",
      hero: {
        title: "",
        description: "",
        notice: "",
      },
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    reset({
      name: gradeToEdit?.name ?? "",
      slug: gradeToEdit?.slug ?? "",
      title: gradeToEdit?.title ?? "",
      description: gradeToEdit?.description ?? "",
      summary: gradeToEdit?.summary ?? "",
      hero: {
        title: gradeToEdit?.hero?.title ?? "",
        description: gradeToEdit?.hero?.description ?? "",
        notice: gradeToEdit?.hero?.notice ?? "",
      },
    });
  }, [gradeToEdit, reset]);

  async function onSubmit(data: z.infer<typeof GradeLevelSchema>) {
    let result;
    if (!dialogData) result = await addGrade(data);
    else result = await updateGrade(dialogData.toEdit, data);
    if (result) close();
  }

  return (
    <Dialog {...dialogProps}>
      <DialogContent className="max-w-7xl! overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-foreground">{dialogData ? "Modifier la classe" : "Nouvelle classe"}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{dialogData ? "Modifiez les informations de cette classe." : "Créez une nouvelle classe pour organiser vos cours."}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <InputWithSlug inputName="name" slugName="slug" control={control} displayName="Nom" getFieldState={getFieldState} setValue={setValue} />
              <FormController name="title" control={control} displayName="Titre" />
              <FormController name="description" control={control} displayName="Description" type="textarea" placeholder="Description de la classe..." rows={2} />
              <FormController name="summary" control={control} displayName="Résumé" type="textarea" placeholder="Entrez un résumé qui sera affiché sur la page d'accueil" rows={2} />
            </div>
            <div className="space-y-4">
              <FormController name="hero.title" control={control} displayName="Titre Hero" />
              <FormController name="hero.description" control={control} displayName="Description Hero" type="textarea" placeholder="Description de la section hero..." rows={2} />
              <FormController name="hero.notice" control={control} displayName="Notice Hero" type="textarea" placeholder="Notice ou avertissement" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={close}>
              Annuler
            </Button>
            <Button type="submit">{dialogData ? "Sauvegarder" : "Créer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
