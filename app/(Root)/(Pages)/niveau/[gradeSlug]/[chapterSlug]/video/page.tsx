import { TableOfContents } from "@/components/app/table-of-contents";

export default function Page() {
  return (
    <div className="w-full">
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <TableOfContents />
      </div>
      <div>Fonctionnalité non encore implémentée</div>
    </div>
  );
}
