import React from "react";

interface StepArtProps {
  className?: string;
}

export function StepArt1({ className = "" }: StepArtProps) {
  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-[16px] bg-cream overflow-hidden border border-line-2 p-5 flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label="Langkah 1: Impor CSV karyawan dan penentuan lokasi radius"
    >
      <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Dokumen CSV Kiri */}
        <rect x="25" y="30" width="130" height="180" rx="8" fill="var(--white)" stroke="var(--line-2)" strokeWidth="2" />
        <rect x="40" y="45" width="45" height="12" rx="3" fill="var(--orange)" />
        <line x1="40" y1="75" x2="140" y2="75" stroke="var(--line-2)" strokeWidth="2" />
        <line x1="40" y1="105" x2="140" y2="105" stroke="var(--line-2)" strokeWidth="2" />
        <line x1="40" y1="135" x2="140" y2="135" stroke="var(--line-2)" strokeWidth="2" />
        <line x1="40" y1="165" x2="140" y2="165" stroke="var(--line-2)" strokeWidth="2" />
        {/* Kolom data */}
        <circle cx="50" cy="90" r="4" fill="var(--slate-800)" />
        <rect x="62" y="87" width="55" height="6" rx="2" fill="var(--mist)" />
        <circle cx="50" cy="120" r="4" fill="var(--slate-800)" />
        <rect x="62" y="117" width="65" height="6" rx="2" fill="var(--mist)" />
        <circle cx="50" cy="150" r="4" fill="var(--slate-800)" />
        <rect x="62" y="147" width="50" height="6" rx="2" fill="var(--mist)" />

        {/* Peta & Pin Lokasi Kanan */}
        <rect x="175" y="40" width="120" height="160" rx="8" fill="var(--mist)" stroke="var(--line-2)" strokeWidth="2" />
        {/* Radius lingkaran kerja */}
        <circle cx="235" cy="120" r="45" fill="var(--cream-2)" fillOpacity="0.5" stroke="var(--orange-700)" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="235" cy="120" r="6" fill="var(--slate-900)" />
        {/* Pin oranye */}
        <path d="M235 95C227 95 221 101 221 108C221 118 235 128 235 128C235 128 249 118 249 108C249 101 243 95 235 95Z" fill="var(--orange)" />
        <circle cx="235" cy="107" r="4" fill="var(--slate-900)" />
      </svg>
    </div>
  );
}
