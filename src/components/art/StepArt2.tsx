import React from "react";

interface StepArtProps {
  className?: string;
}

export function StepArt2({ className = "" }: StepArtProps) {
  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-[16px] bg-cream overflow-hidden border border-line-2 p-5 flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label="Langkah 2: Susun pola rotasi shift mingguan"
    >
      <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Pemilih pola kartu segmented */}
        <rect x="30" y="30" width="260" height="42" rx="10" fill="var(--mist)" stroke="var(--line-2)" strokeWidth="1.5" />
        <rect x="34" y="34" width="80" height="34" rx="8" fill="var(--orange)" />
        <text x="74" y="55" fill="var(--slate-900)" fontSize="12" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
          2-2-2-2
        </text>
        <text x="160" y="55" fill="var(--ink-2)" fontSize="12" fontWeight="600" textAnchor="middle" dominantBaseline="middle">
          5-2 Rutin
        </text>
        <text x="245" y="55" fill="var(--ink-2)" fontSize="12" fontWeight="600" textAnchor="middle" dominantBaseline="middle">
          3 Shift 7H
        </text>

        {/* Kalender strip minggu */}
        <g transform="translate(25, 95)">
          {/* Hari 1: Pagi */}
          <rect x="0" y="0" width="34" height="60" rx="8" fill="var(--cream-2)" stroke="var(--orange-700)" strokeWidth="1.5" />
          <text x="17" y="20" fill="var(--orange-700)" fontSize="11" fontWeight="bold" textAnchor="middle">Sen</text>
          <text x="17" y="44" fill="var(--orange-700)" fontSize="14" fontWeight="800" textAnchor="middle">P</text>

          {/* Hari 2: Pagi */}
          <rect x="39" y="0" width="34" height="60" rx="8" fill="var(--cream-2)" stroke="var(--orange-700)" strokeWidth="1.5" />
          <text x="56" y="20" fill="var(--orange-700)" fontSize="11" fontWeight="bold" textAnchor="middle">Sel</text>
          <text x="56" y="44" fill="var(--orange-700)" fontSize="14" fontWeight="800" textAnchor="middle">P</text>

          {/* Hari 3: Siang */}
          <rect x="78" y="0" width="34" height="60" rx="8" fill="var(--warn-bg)" stroke="var(--warn)" strokeWidth="1.5" />
          <text x="95" y="20" fill="var(--warn)" fontSize="11" fontWeight="bold" textAnchor="middle">Rab</text>
          <text x="95" y="44" fill="var(--warn)" fontSize="14" fontWeight="800" textAnchor="middle">S</text>

          {/* Hari 4: Siang */}
          <rect x="117" y="0" width="34" height="60" rx="8" fill="var(--warn-bg)" stroke="var(--warn)" strokeWidth="1.5" />
          <text x="134" y="20" fill="var(--warn)" fontSize="11" fontWeight="bold" textAnchor="middle">Kam</text>
          <text x="134" y="44" fill="var(--warn)" fontSize="14" fontWeight="800" textAnchor="middle">S</text>

          {/* Hari 5: Malam */}
          <rect x="156" y="0" width="34" height="60" rx="8" fill="var(--slate-800)" stroke="var(--slate-900)" strokeWidth="1.5" />
          <text x="173" y="20" fill="var(--white)" fontSize="11" fontWeight="bold" textAnchor="middle">Jum</text>
          <text x="173" y="44" fill="var(--white)" fontSize="14" fontWeight="800" textAnchor="middle">M</text>

          {/* Hari 6: Malam */}
          <rect x="195" y="0" width="34" height="60" rx="8" fill="var(--slate-800)" stroke="var(--slate-900)" strokeWidth="1.5" />
          <text x="212" y="20" fill="var(--white)" fontSize="11" fontWeight="bold" textAnchor="middle">Sab</text>
          <text x="212" y="44" fill="var(--white)" fontSize="14" fontWeight="800" textAnchor="middle">M</text>

          {/* Hari 7: Libur */}
          <rect x="234" y="0" width="34" height="60" rx="8" fill="var(--mist)" stroke="var(--line-2)" strokeWidth="1.5" />
          <text x="251" y="20" fill="var(--ink-3)" fontSize="11" fontWeight="bold" textAnchor="middle">Min</text>
          <text x="251" y="44" fill="var(--ink-2)" fontSize="14" fontWeight="800" textAnchor="middle">L</text>
        </g>

        {/* Status jeda istirahat aman */}
        <rect x="70" y="180" width="180" height="26" rx="13" fill="var(--ok-bg)" />
        <circle cx="85" cy="193" r="5" fill="var(--ok)" />
        <text x="165" y="194" fill="var(--ok)" fontSize="11" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
          Jeda istirahat shift aman &gt; 8 jam
        </text>
      </svg>
    </div>
  );
}
