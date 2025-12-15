"use client";

import { useEffect, useState } from "react";

interface GridBackgroundProps {
  width?: number;
  height?: number;
  cellSize?: number;
  borderWidth?: number;
  borderColor?: string;
  gradientId?: string;
  gradientType?: "linear" | "radial";
  className?: string;
}

export default function GridBackground({ width = 600, height = 400, cellSize = 20, borderWidth = 1, borderColor = "#fff", className }: GridBackgroundProps) {
  const [lines, setLines] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const out = [];
    for (let r = 0; r <= rows; r++) {
      out.push(<line key={`h-${r}`} x1={0} y1={r * cellSize} x2={width} y2={r * cellSize} stroke={borderColor} strokeWidth={borderWidth} />);
    }
    for (let c = 0; c <= cols; c++) {
      out.push(<line key={`v-${c}`} x1={c * cellSize} y1={0} x2={c * cellSize} y2={height} stroke={borderColor} strokeWidth={borderWidth} />);
    }
    setLines(out);
  }, [width, height, cellSize, borderWidth, borderColor]);

  const cols = Math.ceil(width / cellSize);
  const rows = Math.ceil(height / cellSize);

  const gradientId = "gridGradient";
  const gradientDirection = "to bottom";
  const gradientType = "radial";

  return (
    <svg width={width} height={height} className={className}>
      <defs>
        {gradientType === "radial" ? (
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>
        ) : (
          <linearGradient id={gradientId} gradientTransform={`rotate(${getRotation(gradientDirection)})`}>
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
        )}
        <mask id="gridMask">
          <rect width={width} height={height} fill={`url(#${gradientId})`} />
        </mask>
      </defs>
      <g mask="url(#gridMask)">{lines}</g>
    </svg>
  );
}

function getRotation(direction: string): number {
  switch (direction.toLowerCase()) {
    case "to right":
      return 0;
    case "to bottom":
      return 90;
    case "to left":
      return 180;
    case "to top":
      return 270;
    case "to top right":
      return -45;
    case "to top left":
      return -135;
    case "to bottom right":
      return 45;
    case "to bottom left":
      return 135;
    default:
      return 0;
  }
}
