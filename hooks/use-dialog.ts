"use client";

import { useRef, useState } from "react";

export interface DialogHandler<T> {
  isOpen: boolean;
  data: T | null;
  open: (data?: T) => void;
  close: () => void;
  dialogProps: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
}

export function useDialog<T>(): DialogHandler<T> {
  const [isOpen, setOpenState] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const open = (newData?: T) => {
    setData(newData ?? null);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const setOpen = (open: boolean) => {
    setOpenState(open);
    if (!open) setData(null);
  };

  return { isOpen, data, open, close, dialogProps: { open: isOpen, onOpenChange: setOpen } };
}
