"use client";

import { FilesIcon, ArrowLeftIcon, ArrowRightIcon, DownloadIcon, PrinterIcon, XIcon } from "lucide-react";
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
    })
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

  if (fullscreen)
    return (
      <div className="fixed top-0 left-0 z-10000 w-screen h-screen bg-black/80">
        <div className="absolute top-4 right-4 flex flex-row items-center gap-2">
          <button onClick={() => setIsZoomed((prevZoomed) => !prevZoomed)} className="size-9 flex flex-row items-center justify-center rounded-md font-medium text-sm border cursor-pointer bg-gray-800 transition-colors border-gray-700">
            <DownloadIcon className="size-4" />
          </button>
          <button className="size-9 flex flex-row items-center justify-center rounded-md font-medium text-sm border cursor-pointer bg-gray-800 transition-colors border-gray-700">
            <PrinterIcon className="size-4" />
          </button>
        </div>
        <div
          className="overflow-y-scroll w-full max-h-full flex flex-col items-center justify-start"
          onClick={(e) => {
            if (e.target === e.currentTarget) setFullscreen(false);
            console.log(e.target, e.currentTarget);
          }}
        >
          <Document onLoadSuccess={onDocumentLoadSuccess} file={pdfFile} className="mt-8 select-none flex flex-col items-center gap-4 w-fit">
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width={pdfWidth} renderTextLayer={false} renderAnnotationLayer={true} className="shadow-md pointer-events-none" />
            ))}
          </Document>
        </div>
      </div>
    );

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <h1 className="text-white text-2xl font-bold">Cours</h1>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => setViewMode((prevMode) => (prevMode === "list" ? "page" : "list"))}
            className={`px-4 h-9 flex flex-row items-center gap-2 rounded-md font-medium text-sm border cursor-pointer bg-gray-800 transition-colors ${viewMode === "list" ? "border-blue-500" : "border-gray-700"}`}
          >
            Mode Liste <FilesIcon className="size-4" />
          </button>
          <button onClick={() => setIsZoomed((prevZoomed) => !prevZoomed)} className="size-9 flex flex-row items-center justify-center rounded-md font-medium text-sm border cursor-pointer bg-gray-800 transition-colors border-gray-700">
            <DownloadIcon className="size-4" />
          </button>
          <button className="size-9 flex flex-row items-center justify-center rounded-md font-medium text-sm border cursor-pointer bg-gray-800 transition-colors border-gray-700">
            <PrinterIcon className="size-4" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden" ref={pdfRef}>
        <div className={`w-full overflow-auto ${isZoomed ? "fixed top-0 left-0" : "relative"} transition-all duration-200 ease-in-out`}>
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Chargement du PDF...</p>
                </div>
              </div>
            }
            error={
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-red-600 flex flex-col items-center justify-center">
                  <p className="text-xl font-bold mb-2 flex items-center gap-2">
                    <XIcon className="size-8" /> Erreur
                  </p>
                  <p className="text-center">Impossible de charger le PDF</p>
                </div>
              </div>
            }
            className="flex flex-col items-center gap-4 w-full cursor-pointer select-none"
          >
            {viewMode === "list" ? (
              numPages &&
              Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} className="w-full shadow-md mb-4 overflow-hidden">
                  <Page pageNumber={index + 1} width={width} renderTextLayer={false} renderAnnotationLayer={true} />
                  <div className="bg-gray-100 px-4 py-2 text-center text-sm text-gray-600 font-medium">Page {index + 1}</div>
                </div>
              ))
            ) : (
              <Page className="shadow-md" pageNumber={pageNumber} width={width} renderTextLayer={true} renderAnnotationLayer={true} onClick={() => setFullscreen(true)} />
            )}
          </Document>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center mt-8">
        {numPages ? (
          viewMode === "page" ? (
            <div className="flex items-center justify-between w-lg">
              <button onClick={previousPage} disabled={pageNumber <= 1} className="px-4 py-2 flex flex-row items-center gap-2 rounded-md font-medium text-sm border cursor-pointer bg-gray-800 transition-colors border-gray-700">
                <ArrowLeftIcon className="size-4" /> Précédent
              </button>
              <span className="text-gray-300 font-medium">
                Page {pageNumber} sur {numPages}
              </span>
              <button onClick={nextPage} disabled={pageNumber >= numPages} className="px-4 py-2 flex flex-row items-center gap-2 rounded-md font-medium text-sm border cursor-pointer bg-gray-800 transition-colors border-gray-700">
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
  );
}
