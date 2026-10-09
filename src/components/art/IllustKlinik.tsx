import React from "react";

interface IllustProps {
  className?: string;
}

export function IllustKlinik({ className = "" }: IllustProps) {
  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-[16px] bg-cream overflow-hidden border border-line-2 flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label="Ilustrasi operasional shift klinik dan tenaga medis"
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="400" height="300" fill="var(--cream)" />

        {/* Papan Palang Medis Hijau Netral di dinding */}
        <rect x="50" y="35" width="50" height="50" rx="6" fill="var(--ok-bg)" stroke="var(--ok)" strokeWidth="1.5" />
        <rect x="68" y="45" width="14" height="30" rx="2" fill="var(--ok)" />
        <rect x="60" y="53" width="30" height="14" rx="2" fill="var(--ok)" />

        {/* Tiang Infus Sederhana di kanan */}
        <line x1="330" y1="60" x2="330" y2="200" stroke="var(--slate-800)" strokeWidth="2.5" />
        <path d="M320 60H340" stroke="var(--slate-800)" strokeWidth="2.5" />
        <rect x="323" y="70" width="14" height="24" rx="3" fill="var(--mist)" stroke="var(--control)" />

        {/* Tempat Tidur Pasien Minimalis */}
        <rect x="230" y="155" width="130" height="40" rx="4" fill="var(--white)" stroke="var(--line-2)" strokeWidth="2" />
        <rect x="230" y="145" width="35" height="15" rx="3" fill="var(--cream-2)" />
        <line x1="240" y1="195" x2="240" y2="215" stroke="var(--slate-800)" strokeWidth="3" />
        <line x1="350" y1="195" x2="350" y2="215" stroke="var(--slate-800)" strokeWidth="3" />

        {/* Figur Perawat/Staf dengan seragam scrub */}
        <circle cx="150" cy="115" r="22" fill="var(--slate-800)" opacity="0.6" />
        <path d="M120 200V150C120 140 135 135 150 135C165 135 180 140 180 150V200H120Z" fill="var(--slate-800)" />
        {/* Kerah V seragam scrub oranye muda */}
        <path d="M142 135L150 152L158 135Z" fill="var(--cream-2)" />
        <rect x="135" y="165" width="30" height="20" rx="2" fill="var(--orange)" />

        {/* Garis lantai */}
        <line x1="0" y1="200" x2="400" y2="200" stroke="var(--slate-900)" strokeWidth="3" />
        <rect x="0" y="200" width="400" height="100" fill="var(--white)" />
      </svg>
    </div>
  );
}
