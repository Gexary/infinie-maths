"use client";

import { useCallback, useEffect, useRef } from "react";

function createHiddenIframe(url: string) {
  const iframe = document.createElement("iframe");

  iframe.style.position = "fixed";
  iframe.style.width = "1px";
  iframe.style.height = "1px";
  iframe.style.opacity = "0";
  iframe.style.overflow = "hidden";
  iframe.style.pointerEvents = "none";
  iframe.style.right = "-9999px";
  iframe.style.bottom = "-9999px";
  iframe.setAttribute("aria-hidden", "true");

  iframe.src = url;

  return iframe;
}

export function usePrintUrl(pdfUrl: string) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!pdfUrl) return;

    const iframe = createHiddenIframe(pdfUrl);
    iframeRef.current = iframe;

    document.body.appendChild(iframe);

    return () => {
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      iframeRef.current = null;
    };
  }, [pdfUrl]);

  const handlePrint = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, []);

  return handlePrint;
}

export function usePrintBlob(blob: Blob | null | string) {
  const blobUrl = useRef<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!blob) return;

    if (typeof blob === "string") {
      blobUrl.current = blob;
    } else {
      blobUrl.current = URL.createObjectURL(blob);
    }

    const iframe = createHiddenIframe(blobUrl.current);
    iframeRef.current = iframe;
    document.body.appendChild(iframe);

    return () => {
      if (iframeRef.current?.parentNode) iframeRef.current.parentNode.removeChild(iframeRef.current);
      iframeRef.current = null;
      if (blobUrl.current) URL.revokeObjectURL(blobUrl.current);
    };
  }, [blob]);

  const handlePrint = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, []);

  return handlePrint;
}
