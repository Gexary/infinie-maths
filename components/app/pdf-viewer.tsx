"use client";

import { FilesIcon, ArrowLeftIcon, ArrowRightIcon, DownloadIcon, PrinterIcon } from "lucide-react";
import React, { useState } from "react";
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

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-row items-center justify-between gap-2 mt-4">
        <h1 className="text-white text-2xl font-bold">Cours</h1>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => setViewMode((prevMode) => (prevMode === "list" ? "page" : "list"))}
            className={`px-4 h-9 flex flex-row items-center gap-2 rounded-md font-medium text-sm border cursor-pointer bg-gray-800 transition-colors ${viewMode === "list" ? "border-blue-500" : "border-gray-700"}`}
          >
            Mode Liste <FilesIcon className="size-4" />
          </button>
          <button className="size-9 flex flex-row items-center justify-center rounded-md font-medium text-sm border cursor-pointer bg-gray-800 transition-colors border-gray-700">
            <DownloadIcon className="size-4" />
          </button>
          <button className="size-9 flex flex-row items-center justify-center rounded-md font-medium text-sm border cursor-pointer bg-gray-800 transition-colors border-gray-700">
            <PrinterIcon className="size-4" />
          </button>
        </div>
      </div>
      <div className="w-full overflow-auto select-none pointer-events-none">
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
              <div className="text-center text-red-600">
                <p className="text-xl font-bold mb-2">❌ Erreur</p>
                <p>Impossible de charger le PDF</p>
              </div>
            </div>
          }
          className="flex flex-col items-center gap-4 w-full"
        >
          {viewMode === "list" ? (
            numPages &&
            Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`} className="border border-gray-300 w-full shadow-md mb-4 overflow-hidden">
                <Page pageNumber={index + 1} width={1000} renderTextLayer={true} renderAnnotationLayer={true} className={"max-w-full"} />
                <div className="bg-gray-100 px-4 py-2 text-center text-sm text-gray-600 font-medium">Page {index + 1}</div>
              </div>
            ))
          ) : (
            <div className="border border-gray-300 shadow-md">
              <Page pageNumber={pageNumber} width={1000} renderTextLayer={true} renderAnnotationLayer={true} />
            </div>
          )}
        </Document>
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
