import React from "react";

interface IllustProps {
  className?: string;
}

export function IllustFnb({ className = "" }: IllustProps) {
  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-[16px] bg-cream overflow-hidden border border-line-2 flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label="Ilustrasi operasional shift F&B dan kafe"
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Latar dinding & papan menu */}
        <rect width="400" height="300" fill="var(--cream)" />
        <rect x="50" y="30" width="100" height="60" rx="6" fill="var(--slate-900)" />
        <line x1="65" y1="50" x2="135" y2="50" stroke="var(--cream-2)" strokeWidth="3" strokeLinecap="round" />
        <line x1="65" y1="65" x2="115" y2="65" stroke="var(--cream-2)" strokeWidth="3" strokeLinecap="round" />

        {/* Lampu gantung */}
        <line x1="280" y1="0" x2="280" y2="40" stroke="var(--slate-900)" strokeWidth="2" />
        <path d="M260 50L300 50L280 40Z" fill="var(--orange)" />

        {/* Figur 1: Barista apron oranye */}
        <circle cx="160" cy="115" r="22" fill="var(--orange-700)" opacity="0.6" />
        <path d="M130 200V150C130 140 145 135 160 135C175 135 190 140 190 150V200H130Z" fill="var(--slate-800)" />
        <path d="M142 150H178V200H142V150Z" fill="var(--orange)" />

        {/* Figur 2: Kru kitchen */}
        <circle cx="240" cy="115" r="22" fill="var(--orange-700)" opacity="0.6" />
        <path d="M210 200V150C210 140 225 135 240 135C255 135 270 140 270 150V200H210Z" fill="var(--slate-800)" />
        <path d="M222 150H258V200H222V150Z" fill="var(--orange)" />

        {/* Meja Bar Counter */}
        <rect x="0" y="195" width="400" height="105" fill="var(--white)" />
        <line x1="0" y1="195" x2="400" y2="195" stroke="var(--slate-900)" strokeWidth="3" />

        {/* Mesin Espresso Sederhana */}
        <rect x="290" y="145" width="70" height="50" rx="4" fill="var(--slate-900)" />
        <rect x="305" y="160" width="40" height="15" rx="2" fill="var(--mist)" />
        <circle cx="315" cy="180" r="4" fill="var(--orange)" />
        <circle cx="335" cy="180" r="4" fill="var(--orange)" />
        {/* Cangkir kopi */}
        <rect x="80" y="180" width="18" height="15" rx="2" fill="var(--orange-700)" />
      </svg>
    </div>
  );
}
