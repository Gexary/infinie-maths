"use client";

import { Fragment, type ReactNode } from "react";

export type StyleRenderer = (props: { children: string; params?: string }) => ReactNode;

export type StyleMap = Record<string, StyleRenderer>;

export class StylizedTextPatterns {
  patternMap: Map<string, { end: string; key: string }>;
  styles: StyleMap;

  constructor(styleMap: StyleMap) {
    this.styles = styleMap;
    this.patternMap = new Map();
    for (const key of Object.keys(styleMap)) {
      const [start, end] = key.split(" ");
      this.patternMap.set(start, { end, key });
    }
  }
}

const stylizedTextStyle = new StylizedTextPatterns({
  "** **": ({ children, params }) => (
    <span className="font-bold">
      {children}
      {params ? ` (${params})` : ""}
    </span>
  ),
  // "{ }": ({ children, params }) => (
  //   <span className="text-red-500">
  //     {children}
  //     {params ? ` (${params})` : ""}
  //   </span>
  // ),
  // "% %": ({ children, params }) => (
  //   <span className="text-green-500">
  //     {children}
  //     {params ? ` (${params})` : ""}
  //   </span>
  // ),
  // "$ $": ({ children, params }) => <span className={`text-[${params}]`}>{children}</span>,
});

export default function StylizedText({ text, textStyle = stylizedTextStyle }: { text: string; textStyle?: StylizedTextPatterns }) {
  const nodes: ReactNode[] = [];
  const len = text.length;
  let buffer: string[] = [];
  let nodeCount = 0;

  let i = 0;
  while (i < len) {
    const char = text[i];

    if (char === "\\") {
      if (i + 1 < len) buffer.push(text[i + 1]);
      i += 2;
      continue;
    }

    let matched = false;

    for (const [start, { end, key }] of textStyle.patternMap.entries()) {
      if (text.startsWith(start, i)) {
        let j = i + start.length;
        let params: string | undefined;
        const contentArr: string[] = [];

        if (text[j] === "(") {
          j++;
          const paramArr: string[] = [];
          while (j < len && text[j] !== ")") {
            if (text[j] === "\\" && j + 1 < len) {
              paramArr.push(text[j + 1]);
              j += 2;
            } else {
              paramArr.push(text[j]);
              j++;
            }
          }
          if (j < len && text[j] === ")") j++;
          params = paramArr.join("");
        }

        while (j < len) {
          if (text.startsWith(end, j) && text[j - 1] !== "\\") break;
          if (text[j] === "\\" && j + 1 < len) {
            contentArr.push(text[j + 1]);
            j += 2;
          } else {
            contentArr.push(text[j]);
            j++;
          }
        }

        if (text.startsWith(end, j)) {
          if (buffer.length) nodes.push(buffer.join(""));
          nodes.push(<Fragment key={nodeCount++}>{textStyle.styles[key]({ children: contentArr.join(""), params })}</Fragment>);
          buffer = [];
          i = j + end.length;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      buffer.push(char);
      i++;
    }
  }

  if (buffer.length) nodes.push(buffer.join(""));

  return <>{nodes}</>;
}
