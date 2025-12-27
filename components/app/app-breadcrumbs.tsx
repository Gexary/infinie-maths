"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

const breadcrumbs = [
  { name: "Accueil", href: "/" },
  { name: "Cours", href: "/seconde" },
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

  return (
    <Breadcrumb className="mt-4">
      <BreadcrumbList>{breadcrumbsEl}</BreadcrumbList>
    </Breadcrumb>
  );
}
