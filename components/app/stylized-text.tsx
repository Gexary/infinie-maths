"use client";

import type { StylizedTextPatterns } from "@/components/app/stylized-text-patterns";
import type { ReactNode } from "react";

export default function StylizedText({ text, textStyle }: { text: string; textStyle: StylizedTextPatterns }) {
  const nodes: ReactNode[] = [];

  let buffer = "";
  let i = 0;
  const len = text.length;

  while (i < len) {
    const char = text[i];

    if (char === "\\") {
      i++;
      if (i < len) buffer += text[i];
      i++;
      continue;
    }

    let matched = false;

    for (const { start, end, key } of textStyle.patterns) {
      if (text.slice(i, i + start.length) === start) {
        let j = i + start.length;
        let params: string | undefined;
        let content = "";

        if (text[j] === "(") {
          j++;
          let paramBuffer = "";
          while (j < len && text[j] !== ")") {
            if (text[j] === "\\" && j + 1 < len) {
              paramBuffer += text[j + 1];
              j += 2;
            } else {
              paramBuffer += text[j];
              j++;
            }
          }
          if (j < len && text[j] === ")") {
            params = paramBuffer;
            j++;
          }
        }

        while (j < len) {
          if (text.slice(j, j + end.length) === end && text[j - 1] !== "\\") break;
          if (text[j] === "\\" && j + 1 < len) {
            content += text[j + 1];
            j += 2;
          } else {
            content += text[j];
            j++;
          }
        }

        if (j < len && text.slice(j, j + end.length) === end) {
          if (buffer) nodes.push(buffer);
          nodes.push(textStyle.styles[key]({ children: content, params }));
          buffer = "";
          i = j + end.length;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      buffer += char;
      i++;
    }
  }

  if (buffer) nodes.push(buffer);

  return <>{nodes}</>;
}
