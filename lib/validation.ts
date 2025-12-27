import * as z from "zod";

export const GradeLevelSchema = z.object({
  name: z.string().trim().min(1, "Le nom du niveau doit être au moins 1 caractère.").max(64, "Le nom du niveau doit être au plus 32 caractères."),
  slug: z.string().trim().min(1, "Le slug du niveau doit être au moins 1 caractère.").max(64, "Le slug du niveau doit être au plus 32 caractères."),

  title: z.string().trim().min(1, "Le titre du niveau doit être au moins 5 caractères.").max(256, "Le titre du niveau doit être au plus 32 caractères."),
  description: z.string().trim().min(1, "La description du niveau doit être au moins 20 caractères.").max(512, "La description du niveau doit être au plus 100 caractères."),

  summary: z.string().trim().min(1, "La description du niveau doit être au moins 20 caractères.").max(512, "La description du niveau doit être au plus 100 caractères."),
  hero: z.object({
    title: z.string().trim().min(1, "Le titre de la section hero doit être au moins 5 caractères.").max(256, "Le titre de la section hero doit être au plus 32 caractères."),
    description: z.string().trim().min(1, "La description de la section hero doit être au moins 20 caractères.").max(512, "La description de la section hero doit être au plus 100 caractères."),
    notice: z.string().trim().min(1, "La notice de la section hero doit être au moins 20 caractères.").max(512, "La notice de la section hero doit être au plus 100 caractères."),
  }),
});

export const CreateChapterSchema = z.object({
  slug: z.string().trim().min(1, "Le slug du chapitre doit être au moins 1 caractère.").max(64, "Le slug du chapitre doit être au plus 32 caractères."),
  title: z.string().trim().min(1, "Le titre du chapitre doit être au moins 5 caractères.").max(256, "Le titre du chapitre doit être au plus 32 caractères."),
  description: z.string().trim().min(1, "La description du chapitre doit être au moins 20 caractères.").max(512, "La description du chapitre doit être au plus 100 caractères."),
  annotation: z.string().trim().min(1, "L'annotation du chapitre doit être au moins 20 caractères.").max(512, "L'annotation du chapitre doit être au plus 100 caractères."),
});
