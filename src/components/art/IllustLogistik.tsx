import React from "react";

interface IllustProps {
  className?: string;
}

export function IllustLogistik({ className = "" }: IllustProps) {
  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-[16px] bg-cream overflow-hidden border border-line-2 flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label="Ilustrasi operasional shift logistik dan gudang"
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="400" height="300" fill="var(--cream)" />

        {/* Rak Gudang di kanan */}
        <rect x="260" y="30" width="120" height="170" fill="none" stroke="var(--slate-800)" strokeWidth="3" />
        <line x1="260" y1="85" x2="380" y2="85" stroke="var(--slate-800)" strokeWidth="2" />
        <line x1="260" y1="140" x2="380" y2="140" stroke="var(--slate-800)" strokeWidth="2" />
        {/* Kardus di rak */}
        <rect x="275" y="45" width="40" height="35" rx="3" fill="var(--cream-2)" stroke="var(--line-2)" />
        <rect x="325" y="50" width="35" height="30" rx="3" fill="var(--mist)" stroke="var(--line-2)" />
        <rect x="275" y="100" width="50" height="35" rx="3" fill="var(--mist)" stroke="var(--line-2)" />

        {/* Truk Box Datar di kiri */}
        <rect x="30" y="110" width="110" height="85" rx="4" fill="var(--slate-900)" />
        <path d="M140 135H180L195 165V195H140V135Z" fill="var(--orange)" />
        <rect x="155" y="145" width="25" height="20" rx="2" fill="var(--white)" />
        <circle cx="65" cy="195" r="14" fill="var(--slate-800)" stroke="var(--white)" strokeWidth="3" />
        <circle cx="165" cy="195" r="14" fill="var(--slate-800)" stroke="var(--white)" strokeWidth="3" />

        {/* Figur Kru Gudang dengan rompi oranye */}
        <circle cx="225" cy="115" r="20" fill="var(--slate-800)" opacity="0.6" />
        <path d="M200 195V145C200 135 212 130 225 130C238 130 250 135 250 145V195H200Z" fill="var(--slate-900)" />
        {/* Rompi oranye keselamatan */}
        <path d="M210 145H240V195H210V145Z" fill="var(--orange)" />
        <line x1="210" y1="165" x2="240" y2="165" stroke="var(--white)" strokeWidth="2" />

        {/* Garis lantai */}
        <line x1="0" y1="200" x2="400" y2="200" stroke="var(--slate-900)" strokeWidth="3" />
        <rect x="0" y="200" width="400" height="100" fill="var(--white)" />
      </svg>
    </div>
  );
}
