"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { FAQ_LIST } from "@/lib/data";
import { PhoneFrame } from "../phone/PhoneFrame";
import { MiniMap } from "../art/MiniMap";

export function FaqSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleAccordion = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section
      id="faq"
      className="py-16 lg:py-24 bg-white border-b border-line"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-14">
          <Eyebrow icon={HelpCircle} className="mb-4">
            Tanya Jawab (FAQ)
          </Eyebrow>
          <h2
            id="faq-heading"
            className="font-display text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Pertanyaan seputar presensi & privasi data tim.
          </h2>
          <p className="text-base lg:text-lg text-ink-2 leading-relaxed">
            Jawaban transparan mengenai cara kerja teknologi anti-fake GPS, keamanan biometrik, dan kepatuhan hukum ketenagakerjaan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sisi Kiri: 7 Akordeon Aksesibel (7 Kolom di Desktop) */}
          <div className="lg:col-span-7 space-y-3">
            {FAQ_LIST.map((item, idx) => {
              const isOpen = openIndices.includes(idx);
              const contentId = `faq-content-${idx}`;
              const buttonId = `faq-button-${idx}`;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-line-2 overflow-hidden bg-white transition-colors"
                >
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm lg:text-base text-slate-900 hover:bg-cream/40 transition-colors cursor-pointer select-none"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-orange-700 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-ink-2 leading-relaxed border-t border-line/60 animate-fadeIn"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sisi Kanan: Ponsel Statis Pendukung (5 Kolom di Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <div className="flex flex-col items-center">
              <PhoneFrame
                variant="ios"
                label="Layar Bantuan dan Verifikasi Keamanan ShiftMate"
                time="07:02 WIB"
                decorative
              >
                <div className="p-4 bg-white flex flex-col justify-between h-full text-xs">
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 mb-2 pb-1 border-b border-line">
                      Pusat Kepatuhan & Privasi
                    </div>
                    <div className="bg-cream rounded-xl p-3 border border-cream-2 mb-3">
                      <div className="text-[11px] font-bold text-orange-700 mb-1">
                        Perlindungan Data Pribadi (UU PDP)
                      </div>
                      <p className="text-[10px] text-ink-2 leading-relaxed">
                        Data koordinat hanya diambil saat tombol clock-in ditekan. Tidak ada pelacakan GPS latar belakang di luar jam presensi.
                      </p>
                    </div>

                    <MiniMap variant="inside" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-ok-bg text-ok text-[11px] font-bold flex items-center gap-1.5 mt-3">
                    <CheckCircle2 size={14} />
                    <span>Enkripsi AES-256 Sisi Server</span>
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
