"use client";

import { PDF } from "@/components/app/pdf/pdf";
import { usePDFDocument, type PDFType } from "@/hooks/use-pdf";
import { XIcon, ZoomInIcon, ZoomOutIcon, EqualIcon } from "lucide-react";
import { useEffect, useState } from "react";

const MAX_ZOOM = 1.6;
const MIN_ZOOM = 0.7;
const ZOOM_STEP = 0.3;

interface FullscreenPDFViewerProps {
  close: () => void;
  pdf: PDFType;
}

export function FullscreenPDFViewer({ close, pdf }: FullscreenPDFViewerProps) {
  const [zoom, setZoom] = useState(1);
  const pdfDocument = usePDFDocument({ initialViewMode: "list" });
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  const [pdfWidth, setPdfWidth] = useState(1000);
  useEffect(() => {
    if (!window) return;
    const windowWidth = window.innerWidth;
    if (pdfWidth > windowWidth) {
      setPdfWidth(windowWidth - 16);
    }
  }, []);

  return (
    <div className="top-0 left-0 z-10000 overflow-hidden bg-black/50 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate">
      <div className="fixed bottom-10 left-1/2 z-100 w-fit -translate-x-1/2 flex flex-row items-center gap-2 rounded-md border border-gray-700 bg-gray-800 p-1 text-sm font-medium transition-colors">
        <div className="flex size-9 cursor-pointer flex-col items-center justify-center rounded-md hover:bg-white/10" onClick={() => setZoom((prevZoom) => Math.min(prevZoom + ZOOM_STEP, MAX_ZOOM))}>
          <ZoomInIcon className="size-5" />
        </div>
        <div className="flex size-9 cursor-pointer flex-col items-center justify-center rounded-md hover:bg-white/10" onClick={() => setZoom(1)}>
          <EqualIcon className="size-5" />
        </div>
        <div className="flex size-9 cursor-pointer flex-col items-center justify-center rounded-md hover:bg-white/10" onClick={() => setZoom((prevZoom) => Math.max(prevZoom - ZOOM_STEP, MIN_ZOOM))}>
          <ZoomOutIcon className="size-5" />
        </div>
      </div>
      <button className="absolute top-4 right-4 flex size-9 cursor-pointer flex-row items-center justify-center" onClick={close}>
        <XIcon className="size-5" />
      </button>
      <div className="flex max-h-full w-screen flex-col items-center justify-start overflow-x-hidden overflow-y-scroll custom-scrollbar" onClick={handleClose}>
        <div className="size-fit py-8">
          <PDF pdf={pdf} width={pdfWidth} pdfDocument={pdfDocument} zoom={zoom} />
        </div>
      </div>
    </div>
  );
}
