import type { ReactNode } from "react";

export type StyleRenderer = (props: { children: string; params?: string }) => ReactNode;

export type StyleMap = Record<string, StyleRenderer>;

export class StylizedTextPatterns {
  patterns: { start: string; end: string; key: string }[];
  styles: StyleMap;

  constructor(styleMap: StyleMap) {
    this.styles = styleMap;
    this.patterns = Object.keys(styleMap).map((p) => {
      const [start, end] = p.split(" ");
      return { start, end, key: p };
    });
  }
}
