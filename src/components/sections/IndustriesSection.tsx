import React from "react";
import { Briefcase } from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { PhotoSlot } from "../ui/PhotoSlot";
import { IMAGE_MANIFEST } from "@/lib/images";

export function IndustriesSection() {
  const industries = [
    { manifestKey: "P-01" },
    { manifestKey: "P-02" },
    { manifestKey: "P-03" },
    { manifestKey: "P-04" },
  ];

  return (
    <section
      id="industri"
      className="py-16 lg:py-24 bg-white border-b border-line"
      aria-labelledby="industri-heading"
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Eyebrow icon={Briefcase} className="mb-4">
            Dipakai di Lapangan
          </Eyebrow>
          <h2
            id="industri-heading"
            className="font-display text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Dibuat untuk jam kerja yang tidak 9 sampai 5.
          </h2>
          <p className="text-base lg:text-lg text-ink-2 leading-relaxed">
            Dari barista yang membuka kafe subuh hari, kurir ekspedisi di gudang malam, hingga perawat jaga darurat.
          </p>
        </div>

        {/* Grid 4 Kartu Industri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind) => {
            const item = IMAGE_MANIFEST[ind.manifestKey];
            return (
              <div
                key={item.id}
                className="flex flex-col bg-cream/40 rounded-2xl p-3 border border-line"
              >
                {/* Visual Slot (Foto Dokumenter / Fallback SVG Flat) */}
                <PhotoSlot item={item} aspectRatio="4/3" className="mb-3.5" />

                <h3 className="font-display text-[17px] font-bold text-slate-900 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Keterangan kecil legalitas ilustrasi */}
        <div className="text-xs text-ink-3 text-center mt-8">
          Foto ilustrasi dokumentasi lapangan. Seluruh skenario kerja disesuaikan dengan pola industri nyata.
        </div>
      </div>
    </section>
  );
}
