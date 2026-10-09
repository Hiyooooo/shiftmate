import React from "react";
import { MapPin, AlertTriangle } from "lucide-react";

interface MiniMapProps {
  variant?: "inside" | "spoofed";
  className?: string;
  size?: number;
}

export function MiniMap({ variant = "inside", className = "", size = 260 }: MiniMapProps) {
  const isSpoofed = variant === "spoofed";

  return (
    <div
      className={`relative rounded-[16px] overflow-hidden border border-line-2 bg-mist flex items-center justify-center select-none ${className}`}
      style={{ width: "100%", maxWidth: size, aspectRatio: "1/1" }}
      role="img"
      aria-label={
        isSpoofed
          ? "Peta simulasi lokasi palsu terdeteksi di luar radius kerja"
          : "Peta verifikasi lokasi karyawan berada di dalam radius 50m"
      }
    >
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Blok peta & jalan */}
        <rect width="240" height="240" fill="var(--mist)" />
        {/* Blok bangunan/taman fiktif */}
        <rect x="20" y="20" width="70" height="70" rx="8" fill="var(--white)" />
        <rect x="110" y="20" width="110" height="70" rx="8" fill="var(--cream-2)" opacity="0.6" />
        <rect x="20" y="110" width="70" height="110" rx="8" fill="var(--white)" />
        <rect x="110" y="110" width="110" height="110" rx="8" fill="var(--white)" />

        {/* Garis jalanan */}
        <line x1="0" y1="100" x2="240" y2="100" stroke="var(--line-2)" strokeWidth="12" />
        <line x1="100" y1="0" x2="100" y2="240" stroke="var(--line-2)" strokeWidth="12" />

        {/* Titik kerja / Kantor (Pusat Radius) */}
        <circle cx="100" cy="100" r="6" fill="var(--slate-900)" />

        {/* Lingkaran radius 50m (stroke putus-putus orange-700, fill cream-2) */}
        <circle
          cx="100"
          cy="100"
          r="65"
          fill="var(--cream-2)"
          fillOpacity="0.45"
          stroke="var(--orange-700)"
          strokeWidth="2"
          strokeDasharray="5 5"
        />

        {/* Jika Normal / Inside: Pin berada dekat pusat (12m dari kantor) */}
        {!isSpoofed && (
          <g transform="translate(108, 88)">
            <circle cx="6" cy="6" r="10" fill="var(--orange)" fillOpacity="0.3" />
            <circle cx="6" cy="6" r="5" fill="var(--orange-700)" />
          </g>
        )}

        {/* Jika Spoofed: Garis lompatan lokasi merah & pin berada jauh di luar radius */}
        {isSpoofed && (
          <>
            <line
              x1="100"
              y1="100"
              x2="210"
              y2="35"
              stroke="var(--danger)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Titik loncatan palsu */}
            <g transform="translate(200, 25)">
              <circle cx="10" cy="10" r="12" fill="var(--danger-bg)" />
              <circle cx="10" cy="10" r="6" fill="var(--danger)" />
            </g>
          </>
        )}
      </svg>

      {/* Label status di pojok peta */}
      <div className="absolute bottom-2 left-2 right-2 bg-white/95 rounded-lg p-2 border border-line-2 text-xs flex items-center justify-between">
        {isSpoofed ? (
          <div className="flex items-center gap-1.5 text-danger font-bold">
            <AlertTriangle size={14} className="shrink-0" />
            <span>Lompat 41 km (Di luar batas)</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-ok font-semibold">
            <MapPin size={14} className="text-orange-700 shrink-0" />
            <span>12 m dari titik · Radius 50 m</span>
          </div>
        )}
      </div>
    </div>
  );
}
