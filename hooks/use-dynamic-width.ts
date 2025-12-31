"use client";

import { useEffect, useRef, useState } from "react";

export function useDynamicWidth<T extends HTMLElement>(defaultWidth: number): { width: number; containerRef: React.RefObject<T | null> } {
  const [width, setWidth] = useState(defaultWidth);
  const containerRef = useRef<T>(null);

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
    if (containerRef.current) resizeObserver.current.observe(containerRef.current);
    return () => {
      resizeObserver.current.disconnect();
    };
  }, [containerRef]);

  return { width, containerRef };
}
