import React from "react";
import {
  BookOpen,
  WifiOff,
  Archive,
  GraduationCap,
  Search,
} from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { LibraryPhone } from "./LibraryPhone";

export function LibrarySection() {
  const subFeatures = [
    {
      icon: WifiOff,
      title: "SOP Harian Bisa Dibuka Offline",
      desc: "Instruksi kerja dan checklist darurat tetap terbaca walau sinyal hilang di basement.",
    },
    {
      icon: Archive,
      title: "Arsip Dokumen Perusahaan",
      desc: "Peraturan perusahaan, surat edaran, dan kebijakan tukar shift tersimpan aman.",
    },
    {
      icon: GraduationCap,
      title: "Modul E-Learning Kru",
      desc: "Pelatihan pelayanan prima dan keselamatan kerja terintegrasi dengan progres staf.",
    },
    {
      icon: Search,
      title: "Pencarian Cepat Instan",
      desc: "Temukan pedoman teknis dalam hitungan detik lewat kata kunci pencarian.",
    },
  ];

  return (
    <section
      id="modul-library"
      className="py-16 lg:py-24 bg-cream border-b border-cream-2"
      aria-labelledby="library-heading"
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Kolom Kiri: Manfaat & 4 Sub-Fitur Wajib (7 Kolom di Desktop) */}
          <div className="lg:col-span-7">
            <Eyebrow icon={BookOpen} className="mb-4">
              Modul 05 · Library & SOP
            </Eyebrow>
            <h3
              id="library-heading"
              className="font-display text-2xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4"
            >
              SOP di genggaman, tetap terbaca tanpa sinyal.
            </h3>
            <p className="text-base text-ink-2 leading-relaxed mb-8">
              SOP harian, arsip dokumen, dan e-learning tersimpan di ponsel dan bisa dibuka offline.
            </p>

            {/* 4 Sub-fitur Wajib */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-line-2">
              {subFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white text-orange-700 flex items-center justify-center shrink-0 border border-line-2 mt-0.5">
                      <Icon size={16} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-0.5">{f.title}</h4>
                      <p className="text-xs text-ink-2 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kolom Kanan: Mockup Ponsel Interaktif Library (5 Kolom di Desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <LibraryPhone />
          </div>
        </div>
      </div>
    </section>
  );
}
