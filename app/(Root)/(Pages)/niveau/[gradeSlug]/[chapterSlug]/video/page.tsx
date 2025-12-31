import { TableOfContents } from "@/components/app/table-of-contents";

export default function Page() {
  return (
    <div className="w-full">
      <TableOfContents />
      <div>
        <p>Fonctionnalité de lecture PDF non disponible pour le moment</p>
      </div>
    </div>
  );
}
