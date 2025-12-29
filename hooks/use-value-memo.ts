"use client";

import { useRef } from "react";

export function useValueMemo<T>(value: T | null | undefined, fallback: T, resetKey?: unknown): T {
  const ref = useRef<T | null>(null);

  if (ref.current === null && value != null) ref.current = value;

  return ref.current ?? fallback;
}
