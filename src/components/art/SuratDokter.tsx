import React from "react";
import { Check } from "lucide-react";

interface SuratDokterProps {
  className?: string;
}

export function SuratDokter({ className = "" }: SuratDokterProps) {
  return (
    <div
      className={`relative w-full aspect-[3/4] bg-white rounded-[16px] border border-line-2 p-5 flex flex-col justify-between select-none ${className}`}
      role="img"
      aria-label="Ilustrasi surat keterangan sakit dokter"
    >
      <div>
        {/* Kop Klinik Fiktif */}
        <div className="flex items-center gap-2 pb-3 border-b border-line-2">
          <div className="w-7 h-7 rounded-md bg-cream-2 flex items-center justify-center text-orange-700 font-bold text-xs">
            +
          </div>
          <div>
            <div className="h-2.5 w-24 bg-slate-900 rounded-sm mb-1" />
            <div className="h-1.5 w-32 bg-line-2 rounded-sm" />
          </div>
        </div>

        {/* Judul Surat */}
        <div className="my-4 text-center">
          <div className="h-2 w-28 bg-slate-800 rounded-sm mx-auto mb-1" />
          <div className="h-1.5 w-16 bg-line-2 rounded-sm mx-auto" />
        </div>

        {/* 5 Baris Teks Garis Abu (Data Isi Surat) */}
        <div className="space-y-2.5 mt-2">
          <div className="h-1.5 w-full bg-mist rounded-sm" />
          <div className="h-1.5 w-11/12 bg-mist rounded-sm" />
          <div className="h-1.5 w-4/5 bg-mist rounded-sm" />
          <div className="h-1.5 w-full bg-mist rounded-sm" />
          <div className="h-1.5 w-2/3 bg-mist rounded-sm" />
        </div>
      </div>

      {/* Bagian Bawah: Stempel dan Tanda Tangan */}
      <div className="flex items-end justify-between pt-4 border-t border-line">
        {/* Badge status terlampir */}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-ok-bg text-ok">
          <Check size={11} strokeWidth={2} /> Terlampir
        </span>

        <div className="relative flex flex-col items-center">
          {/* Stempel Melingkar Merah Tipis */}
          <div className="w-12 h-12 rounded-full border border-danger/40 flex items-center justify-center -mb-4 opacity-75">
            <span className="text-[7px] text-danger font-bold uppercase rotate-[-12deg]">
              KLINIK SAH
            </span>
          </div>

          {/* Tanda tangan path */}
          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="text-slate-900">
            <path
              d="M4 18C12 14 18 6 22 12C26 18 32 10 44 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="h-1.5 w-16 bg-line-2 rounded-sm mt-1" />
        </div>
      </div>
    </div>
  );
}
