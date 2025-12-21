"use client";

import usePrint from "@/hooks/use-print";
import { cn } from "@/lib/utils";
import {
  FilesIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  DownloadIcon,
  PrinterIcon,
  XIcon,
  ZoomInIcon,
  ZoomOut,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configuration du worker PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [viewMode, setViewMode] = useState("page"); // 'list' ou 'page'

  const pdfFile = "/chapitre-1-cours.pdf";

  const printPDF = usePrint(pdfFile);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const [isZoomed, setIsZoomed] = useState(false);
  const [width, setWidth] = useState(800);

  const pdfRef = useRef<HTMLDivElement>(null);

  const resizeObserver = useRef<ResizeObserver>(
    new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        setWidth(newWidth);
      }
    }),
  );

  useEffect(() => {
    if (pdfRef.current) resizeObserver.current.observe(pdfRef.current);
    return () => {
      resizeObserver.current.disconnect();
    };
  }, [pdfRef]);

  const [pdfWidth, setPdfWidth] = useState(1000);
  useEffect(() => {
    if (!window) return;
    const windowWidth = window.innerWidth;
    if (pdfWidth > windowWidth) {
      setPdfWidth(windowWidth - 16);
    }
  }, []);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <FullscreenPDFViewer
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        pdfWidth={pdfWidth}
        numPages={numPages}
        pdfFile={pdfFile}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
      />
      <div className={cn("w-full", { "opacity-20": fullscreen })}>
        <div className="mb-4 flex flex-row items-center justify-between gap-2">
          <h1 className="text-2xl font-bold text-white">Cours</h1>
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={() =>
                setViewMode((prevMode) =>
                  prevMode === "list" ? "page" : "list",
                )
              }
              className={`flex h-9 cursor-pointer flex-row items-center gap-2 rounded-md border bg-gray-800 px-4 text-sm font-medium transition-colors ${viewMode === "list" ? "border-blue-500" : "border-gray-700"}`}
            >
              Mode Liste <FilesIcon className="size-4" />
            </button>
            <Link
              href={pdfFile}
              target="_blank"
              rel="noopener noreferrer"
              download="chapitre-1.pdf"
              className="flex size-9 cursor-pointer flex-row items-center justify-center rounded-md border border-gray-700 bg-gray-800 text-sm font-medium transition-colors"
            >
              <DownloadIcon className="size-4" />
            </Link>
            <button
              className="flex size-9 cursor-pointer flex-row items-center justify-center rounded-md border border-gray-700 bg-gray-800 text-sm font-medium transition-colors"
              onClick={printPDF}
            >
              <PrinterIcon className="size-4" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden" ref={pdfRef}>
          <div
            className={`w-full overflow-auto ${isZoomed ? "fixed top-0 left-0" : "relative"} transition-all duration-200 ease-in-out`}
          >
            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-blue-600"></div>
                    <p className="font-medium text-gray-600">
                      Chargement du PDF...
                    </p>
                  </div>
                </div>
              }
              error={
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center text-red-600">
                    <p className="mb-2 flex items-center gap-2 text-xl font-bold">
                      <XIcon className="size-8" /> Erreur
                    </p>
                    <p className="text-center">Impossible de charger le PDF</p>
                  </div>
                </div>
              }
              className="flex w-full cursor-pointer flex-col items-center gap-4 select-none"
            >
              {viewMode === "list" ? (
                numPages &&
                Array.from(new Array(numPages), (el, index) => (
                  <div
                    key={`page_${index + 1}`}
                    className="mb-4 w-full overflow-hidden shadow-md"
                  >
                    <Page
                      pageNumber={index + 1}
                      width={width}
                      renderTextLayer={false}
                      renderAnnotationLayer={true}
                    />
                    <div className="bg-gray-100 px-4 py-2 text-center text-sm font-medium text-gray-600">
                      Page {index + 1}
                    </div>
                  </div>
                ))
              ) : (
                <Page
                  className="shadow-md"
                  pageNumber={pageNumber}
                  width={width}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  onClick={() => setFullscreen(true)}
                />
              )}
            </Document>
          </div>
        </div>
        <div className="mt-8 flex w-full flex-row justify-center">
          {numPages ? (
            viewMode === "page" ? (
              <div className="flex w-lg items-center justify-between">
                <button
                  onClick={previousPage}
                  disabled={pageNumber <= 1}
                  className="flex cursor-pointer flex-row items-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium transition-colors"
                >
                  <ArrowLeftIcon className="size-4" /> Précédent
                </button>
                <span className="font-medium text-gray-300">
                  Page {pageNumber} sur {numPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={pageNumber >= numPages}
                  className="flex cursor-pointer flex-row items-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium transition-colors"
                >
                  Suivant <ArrowRightIcon className="size-4" />
                </button>
              </div>
            ) : (
              <span>
                Total : {numPages} page{numPages > 1 ? "s" : ""}
              </span>
            )
          ) : null}
        </div>
      </div>
    </>
  );
}

function FullscreenPDFViewer({
  fullscreen,
  setFullscreen,
  pdfWidth,
  numPages,
  pdfFile,
  onDocumentLoadSuccess,
}: {
  fullscreen: boolean;
  setFullscreen: (value: boolean) => void;
  pdfWidth: number;
  numPages: number | null;
  pdfFile: string;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
}) {
  const [zoom, setZoom] = useState(1);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-10000 h-screen w-screen overflow-hidden bg-black/50",
        {
          "pointer-events-none hidden opacity-0": !fullscreen,
        },
      )}
    >
      <div
        className="fixed bottom-10 left-1/2 z-100 flex w-fit -translate-x-1/2 cursor-pointer flex-row items-center justify-between gap-2 rounded-full border border-gray-800 bg-gray-950 p-2"
        onClick={() => setFullscreen(true)}
      >
        <div
          className="flex size-10 cursor-pointer flex-col items-center justify-center rounded-full hover:bg-white/10"
          onClick={() => setZoom(zoom + 0.3)}
        >
          <ZoomInIcon size={24} />
        </div>
        <div
          className="flex size-10 cursor-pointer flex-col items-center justify-center rounded-full hover:bg-white/10"
          onClick={() => setZoom(zoom - 0.3)}
        >
          <ZoomOut size={24} />
        </div>
      </div>
      <div className="absolute top-4 right-4 flex flex-row items-center gap-2">
        <button className="flex size-9 cursor-pointer flex-row items-center justify-center">
          <XIcon className="size-4" />
        </button>
      </div>
      <div
        className="flex max-h-full w-screen flex-col items-center justify-start overflow-x-hidden overflow-y-scroll"
        onClick={(e) => {
          if (e.target === e.currentTarget) setFullscreen(false);
        }}
      >
        <div className="size-fit transition-transform duration-1000 ease-in-out">
          <Document
            onLoadSuccess={onDocumentLoadSuccess}
            file={pdfFile}
            className="mt-8 flex w-fit flex-col items-center gap-4 select-none"
            scale={zoom}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={pdfWidth}
                renderTextLayer={false}
                renderAnnotationLayer={true}
                className="pointer-events-none shadow-md"
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
