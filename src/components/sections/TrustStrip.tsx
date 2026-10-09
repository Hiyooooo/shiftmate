import React from "react";
import { TRUST_METRICS, CLIENT_WORDMARKS } from "@/lib/data";
import { SunDisc } from "../art/SunDisc";

export function TrustStrip() {
  return (
    <section
      className="relative bg-slate-800 py-14 overflow-hidden border-b border-line-dark"
      aria-label="Bukti Kepercayaan dan Metrik Operasional"
    >
      {/* SunDisc kecil di sudut pita gelap */}
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
        <SunDisc size={200} clipped={false} />
      </div>

      <div className="max-w-[1160px] mx-auto px-5 lg:px-8 relative z-10">
        {/* Grid 4 Metrik Angka (DM Mono) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 pb-10 border-b border-line-dark text-center">
          {TRUST_METRICS.map((m) => (
            <div key={m.label} className="flex flex-col items-center">
              <span className="font-mono text-3xl lg:text-4xl font-bold text-white tracking-tight mb-1 tabular-nums">
                {m.value}
              </span>
              <span className="text-xs lg:text-[13px] text-on-dark-2 font-medium">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Wordmark 5 Klien Fiktif (Ilustratif) */}
        <div className="pt-8">
          <div className="text-[11px] font-mono uppercase tracking-wider text-on-dark-3 text-center mb-5">
            Dipercaya Oleh Tim Operasional di Berbagai Kota:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {CLIENT_WORDMARKS.map((client) => (
              <span
                key={client}
                className="font-display text-sm lg:text-base font-bold text-on-dark-3 select-none"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* ILUSTRATIF: ganti dengan data & klien asli. Pastikan nama tidak menyerupai bisnis nyata */}
      </div>
    </section>
  );
}
