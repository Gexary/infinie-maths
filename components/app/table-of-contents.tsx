"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function TableOfContents({ children }: { children?: Readonly<ReactNode[] | ReactNode> }) {
  const path = usePathname();
  return (
    <div className="mb-4 flex flex-row items-center justify-between gap-2 max-md:flex-wrap">
      <div className="w-full">
        <div className="h-fit rounded-none border-b bg-transparent p-0">
          <Link
            className="text-xl font-medium relative rounded-none inline-block px-4 py-2 bg-transparent shadow-none data-[state=active]:shadow-[inset_0_-2px_0_0_var(--color-primary)]"
            href={"./cours"}
            data-state={path.endsWith("/cours") ? "active" : ""}
          >
            Cours
          </Link>
          <Link
            className="text-xl font-medium relative rounded-none inline-block px-4 py-2 bg-transparent shadow-none data-[state=active]:shadow-[inset_0_-2px_0_0_var(--color-primary)]"
            href={"./corriges"}
            data-state={path.endsWith("/corriges") ? "active" : ""}
          >
            Corrigés
          </Link>
          <Link
            className="text-xl font-medium relative rounded-none inline-block px-4 py-2 bg-transparent shadow-none data-[state=active]:shadow-[inset_0_-2px_0_0_var(--color-primary)]"
            href={"./video"}
            data-state={path.endsWith("/video") ? "active" : ""}
          >
            Vidéos
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
