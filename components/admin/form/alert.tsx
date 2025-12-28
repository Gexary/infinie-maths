import StylizedText from "@/components/app/stylized-text";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAdmin } from "@/contexts/admin/admin-context";
import { useAdminGrade } from "@/contexts/admin/admin-grade-context";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

interface AlertProps {
  dialogProps: any;
  title: string;
  description: string;
  handleDelete: () => Promise<boolean>;
}

function Alert({ dialogProps, title, description, handleDelete }: Readonly<AlertProps>) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteFunc = async () => {
    setIsLoading(true);
    const result = await handleDelete();
    setIsLoading(false);
    if (result) dialogProps.onOpenChange(false);
  };

  return (
    <AlertDialog {...dialogProps}>
      <AlertDialogContent className="bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            <StylizedText text={description} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={deleteFunc} className="bg-red-700 cursor-pointer border-none border-t! border-red-200/20 text-foreground hover:bg-destructive/90">
            {isLoading ? (
              <>
                <Loader2Icon className="h-4 w-4 animate-spin" /> Supprimer...
              </>
            ) : (
              "Supprimer"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function GradeAlert() {
  const {
    gradeAlert: { dialogProps, data },
    getGradeById,
    deleteGrade,
  } = useAdmin();

  const gradeName = getGradeById(data?.toDelete)?.name;

  return (
    <Alert
      dialogProps={dialogProps}
      title="Supprimer cette classe ?"
      description={`Cette action est irréversible. Vous êtes sur le point de supprimer la classe **"${gradeName ?? "Introuvable"}"**. Tous les chapitres associés seront également supprimés.`}
      handleDelete={() => deleteGrade(data?.toDelete!)}
    />
  );
}

export function ChapterAlert() {
  const {
    chapterAlert: { dialogProps, data },
    getChapterById,
    deleteChapter,
  } = useAdminGrade();

  const chapterName = getChapterById(data?.toDelete)?.title;

  return (
    <Alert
      dialogProps={dialogProps}
      title="Supprimer ce chapitre ?"
      description={`Cette action est irréversible. Vous êtes sur le point de supprimer le chapitre **"${chapterName ?? "Introuvable"}"**.`}
      handleDelete={() => deleteChapter(data?.toDelete!)}
    />
  );
}
