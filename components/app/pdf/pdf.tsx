import type { PDFDocumentType, PDFType } from "@/hooks/use-pdf";
import { XIcon } from "lucide-react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export interface PDFProps {
  pdf: PDFType;
  width: number;
  pdfDocument: PDFDocumentType;
  onClick?: () => void;
  zoom?: number;
}

const PAGE_PROPS = {
  renderTextLayer: false,
  renderAnnotationLayer: false,
  className: "shadow-md select-none",
};

export function PDF({ pdf, width, onClick, pdfDocument, zoom = 1 }: PDFProps) {
  return (
    <Document
      file={pdf.blob}
      onLoadSuccess={pdfDocument.onDocumentLoadSuccess}
      className="flex w-full cursor-pointer flex-col items-center gap-4 select-none"
      noData={
        <div className="flex h-full items-center justify-center mt-8">
          <p className="font-medium text-gray-600">Aucun PDF n'a été trouvé</p>
        </div>
      }
      loading={
        <div className="flex h-full items-center justify-center mt-8">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-blue-600"></div>
            <p className="font-medium text-gray-600">Chargement du PDF...</p>
          </div>
        </div>
      }
      error={
        <div className="flex h-full items-center justify-center mt-8">
          <div className="flex flex-col items-center justify-center text-center text-red-600">
            <p className="mb-2 flex items-center gap-2 text-xl font-bold">
              <XIcon className="size-8" /> Erreur
            </p>
            <p className="text-center">Impossible de charger le PDF</p>
          </div>
        </div>
      }
    >
      {pdfDocument.totalPages !== null &&
        (pdfDocument.viewMode === "list" ? (
          Array.from(new Array(pdfDocument.totalPages), (_, index) => <Page pageNumber={index + 1} width={width} onClick={onClick} {...PAGE_PROPS} key={`page_${index + 1}`} scale={zoom} />)
        ) : (
          <Page pageNumber={pdfDocument.activePage} width={width} onClick={onClick} {...PAGE_PROPS} scale={zoom} />
        ))}
    </Document>
  );
}
