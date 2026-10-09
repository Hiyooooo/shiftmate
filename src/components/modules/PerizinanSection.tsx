import React from "react";
import {
  CalendarCheck,
  ArrowLeftRight,
  Camera,
  GitPullRequest,
  Clock,
  CalendarRange,
} from "lucide-react";
import { Eyebrow } from "../ui/ShiftChip";
import { PerizinanPhone } from "./PerizinanPhone";

export function PerizinanSection() {
  const subFeatures = [
    {
      icon: ArrowLeftRight,
      title: "Tukar Shift Antar-Rekan",
      desc: "Kru bertukar jadwal jaga mandiri tanpa perlu atasan membuat ulang jadwal.",
    },
    {
      icon: Camera,
      title: "Izin Sakit + Foto Surat Dokter",
      desc: "Foto surat klinik dari ponsel; langsung tercatat sebagai jam sakit dibayar.",
    },
    {
      icon: GitPullRequest,
      title: "Workflow Approval Berjenjang",
      desc: "Alur persetujuan transparan dari rekan kerja hingga ke Area Manager.",
    },
    {
      icon: Clock,
      title: "Persetujuan Lembur",
      desc: "Perintah atau pengajuan lembur tercatat jam mulai dan selesainya.",
    },
    {
      icon: CalendarRange,
      title: "Transparansi Sisa Cuti",
      desc: "Saldo kuota cuti tahunan terpantau real-time tanpa bertanya ke HRD.",
    },
  ];

  return (
    <section
      id="modul-perizinan"
      className="py-16 lg:py-24 bg-white border-b border-line"
      aria-labelledby="perizinan-heading"
    >
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Kolom Kiri: Mockup Ponsel Interaktif (5 Kolom di Desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <PerizinanPhone />
          </div>

          {/* Kolom Kanan: Manfaat & 5 Sub-Fitur Wajib (7 Kolom di Desktop) */}
          <div className="lg:col-span-7">
            <Eyebrow icon={CalendarCheck} className="mb-4">
              Modul 02 · Perizinan & Jadwal
            </Eyebrow>
            <h3
              id="perizinan-heading"
              className="font-display text-2xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4"
            >
              Tukar shift dan izin sakit, selesai dari ponsel.
            </h3>
            <p className="text-base text-ink-2 leading-relaxed mb-8">
              Tukar jadwal dengan rekan, kirim foto surat dokter, dan pantau persetujuan sampai ke slip gaji.
            </p>

            {/* 5 Sub-fitur Wajib */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-line">
              {subFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cream-2 text-orange-700 flex items-center justify-center shrink-0 border border-orange-700/20 mt-0.5">
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
        </div>
      </div>
    </section>
  );
}
