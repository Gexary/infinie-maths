"use client";

import { PDF } from "@/components/app/pdf/pdf";
import { FullscreenPDFViewer } from "@/components/app/pdf/pdf-fullscreen";
import { TableOfContents } from "@/components/app/table-of-contents";
import { getActiveChapter } from "@/contexts/chapter-context";
import { useDynamicWidth } from "@/hooks/use-dynamic-width";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePDF, usePDFDocument, type PDFDocumentType } from "@/hooks/use-pdf";
import { usePrintBlob } from "@/hooks/use-print";
import { FilesIcon, ArrowLeftIcon, ArrowRightIcon, DownloadIcon, PrinterIcon } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configuration du worker PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ url }: { url: string }) {
  const pdf = usePDF(url);
  const pdfDocument = usePDFDocument();
  const { viewMode, toggleViewMode } = pdfDocument;
  const { width, containerRef } = useDynamicWidth<HTMLDivElement>(800);
  const printPDF = usePrintBlob(pdf.blobUrl);

  /* Fullscreen */
  const [fullscreen, setFullscreen] = useState(false);
  const isMobile = useIsMobile();

  const close = () => {
    document.body.style.overflow = "";
    setFullscreen(false);
  };

  const open = () => {
    if (isMobile) return;
    document.body.style.overflow = "hidden";
    setFullscreen(true);
  };

  const chapter = getActiveChapter();
  const downloadFileName = `chapitre-${chapter.slug}.pdf`;

  return (
    <div className="w-full">
      <TableOfContents>
        <div className="flex flex-row items-center gap-2 shrink-0">
          <button onClick={toggleViewMode} className={`flex h-9 cursor-pointer flex-row items-center gap-2 rounded-md border bg-gray-800 px-4 text-sm font-medium transition-colors ${viewMode === "list" ? "border-blue-500" : "border-gray-700"}`}>
            Mode Liste <FilesIcon className="size-4" />
          </button>
          <a
            href={pdf.blobUrl ?? ""}
            target="_blank"
            rel="noopener noreferrer"
            download={downloadFileName}
            className="flex size-9 cursor-pointer flex-row items-center justify-center rounded-md border border-gray-700 bg-gray-800 text-sm font-medium transition-colors"
          >
            <DownloadIcon className="size-4" />
          </a>
          <button className="flex size-9 cursor-pointer flex-row items-center justify-center rounded-md border border-gray-700 bg-gray-800 text-sm font-medium transition-colors" onClick={printPDF}>
            <PrinterIcon className="size-4" />
          </button>
        </div>
      </TableOfContents>
      {fullscreen && !isMobile && createPortal(<FullscreenPDFViewer close={close} pdf={pdf} />, document.body)}
      <div className={`w-full h-fit ${fullscreen ? "opacity-20" : ""}`} ref={containerRef}>
        <PDF pdf={pdf} width={width} onClick={open} pdfDocument={pdfDocument} />
      </div>
      <div className="mt-8 flex w-full flex-row justify-center">
        <PDFController pdfDocument={pdfDocument} />
      </div>
    </div>
  );
}

function PDFController({ pdfDocument: { totalPages, activePage, previousPage, nextPage, viewMode } }: { pdfDocument: PDFDocumentType }) {
  return totalPages ? (
    viewMode === "page" ? (
      <div className="flex w-lg items-center justify-between">
        <button onClick={previousPage} disabled={activePage <= 1} className="flex cursor-pointer flex-row items-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium transition-colors">
          <ArrowLeftIcon className="size-4" /> Précédent
        </button>
        <span className="font-medium text-gray-300">
          Page {activePage} sur {totalPages}
        </span>
        <button onClick={nextPage} disabled={activePage >= totalPages} className="flex cursor-pointer flex-row items-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium transition-colors">
          Suivant <ArrowRightIcon className="size-4" />
        </button>
      </div>
    ) : (
      <span>
        Total : {totalPages} page{totalPages > 1 ? "s" : ""}
      </span>
    )
  ) : null;
}
