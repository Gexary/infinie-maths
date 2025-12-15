"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { CheckIcon, MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { StylizedTextPatterns } from "@/components/app/stylized-text-patterns";
import StylizedText from "@/components/app/stylized-text";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Header from "@/components/app/header";
import Footer from "@/components/app/footer";
import dynamic from "next/dynamic";

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
    <span className="text-red-500">
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
    <Breadcrumb>
      <BreadcrumbList>{breadcrumbsEl}</BreadcrumbList>
    </Breadcrumb>
  );
}

export default function PageHome() {
  return (
    <div className="size-full bg-gray-900 min-h-screen relative">
      <Header />

      <section className="px-4 md:px-8 flex flex-col items-center">
        <div className="w-7xl pt-16">
          <PageBreadcrumbList />
          <h1 className="text-white mt-4 text-3xl font-bold">Trinôme du second degré</h1>
          <p className="text-base leading-relaxed mt-2">
            <StylizedText text={"Étude des fonctions du second degré : forme canonique, signe, variations, résolution d'équations et d'inéquations."} textStyle={stylizedTextStyle} />
          </p>
          <div className="grid grid-cols-[var(--container-xs)_1fr] gap-16 mt-8">
            <div>
              <h1 className="text-white text-2xl font-bold">Chapitres</h1>
              <div className="flex flex-col gap-2 mt-4 w-full bg-gray-950 p-2 md:p-4 border rounded-md border-gray-800 transition-colors duration-200 ease-in-out">
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <h1
                      key={i}
                      className={cn("w-full text-base font-normal cursor-pointer hover:text-blue-400 flex flex-row items-center gap-2 justify-between", {
                        "border-b border-gray-800 pb-2": i !== 11,
                      })}
                    >
                      <div>
                        <span className="text-white/60 text-sm">{i + 1} - </span>
                        Trinôme du second degré
                      </div>
                      {i === 5 ? (
                        <span className="ml-auto size-4 bg-blue-500 text-gray-950 rounded-full inline-flex items-center justify-center">
                          <CheckIcon strokeWidth={2.5} size={14} />
                        </span>
                      ) : null}
                    </h1>
                  ))}
              </div>
            </div>
            <div>
              <div className="w-full overflow-hidden">
                <PDFViewer />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
