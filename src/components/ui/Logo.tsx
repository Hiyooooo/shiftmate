import React from "react";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  logoUrl?: string | null;
  siteName?: string;
}

export function Logo({
  className = "",
  isDark = false,
  logoUrl,
  siteName = "ShiftMate",
}: LogoProps) {
  if (logoUrl && logoUrl.trim() !== "" && logoUrl !== "/favicon.svg") {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={siteName}
          className="h-8 w-auto max-w-[160px] object-contain rounded"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Simbol Matahari & Horizon (Custom SVG) */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <rect width="34" height="34" rx="10" fill="var(--orange)" />
        {/* Setengah lingkaran matahari terbit/terbenam */}
        <path
          d="M8 20.5C8 15.2533 12.0294 11 17 11C21.9706 11 26 15.2533 26 20.5H8Z"
          fill="var(--slate-900)"
        />
        {/* Garis horizon */}
        <line
          x1="6"
          y1="22.5"
          x2="28"
          y2="22.5"
          stroke="var(--slate-900)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <span
        className={`font-display text-xl font-extrabold tracking-tight ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {siteName}
      </span>
    </div>
  );
}
