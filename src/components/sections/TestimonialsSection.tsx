import React from "react";
import { MessageSquareQuote, Coffee, Building2, Truck } from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { TESTIMONIALS } from "@/lib/data";

export function TestimonialsSection() {
  const industryIcons = {
    fnb: Coffee,
    hotel: Building2,
    logistik: Truck,
  };

  return (
    <section
      className="py-16 lg:py-24 bg-white border-b border-line"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Eyebrow icon={MessageSquareQuote} className="mb-4">
            Cerita Pengguna
          </Eyebrow>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Pengalaman nyata tim yang berganti shift tiap hari.
          </h2>
          <p className="text-base lg:text-lg text-ink-2 leading-relaxed">
            Membantu ratusan outlet dan gudang menertibkan absensi serta perhitungan gaji karyawan lapangan.
          </p>
        </div>

        {/* 3 Kartu Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => {
            const Icon = industryIcons[t.industry];
            return (
              <div
                key={t.author}
                className="bg-cream/40 rounded-2xl p-6 border border-line-2 flex flex-col justify-between"
              >
                <div>
                  {/* Ikon Industri Kecil di Atas Kartu */}
                  <div className="w-8 h-8 rounded-lg bg-cream-2 text-orange-700 flex items-center justify-center mb-4 border border-orange-700/20">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>

                  {/* Kutipan Konkret */}
                  <blockquote className="text-sm text-slate-900 leading-relaxed font-medium mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Profil Pengguna: Avatar Inisial (Tanpa Foto Wajah AI) */}
                <div className="flex items-center gap-3 pt-4 border-t border-line">
                  <div className="w-11 h-11 rounded-full bg-cream-2 border border-orange-700/20 flex items-center justify-center text-sm font-bold text-orange-700 shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{t.author}</div>
                    <div className="text-[11px] text-ink-2">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ILUSTRATIF: ganti dengan testimoni asli yang disetujui */}
        <div className="text-xs text-ink-3 text-center mt-8">
          Nama bisnis dan persona di atas bersifat ilustratif untuk kebutuhan peragaan operasional.
        </div>
      </div>
    </section>
  );
}
