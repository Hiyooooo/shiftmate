import React from "react";

interface StepArtProps {
  className?: string;
}

export function StepArt3({ className = "" }: StepArtProps) {
  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-[16px] bg-cream overflow-hidden border border-line-2 p-5 flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label="Langkah 3: Staf mulai clock-in dari ponsel masing-masing"
    >
      <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Mockup Ponsel Mini di Tengah */}
        <rect x="115" y="20" width="90" height="180" rx="16" fill="var(--slate-900)" />
        <rect x="119" y="24" width="82" height="172" rx="12" fill="var(--white)" />

        {/* Dynamic Island / Notch */}
        <rect x="142" y="28" width="36" height="7" rx="3.5" fill="var(--slate-900)" />

        {/* Layar Ponsel: Sukses Clock In */}
        <circle cx="160" cy="85" r="22" fill="var(--ok-bg)" />
        <path d="M152 85L158 91L169 79" stroke="var(--ok)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="135" y="118" width="50" height="6" rx="2" fill="var(--slate-900)" />
        <rect x="142" y="130" width="36" height="4" rx="2" fill="var(--ink-3)" />

        {/* Tombol Absen Selesai */}
        <rect x="130" y="152" width="60" height="16" rx="6" fill="var(--orange)" />

        {/* 3 Avatar Inisial Karyawan Mengelilingi Ponsel */}
        {/* Avatar 1 Kiri */}
        <g transform="translate(40, 70)">
          <circle cx="25" cy="25" r="25" fill="var(--cream-2)" stroke="var(--line-2)" strokeWidth="2" />
          <text x="25" y="27" fill="var(--orange-700)" fontSize="13" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
            SW
          </text>
          <circle cx="42" cy="12" r="6" fill="var(--ok)" />
        </g>

        {/* Avatar 2 Kanan Atas */}
        <g transform="translate(230, 45)">
          <circle cx="22" cy="22" r="22" fill="var(--white)" stroke="var(--line-2)" strokeWidth="2" />
          <text x="22" y="24" fill="var(--slate-900)" fontSize="12" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
            RH
          </text>
          <circle cx="37" cy="10" r="5" fill="var(--ok)" />
        </g>

        {/* Avatar 3 Kanan Bawah */}
        <g transform="translate(225, 120)">
          <circle cx="22" cy="22" r="22" fill="var(--white)" stroke="var(--line-2)" strokeWidth="2" />
          <text x="22" y="24" fill="var(--slate-900)" fontSize="12" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
            DS
          </text>
          <circle cx="37" cy="10" r="5" fill="var(--ok)" />
        </g>

        {/* Badge Absen Valid */}
        <rect x="80" y="195" width="160" height="24" rx="12" fill="var(--slate-900)" />
        <text x="160" y="208" fill="var(--white)" fontSize="11" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
          Siap dipakai seluruh kru
        </text>
      </svg>
    </div>
  );
}
