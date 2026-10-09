import React from "react";

interface SelfieFaceProps {
  className?: string;
  hasScanOverlay?: boolean;
}

export function SelfieFace({ className = "", hasScanOverlay = false }: SelfieFaceProps) {
  return (
    <div
      className={`relative w-full aspect-[3/4] bg-cream-2 rounded-[20px] overflow-hidden flex items-center justify-center border border-line-2 ${className}`}
      role="img"
      aria-label="Siluet panduan bingkai selfie karyawan"
    >
      <svg
        viewBox="0 0 240 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Bentuk bahu & leher netral */}
        <path
          d="M40 320C40 260 80 230 120 230C160 230 200 260 200 320H40Z"
          fill="var(--orange-700)"
          opacity="0.35"
        />
        {/* Kepala netral (lingkaran/oval) */}
        <circle cx="120" cy="140" r="54" fill="var(--orange-700)" opacity="0.45" />

        {/* 4 sudut siku bingkai kamera selfie */}
        <path d="M45 65H30V80" stroke="var(--slate-900)" strokeWidth="3" strokeLinecap="round" />
        <path d="M195 65H210V80" stroke="var(--slate-900)" strokeWidth="3" strokeLinecap="round" />
        <path d="M45 255H30V240" stroke="var(--slate-900)" strokeWidth="3" strokeLinecap="round" />
        <path d="M195 255H210V240" stroke="var(--slate-900)" strokeWidth="3" strokeLinecap="round" />

        {/* Oval pemandu posisi wajah */}
        <ellipse
          cx="120"
          cy="150"
          rx="68"
          ry="90"
          stroke={hasScanOverlay ? "var(--ok)" : "var(--control)"}
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
        />
      </svg>
    </div>
  );
}
