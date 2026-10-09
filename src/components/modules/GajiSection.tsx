import React from "react";
import {
  Wallet,
  Timer,
  CalendarCheck2,
  Clock,
  Moon,
  Landmark,
  Receipt,
  Smartphone,
  Calculator,
} from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { GajiPhone } from "./GajiPhone";

export function GajiSection() {
  const subFeatures = [
    {
      icon: Timer,
      title: "Upah per Jam Akurat",
      desc: "Dihitung dari total jam kerja riil absensi tanpa salah input.",
    },
    {
      icon: CalendarCheck2,
      title: "Uang Hadir Otomatis",
      desc: "Bonus kehadiran harian otomatis terakumulasi per hari hadir sah.",
    },
    {
      icon: Clock,
      title: "Uang Lembur Terintegrasi",
      desc: "Kalkulasi berjenjang (1,5x dan 2x) dari pengajuan yang disetujui.",
    },
    {
      icon: Moon,
      title: "Tunjangan Shift Malam",
      desc: "Premi khusus jam malam langsung terhitung per frekuensi shift.",
    },
    {
      icon: Landmark,
      title: "BPJS & PPh 21 TER A",
      desc: "Pemotongan pajak TER Kategori A dan iuran BPJS TK/Kes otomatis.",
    },
    {
      icon: Receipt,
      title: "Reimbursement Klaim",
      desc: "Penggantian biaya transport atau bensin langsung masuk ke slip.",
    },
    {
      icon: Smartphone,
      title: "Slip Gaji Mobile",
      desc: "Kru dapat melihat rincian gaji langsung dari ponsel tiap gajian.",
    },
    {
      icon: Calculator,
      title: "Hitung Otomatis Real-Time",
      desc: "Tanpa spreadsheet manual rumit dan tanpa risiko salah hitung.",
    },
  ];

  return (
    <section
      id="modul-gaji"
      className="py-16 lg:py-24 bg-cream border-b border-cream-2"
      aria-labelledby="gaji-heading"
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Kolom Kiri: Manfaat & 8 Sub-Fitur Wajib (7 Kolom di Desktop) */}
          <div className="lg:col-span-7">
            <Eyebrow icon={Wallet} className="mb-4">
              Modul 03 · Gaji & Payroll
            </Eyebrow>
            <h3
              id="gaji-heading"
              className="font-display text-2xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4"
            >
              Slip gaji di ponsel, dihitung per jam.
            </h3>
            <p className="text-base text-ink-2 leading-relaxed mb-8">
              Upah per jam, uang hadir, tunjangan shift malam, dan lembur masuk slip tanpa input ulang.
            </p>

            {/* 8 Sub-fitur Wajib */}
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

          {/* Kolom Kanan: Mockup Ponsel Interaktif Gaji (5 Kolom di Desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <GajiPhone />
          </div>
        </div>
      </div>
    </section>
  );
}
