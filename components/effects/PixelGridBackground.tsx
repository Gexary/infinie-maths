"use client";
import { useEffect, useState, type ReactElement } from "react";

interface PixelGridBackgroundProps {
  rows?: number;
  cols?: number;
  cellSize?: number;
  gap?: number;
  borderRadius?: number;
  color?: string;
}

export default function PixelGridBackground({ rows = 8, cols = 30, cellSize = 18, gap = 2, borderRadius = 4, color = "#fff" }: PixelGridBackgroundProps) {
  const W = cols * (cellSize + gap) - gap;
  const H = rows * (cellSize + gap) - gap;

  const [rects, setRects] = useState<ReactElement[]>([]);

  useEffect(() => {
    const out = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * (cellSize + gap);
        const y = r * (cellSize + gap);
        const opacity = Math.max(0.15, Math.random() * 0.5);
        out.push(<rect key={`${r}-${c}`} x={x} y={y} width={cellSize} height={cellSize} rx={borderRadius} fill={color} opacity={opacity} />);
      }
    }
    setRects(out);
  }, [rows, cols, cellSize, gap, borderRadius, color]);

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="user-select-none pointer-events-none">
      <defs>
        <mask id="fadeMask" maskUnits="objectBoundingBox">
          <linearGradient id="fadeGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="black" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <rect width="100%" height="100%" fill="url(#fadeGradient)" />
        </mask>
      </defs>
      <g mask="url(#fadeMask)">{rects}</g>
    </svg>
  );
}
