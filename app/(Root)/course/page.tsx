"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpRightIcon, CheckIcon, ChevronDownIcon, LockIcon } from "lucide-react";
import StylizedText, { StylizedTextPatterns } from "@/components/app/stylized-text";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const PDFViewer = dynamic(() => import("@/components/app/pdf-viewer"), {
  ssr: false,
});

const stylizedTextStyle = new StylizedTextPatterns({
  "** **": ({ children, params }) => (
    <strong className="font-bold">
      {children}
      {params ? ` (${params})` : ""}
    </strong>
  ),
  "{ }": ({ children, params }) => (
    <span className="text-blue-500">
      {children}
      {params ? ` (${params})` : ""}
    </span>
  ),
  "% %": ({ children, params }) => (
    <span className="text-green-500">
      {children}
      {params ? ` (${params})` : ""}
    </span>
  ),
  "$ $": ({ children, params }) => <span className={`text-[${params}]`}>{children}</span>,
});

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
    <Breadcrumb className="mt-16">
      <BreadcrumbList>{breadcrumbsEl}</BreadcrumbList>
    </Breadcrumb>
  );
}

export default function PageHome() {
  return (
    <>
      <PageBreadcrumbList />
      <h1 className="text-white mt-4 text-3xl font-bold">Trinôme du second degré</h1>
      <p className="text-base leading-relaxed mt-2">
        <StylizedText text={"Étude des fonctions du second degré : forme canonique, signe, variations, résolution d'équations et d'inéquations."} textStyle={stylizedTextStyle} />
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 mt-8">
        <ChapterList />
        <div className="w-full">
          <PDFViewer />
        </div>
      </div>
    </>
  );
}

interface ChapterProps {
  title: string;
  slug: string;
  active?: boolean;
}

const chapters: ChapterProps[] = [
  { title: "Trinôme du second degré", slug: "0" },
  { title: "Probabilité conditionnelle et variable aléatoire", slug: "1" },
  { title: "Dérivation", slug: "2", active: true },
  { title: "Suites numériques", slug: "3" },
];

function ChapterList() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCollapsed((prev) => {
      const newValue = !prev;
      if (chapterRef.current) {
        if (chapterRef.current && newValue) {
          chapterRef.current.style.maxHeight = `${chapterRef.current.scrollHeight}px`;
          setTimeout(() => {
            if (chapterRef.current) chapterRef.current.style.maxHeight = `0px`;
          }, 10);
        } else if (chapterRef.current) {
          chapterRef.current.style.maxHeight = `0px`;
          setTimeout(() => {
            if (chapterRef.current) chapterRef.current.style.maxHeight = `${chapterRef.current.scrollHeight}px`;
          }, 10);
        }
      }
      return newValue;
    });
  };

  const chapterRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-full relative z-10 lg:max-w-xs h-fit overflow-hidden bg-gray-950 rounded-md border border-gray-800">
      <div className="w-full">
        <div className="shadow-[0_1px_0_0_var(--color-gray-800)] flex items-center justify-between text-blue-500 px-6 py-4 bg-blue-500/10">
          <h2 className="font-semibold text-lg">Chapitres</h2>
          {/* <Link className="flex items-center justify-center size-8 rounded-md transition hover:bg-blue-100/5 cursor-pointer" href="/">
            <ArrowUpRightIcon className="size-5" />
          </Link> */}
          <button onClick={toggleCollapsed} className="flex items-center justify-center size-8 rounded-md transition hover:bg-blue-100/5 cursor-pointer">
            <ChevronDownIcon className={`size-5 transition-transform duration-300 ease-in-out ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
        <div ref={chapterRef} className="divide-y divide-gray-800 transition-all duration-1000 ease-in-out overflow-hidden">
          {chapters.map(({ slug, title, active }) => (
            <Link key={slug} className={`block cursor-pointer transition px-6 py-3 ${active ? "bg-blue-500/10" : "hover:bg-gray-900/50"}`} style={{ boxShadow: active ? "inset 2px 0 0 0 var(--color-blue-600)" : "none" }} href={`/seconde/${slug}`}>
              <p className={`truncate font-medium text-sm ${active ? "text-white" : "text-gray-300"}`}>{title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
