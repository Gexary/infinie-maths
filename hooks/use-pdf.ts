"use client";

import { useEffect, useRef, useState } from "react";

export interface PDFType {
  blob: Blob | null;
  loading: boolean;
  error: string | null;
  blobUrl: string | null;
}

export function usePDF(src: string): PDFType {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;
    (async () => {
      setLoading(true);
      try {
        const result = await fetch(src);
        if (!result.ok) throw new Error("PDF load failed");
        const blob = await result.blob();
        setBlob(blob);
        setBlobUrl(URL.createObjectURL(blob));
      } catch (e) {
        setError("Impossible de charger le PDF");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [src]);

  return { blob, loading, error, blobUrl };
}

export type PDFViewMode = "page" | "list";

export interface PDFDocumentType {
  totalPages: number | null;
  activePage: number;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  previousPage: () => void;
  nextPage: () => void;
  viewMode: PDFViewMode;
  setViewMode: (viewMode: PDFViewMode) => void;
  toggleViewMode: () => void;
}

export function usePDFDocument({ initialViewMode = "page" }: { initialViewMode?: PDFViewMode } = {}): PDFDocumentType {
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [viewMode, setViewMode] = useState<PDFViewMode>(initialViewMode);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
    setActivePage(1);
  };

  const changePage = (offset: number) => setActivePage((prevPageNumber) => Math.max(1, Math.min(totalPages ?? 0, prevPageNumber + offset)));

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const toggleViewMode = () => setViewMode((prevViewMode) => (prevViewMode === "list" ? "page" : "list"));

  return { totalPages, activePage, onDocumentLoadSuccess, previousPage, nextPage, viewMode, toggleViewMode, setViewMode };
}
