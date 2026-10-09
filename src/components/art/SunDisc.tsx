import React from "react";

interface SunDiscProps {
  size?: number;
  rings?: number; // 0 sampai 3 cincin konsentris
  clipped?: boolean; // terpotong horizon
  className?: string;
}

export function SunDisc({
  size = 400,
  rings = 3,
  clipped = true,
  className = "",
}: SunDiscProps) {
  const viewBoxSize = 400;
  const center = 200;
  const sunRadius = 90;

  return (
    <svg
      width={size}
      height={clipped ? size / 2 + 10 : size}
      viewBox={`0 0 ${viewBoxSize} ${clipped ? viewBoxSize / 2 + 10 : viewBoxSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Cincin konsentris tipis */}
      {rings >= 1 && (
        <circle
          cx={center}
          cy={center}
          r={sunRadius + 30}
          stroke="var(--cream-2)"
          strokeWidth="1.5"
          fill="none"
        />
      )}
      {rings >= 2 && (
        <circle
          cx={center}
          cy={center}
          r={sunRadius + 60}
          stroke="var(--cream-2)"
          strokeWidth="1.5"
          fill="none"
        />
      )}
      {rings >= 3 && (
        <circle
          cx={center}
          cy={center}
          r={sunRadius + 95}
          stroke="var(--cream-2)"
          strokeWidth="1.5"
          fill="none"
        />
      )}

      {/* Setengah lingkaran matahari terbenam (sunset) */}
      <path
        d={`M${center - sunRadius} ${center} A ${sunRadius} ${sunRadius} 0 0 1 ${
          center + sunRadius
        } ${center} Z`}
        fill="var(--orange)"
      />

      {/* Garis horizon slate-900 2px */}
      {clipped && (
        <line
          x1="0"
          y1={center}
          x2={viewBoxSize}
          y2={center}
          stroke="var(--slate-900)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
