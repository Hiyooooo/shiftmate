import React from "react";

interface IllustProps {
  className?: string;
}

export function IllustHotel({ className = "" }: IllustProps) {
  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-[16px] bg-cream overflow-hidden border border-line-2 flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label="Ilustrasi operasional shift perhotelan dan housekeeping"
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="400" height="300" fill="var(--cream)" />

        {/* Jendela dengan SunDisc kecil di latar */}
        <rect x="270" y="30" width="90" height="90" rx="8" fill="var(--white)" stroke="var(--line-2)" strokeWidth="2" />
        <path d="M295 90A20 20 0 0 1 335 90Z" fill="var(--orange)" />
        <line x1="270" y1="90" x2="360" y2="90" stroke="var(--slate-900)" strokeWidth="1.5" />

        {/* Troli Housekeeping di kiri */}
        <rect x="40" y="140" width="60" height="70" rx="4" fill="var(--mist)" stroke="var(--line-2)" strokeWidth="2" />
        <line x1="40" y1="165" x2="100" y2="165" stroke="var(--line-2)" strokeWidth="2" />
        <line x1="40" y1="190" x2="100" y2="190" stroke="var(--line-2)" strokeWidth="2" />
        <circle cx="50" cy="215" r="7" fill="var(--slate-900)" />
        <circle cx="90" cy="215" r="7" fill="var(--slate-900)" />
        {/* Handuk lipat di troli */}
        <rect x="50" y="150" width="40" height="10" rx="2" fill="var(--white)" />

        {/* Figur Staf Resepsionis */}
        <circle cx="200" cy="115" r="22" fill="var(--slate-800)" opacity="0.6" />
        <path d="M170 200V150C170 140 185 135 200 135C215 135 230 140 230 150V200H170Z" fill="var(--slate-900)" />
        {/* Dasi oranye */}
        <path d="M198 145L202 145L200 165Z" fill="var(--orange)" />

        {/* Meja Resepsionis Hotel */}
        <rect x="130" y="195" width="270" height="105" fill="var(--white)" />
        <line x1="130" y1="195" x2="400" y2="195" stroke="var(--slate-900)" strokeWidth="3" />

        {/* Lonceng Meja Resepsionis */}
        <path d="M165 195A10 10 0 0 1 185 195Z" fill="var(--orange)" />
        <circle cx="175" cy="183" r="2.5" fill="var(--slate-900)" />
      </svg>
    </div>
  );
}
