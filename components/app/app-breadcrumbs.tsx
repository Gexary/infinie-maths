"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useGradeLevels } from "@/contexts/app-context";
import { getActiveChapter } from "@/contexts/chapter-context";
import { getActiveGrade } from "@/contexts/grade-level-context";
import Link from "next/link";

const breadcrumbs = [
  { name: "Accueil", href: "/" },
  { name: "Première", href: "/premiere" },
  { name: "Chapitre 1", href: "/terminale" },
];

export function PageBreadcrumbList() {
  const breadcrumbsEl = [];
  for (let i = 0; i < breadcrumbs.length; i++) {
    const { name, href } = breadcrumbs[i];
    if (i === breadcrumbs.length - 1) {
      breadcrumbsEl.push(
        <BreadcrumbItem key={i}>
          <BreadcrumbPage>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      );
      break;
    }
    breadcrumbsEl.push(
      <BreadcrumbItem key={i}>
        {/* <BreadcrumbLink href={href} asChild> */}
        <Link href={href}>{name}</Link>
        {/* </BreadcrumbLink> */}
      </BreadcrumbItem>
    );
    if (i < breadcrumbs.length - 1) {
      breadcrumbsEl.push(<BreadcrumbSeparator key={i + 0.5} />);
    }
  }

  const activeGrade = getActiveGrade();
  const activeChapter = getActiveChapter();

  return (
    <Breadcrumb className="mt-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">Niveau</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={`/niveau/${activeGrade.slug}`}>{activeGrade.name}</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{activeChapter.annotation}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
